import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import Navigation from "../Navigation/Navigation.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";
import UserMenu from "../UserMenu/UserMenu.jsx";
import css from "./AppBar.module.css";
import { AppBar as MuiAppBar, Toolbar, Container } from "@mui/material";
import ContactsIcon from "@mui/icons-material/Contacts";

// ============================================
// APPBAR - Üst Navigasyon Çubuğu Component'i
// ============================================
// Her sayfanın en üstünde görünen navigasyon çubuğu
// Layout component'i içinde render edilir
//
// İçerik (Kullanıcı durumuna göre değişir):
// 1. Logo + App İsmi (Her zaman görünür)
// 2. Navigation (Ana sayfa ve Contacts linkleri)
// 3. AuthNav (Login/Register - sadece misafirlere)
//    VEYA
//    UserMenu (Kullanıcı adı + Logout - sadece giriş yapmış kullanıcılara)

export default function AppBar() {
  // Redux state'den kullanıcının giriş durumunu al
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    // ============================================
    // Material-UI AppBar Component'i
    // ============================================
    // position="sticky": Scroll yapıldığında en üstte sabit kalır
    // color="default": Beyaz arka plan
    // elevation={2}: Hafif gölge efekti
    <MuiAppBar
      position="sticky"
      color="default"
      elevation={2}
      className={css.appbar}
    >
      <Container maxWidth="xl">
        <Toolbar className={css.toolbar}>
          {/* ============================================
              SOL TARAF - Logo ve Uygulama Adı
              ============================================ */}
          <div className={css.logoSection}>
            {/* Contacts ikonu */}
            <ContactsIcon className={css.logoIcon} />

            {/* Uygulama adı */}
            <span className={css.appName}>Phonebook</span>
          </div>

          {/* ============================================
              ORTA TARAF - Navigation (Ana Sayfa, Contacts)
              ============================================ */}
          <Navigation />

          {/* ============================================
              SAĞ TARAF - Auth Navigation veya User Menu
              ============================================
              Kullanıcı durumuna göre dinamik olarak değişir:
              
              isLoggedIn = false (Misafir):
                → AuthNav göster (Login, Register butonları)
              
              isLoggedIn = true (Giriş yapmış):
                → UserMenu göster (Kullanıcı adı, Logout butonu)
          ============================================ */}
          {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
}

// ============================================
// 📝 APPBAR YAPISI
// ============================================
// ┌──────────────────────────────────────────────────────────┐
// │  Logo  Phonebook  │  Home  Contacts  │  Login  Register  │  ← Misafir
// └──────────────────────────────────────────────────────────┘
//
// ┌──────────────────────────────────────────────────────────┐
// │  Logo  Phonebook  │  Home  Contacts  │  John Doe  Logout │  ← Giriş yapmış
// └──────────────────────────────────────────────────────────┘

// ============================================
// 🎯 COMPONENT'LERİN SORUMLULUKLARI
// ============================================
// 1. AppBar (Bu component):
//    - Genel düzeni sağlar
//    - Kullanıcı durumuna göre AuthNav veya UserMenu gösterir
//
// 2. Navigation:
//    - Ana Sayfa (/) linki (her zaman görünür)
//    - Contacts (/contacts) linki (sadece giriş yapmışlara)
//
// 3. AuthNav:
//    - Login (/login) butonu
//    - Register (/register) butonu
//    - Sadece misafirlere görünür
//
// 4. UserMenu:
//    - Kullanıcı adı gösterimi
//    - Logout butonu
//    - Sadece giriş yapmış kullanıcılara görünür

// ============================================
// 🎨 MATERIAL-UI COMPONENT'LERİ
// ============================================
// - MuiAppBar: Ana navigasyon çubuğu container'ı
// - Toolbar: İçerik düzenleyici (flex container)
// - Container: İçeriği ortalar ve max-width belirler
// - ContactsIcon: Telefon defteri ikonu (Material-UI Icons)
