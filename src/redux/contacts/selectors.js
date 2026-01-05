import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter } from "../filters/selectors.js";

// ============================================
// CONTACTS SELECTORS
// ============================================
// Redux state'inden contacts verilerini çekmek için kullanılan fonksiyonlar

// ============================================
// 1. selectContacts - Tüm Kişileri Getir
// ============================================
// Kullanıcının tüm kişi listesini döndürür
// Kullanım: ContactList, ContactForm vb.
export const selectContacts = (state) => state.contacts.items;

// ============================================
// 2. selectLoading - Yükleniyor mu?
// ============================================
// API isteği devam ederken true döner
// Kullanım: Loading spinner göstermek için
// Örnek: {loading && <CircularProgress />}
export const selectLoading = (state) => state.contacts.loading;

// ============================================
// 3. selectError - Hata Mesajı
// ============================================
// API isteği başarısız olduğunda hata mesajını döndürür
// Kullanım: Hata mesajı göstermek için
// Örnek: {error && <Alert severity="error">{error}</Alert>}
export const selectError = (state) => state.contacts.error;

// ============================================
// 4. selectFilteredContacts - Filtrelenmiş Kişiler
// ============================================
// createSelector: Memoization ile performans optimizasyonu sağlar
// Sadece contacts veya nameFilter değiştiğinde yeniden hesaplanır
//
// ÖRNEKLERİ:
// - Kullanıcı "john" yazarsa → Sadece "john" içeren kişiler gösterilir
// - Kullanıcı "" (boş) bırakırsa → Tüm kişiler gösterilir
// - Büyük/küçük harf duyarlı değil (toLowerCase kullanılıyor)
//
// Kullanım: ContactList bileşeninde
export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter], // Girdiler (inputs)
  (contacts, nameFilter) => {
    // Hesaplama: Filtreleme mantığı

    // Eğer filtre boşsa, tüm kişileri döndür
    if (!nameFilter) {
      return contacts;
    }

    // Filtre varsa, kişi adını filtre ile karşılaştır
    // toLowerCase: Büyük/küçük harf duyarsız arama
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }
);

// ============================================
// 5. selectContactsCount - Toplam Kişi Sayısı
// ============================================
// Kullanıcının toplam kaç kişisi olduğunu döndürür
// Kullanım: İstatistik göstermek için
// Örnek: "Toplam 15 kişi"
export const selectContactsCount = (state) => state.contacts.items.length;

// ============================================
// 6. selectHasContacts - Kişi Var mı?
// ============================================
// Kullanıcının en az bir kişisi var mı kontrol eder
// true: En az 1 kişi var
// false: Hiç kişi yok
// Kullanım: Boş liste mesajı göstermek için
// Örnek: {!hasContacts && <p>Henüz kişi eklemediniz</p>}
export const selectHasContacts = (state) => state.contacts.items.length > 0;
