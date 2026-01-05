import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage kullanır

// Reducer'ları import et
import { authReducer } from "./auth/slice.js";
import contactsReducer from "./contacts/slice.js";
import filtersReducer from "./filters/slice.js";

// ============================================
// REDUX PERSIST CONFIGURATION
// ============================================
// Auth state'ini localStorage'da saklamak için konfigürasyon
// Sayfa yenilendiğinde token kaybolmaz, kullanıcı giriş yapmış olarak kalır

const authPersistConfig = {
  key: "auth", // localStorage'da hangi key ile saklanacak
  storage, // localStorage kullan
  whitelist: ["token"], // Sadece token'ı sakla (user ve isLoggedIn saklanmaz)
  // whitelist: Sadece belirtilen alanlar localStorage'a kaydedilir
  // token dışındaki alanlar (user, isLoggedIn, isRefreshing) her seferinde API'den gelir
};

// ============================================
// STORE CONFIGURATION
// ============================================
// Redux store'u oluştur ve persist özelliğini ekle
export const store = configureStore({
  reducer: {
    // auth: Auth reducer'ını persist ile sar (token localStorage'a kaydedilecek)
    auth: persistReducer(authPersistConfig, authReducer),

    // contacts: Normal reducer (localStorage'a kaydedilmez)
    // Çünkü kişiler backend'den her seferinde çekilecek
    contacts: contactsReducer,

    // filters: Normal reducer (localStorage'a kaydedilmez)
    // Çünkü arama filtreleri geçici, sayfa yenilendiğinde sıfırlanmalı
    filters: filtersReducer,
  },

  // ============================================
  // MIDDLEWARE CONFIGURATION
  // ============================================
  // Redux Persist'in kendi action'larını ignore et
  // Yoksa console'da warning görünür
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Redux Persist action'larını kontrol etme (hata vermez)
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// ============================================
// PERSISTOR
// ============================================
// Store'u persist et (localStorage ile senkronize et)
// Bu, main.jsx'de PersistGate ile kullanılacak
export const persistor = persistStore(store);

// ============================================
// 📝 AÇIKLAMALAR
// ============================================
// 1. NEDEN SADECE TOKEN PERSIST EDİLİYOR?
//    - Token: Her istekte gerekli, localStorage'da saklanmalı
//    - User: refreshUser ile API'den her seferinde güncel çekilir
//    - isLoggedIn: Token varsa otomatik true olur
//    - isRefreshing: Geçici bir durum, saklanmasına gerek yok

// 2. PERSIST NASIL ÇALIŞIR?
//    - Kullanıcı giriş yapar → Token Redux state'e kaydedilir
//    - Redux Persist token'ı localStorage'a yazar
//    - Sayfa yenilenir → Token localStorage'dan okunur
//    - refreshUser çalışır → Token ile kullanıcı bilgileri API'den çekilir
//    - Kullanıcı otomatik giriş yapmış olur

// 3. CONTACTS VE FILTERS NEDEN PERSIST EDİLMİYOR?
//    - Contacts: Backend'den her seferinde çekilmeli (güncel olmak için)
//    - Filters: Arama geçici, sayfa yenilendiğinde temiz başlamalı

// 4. MIDDLEWARE NEDEN GEREKLİ?
//    - Redux Persist bazı non-serializable action'lar dispatch eder
//    - serializableCheck bu action'ları ignore eder (console warning'i önler)
