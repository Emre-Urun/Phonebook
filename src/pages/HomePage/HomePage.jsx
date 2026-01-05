import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import css from "./HomePage.module.css";
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import ContactsIcon from "@mui/icons-material/Contacts";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import CloudIcon from "@mui/icons-material/Cloud";
import SecurityIcon from "@mui/icons-material/Security";

// ============================================
// HOMEPAGE - Ana Karşılama Sayfası
// ============================================
// Uygulamanın giriş sayfası
// Hem misafir hem de giriş yapmış kullanıcılara görünür
//
// İçerik (Kullanıcı durumuna göre değişir):
// - Misafir: Register ve Login butonları gösterilir
// - Giriş yapmış: Contacts sayfasına git butonu gösterilir

export default function HomePage() {
  // Redux state'den kullanıcının giriş durumunu al
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={css.homePage}>
      <Container maxWidth="lg" className={css.container}>
        {/* ============================================
            HERO SECTION - Ana Başlık ve Açıklama
            ============================================ */}
        <Box className={css.heroSection}>
          {/* Ana İkon */}
          <ContactsIcon className={css.heroIcon} />

          {/* Ana Başlık */}
          <Typography variant="h2" component="h1" className={css.title}>
            Welcome to Phonebook
          </Typography>

          {/* Açıklama Metni */}
          <Typography variant="h5" className={css.subtitle}>
            Manage your contacts easily and securely
          </Typography>

          {/* ============================================
              CTA BUTTONS - Call to Action (Kullanıcıya göre)
              ============================================ */}
          <Box className={css.ctaButtons}>
            {isLoggedIn ? (
              // ============================================
              // GİRİŞ YAPMIŞ KULLANICI
              // ============================================
              // Contacts sayfasına git butonu
              <Link to="/contacts" className={css.link}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ContactsIcon />}
                  className={css.primaryButton}
                >
                  Go to Contacts
                </Button>
              </Link>
            ) : (
              // ============================================
              // MİSAFİR KULLANICI
              // ============================================
              // Register ve Login butonları
              <>
                <Link to="/register" className={css.link}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<PersonAddIcon />}
                    className={css.primaryButton}
                  >
                    Get Started
                  </Button>
                </Link>

                <Link to="/login" className={css.link}>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<LoginIcon />}
                    className={css.secondaryButton}
                  >
                    Login
                  </Button>
                </Link>
              </>
            )}
          </Box>
        </Box>

        {/* ============================================
            FEATURES SECTION - Özellikler
            ============================================ */}
        <Box className={css.featuresSection}>
          <Typography variant="h4" className={css.featuresTitle}>
            Why Choose Our Phonebook?
          </Typography>

          <Box className={css.featuresGrid}>
            {/* Özellik 1: Kolay Kullanım */}
            <Card className={css.featureCard}>
              <CardContent>
                <PhoneAndroidIcon className={css.featureIcon} />
                <Typography variant="h6" className={css.featureTitle}>
                  Easy to Use
                </Typography>
                <Typography variant="body2" className={css.featureDescription}>
                  Simple and intuitive interface for managing your contacts with
                  just a few clicks
                </Typography>
              </CardContent>
            </Card>

            {/* Özellik 2: Cloud Storage */}
            <Card className={css.featureCard}>
              <CardContent>
                <CloudIcon className={css.featureIcon} />
                <Typography variant="h6" className={css.featureTitle}>
                  Cloud Storage
                </Typography>
                <Typography variant="body2" className={css.featureDescription}>
                  Access your contacts from anywhere, anytime. Your data is
                  always synchronized
                </Typography>
              </CardContent>
            </Card>

            {/* Özellik 3: Güvenlik */}
            <Card className={css.featureCard}>
              <CardContent>
                <SecurityIcon className={css.featureIcon} />
                <Typography variant="h6" className={css.featureTitle}>
                  Secure & Private
                </Typography>
                <Typography variant="body2" className={css.featureDescription}>
                  Your contacts are encrypted and protected. Only you can access
                  your data
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* ============================================
            FOOTER INFO - Alt Bilgi
            ============================================ */}
        <Box className={css.footerInfo}>
          <Typography variant="body2" className={css.footerText}>
            Start organizing your contacts today • Free and secure
          </Typography>
        </Box>
      </Container>
    </div>
  );
}

// ============================================
// 📝 SAYFA YAPISI
// ============================================
// ┌──────────────────────────────────────────┐
// │  [Icon] Welcome to Phonebook            │
// │  Manage your contacts easily            │
// │                                          │
// │  [Get Started]  [Login]  ← Misafir      │
// │  [Go to Contacts]        ← Giriş yapmış│
// │                                          │
// │  Why Choose Our Phonebook?              │
// │  ┌───────┐ ┌───────┐ ┌───────┐         │
// │  │ Easy  │ │ Cloud │ │Secure │         │
// │  └───────┘ └───────┘ └───────┘         │
// └──────────────────────────────────────────┘

// ============================================
// 🎯 KULLANICI DURUMLARINA GÖRE CTA
// ============================================
//
// Misafir Kullanıcı (isLoggedIn = false):
// - "Get Started" butonu → /register
// - "Login" butonu → /login
//
// Giriş Yapmış Kullanıcı (isLoggedIn = true):
// - "Go to Contacts" butonu → /contacts

// ============================================
// 🎨 MATERIAL-UI COMPONENT'LERİ
// ============================================
// - Container: İçeriği ortalar ve max-width belirler
// - Typography: Başlık ve metin stilleri
// - Button: CTA butonları
// - Card: Özellik kartları
// - Box: Layout düzenleyici
