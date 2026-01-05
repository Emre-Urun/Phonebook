import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";
import { Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

// ============================================
// AUTHNAV - Authentication Navigation Component'i
// ============================================
// AppBar'ın sağ tarafında görünen Login ve Register butonları
// Sadece giriş yapmamış kullanıcılara (misafir) görünür
//
// Butonlar:
// 1. Login (/login) - Giriş yapmış kullanıcılar için
// 2. Register (/register) - Yeni hesap oluşturmak isteyenler için
//
// Kullanım (AppBar.jsx içinde):
// {isLoggedIn ? <UserMenu /> : <AuthNav />}
//                                   ↑
//                          Misafir ise AuthNav göster

export default function AuthNav() {
  return (
    <div className={css.authNav}>
      {/* ============================================
          LOGIN BUTTON - Giriş Yap
          ============================================
          Path: /login
          İkon: LoginIcon (giriş ikonu)
          Variant: outlined (çerçeveli buton)
      ============================================ */}
      <NavLink to="/login" className={css.link}>
        {({ isActive }) => (
          <Button
            variant="outlined"
            startIcon={<LoginIcon />}
            className={`${css.authButton} ${css.loginButton} ${
              isActive ? css.active : ""
            }`}
          >
            Login
          </Button>
        )}
      </NavLink>

      {/* ============================================
          REGISTER BUTTON - Kayıt Ol
          ============================================
          Path: /register
          İkon: PersonAddIcon (kullanıcı ekle ikonu)
          Variant: contained (dolu buton - daha dikkat çekici)
          
          Neden contained?
          - Register, birincil aksiyondur (primary action)
          - Yeni kullanıcıları kayıt olmaya teşvik etmek için
          - Login'den daha dikkat çekici olmalı
      ============================================ */}
      <NavLink to="/register" className={css.link}>
        {({ isActive }) => (
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            className={`${css.authButton} ${css.registerButton} ${
              isActive ? css.active : ""
            }`}
          >
            Register
          </Button>
        )}
      </NavLink>
    </div>
  );
}

// ============================================
// 📝 GÖRÜNÜM
// ============================================
// ┌─────────────────────────────┐
// │  [Login]  [Register]        │  ← AppBar'ın sağ tarafı
// └─────────────────────────────┘

// ============================================
// 🎯 BUTTON TASARIM KARARLARI
// ============================================
//
// LOGIN (outlined):
// - Çerçeveli buton (secondary action)
// - Daha az dikkat çekici
// - Zaten hesabı olanlar için
//
// REGISTER (contained):
// - Dolu buton (primary action)
// - Daha dikkat çekici
// - Yeni kullanıcılar için önemli
// - Gradient arka plan ile vurgulanır

// ============================================
// 🎨 isActive KULLANIMI
// ============================================
// NavLink'in isActive prop'u ile aktif sayfayı tespit ederiz:
//
// Örnek 1: Kullanıcı /login sayfasında
// - Login butonu: Aktif stil (daha parlak)
// - Register butonu: Normal stil
//
// Örnek 2: Kullanıcı /register sayfasında
// - Register butonu: Aktif stil (daha parlak)
// - Login butonu: Normal stil

// ============================================
// 🔄 APPBAR İÇİNDE KULLANIMI
// ============================================
// AppBar.jsx içinde:
//
// const isLoggedIn = useSelector(selectIsLoggedIn);
//
// {isLoggedIn ? <UserMenu /> : <AuthNav />}
//                                   ↑
//                   Misafir ise AuthNav, giriş yapmışsa UserMenu
