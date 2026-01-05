import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "modern-normalize/modern-normalize.css";
import App from "./components/App.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// ============================================
// REACT ROOT RENDER
// ============================================
// Uygulamanın başlangıç noktası
// Tüm provider'lar burada sarılır

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* ============================================
        PROVIDER - Redux Store'u Tüm Uygulamaya Sağlar
        ============================================ */}
    <Provider store={store}>
      {/* ============================================
          PERSISTGATE - localStorage Senkronizasyonu
          ============================================
          loading={null}: localStorage okunurken gösterilecek component
          persistor: Redux persist store'u
          
          ÖNEMLİ: Bu component sayfa yenilendiğinde şunları yapar:
          1. localStorage'dan token'ı okur
          2. Token varsa Redux state'e yazar
          3. App component'i render edilir
          4. App içinde refreshUser çalışır ve kullanıcı otomatik giriş yapar
      ============================================ */}
      <PersistGate loading={null} persistor={persistor}>
        {/* ============================================
            BROWSERROUTER - React Router için Gerekli
            ============================================
            Tüm Route ve Link component'lerinin çalışması için
            en üstte sarılmalıdır
        ============================================ */}
        <BrowserRouter>
          {/* Ana Uygulama Component'i */}
          <App />

          {/* ============================================
              TOASTER - React Hot Toast Bildirimleri
              ============================================
              Add, Delete, Login, Register işlemlerinde
              başarı/hata mesajları gösterir
              
              Position: Bildirimlerin ekranda nerede görüneceği
              toastOptions: Genel ayarlar (süre, stil vb.)
          ============================================ */}
          <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              // Default options
              duration: 3000,
              style: {
                background: "#363636",
                color: "#fff",
                padding: "16px",
                borderRadius: "8px",
              },
              // Success bildirimleri
              success: {
                duration: 3000,
                iconTheme: {
                  primary: "#4caf50",
                  secondary: "#fff",
                },
              },
              // Error bildirimleri
              error: {
                duration: 4000,
                iconTheme: {
                  primary: "#f44336",
                  secondary: "#fff",
                },
              },
            }}
          />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);

// ============================================
// 📝 PROVIDER SARMA SIRASI ÖNEMLİ!
// ============================================
// 1. StrictMode (en dış)
// 2. Provider (Redux)
// 3. PersistGate (Redux Persist)
// 4. BrowserRouter (React Router)
// 5. App (Ana component)
//
// Neden bu sıra?
// - Provider: Redux state'i tüm app'e sağlar
// - PersistGate: localStorage'dan veriyi okur, Provider'dan sonra olmalı
// - BrowserRouter: Route'lar için gerekli, içeride Route kullanacağız
// - App: Tüm provider'lar hazır olduktan sonra render edilir

// ============================================
// 🔔 TOASTER KULLANIMI (Component'lerde)
// ============================================
// import toast from "react-hot-toast";
//
// // Başarı mesajı
// toast.success("Kişi başarıyla eklendi!");
//
// // Hata mesajı
// toast.error("Bir hata oluştu!");
//
// // Bilgi mesajı
// toast("Bilgi mesajı", { icon: "ℹ️" });
//
// // Promise ile kullanım (API isteği sırasında)
// toast.promise(
//   apiCall(),
//   {
//     loading: "Yükleniyor...",
//     success: "Başarılı!",
//     error: "Hata oluştu!"
//   }
// );
