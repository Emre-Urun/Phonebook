import { createSlice } from "@reduxjs/toolkit";
import { register, logIn, logOut, refreshUser } from "./operations.js";

// Auth slice'ının başlangıç state'i
// user: Kullanıcı bilgileri (name, email)
// token: JWT authentication token'ı
// isLoggedIn: Kullanıcı giriş yapmış mı?
// isRefreshing: Token ile kullanıcı yenilenirken mi? (sayfa yenilendiğinde)
const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  // extraReducers: Asenkron işlemlerin (register, login vb.) sonuçlarını dinler
  extraReducers: (builder) => {
    builder
      // ============================================
      // REGISTER (Kayıt) İşlemleri
      // ============================================
      .addCase(register.fulfilled, (state, action) => {
        // Kayıt başarılı olduğunda:
        // - Kullanıcı bilgilerini state'e kaydet
        // - Token'ı kaydet
        // - Kullanıcıyı giriş yapmış olarak işaretle
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(register.pending, (state) => {
        // Kayıt işlemi devam ederken loading gösterilebilir (opsiyonel)
      })
      .addCase(register.rejected, (state) => {
        // Kayıt başarısız olduğunda state değişmez
      })

      // ============================================
      // LOGIN (Giriş) İşlemleri
      // ============================================
      .addCase(logIn.fulfilled, (state, action) => {
        // Giriş başarılı olduğunda:
        // - Kullanıcı bilgilerini state'e kaydet
        // - Token'ı kaydet
        // - Kullanıcıyı giriş yapmış olarak işaretle
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logIn.pending, (state) => {
        // Giriş işlemi devam ederken
      })
      .addCase(logIn.rejected, (state) => {
        // Giriş başarısız olduğunda
      })

      // ============================================
      // LOGOUT (Çıkış) İşlemleri
      // ============================================
      .addCase(logOut.fulfilled, (state) => {
        // Çıkış yapıldığında state'i başlangıç haline döndür
        // Tüm kullanıcı bilgileri silinir
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(logOut.pending, (state) => {
        // Çıkış işlemi devam ederken
      })
      .addCase(logOut.rejected, (state) => {
        // Çıkış başarısız olsa bile local state'i temizle
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })

      // ============================================
      // REFRESH USER (Kullanıcıyı Yenileme) İşlemleri
      // ============================================
      // Sayfa yenilendiğinde veya uygulama açıldığında
      // token varsa kullanıcı bilgilerini API'den çeker
      .addCase(refreshUser.pending, (state) => {
        // Yenileme işlemi başladığında
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        // Token geçerliyse kullanıcı bilgilerini güncelle
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        // Token geçersizse veya hata varsa
        // Kullanıcıyı logout et
        state.isRefreshing = false;
      });
  },
});

// Reducer'ı export et (store.js'de kullanılacak)
export const authReducer = authSlice.reducer;
