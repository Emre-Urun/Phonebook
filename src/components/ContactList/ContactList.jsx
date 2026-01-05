import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contacts/selectors.js";
import Contact from "../Contact/Contact.jsx";
import css from "./ContactList.module.css";
import { Box, Typography } from "@mui/material";

// ============================================
// CONTACT LIST COMPONENT - Kişi Listesi
// ============================================
// Filtrelenmiş kişileri listeler
// Her kişi için Contact component'i render eder
//
// Kullanım:
// - ContactsPage içinde render edilir
// - SearchBox ile filtreleme yapılır
// - selectFilteredContacts selector'ı kullanılır

export default function ContactList() {
  // Redux state'den filtrelenmiş kişileri al
  // selectFilteredContacts: contacts + nameFilter'a göre filtreleme yapar
  const visibleContacts = useSelector(selectFilteredContacts);

  // ============================================
  // BOŞ DURUM KONTROLÜ
  // ============================================
  // Eğer filtrelenmiş kişi yoksa boş mesaj göster
  // Bu durum iki şekilde olabilir:
  // 1. Hiç kişi yok (tüm liste boş)
  // 2. Filtre sonucu kişi bulunamadı
  if (visibleContacts.length === 0) {
    return (
      <Box className={css.emptyState}>
        <Typography variant="h6" className={css.emptyTitle}>
          No contacts found
        </Typography>
        <Typography variant="body2" className={css.emptyText}>
          {/* Filtre aktifse farklı mesaj göster */}
          Try adjusting your search filter
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={css.listContainer}>
      {/* ============================================
          CONTACT COUNT - Kişi Sayısı
          ============================================
          Kaç kişi gösterildiğini gösterir
      ============================================ */}
      <Typography variant="body2" className={css.contactCount}>
        {visibleContacts.length}{" "}
        {visibleContacts.length === 1 ? "contact" : "contacts"}
      </Typography>

      {/* ============================================
          CONTACT LIST - Kişi Kartları
          ============================================
          Her kişi için Contact component'i render eder
      ============================================ */}
      <Box className={css.list}>
        {visibleContacts.map((contact) => (
          <Contact key={contact.id} data={contact} />
        ))}
      </Box>
    </Box>
  );
}

// ============================================
// 📝 ESKİ vs YENİ CONTACTLIST
// ============================================
// Eski (7. modül):
// - <ul> ve <li> elementleri
// - Basit CSS stilleri
//
// Yeni (8. modül):
// - Material-UI Box ve Typography
// - Kişi sayısı gösterimi
// - Boş durum mesajı (filtreye göre)
// - Daha modern ve responsive tasarım
// - Grid layout yerine flex column (daha temiz görünüm)

// ============================================
// 🔍 SELECTFİLTEREDCONTACTS SELECTOR
// ============================================
// Bu selector contacts ve nameFilter'ı birleştirir:
//
// selectFilteredContacts = createSelector(
//   [selectContacts, selectNameFilter],
//   (contacts, nameFilter) => {
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(nameFilter.toLowerCase())
//     );
//   }
// );
//
// Örnek:
// - contacts = [{ name: "John Doe" }, { name: "Jane Smith" }]
// - nameFilter = "john"
// - visibleContacts = [{ name: "John Doe" }]

// ============================================
// 📊 BOŞ DURUM SENARYOLARı
// ============================================
// 1. Hiç kişi yok:
//    - visibleContacts = []
//    - nameFilter = ""
//    - Mesaj: "No contacts found"
//
// 2. Filtre sonucu kişi bulunamadı:
//    - visibleContacts = []
//    - nameFilter = "xyz"
//    - Mesaj: "No contacts found - Try adjusting your search filter"

// ============================================
// 🎯 KİŞİ SAYISI GÖSTERİMİ
// ============================================
// Singular vs Plural:
// - 1 kişi → "1 contact"
// - 2+ kişi → "5 contacts"
//
// {visibleContacts.length === 1 ? "contact" : "contacts"}

// ============================================
// 🔄 LİSTE RENDER AKIŞI
// ============================================
// 1. ContactsPage mount olur
//    ↓
// 2. useEffect: dispatch(fetchContacts())
//    ↓
// 3. Backend'den kişiler gelir
//    ↓
// 4. Redux: contacts.items = [...]
//    ↓
// 5. ContactList render olur
//    ↓
// 6. selectFilteredContacts çalışır
//    ↓
// 7. visibleContacts = filtrelenmiş liste
//    ↓
// 8. map ile her kişi için Contact render edilir
//
// Kullanıcı SearchBox'a bir şey yazdığında:
// 1. dispatch(changeFilter("john"))
//    ↓
// 2. Redux: filters.name = "john"
//    ↓
// 3. selectFilteredContacts yeniden hesaplanır
//    ↓
// 4. visibleContacts güncellenir
//    ↓
// 5. ContactList yeniden render
//    ↓
// 6. Sadece "john" içeren kişiler gösterilir
