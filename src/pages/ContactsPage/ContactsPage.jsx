import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../redux/contacts/operations.js";
import {
  selectLoading,
  selectError,
  selectHasContacts,
} from "../../redux/contacts/selectors.js";
import ContactForm from "../../components/ContactForm/ContactForm.jsx";
import SearchBox from "../../components/SearchBox/SearchBox.jsx";
import ContactList from "../../components/ContactList/ContactList.jsx";
import css from "./ContactsPage.module.css";
import {
  Container,
  Typography,
  Box,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import ContactsIcon from "@mui/icons-material/Contacts";

// ============================================
// CONTACTS PAGE - Kişiler Sayfası
// ============================================
// Kullanıcının kişilerini görüntüleyip yönetebileceği ana sayfa
// PrivateRoute ile korunur (sadece giriş yapmış kullanıcılara açık)
//
// İçerik:
// 1. Başlık ve açıklama
// 2. ContactForm (Yeni kişi ekle)
// 3. SearchBox (Kişileri ara)
// 4. ContactList (Kişi listesi)
// 5. Loading ve Error durumları

export default function ContactsPage() {
  // Redux dispatch (action'ları çağırmak için)
  const dispatch = useDispatch();

  // Redux state'den verileri al
  const loading = useSelector(selectLoading); // Yükleniyor mu?
  const error = useSelector(selectError); // Hata var mı?
  const hasContacts = useSelector(selectHasContacts); // En az 1 kişi var mı?

  // ============================================
  // CONTACTS FETCH - Sayfa İlk Açıldığında
  // ============================================
  // useEffect: Component mount olduğunda (sayfa açıldığında) çalışır
  // fetchContacts: Backend'den kullanıcının kişilerini çeker
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.contactsPage}>
      <Container maxWidth="lg" className={css.container}>
        {/* ============================================
            HEADER - Başlık Bölümü
            ============================================ */}
        <Box className={css.header}>
          <ContactsIcon className={css.headerIcon} />
          <Typography variant="h3" component="h1" className={css.title}>
            My Contacts
          </Typography>
          <Typography variant="body1" className={css.subtitle}>
            Manage and organize your contacts
          </Typography>
        </Box>

        {/* ============================================
            ERROR ALERT - Hata Mesajı
            ============================================
            Backend'den hata gelirse gösterilir
            Örnek: Network hatası, server hatası
        ============================================ */}
        {error && (
          <Alert severity="error" className={css.alert}>
            {error}
          </Alert>
        )}

        {/* ============================================
            MAIN CONTENT - İki Sütunlu Layout
            ============================================
            Sol: ContactForm (Yeni kişi ekle)
            Sağ: SearchBox + ContactList
        ============================================ */}
        <Box className={css.mainContent}>
          {/* ============================================
              SOL SÜTUN - Contact Form
              ============================================ */}
          <Paper elevation={3} className={css.formSection}>
            <Typography variant="h5" className={css.sectionTitle}>
              Add New Contact
            </Typography>
            <ContactForm />
          </Paper>

          {/* ============================================
              SAĞ SÜTUN - Search & Contact List
              ============================================ */}
          <Box className={css.listSection}>
            {/* SearchBox - Kişileri Ara */}
            <Paper elevation={3} className={css.searchSection}>
              <SearchBox />
            </Paper>

            {/* ============================================
                LOADING STATE - Yüklenme Durumu
                ============================================
                Backend'den kişiler yüklenirken gösterilir
            ============================================ */}
            {loading && (
              <Box className={css.loadingContainer}>
                <CircularProgress size={60} className={css.loader} />
                <Typography variant="body1" className={css.loadingText}>
                  Loading your contacts...
                </Typography>
              </Box>
            )}

            {/* ============================================
                CONTACT LIST - Kişi Listesi
                ============================================
                Loading bitmişse ve hata yoksa gösterilir
            ============================================ */}
            {!loading && !error && (
              <Paper elevation={3} className={css.contactListSection}>
                {hasContacts ? (
                  // Kişi varsa listele
                  <ContactList />
                ) : (
                  // Kişi yoksa boş mesaj göster
                  <Box className={css.emptyState}>
                    <ContactsIcon className={css.emptyIcon} />
                    <Typography variant="h6" className={css.emptyTitle}>
                      No contacts yet
                    </Typography>
                    <Typography variant="body2" className={css.emptyText}>
                      Add your first contact using the form on the left
                    </Typography>
                  </Box>
                )}
              </Paper>
            )}
          </Box>
        </Box>
      </Container>
    </div>
  );
}

// ============================================
// 📝 SAYFA YAPISI
// ============================================
// ┌────────────────────────────────────────────────────┐
// │  [Icon] My Contacts                               │
// │  Manage and organize your contacts                │
// │                                                    │
// │  ┌─────────────────┐  ┌──────────────────────┐  │
// │  │ Add New Contact │  │ Search: [_________]  │  │
// │  │                 │  │                      │  │
// │  │ Name: [______]  │  │ ┌─────────────────┐ │  │
// │  │ Number: [____]  │  │ │ John Doe        │ │  │
// │  │                 │  │ │ 123-456-7890    │ │  │
// │  │ [Add Contact]   │  │ ├─────────────────┤ │  │
// │  │                 │  │ │ Jane Smith      │ │  │
// │  └─────────────────┘  │ │ 098-765-4321    │ │  │
// │                        │ └─────────────────┘ │  │
// └────────────────────────────────────────────────────┘

// ============================================
// 🎯 PRIVATE ROUTE
// ============================================
// Bu sayfa PrivateRoute ile korunur (App.jsx içinde)
// Sadece giriş yapmış kullanıcılar erişebilir
//
// Eğer kullanıcı giriş yapmamışsa:
// - PrivateRoute onu /login'e yönlendirir

// ============================================
// 🔄 SAYFA AÇILMA AKIŞI
// ============================================
// 1. Kullanıcı /contacts'a gider
//    ↓
// 2. PrivateRoute kontrol eder: isLoggedIn = true ✅
//    ↓
// 3. ContactsPage mount olur
//    ↓
// 4. useEffect çalışır
//    ↓
// 5. dispatch(fetchContacts())
//    ↓
// 6. Backend'e GET /contacts (token ile)
//    ↓
// 7. Backend kullanıcının kişilerini döner
//    ↓
// 8. Redux state güncellenir: contacts.items = [...]
//    ↓
// 9. ContactList yeniden render: Kişiler gösterilir

// ============================================
// 📊 DURUM YÖNETİMİ
// ============================================
// loading = true:
//   → CircularProgress göster
//
// loading = false + error = null + hasContacts = true:
//   → ContactList göster
//
// loading = false + error = null + hasContacts = false:
//   → "No contacts yet" mesajı göster
//
// error !== null:
//   → Alert göster (kırmızı hata mesajı)

// ============================================
// 🎨 RESPONSIVE LAYOUT
// ============================================
// Desktop (>768px):
//   - İki sütunlu layout (Sol: Form, Sağ: List)
//
// Mobil (≤768px):
//   - Tek sütun (Form üstte, List altta)
