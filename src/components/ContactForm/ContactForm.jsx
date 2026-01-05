import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contacts/operations.js";
import { selectContacts } from "../../redux/contacts/selectors.js";
import css from "./ContactForm.module.css";
import { TextField, Button, Box } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import toast from "react-hot-toast";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

// ============================================
// VALIDATION SCHEMA - Formik için Yup Validasyonu
// ============================================
const validationSchema = Yup.object().shape({
  // Name: 3-50 karakter arası, zorunlu
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),

  // Number: 3-50 karakter arası, zorunlu
  number: Yup.string()
    .min(3, "Number must be at least 3 characters")
    .max(50, "Number must be less than 50 characters")
    .required("Number is required"),
});

// ============================================
// CONTACT FORM COMPONENT
// ============================================
export default function ContactForm() {
  // Redux dispatch (addContact action'ını çağırmak için)
  const dispatch = useDispatch();

  // Mevcut kişi listesi (duplicate kontrolü için)
  const contacts = useSelector(selectContacts);

  // Local loading state (buton loading için)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ============================================
  // FORM SUBMIT - Kişi Ekleme İşlemi
  // ============================================
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // ============================================
    // DUPLICATE KONTROLÜ - Aynı isimde kişi var mı?
    // ============================================
    // Backend duplicate kontrolü yapmıyor, bu yüzden frontend'de kontrol ediyoruz
    const isDuplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === values.name.toLowerCase()
    );

    if (isDuplicate) {
      toast.error(`${values.name} is already in your contacts!`, {
        duration: 3000,
      });
      setSubmitting(false);
      return; // İşlemi durdur, backend'e istek gönderme
    }

    setIsSubmitting(true);

    try {
      // addContact operation'ını dispatch et
      // values = { name: "...", number: "..." }
      await dispatch(addContact(values)).unwrap();

      // Başarılı ekleme bildirimi
      toast.success(`${values.name} added to contacts! 📞`, {
        duration: 3000,
        icon: "✅",
      });

      // Form'u sıfırla
      resetForm();
    } catch (error) {
      // Hata durumunda bildirim göster
      toast.error("Failed to add contact. Please try again.", {
        duration: 4000,
      });
    } finally {
      setSubmitting(false);
      setIsSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        number: "",
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
                  placeholder="Enter contact name"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  className={css.textField}
                  disabled={isSubmitting}
                />
              )}
            </Field>
          </Box>

          {/* ============================================
              NUMBER FIELD - Telefon Numarası Alanı
              ============================================ */}
          <Box className={css.fieldWrapper}>
            <PhoneIcon className={css.fieldIcon} />
            <Field name="number">
              {({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Number"
                  variant="outlined"
                  placeholder="Enter phone number"
                  error={touched.number && Boolean(errors.number)}
                  helperText={touched.number && errors.number}
                  className={css.textField}
                  disabled={isSubmitting}
                />
              )}
            </Field>
          </Box>

          {/* ============================================
              SUBMIT BUTTON - Ekle Butonu
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
                <span style={{ marginLeft: "12px" }}>Adding contact...</span>
              </Box>
            ) : (
              "Add Contact"
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

// ============================================
// 📝 ESKİ vs YENİ CONTACTFORM
// ============================================
// Eski (7. modül):
// - Basit HTML input'lar
// - CSS module stilleri
// - useId hook'u ile manuel id yönetimi
//
// Yeni (8. modül):
// - Material-UI TextField
// - İkonlar (PersonIcon, PhoneIcon)
// - ClipLoader ile loading durumu
// - Toast bildirimleri
// - Duplicate kontrolü
// - Daha modern ve responsive tasarım

// ============================================
// 🔄 KİŞİ EKLEME AKIŞI
// ============================================
// 1. Kullanıcı name ve number girer
//    ↓
// 2. Her field'da Yup validasyonu çalışır (onChange)
//    ↓
// 3. Add Contact butonuna tıklar
//    ↓
// 4. handleSubmit çalışır
//    ↓
// 5. Duplicate kontrolü:
//    - Aynı isimde kişi varsa → toast.error, işlem durur
//    - Yoksa → devam et
//    ↓
// 6. dispatch(addContact({ name, number }))
//    ↓
// 7. Backend'e POST /contacts
//    ↓
// 8. İki senaryo:
//    a) Başarılı:
//       - Backend: yeni kişiyi döner (id ile)
//       - Redux state güncellenir: contacts.items.push(newContact)
//       - ContactList yeniden render → Yeni kişi listelenir
//       - toast.success("[Name] added to contacts! 📞")
//       - Form sıfırlanır
//    b) Başarısız:
//       - toast.error("Failed to add contact")
//       - Form sıfırlanmaz

// ============================================
// 🎯 DUPLICATE KONTROLÜ
// ============================================
// Backend duplicate kontrolü yapmadığı için frontend'de kontrol ediyoruz
// Bu, kullanıcı deneyimini iyileştirir (aynı kişiyi tekrar ekleyemez)
//
// const isDuplicate = contacts.some(
//   (contact) => contact.name.toLowerCase() === values.name.toLowerCase()
// );
//
// toLowerCase(): Büyük/küçük harf duyarsız karşılaştırma
// Örnek: "John Doe" ve "john doe" aynı kabul edilir

// ============================================
// 📞 TELEFON NUMARASI FORMATI
// ============================================
// Backend herhangi bir format kabul ediyor:
// - 123-456-7890 ✅
// - (123) 456-7890 ✅
// - 1234567890 ✅
// - +90 555 123 45 67 ✅
//
// Bu yüzden sadece "3-50 karakter" validasyonu yapıyoruz
// İsterseniz daha spesifik regex validasyonu ekleyebilirsiniz
