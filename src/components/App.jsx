import { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "../redux/auth/operations.js";
import { selectIsRefreshing } from "../redux/auth/selectors.js";
import Layout from "./Layout/Layout.jsx";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";
import RestrictedRoute from "./RestrictedRoute/RestrictedRoute.jsx";
import { CircularProgress, Box } from "@mui/material";

// ============================================
// LAZY LOADING - Sayfa Component'lerini Geç Yükle
// ============================================
// lazy(): Component'leri ihtiyaç duyulduğunda yükler (code splitting)
// Bu, ilk yükleme süresini azaltır
const HomePage = lazy(() => import("../pages/HomePage/HomePage.jsx"));
const RegistrationPage = lazy(() =>
  import("../pages/RegistrationPage/RegistrationPage.jsx")
);
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage.jsx"));
const ContactsPage = lazy(() =>
  import("../pages/ContactsPage/ContactsPage.jsx")
);

// ============================================
// APP COMPONENT - Ana Uygulama Component'i
// ============================================
export default function App() {
  // Redux dispatch (refreshUser action'ını çağırmak için)
  const dispatch = useDispatch();

  // Redux state'den yenileme durumunu al
  const isRefreshing = useSelector(selectIsRefreshing);

  // ============================================
  // REFRESH USER - Sayfa Yenilendiğinde Token Kontrolü
  // ============================================
  // useEffect: Component mount olduğunda (uygulama açıldığında) çalışır
  // refreshUser: localStorage'daki token ile kullanıcı bilgilerini çeker
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  // ============================================
  // LOADING STATE - Token Kontrol Edilirken
  // ============================================
  // isRefreshing = true iken loading spinner göster
  // Bu süre boyunca hiçbir sayfa render edilmez
  // Böylece kullanıcı giriş yapmışsa otomatik olarak /contacts'a yönlendirilir
  if (isRefreshing) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <CircularProgress size={60} sx={{ color: "white" }} />
      </Box>
    );
  }

  // ============================================
  // ROUTES - Tüm Rotalar
  // ============================================
  return (
    <Layout>
      {/* ============================================
          SUSPENSE - Lazy Loading için Gerekli
          ============================================
          Lazy load edilen component'ler yüklenirken
          fallback içeriği gösterilir (loading spinner)
      ============================================ */}
      <Suspense
        fallback={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
            }}
          >
            <CircularProgress size={50} />
          </Box>
        }
      >
        <Routes>
          {/* ============================================
              HOME ROUTE - Ana Sayfa (/)
              ============================================
              Public route: Herkes erişebilir (misafir + giriş yapmış)
          ============================================ */}
          <Route path="/" element={<HomePage />} />

          {/* ============================================
              REGISTER ROUTE - Kayıt Sayfası (/register)
              ============================================
              Restricted route: Sadece misafirlere açık
              Giriş yapmışsa /contacts'a yönlendirilir
          ============================================ */}
          <Route
            path="/register"
            element={
              <RestrictedRoute
                component={<RegistrationPage />}
                redirectTo="/contacts"
              />
            }
          />

          {/* ============================================
              LOGIN ROUTE - Giriş Sayfası (/login)
              ============================================
              Restricted route: Sadece misafirlere açık
              Giriş yapmışsa /contacts'a yönlendirilir
          ============================================ */}
          <Route
            path="/login"
            element={
              <RestrictedRoute
                component={<LoginPage />}
                redirectTo="/contacts"
              />
            }
          />

          {/* ============================================
              CONTACTS ROUTE - Kişiler Sayfası (/contacts)
              ============================================
              Private route: Sadece giriş yapmışlara açık
              Giriş yapmamışsa /login'e yönlendirilir
          ============================================ */}
          <Route
            path="/contacts"
            element={
              <PrivateRoute component={<ContactsPage />} redirectTo="/login" />
            }
          />

          {/* ============================================
              404 ROUTE - Sayfa Bulunamadı
              ============================================
              Tüm diğer rotalar için 404 sayfası göster
              Opsiyonel: İsterseniz 404 sayfası oluşturabilirsiniz
          ============================================ */}
          <Route
            path="*"
            element={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "50vh",
                  gap: 2,
                }}
              >
                <h1 style={{ color: "white", fontSize: "72px", margin: 0 }}>
                  404
                </h1>
                <p style={{ color: "white", fontSize: "24px" }}>
                  Page not found
                </p>
              </Box>
            }
          />
        </Routes>
      </Suspense>
    </Layout>
  );
}

// ============================================
// 📝 REFRESH USER AKIŞI
// ============================================
// 1. Uygulama açılır (App component mount olur)
//    ↓
// 2. useEffect çalışır
//    ↓
// 3. dispatch(refreshUser())
//    ↓
// 4. Redux: isRefreshing = true
//    ↓
// 5. App.jsx: Loading spinner gösterilir
//    ↓
// 6. refreshUser operation:
//    - localStorage'dan token alınır
//    - Token varsa: Backend'e GET /users/current
//    - Token yoksa: İşlem iptal edilir
//    ↓
// 7. İki senaryo:
//    a) Token geçerli:
//       - Backend: user bilgilerini döner
//       - Redux: { user, isLoggedIn: true, isRefreshing: false }
//       - App.jsx: Loading kaybolur, Routes render edilir
//       - PrivateRoute kontrol eder: isLoggedIn = true
//       - Kullanıcı /contacts'ta kalır (veya yönlendirilir)
//    b) Token geçersiz veya yok:
//       - Redux: { isLoggedIn: false, isRefreshing: false }
//       - App.jsx: Loading kaybolur, Routes render edilir
//       - PrivateRoute kontrol eder: isLoggedIn = false
//       - Kullanıcı /login'e yönlendirilir

// ============================================
// 🎯 LAZY LOADING NEDİR?
// ============================================
// const HomePage = lazy(() => import("../pages/HomePage/HomePage.jsx"));
//
// Lazy loading: Component'leri ihtiyaç duyulduğunda yükler
// Avantajları:
// - İlk yükleme süresi kısalır
// - Kullanıcı sadece ihtiyaç duyduğu sayfayı indirir
// - Daha iyi performans
//
// Örnek:
// - Kullanıcı /login'e giderse → Sadece LoginPage yüklenir
// - ContactsPage, HomePage vb. yüklenmez
// - Gereksiz kod indirmesi yapılmaz

// ============================================
// 🔄 ROUTE YAPISI
// ============================================
// Public Routes (Herkes):
// - / → HomePage
//
// Restricted Routes (Sadece misafir):
// - /register → RegistrationPage
// - /login → LoginPage
//
// Private Routes (Sadece giriş yapmış):
// - /contacts → ContactsPage
//
// 404 Route:
// - * → 404 sayfası (tüm diğer rotalar)

// ============================================
// 🎨 SUSPENSE FALLBACK
// ============================================
// <Suspense fallback={<Loading />}>
//
// Lazy load edilen component yüklenirken gösterilir
// Örnek: Kullanıcı /contacts'a gider
// 1. ContactsPage lazy load ile yüklenir (1-2 saniye)
// 2. Bu sürede fallback (CircularProgress) gösterilir
// 3. Component yüklenince gösterilir

// ============================================
// 🔐 ROUTE KORUMALARI
// ============================================
// PrivateRoute:
// - Sadece giriş yapmış kullanıcılar erişebilir
// - isLoggedIn = false ise redirectTo'ya yönlendirir
//
// RestrictedRoute:
// - Sadece misafir kullanıcılar erişebilir
// - isLoggedIn = true ise redirectTo'ya yönlendirir
