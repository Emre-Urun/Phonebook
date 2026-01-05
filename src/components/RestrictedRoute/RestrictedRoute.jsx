import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";

// ============================================
// RESTRICTED ROUTE - Misafir Rota Component'i
// ============================================
// Sadece giriş yapmamış kullanıcıların (misafir) erişebileceği rotaları korur
// Örnek: /login ve /register sayfaları sadece misafirlere açık
//
// Mantık: Eğer kullanıcı zaten giriş yapmışsa, login/register sayfasına
// gitmesine gerek yok, direkt /contacts'a yönlendir
//
// Kullanım (App.jsx içinde):
// <Route
//   path="/login"
//   element={
//     <RestrictedRoute
//       component={<LoginPage />}
//       redirectTo="/contacts"
//     />
//   }
// />

export default function RestrictedRoute({
  component: Component, // Gösterilecek component (örn: LoginPage)
  redirectTo = "/", // Yönlendirilecek sayfa (default: Ana sayfa)
}) {
  // Redux state'den kullanıcı durumunu al
  const isLoggedIn = useSelector(selectIsLoggedIn); // Kullanıcı giriş yapmış mı?

  // ============================================
  // SENARYO 1: Kullanıcı Zaten Giriş Yapmış
  // ============================================
  // Kullanıcı giriş yapmışsa, login/register sayfasına girmesine izin verme
  // Direkt olarak /contacts sayfasına yönlendir
  //
  // Örnek: Kullanıcı giriş yapmış ve manuel olarak /login yazıp gitmek istedi
  // Sonuç: /contacts'a yönlendir (zaten giriş yapmış, tekrar login'e gerek yok)
  if (isLoggedIn) {
    return <Navigate to={redirectTo} />;
  }

  // ============================================
  // SENARYO 2: Kullanıcı Giriş Yapmamış (Misafir)
  // ============================================
  // isLoggedIn = false
  // Sonuç: İstenen component'i göster (örn: LoginPage veya RegistrationPage)
  return Component;
}

// ============================================
// 📝 ÇALIŞMA MANTIĞI ÖRNEKLER
// ============================================
//
// ÖRNEK 1: Misafir kullanıcı /login'e gitmek istedi
// - isLoggedIn = false
// - Sonuç: LoginPage göster ✅
//
// ÖRNEK 2: Giriş yapmış kullanıcı manuel olarak /login'e gitmek istedi
// - isLoggedIn = true
// - Sonuç: /contacts'a yönlendir ❌
// - Açıklama: Zaten giriş yapmış, tekrar login'e gerek yok
//
// ÖRNEK 3: Giriş yapmış kullanıcı /register'a gitmek istedi
// - isLoggedIn = true
// - Sonuç: /contacts'a yönlendir ❌
// - Açıklama: Zaten hesabı var, yeni hesap oluşturamaz

// ============================================
// 🎯 PRIVATE ROUTE vs RESTRICTED ROUTE
// ============================================
//
// PRIVATE ROUTE (Korumalı):
// - Sadece giriş yapmış kullanıcılar erişebilir
// - Örnek: /contacts
// - Mantık: Giriş yapmamışsa → /login'e yönlendir
//
// RESTRICTED ROUTE (Misafir):
// - Sadece giriş yapmamış kullanıcılar erişebilir
// - Örnek: /login, /register
// - Mantık: Giriş yapmışsa → /contacts'a yönlendir
//
// Karşılaştırma Tablosu:
// ┌─────────────────┬──────────────────┬─────────────────────┐
// │ Sayfa           │ Giriş Yapmış     │ Giriş Yapmamış      │
// ├─────────────────┼──────────────────┼─────────────────────┤
// │ /contacts       │ ✅ Göster        │ ❌ /login'e yönlendir │
// │ (PrivateRoute)  │                  │                     │
// ├─────────────────┼──────────────────┼─────────────────────┤
// │ /login          │ ❌ /contacts'a    │ ✅ Göster           │
// │ (RestrictedRoute)│  yönlendir       │                     │
// ├─────────────────┼──────────────────┼─────────────────────┤
// │ /register       │ ❌ /contacts'a    │ ✅ Göster           │
// │ (RestrictedRoute)│  yönlendir       │                     │
// └─────────────────┴──────────────────┴─────────────────────┘

// ============================================
// 🚀 KULLANIM ÖRNEKLERİ (App.jsx içinde)
// ============================================
//
// Login sayfası (sadece misafirlere açık):
// <Route
//   path="/login"
//   element={
//     <RestrictedRoute
//       component={<LoginPage />}
//       redirectTo="/contacts"
//     />
//   }
// />
//
// Register sayfası (sadece misafirlere açık):
// <Route
//   path="/register"
//   element={
//     <RestrictedRoute
//       component={<RegistrationPage />}
//       redirectTo="/contacts"
//     />
//   }
// />
