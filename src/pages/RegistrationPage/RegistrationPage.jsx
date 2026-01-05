import RegistrationForm from "../../components/RegistrationForm/RegistrationForm.jsx";
import css from "./RegistrationPage.module.css";
import { Container, Typography, Box, Paper } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Link } from "react-router-dom";

// ============================================
// REGISTRATION PAGE - Kayıt Sayfası
// ============================================
// Yeni kullanıcıların hesap oluşturması için sayfa
// RestrictedRoute ile korunur (sadece misafirlere açık)
//
// İçerik:
// 1. Başlık ve açıklama
// 2. RegistrationForm component'i
// 3. Login sayfasına yönlendirme linki

export default function RegistrationPage() {
  return (
    <div className={css.registrationPage}>
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
            <PersonAddIcon className={css.icon} />

            {/* Başlık */}
            <Typography variant="h4" component="h1" className={css.title}>
              Create Account
            </Typography>

            {/* Alt Başlık */}
            <Typography variant="body1" className={css.subtitle}>
              Join us and start managing your contacts
            </Typography>
          </Box>

          {/* ============================================
              REGISTRATION FORM
              ============================================
              RegistrationForm component'i burada render edilir
              Form: Name, Email, Password alanları içerir
          ============================================ */}
          <RegistrationForm />

          {/* ============================================
              LOGIN LINK - Giriş Sayfasına Yönlendirme
              ============================================
              Zaten hesabı olan kullanıcılar için
          ============================================ */}
          <Box className={css.footer}>
            <Typography variant="body2" className={css.footerText}>
              Already have an account?{" "}
              <Link to="/login" className={css.link}>
                Login here
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
// │  [Icon] Create Account              │
// │  Join us and start managing...      │
// │                                      │
// │  Name: [___________________]        │
// │  Email: [___________________]       │
// │  Password: [___________________]    │
// │                                      │
// │  [Register]                         │
// │                                      │
// │  Already have an account? Login     │
// └──────────────────────────────────────┘

// ============================================
// 🎯 RESTRICTED ROUTE
// ============================================
// Bu sayfa RestrictedRoute ile korunur (App.jsx içinde)
// Sadece giriş yapmamış kullanıcılar erişebilir
//
// Eğer kullanıcı zaten giriş yapmışsa:
// - RestrictedRoute onu /contacts'a yönlendirir
// - Registration sayfasını görmez

// ============================================
// 🔄 FORM SUBMIT SONRASI
// ============================================
// RegistrationForm'da register başarılı olduğunda:
// 1. Backend'den user ve token gelir
// 2. Redux state güncellenir (isLoggedIn = true)
// 3. AppBar yeniden render edilir (AuthNav → UserMenu)
// 4. RestrictedRoute kontrol eder: isLoggedIn = true
// 5. Otomatik olarak /contacts'a yönlendirilir
