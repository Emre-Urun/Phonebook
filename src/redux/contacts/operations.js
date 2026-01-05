import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ============================================
// ⚠️ ÖNEMLİ: BASE URL KALDIRILDI
// ============================================
// axios.defaults.baseURL artık auth/operations.js'de tanımlı
// Orası: https://connections-api.goit.global
// Burada tekrar tanımlamaya gerek yok!

// ============================================
// 1. FETCH CONTACTS - Kullanıcının Kişilerini Getir
// ============================================
// Backend'den giriş yapmış kullanıcının tüm kişilerini çeker
// GET isteği: /contacts
// Token otomatik olarak header'a eklenir (setAuthHeader sayesinde)
export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll", // Action type (Redux DevTools'da görünür)
  async (_, thunkAPI) => {
    try {
      // GET isteği: Backend'den kullanıcının kişi listesini al
      const response = await axios.get("/contacts");

      // Başarılı: Kişi listesini döndür
      // response.data = [{ id: "1", name: "John", number: "123" }, ...]
      return response.data;
    } catch (error) {
      // Hata durumunda: Network hatası, token geçersiz vb.
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ============================================
// 2. ADD CONTACT - Yeni Kişi Ekle
// ============================================
// Backend'e yeni kişi ekler
// POST isteği: /contacts
// Body: { name: "John Doe", number: "1234567890" }
export const addContact = createAsyncThunk(
  "contacts/addContact", // Action type
  async (newContact, thunkAPI) => {
    try {
      // POST isteği: Yeni kişiyi backend'e gönder
      // newContact = { name: "John Doe", number: "1234567890" }
      const response = await axios.post("/contacts", newContact);

      // Başarılı: Backend'den dönen yeni kişiyi döndür
      // Backend otomatik olarak ID oluşturur
      // response.data = { id: "abc123", name: "John Doe", number: "1234567890" }
      return response.data;
    } catch (error) {
      // Hata: Aynı isimde kişi var, network hatası vb.
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ============================================
// 3. DELETE CONTACT - Kişi Sil
// ============================================
// Backend'den kişi siler
// DELETE isteği: /contacts/:contactId
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact", // Action type
  async (contactId, thunkAPI) => {
    try {
      // DELETE isteği: Belirli bir kişiyi sil
      // contactId = "abc123"
      const response = await axios.delete(`/contacts/${contactId}`);

      // Başarılı: Silinen kişinin bilgilerini döndür
      // response.data = { id: "abc123", name: "John Doe", number: "..." }
      return response.data;
    } catch (error) {
      // Hata: Kişi bulunamadı, network hatası vb.
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ============================================
// 📝 NOTLAR
// ============================================
// 1. Token Yönetimi:
//    - Login/Register sonrası setAuthHeader() ile token eklenir
//    - Tüm isteklerde otomatik olarak Authorization header'ı gönderilir
//    - Logout sonrası clearAuthHeader() ile token temizlenir

// 2. Backend Endpoints:
//    - GET    /contacts        → Tüm kişileri getir
//    - POST   /contacts        → Yeni kişi ekle
//    - DELETE /contacts/:id    → Kişi sil

// 3. Hata Yönetimi:
//    - Network hatası → "Network Error"
//    - 401 Unauthorized → Token geçersiz/süresi dolmuş
//    - 400 Bad Request → Geçersiz veri (örn: boş isim)
//    - 404 Not Found → Kişi bulunamadı
