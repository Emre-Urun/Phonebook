import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../../redux/auth/selectors.js";

// ============================================
// PRIVATE ROUTE - Korumalı Rota Component'i
// ============================================
// Sadece giriş yapmış kullanıcıların erişebileceği rotaları korur
// Örnek: /contacts sayfası sadece giriş yapanlara açık
//
// Kullanım (App.jsx içinde):
// <Route
//   path="/contacts"
//   element={
//     <PrivateRoute
//       component={<ContactsPage />}
//       redirectTo="/login"
//     />
//   }
// />

export default function PrivateRoute({
  component: Component, // Gösterilecek component (örn: ContactsPage)
  redirectTo = "/", // Yönlendirilecek sayfa (default: Ana sayfa)
}) {
  // Redux state'den kullanıcı durumunu al
  const isLoggedIn = useSelector(selectIsLoggedIn); // Kullanıcı giriş yapmış mı?
  const isRefreshing = useSelector(selectIsRefreshing); // Token ile kullanıcı yenilenirken mi?

  // ============================================
  // SENARYO 1: Kullanıcı Yenilenirken
  // ============================================
  // Sayfa yenilendiğinde, token varsa refreshUser çalışır
  // Bu süre boyunca isRefreshing = true
  // Bu durumda ne component ne de redirect gösterme, bekle
  // Örnek: 500ms boyunca boş ekran veya loading spinner
  const shouldRedirect = !isLoggedIn && !isRefreshing;

  // ============================================
  // SENARYO 2: Kullanıcı Giriş Yapmamış
  // ============================================
  // isLoggedIn = false ve isRefreshing = false
  // Yani: Token yok VEYA token geçersiz
  // Sonuç: Login sayfasına yönlendir
  if (shouldRedirect) {
    return <Navigate to={redirectTo} />;
  }

  // ============================================
  // SENARYO 3: Kullanıcı Giriş Yapmış
  // ============================================
  // isLoggedIn = true
  // Sonuç: İstenen component'i göster (örn: ContactsPage)
  return Component;
}

// ============================================
// 📝 ÇALIŞMA MANTIĞI ÖRNEKLER
// ============================================
//
// ÖRNEK 1: Kullanıcı giriş yapmadan /contacts'a gitmek istedi
// - isLoggedIn = false
// - isRefreshing = false
// - Sonuç: /login'e yönlendir
//
// ÖRNEK 2: Kullanıcı giriş yapmış ve /contacts'a gitti
// - isLoggedIn = true
// - isRefreshing = false
// - Sonuç: ContactsPage göster
//
// ÖRNEK 3: Sayfa yenilendi, token kontrol ediliyor
// - isLoggedIn = false (henüz)
// - isRefreshing = true (refreshUser çalışıyor)
// - Sonuç: Bekle, hiçbir şey gösterme
// - 500ms sonra:
//   - Token geçerliyse → isLoggedIn = true → ContactsPage göster
//   - Token geçersizse → isLoggedIn = false → /login'e yönlendir

// ============================================
// 🎯 NEDEN isRefreshing KONTROL EDİLİYOR?
// ============================================
// Sayfa yenilendiğinde:
// 1. PersistGate token'ı localStorage'dan okur
// 2. App component'i mount olur
// 3. useEffect içinde refreshUser çağrılır (token ile kullanıcı bilgisi çekiliyor)
// 4. Bu süre boyunca isRefreshing = true (yaklaşık 500ms)
// 5. Eğer bu sürede redirect edersek, kullanıcı giriş yapmış olsa bile login'e atılır
// 6. Bu yüzden isRefreshing = true ise bekliyoruz
//
// shouldRedirect = !isLoggedIn && !isRefreshing
// Yani: Kullanıcı giriş yapmamış VE yenileme devam etmiyorsa → redirect et
