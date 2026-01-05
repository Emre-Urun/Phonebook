import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/operations.js";
import { selectUser } from "../../redux/auth/selectors.js";
import css from "./UserMenu.module.css";
import { Button, Avatar, Box, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import toast from "react-hot-toast";

// ============================================
// USERMENU - Kullanıcı Menüsü Component'i
// ============================================
// AppBar'ın sağ tarafında görünen kullanıcı bilgileri ve logout butonu
// Sadece giriş yapmış kullanıcılara görünür
//
// İçerik:
// 1. Avatar (Kullanıcı ikonu veya profil resmi)
// 2. Kullanıcı Adı (user.name)
// 3. Logout Butonu
//
// Kullanım (AppBar.jsx içinde):
// {isLoggedIn ? <UserMenu /> : <AuthNav />}
//                   ↑
//            Giriş yapmışsa UserMenu göster

export default function UserMenu() {
  // Redux dispatch (action'ları çağırmak için)
  const dispatch = useDispatch();

  // Redux state'den kullanıcı bilgilerini al
  const user = useSelector(selectUser);

  // ============================================
  // LOGOUT İŞLEMİ
  // ============================================
  // Kullanıcı logout butonuna tıkladığında çalışır
  // 1. Backend'e logout isteği gönderilir (token iptal edilir)
  // 2. Redux state temizlenir (user, token, isLoggedIn = false)
  // 3. Contacts listesi temizlenir (logOut.fulfilled → contacts slice)
  // 4. Kullanıcı /login sayfasına yönlendirilir (RestrictedRoute sayesinde)
  const handleLogout = async () => {
    try {
      // Logout operation'ını dispatch et
      await dispatch(logOut()).unwrap();

      // Başarılı logout bildirimi
      toast.success("Successfully logged out! See you soon! 👋", {
        duration: 3000,
        icon: "✅",
      });
    } catch (error) {
      // Hata durumunda bildirim göster
      toast.error("Logout failed. Please try again.", {
        duration: 4000,
      });
    }
  };

  // ============================================
  // KULLANICI ADININ İLK HARFİ (Avatar için)
  // ============================================
  // Avatar içinde kullanıcı adının ilk harfini gösteririz
  // Örnek: "John Doe" → "J"
  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className={css.userMenu}>
      {/* ============================================
          KULLANICI BİLGİSİ BÖLÜMÜ
          ============================================
          Avatar + Kullanıcı Adı
      ============================================ */}
      <Box className={css.userInfo}>
        {/* Avatar (Kullanıcı ikonu veya ilk harf) */}
        <Avatar className={css.avatar}>
          {userInitial}
          {/* Alternatif: PersonIcon kullanabilirsiniz */}
          {/* <PersonIcon /> */}
        </Avatar>

        {/* Kullanıcı Adı */}
        <Typography variant="body1" className={css.userName}>
          {user.name}
        </Typography>
      </Box>

      {/* ============================================
          LOGOUT BUTONU
          ============================================
          Kullanıcı çıkış yapmak için tıklar
      ============================================ */}
      <Button
        variant="outlined"
        color="error"
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
        className={css.logoutButton}
      >
        Logout
      </Button>
    </div>
  );
}

// ============================================
// 📝 GÖRÜNÜM
// ============================================
// ┌─────────────────────────────────┐
// │  [J] John Doe    [Logout]       │  ← AppBar'ın sağ tarafı
// └─────────────────────────────────┘

// ============================================
// 🎯 LOGOUT AKIŞI
// ============================================
// 1. Kullanıcı Logout butonuna tıklar
//    ↓
// 2. handleLogout() fonksiyonu çalışır
//    ↓
// 3. dispatch(logOut()) → Backend'e POST /users/logout
//    ↓
// 4. Backend token'ı iptal eder (blacklist)
//    ↓
// 5. Redux state temizlenir:
//    - auth: { user: null, token: null, isLoggedIn: false }
//    - contacts: { items: [] } (logOut.fulfilled case'i)
//    ↓
// 6. AppBar yeniden render edilir:
//    - isLoggedIn = false
//    - UserMenu gizlenir, AuthNav görünür
//    ↓
// 7. React Router kontrol eder:
//    - Kullanıcı /contacts sayfasındaysa
//    - PrivateRoute görür: isLoggedIn = false
//    - /login'e yönlendirir
//    ↓
// 8. Toast bildirimi gösterilir: "Successfully logged out!"

// ============================================
// 🔄 REDUX DISPATCH - unwrap() NEDİR?
// ============================================
// dispatch(logOut()).unwrap()
//
// unwrap(): AsyncThunk'un sonucunu Promise olarak döndürür
// - Başarılı ise: fulfilled payload'ını döndürür
// - Hata varsa: rejected payload'ı throw eder
//
// Böylece try-catch ile başarı/hata durumlarını yakalayabiliriz:
// try {
//   await dispatch(logOut()).unwrap(); // Başarılı
//   toast.success("Logout successful!");
// } catch (error) {
//   toast.error("Logout failed!"); // Hata
// }

// ============================================
// 🎨 AVATAR İÇİN ALTERNATİFLER
// ============================================
// 1. Kullanıcı adının ilk harfi (şu anki):
//    <Avatar>{userInitial}</Avatar> → "J"
//
// 2. Person ikonu:
//    <Avatar><PersonIcon /></Avatar>
//
// 3. Profil resmi (eğer backend'den geliyorsa):
//    <Avatar src={user.avatarUrl} alt={user.name} />
//
// 4. Renk kombinasyonu (kullanıcıya özel):
//    function stringToColor(string) {
//      let hash = 0;
//      for (let i = 0; i < string.length; i++) {
//        hash = string.charCodeAt(i) + ((hash << 5) - hash);
//      }
//      return `hsl(${hash % 360}, 70%, 50%)`;
//    }
//    <Avatar sx={{ bgcolor: stringToColor(user.name) }}>
