import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, deleteContact, addContact } from "./operations.js";
import { logOut } from "../auth/operations.js";

// ============================================
// CONTACTS SLICE
// ============================================
// Kişi listesi state'ini yönetir
// items: Kişi listesi array'i
// loading: API isteği devam ederken true
// error: Hata mesajı (varsa)

const phonebook = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // ============================================
      // FETCH CONTACTS - Kişileri Backend'den Getir
      // ============================================
      .addCase(fetchContacts.fulfilled, (state, action) => {
        // API'den kişiler başarıyla geldiğinde
        state.loading = false;
        state.items = action.payload; // Kişi listesini state'e kaydet
      })
      .addCase(fetchContacts.pending, (state) => {
        // API isteği devam ederken
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        // API isteği başarısız olduğunda
        state.loading = false;
        state.error = action.payload; // Hata mesajını state'e kaydet
      })

      // ============================================
      // ADD CONTACT - Yeni Kişi Ekle
      // ============================================
      .addCase(addContact.fulfilled, (state, action) => {
        // Yeni kişi başarıyla eklendığinde
        state.loading = false;
        state.items.push(action.payload); // Yeni kişiyi listeye ekle
      })
      .addCase(addContact.pending, (state) => {
        // Ekleme işlemi devam ederken
        state.loading = true;
        state.error = null;
      })
      .addCase(addContact.rejected, (state, action) => {
        // Ekleme başarısız olduğunda
        state.loading = false;
        state.error = action.payload;
      })

      // ============================================
      // DELETE CONTACT - Kişi Sil
      // ============================================
      .addCase(deleteContact.fulfilled, (state, action) => {
        // Kişi başarıyla silindiğinde
        state.loading = false;
        // Silinen kişiyi listeden çıkar
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(deleteContact.pending, (state) => {
        // Silme işlemi devam ederken
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        // Silme başarısız olduğunda
        state.loading = false;
        state.error = action.payload;
      })

      // ============================================
      // LOGOUT - Çıkış Yapıldığında Kişileri Temizle
      // ============================================
      // Kullanıcı logout yaptığında kişi listesini temizle
      // Böylece yeni kullanıcı giriş yaptığında eski kişileri görmez
      .addCase(logOut.fulfilled, (state) => {
        state.items = []; // Kişi listesini boşalt
        state.error = null; // Hataları temizle
        state.loading = false; // Loading'i kapat
      });
  },
});

// ============================================
// ⭐ ARTIK SELECTOR'LAR KALDIRILDI
// ============================================
// Selector'lar artık src/redux/contacts/selectors.js dosyasında
// Orada şunlar tanımlı:
// - selectContacts
// - selectLoading
// - selectError
// - selectFilteredContacts
// - selectContactsCount
// - selectHasContacts

// Reducer'ı export et (store.js'de kullanılacak)
export default phonebook.reducer;
