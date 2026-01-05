import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import css from "./LoginPage.module.css";
import { Container, Typography, Box, Paper } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";

// ============================================
// LOGIN PAGE - Giriş Sayfası
// ============================================
// Mevcut kullanıcıların giriş yapması için sayfa
// RestrictedRoute ile korunur (sadece misafirlere açık)
//
// İçerik:
// 1. Başlık ve açıklama
// 2. LoginForm component'i
// 3. Register sayfasına yönlendirme linki

export default function LoginPage() {
  return (
    <div className={css.loginPage}>
      <Container maxWidth="sm" className={css.container}>
        {/* ============================================
            PAPER - Beyaz Form Kartı
            ============================================
            Material-UI Paper component'i
            Form'u beyaz bir kart içinde gösterir
        ============================================ */}
        <Paper elevation={6} className={css.paper}>
          {/* ============================================
              HEADER - Başlık Bölümü
              ============================================ */}
          <Box className={css.header}>
            {/* İkon */}
            <LoginIcon className={css.icon} />

            {/* Başlık */}
            <Typography variant="h4" component="h1" className={css.title}>
              Welcome Back
            </Typography>

            {/* Alt Başlık */}
            <Typography variant="body1" className={css.subtitle}>
              Login to access your contacts
            </Typography>
          </Box>

          {/* ============================================
              LOGIN FORM
              ============================================
              LoginForm component'i burada render edilir
              Form: Email, Password alanları içerir
          ============================================ */}
          <LoginForm />

          {/* ============================================
              REGISTER LINK - Kayıt Sayfasına Yönlendirme
              ============================================
              Henüz hesabı olmayan kullanıcılar için
          ============================================ */}
          <Box className={css.footer}>
            <Typography variant="body2" className={css.footerText}>
              Don't have an account?{" "}
              <Link to="/register" className={css.link}>
                Register here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

// ============================================
// 📝 SAYFA YAPISI
// ============================================
// ┌──────────────────────────────────────┐
// │  [Icon] Welcome Back                │
// │  Login to access your contacts      │
// │                                      │
// │  Email: [___________________]       │
// │  Password: [___________________]    │
// │                                      │
// │  [Login]                            │
// │                                      │
// │  Don't have an account? Register    │
// └──────────────────────────────────────┘

// ============================================
// 🎯 RESTRICTED ROUTE
// ============================================
// Bu sayfa RestrictedRoute ile korunur (App.jsx içinde)
// Sadece giriş yapmamış kullanıcılar erişebilir
//
// Eğer kullanıcı zaten giriş yapmışsa:
// - RestrictedRoute onu /contacts'a yönlendirir
// - Login sayfasını görmez

// ============================================
// 🔄 FORM SUBMIT SONRASI
// ============================================
// LoginForm'da login başarılı olduğunda:
// 1. Backend'den user ve token gelir
// 2. Redux state güncellenir (isLoggedIn = true)
// 3. Token localStorage'a kaydedilir (redux-persist)
// 4. AppBar yeniden render edilir (AuthNav → UserMenu)
// 5. RestrictedRoute kontrol eder: isLoggedIn = true
// 6. Otomatik olarak /contacts'a yönlendirilir
// 7. ContactsPage'de useEffect çalışır: fetchContacts()
// 8. Kullanıcının kişileri yüklenir

// ============================================
// 🎨 REGISTRATION PAGE vs LOGIN PAGE
// ============================================
// İkisi de çok benzer yapıda, farkları:
//
// RegistrationPage:
// - "Create Account" başlığı
// - PersonAddIcon
// - RegistrationForm (Name, Email, Password)
// - "Already have an account? Login here"
//
// LoginPage:
// - "Welcome Back" başlığı
// - LoginIcon
// - LoginForm (Email, Password)
// - "Don't have an account? Register here"
