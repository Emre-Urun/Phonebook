import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API'nin base URL'ini ayarla
// Bu backend JWT authentication ve contact işlemlerini destekliyor
axios.defaults.baseURL = "https://connections-api.goit.global";

// ============================================
// YARDIMCI FONKSİYON: Token'ı Header'a Ekle
// ============================================
// Her authentication gerektiren istekte Authorization header'ına token eklenir
// Örnek: Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// ============================================
// YARDIMCI FONKSİYON: Token'ı Header'dan Kaldır
// ============================================
// Logout olduğunda Authorization header'ını temizler
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

// ============================================
// 1. REGISTER - Yeni Kullanıcı Kaydı
// ============================================
// Kullanıcı kayıt formu ile yeni hesap oluşturur
// Backend'e name, email, password gönderilir
// Başarılı olursa: user bilgileri ve token döner
export const register = createAsyncThunk(
  "auth/register", // Action type (Redux DevTools'da görünür)
  async (credentials, thunkAPI) => {
    try {
      // POST isteği: /users/signup endpoint'ine credentials gönder
      // credentials = { name: "John", email: "john@mail.com", password: "123456" }
      const response = await axios.post("/users/signup", credentials);

      // Backend'den dönen token'ı axios header'ına ekle
      // Böylece sonraki tüm isteklerde otomatik olarak token gönderilir
      setAuthHeader(response.data.token);

      // Başarılı kayıt sonrası user ve token bilgilerini döndür
      return response.data;
    } catch (error) {
      // Hata durumunda: hata mesajını Redux state'ine gönder
      // thunkAPI.rejectWithValue ile rejected action'ına payload gönderilir
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ============================================
// 2. LOGIN - Mevcut Kullanıcı Girişi
// ============================================
// Kullanıcı login formu ile giriş yapar
// Backend'e email ve password gönderilir
export const logIn = createAsyncThunk(
  "auth/login", // Action type
  async (credentials, thunkAPI) => {
    try {
      // POST isteği: /users/login endpoint'ine credentials gönder
      // credentials = { email: "john@mail.com", password: "123456" }
      const response = await axios.post("/users/login", credentials);

      // Login başarılı olursa token'ı header'a ekle
      setAuthHeader(response.data.token);

      // User ve token bilgilerini döndür
      return response.data;
    } catch (error) {
      // Hata: Yanlış şifre, kullanıcı bulunamadı vb.
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ============================================
// 3. LOGOUT - Kullanıcı Çıkışı
// ============================================
// Kullanıcı logout butonuna tıkladığında çalışır
// Backend'e logout isteği gönderilir ve token iptal edilir
export const logOut = createAsyncThunk(
  "auth/logout", // Action type
  async (_, thunkAPI) => {
    try {
      // POST isteği: /users/logout endpoint'ine istek gönder
      // Backend token'ı blacklist'e ekler (artık geçersiz olur)
      await axios.post("/users/logout");

      // Axios header'ından token'ı kaldır
      clearAuthHeader();

      // Logout işlemi başarılı, Redux state temizlenecek
    } catch (error) {
      // Logout başarısız olsa bile local state'i temizle
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ============================================
// 4. REFRESH USER - Kullanıcıyı Token ile Yenile
// ============================================
// Sayfa yenilendiğinde veya uygulama açıldığında çalışır
// Redux persist ile kaydedilen token'ı kullanarak kullanıcı bilgilerini çeker
// Eğer token geçerliyse kullanıcı otomatik olarak giriş yapmış sayılır
export const refreshUser = createAsyncThunk(
  "auth/refresh", // Action type
  async (_, thunkAPI) => {
    // Redux state'inden mevcut token'ı al
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    // Eğer token yoksa, refresh yapma
    // Kullanıcı daha önce hiç giriş yapmamış demektir
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      // Token'ı header'a ekle
      setAuthHeader(persistedToken);

      // GET isteği: /users/current endpoint'ine token ile istek at
      // Backend token'ı kontrol eder ve kullanıcı bilgilerini döner
      const response = await axios.get("/users/current");

      // Kullanıcı bilgilerini döndür (name, email)
      return response.data;
    } catch (error) {
      // Token geçersizse veya süresi dolmuşsa hata döner
      // Kullanıcı logout edilir
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
