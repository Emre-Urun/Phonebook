// ============================================
// FILTERS SELECTORS
// ============================================
// Redux state'inden filter bilgilerini çekmek için kullanılan fonksiyonlar

// ============================================
// 1. selectNameFilter - Arama Metnini Getir
// ============================================
// SearchBox'ta kullanıcının yazdığı arama metnini döndürür
// Kullanım Yerleri:
// - SearchBox: Input value için
// - ContactList: Kişileri filtrelemek için (selectFilteredContacts ile birlikte)
//
// Örnek:
// const filter = useSelector(selectNameFilter); // "john"
export const selectNameFilter = (state) => state.filters.name;

// ============================================
// 2. selectIsFiltering - Filtre Aktif mi?
// ============================================
// Kullanıcı arama yapıyor mu kontrol eder
// true: Kullanıcı bir şeyler yazmış (filtre aktif)
// false: Arama kutusu boş (tüm kişiler gösteriliyor)
//
// Kullanım: "Filtreleme aktif" mesajı göstermek için
// Örnek: {isFiltering && <Chip label={`"${filter}" araması aktif`} />}
export const selectIsFiltering = (state) => state.filters.name.length > 0;

// ============================================
// 3. selectFilterLength - Filtre Uzunluğu
// ============================================
// Arama metninin kaç karakter olduğunu döndürür
// Kullanım: Minimum karakter uyarısı göstermek için
// Örnek: {filterLength > 0 && filterLength < 3 && <p>En az 3 karakter girin</p>}
export const selectFilterLength = (state) => state.filters.name.length;
