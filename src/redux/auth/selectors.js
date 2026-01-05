// ============================================
// AUTH SELECTORS
// ============================================
// Selectors: Redux state'inden belirli verileri çekmek için kullanılan fonksiyonlar
// useSelector hook'u ile component'lerde kullanılır
// Örnek: const isLoggedIn = useSelector(selectIsLoggedIn);

// ============================================
// 1. selectIsLoggedIn - Kullanıcı Giriş Yapmış mı?
// ============================================
// Kullanıcının giriş yapıp yapmadığını kontrol eder
// true: Kullanıcı giriş yapmış
// false: Kullanıcı giriş yapmamış (guest)
// Kullanım Yeri: Navigation, AppBar, PrivateRoute, RestrictedRoute
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

// ============================================
// 2. selectUser - Kullanıcı Bilgilerini Getir
// ============================================
// Giriş yapmış kullanıcının bilgilerini döndürür
// { name: "John Doe", email: "john@mail.com" }
// Kullanım Yeri: UserMenu (kullanıcı adını göstermek için)
export const selectUser = (state) => state.auth.user;

// ============================================
// 3. selectIsRefreshing - Kullanıcı Yenileniyor mu?
// ============================================
// Sayfa yenilendiğinde token ile kullanıcı yenilenirken true döner
// Bu süre boyunca loading gösterilebilir
// Kullanım Yeri: App.jsx (uygulama ilk açıldığında)
export const selectIsRefreshing = (state) => state.auth.isRefreshing;

// ============================================
// 4. selectUserName - Sadece Kullanıcı Adını Getir
// ============================================
// Kullanıcının sadece adını döndürür (email'e ihtiyaç yoksa)
// Kullanım Yeri: UserMenu, Header, Hoşgeldiniz mesajları
export const selectUserName = (state) => state.auth.user.name;

// ============================================
// 5. selectUserEmail - Sadece Kullanıcı Email'ini Getir
// ============================================
// Kullanıcının sadece email'ini döndürür
// Kullanım Yeri: Profil sayfası, ayarlar
export const selectUserEmail = (state) => state.auth.user.email;
