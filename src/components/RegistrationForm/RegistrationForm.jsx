import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations.js";
import css from "./RegistrationForm.module.css";
import { TextField, Button, Box } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
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
  // Name: 3-50 karakter arası, zorunlu
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),

  // Email: Geçerli email formatı, zorunlu
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  // Password: 6-50 karakter arası, zorunlu
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be less than 50 characters")
    .required("Password is required"),
});

// ============================================
// REGISTRATION FORM COMPONENT
// ============================================
export default function RegistrationForm() {
  // Redux dispatch (register action'ını çağırmak için)
  const dispatch = useDispatch();

  // Local loading state (buton loading için)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ============================================
  // FORM SUBMIT - Kayıt İşlemi
  // ============================================
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsSubmitting(true);

    try {
      // Register operation'ını dispatch et
      // values = { name: "...", email: "...", password: "..." }
      await dispatch(register(values)).unwrap();

      // Başarılı kayıt bildirimi
      toast.success(
        `Welcome ${values.name}! Your account has been created 🎉`,
        {
          duration: 4000,
          icon: "✅",
        }
      );

      // Form'u sıfırla
      resetForm();
    } catch (error) {
      // Hata durumunda bildirim göster
      // Örnek hatalar:
      // - Email zaten kullanılıyor
      // - Backend server'a ulaşılamıyor
      toast.error(
        error === "Request failed with status code 400"
          ? "This email is already registered"
          : "Registration failed. Please try again.",
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
        name: "",
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting: formikSubmitting }) => (
        <Form className={css.form}>
          {/* ============================================
              NAME FIELD - İsim Alanı
              ============================================ */}
          <Box className={css.fieldWrapper}>
            <PersonIcon className={css.fieldIcon} />
            <Field name="name">
              {({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Name"
                  variant="outlined"
                  placeholder="Enter your name"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  className={css.textField}
                  disabled={isSubmitting}
                />
              )}
            </Field>
          </Box>

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
                />
              )}
            </Field>
          </Box>

          {/* ============================================
              SUBMIT BUTTON - Kayıt Butonu
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
                <span style={{ marginLeft: "12px" }}>Creating account...</span>
              </Box>
            ) : (
              "Register"
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

// ============================================
// 📝 FORMIK NASIL ÇALIŞIR?
// ============================================
// 1. initialValues: Form başlangıç değerleri (boş string'ler)
// 2. validationSchema: Yup ile validasyon kuralları
// 3. onSubmit: Form submit olduğunda çalışır
//
// Field component'i:
// - name prop'u ile form field'ını belirtir
// - Otomatik olarak value, onChange, onBlur'u yönetir
//
// errors: Validasyon hataları { name: "...", email: "..." }
// touched: Kullanıcı field'a dokundu mu? { name: true, email: false }

// ============================================
// 🔄 KAYIT İŞLEMİ AKIŞI
// ============================================
// 1. Kullanıcı formu doldurur
//    ↓
// 2. Her field'da Yup validasyonu çalışır (onChange)
//    ↓
// 3. Register butonuna tıklar
//    ↓
// 4. handleSubmit çalışır
//    ↓
// 5. dispatch(register(values))
//    ↓
// 6. Backend'e POST /users/signup
//    ↓
// 7. İki senaryo:
//    a) Başarılı:
//       - Backend: { user, token } döner
//       - Redux state güncellenir
//       - toast.success("Welcome!")
//       - RestrictedRoute → /contacts'a yönlendir
//    b) Başarısız:
//       - toast.error("Email already registered")
//       - Form sıfırlanmaz, kullanıcı düzeltebilir

// ============================================
// 🎨 MATERIAL-UI TEXTFIELD
// ============================================
// TextField component'i:
// - variant="outlined": Çerçeveli input
// - error={Boolean}: Hata varsa kırmızı border
// - helperText: Hata mesajı veya yardım metni
// - fullWidth: Input'u genişliğe sığdır
