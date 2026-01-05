import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import css from "./Navigation.module.css";
import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ContactsIcon from "@mui/icons-material/Contacts";

// ============================================
// NAVIGATION - Ana Navigasyon Linkleri
// ============================================
// AppBar içinde görünen navigasyon linkleri
// Home ve Contacts sayfalarına gitmek için kullanılır
//
// Linkler:
// 1. Home (/) - Her zaman görünür (misafir + giriş yapmış)
// 2. Contacts (/contacts) - Sadece giriş yapmış kullanıcılara görünür

export default function Navigation() {
  // Redux state'den kullanıcının giriş durumunu al
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className={css.nav}>
      {/* ============================================
          HOME LINK - Ana Sayfa
          ============================================
          Her zaman görünür (misafir + giriş yapmış)
          Path: /
      ============================================ */}
      <NavLink to="/" className={css.link}>
        {({ isActive }) => (
          <Button
            variant={isActive ? "contained" : "text"}
            startIcon={<HomeIcon />}
            className={`${css.navButton} ${isActive ? css.active : ""}`}
          >
            Home
          </Button>
        )}
      </NavLink>

      {/* ============================================
          CONTACTS LINK - Kişiler Sayfası
          ============================================
          Sadece giriş yapmış kullanıcılara görünür
          Path: /contacts
          
          Neden sadece giriş yapmışlara?
          - Kişiler kullanıcıya özel
          - Giriş yapmadan kişileri göremezsiniz
          - PrivateRoute tarafından korunur
      ============================================ */}
      {isLoggedIn && (
        <NavLink to="/contacts" className={css.link}>
          {({ isActive }) => (
            <Button
              variant={isActive ? "contained" : "text"}
              startIcon={<ContactsIcon />}
              className={`${css.navButton} ${isActive ? css.active : ""}`}
            >
              Contacts
            </Button>
          )}
        </NavLink>
      )}
    </nav>
  );
}

// ============================================
// 📝 NAVLINK vs LINK
// ============================================
// NavLink: Aktif link'i tespit eder ve stil verir
// - isActive prop'u ile aktif linki tespit edebiliriz
// - Örnek: Contacts sayfasındayken "Contacts" butonu farklı renkte
//
// Link: Sadece yönlendirme yapar, aktif link tespiti yok

// ============================================
// 🎯 KULLANICI DURUMLARINA GÖRE GÖRÜNÜM
// ============================================
//
// Misafir Kullanıcı (isLoggedIn = false):
// ┌──────────────────┐
// │  Home            │  ← Sadece Home görünür
// └──────────────────┘
//
// Giriş Yapmış Kullanıcı (isLoggedIn = true):
// ┌──────────────────────────┐
// │  Home    Contacts        │  ← İkisi de görünür
// └──────────────────────────┘

// ============================================
// 🎨 BUTTON VARYANTLARI
// ============================================
// variant="contained": Dolu buton (aktif link için)
// variant="text": Boş buton (pasif link için)
//
// Örnek:
// - Home sayfasındayken: Home butonu "contained", Contacts butonu "text"
// - Contacts sayfasındayken: Contacts butonu "contained", Home butonu "text"

// ============================================
// 🔍 isActive NASIL ÇALIŞIR?
// ============================================
// NavLink component'i, render function ile kullanıldığında
// isActive prop'unu sağlar:
//
// <NavLink to="/contacts">
//   {({ isActive }) => (
//     // isActive = true → Şu anda /contacts sayfasındayız
//     // isActive = false → Başka bir sayfadayız
//     <Button variant={isActive ? "contained" : "text"}>
//       Contacts
//     </Button>
//   )}
// </NavLink>
