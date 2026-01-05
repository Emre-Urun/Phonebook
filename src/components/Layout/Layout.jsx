import AppBar from "../AppBar/AppBar.jsx";
import css from "./Layout.module.css";

// ============================================
// LAYOUT - Ana Sayfa Düzeni Component'i
// ============================================
// Tüm sayfaları sarar ve ortak yapıyı sağlar
// Her sayfada görünen AppBar burada render edilir
//
// Kullanım (App.jsx içinde):
// <Route element={<Layout />}>
//   <Route path="/" element={<HomePage />} />
//   <Route path="/contacts" element={<ContactsPage />} />
//   ...
// </Route>
//
// children: React Router'ın Outlet component'inden gelen içerik
// Yani: HomePage, ContactsPage, LoginPage vb. burada render edilir

export default function Layout({ children }) {
  return (
    <div className={css.layout}>
      {/* ============================================
          APPBAR - Üst Navigasyon Çubuğu
          ============================================
          Her sayfada görünür
          İçinde: Logo, Navigation, AuthNav/UserMenu
      ============================================ */}
      <AppBar />

      {/* ============================================
          MAIN - Sayfa İçeriği
          ============================================
          Her sayfanın kendine özgü içeriği burada render edilir
          Örnek: HomePage, ContactsPage, LoginPage vb.
      ============================================ */}
      <main className={css.main}>{children}</main>

      {/* ============================================
          FOOTER - Alt Bilgi (Opsiyonel)
          ============================================
          İsterseniz buraya footer ekleyebilirsiniz
          Örnek: Copyright, İletişim, Sosyal Medya vb.
      ============================================ */}
      {/* <footer className={css.footer}>
        <p>© 2026 Phonebook App</p>
      </footer> */}
    </div>
  );
}

// ============================================
// 📝 LAYOUT YAPISI
// ============================================
// ┌────────────────────────────────────────┐
// │ AppBar (Logo, Navigation, UserMenu)    │
// ├────────────────────────────────────────┤
// │                                        │
// │  Main Content (children)               │
// │  - HomePage                            │
// │  - ContactsPage                        │
// │  - LoginPage                           │
// │  - RegistrationPage                    │
// │                                        │
// ├────────────────────────────────────────┤
// │ Footer (Opsiyonel)                     │
// └────────────────────────────────────────┘

// ============================================
// 🎯 NEDEN LAYOUT COMPONENT'İ?
// ============================================
// 1. Code Reusability (Kod Tekrarını Önler):
//    - AppBar'ı her sayfada tekrar yazmaya gerek yok
//    - Footer eklemek isterseniz tek yerden yaparsınız
//
// 2. Consistent Design (Tutarlı Tasarım):
//    - Tüm sayfalar aynı düzende
//    - AppBar her zaman en üstte
//    - Main content her zaman ortada
//
// 3. Easy Maintenance (Kolay Bakım):
//    - AppBar'da değişiklik yapmak isterseniz
//    - Tek bir yerde değiştirirsiniz
//    - Tüm sayfalara otomatik yansır
