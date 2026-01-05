import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations.js";
import css from "./LoginForm.module.css";
import { TextField, Button, Box } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import toast from "react-hot-toast";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

// ============================================
// VALIDATION SCHEMA - Formik için Yup Validasyonu
// ============================================
// Form alanlarının kurallarını belirler
const validationSchema = Yup.object().shape({
  // Email: Geçerli email formatı, zorunlu
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  // Password: Zorunlu (login'de minimum karakter kontrolü gereksiz)
  password: Yup.string().required("Password is required"),
});

// ============================================
// LOGIN FORM COMPONENT
// ============================================
export default function LoginForm() {
  // Redux dispatch (login action'ını çağırmak için)
  const dispatch = useDispatch();

  // Local loading state (buton loading için)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ============================================
  // FORM SUBMIT - Giriş İşlemi
  // ============================================
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsSubmitting(true);

    try {
      // Login operation'ını dispatch et
      // values = { email: "...", password: "..." }
      const result = await dispatch(logIn(values)).unwrap();

      // Başarılı giriş bildirimi
      toast.success(`Welcome back, ${result.user.name}! 👋`, {
        duration: 3000,
        icon: "✅",
      });

      // Form'u sıfırla
      resetForm();
    } catch (error) {
      // Hata durumunda bildirim göster
      // Örnek hatalar:
      // - Email veya şifre yanlış
      // - Backend server'a ulaşılamıyor
      // - Hesap bulunamadı
      toast.error(
        error === "Request failed with status code 400" ||
          error === "Request failed with status code 401"
          ? "Invalid email or password"
          : "Login failed. Please try again.",
        {
          duration: 4000,
        }
      );
    } finally {
      setSubmitting(false);
      setIsSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting: formikSubmitting }) => (
        <Form className={css.form}>
          {/* ============================================
              EMAIL FIELD - Email Alanı
              ============================================ */}
          <Box className={css.fieldWrapper}>
            <EmailIcon className={css.fieldIcon} />
            <Field name="email">
              {({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="email"
                  label="Email"
                  variant="outlined"
                  placeholder="Enter your email"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  className={css.textField}
                  disabled={isSubmitting}
                  autoComplete="email"
                />
              )}
            </Field>
          </Box>

          {/* ============================================
              PASSWORD FIELD - Şifre Alanı
              ============================================ */}
          <Box className={css.fieldWrapper}>
            <LockIcon className={css.fieldIcon} />
            <Field name="password">
              {({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="password"
                  label="Password"
                  variant="outlined"
                  placeholder="Enter your password"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  className={css.textField}
                  disabled={isSubmitting}
                  autoComplete="current-password"
                />
              )}
            </Field>
          </Box>

          {/* ============================================
              SUBMIT BUTTON - Giriş Butonu
              ============================================ */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={isSubmitting || formikSubmitting}
            className={css.submitButton}
          >
            {isSubmitting ? (
              <Box className={css.loadingBox}>
                <ClipLoader color="#ffffff" size={20} />
                <span style={{ marginLeft: "12px" }}>Logging in...</span>
              </Box>
            ) : (
              "Login"
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

// ============================================
// 📝 REGISTRATION FORM vs LOGIN FORM
// ============================================
// İki form da çok benzer yapıda, farkları:
//
// RegistrationForm:
// - 3 field: Name, Email, Password
// - Password: 6-50 karakter validasyonu
// - dispatch(register())
// - Toast: "Welcome [Name]! Your account has been created 🎉"
//
// LoginForm:
// - 2 field: Email, Password
// - Password: Sadece zorunlu (karakter kontrolü yok)
// - dispatch(logIn())
// - Toast: "Welcome back, [Name]! 👋"

// ============================================
// 🔄 GİRİŞ İŞLEMİ AKIŞI
// ============================================
// 1. Kullanıcı email ve password girer
//    ↓
// 2. Her field'da Yup validasyonu çalışır (onChange)
//    ↓
// 3. Login butonuna tıklar
//    ↓
// 4. handleSubmit çalışır
//    ↓
// 5. dispatch(logIn({ email, password }))
//    ↓
// 6. Backend'e POST /users/login
//    ↓
// 7. İki senaryo:
//    a) Başarılı:
//       - Backend: { user, token } döner
//       - Redux state güncellenir (isLoggedIn = true)
//       - Token localStorage'a kaydedilir (redux-persist)
//       - toast.success("Welcome back!")
//       - RestrictedRoute kontrol eder → /contacts'a yönlendir
//       - ContactsPage açılır → fetchContacts() çalışır
//    b) Başarısız:
//       - Backend: 400 veya 401 hatası
//       - toast.error("Invalid email or password")
//       - Form sıfırlanmaz, kullanıcı düzeltebilir

// ============================================
// 🎨 autoComplete ATTRIBUTE
// ============================================
// autoComplete="email": Tarayıcı email'i hatırlar
// autoComplete="current-password": Tarayıcı şifreyi hatırlar
// Bu, kullanıcı deneyimini iyileştirir (otomatik doldurma)

// ============================================
// 🔐 GÜVENLİK NOTLARI
// ============================================
// 1. Şifre frontend'de asla kaydedilmez
// 2. Backend'e sadece POST isteğinde gönderilir
// 3. Token localStorage'da saklanır (redux-persist)
// 4. Token her istekte Authorization header'ında gönderilir
// 5. Logout sonrası token temizlenir

// ============================================
// 📊 HATA YÖNETİMİ
// ============================================
// 400 Bad Request: Email formatı yanlış veya eksik alan
// 401 Unauthorized: Email veya şifre yanlış
// 500 Server Error: Backend hatası
// Network Error: İnternet bağlantısı yok
