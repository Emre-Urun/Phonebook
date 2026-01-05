import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations.js";
import css from "./Contact.module.css";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";
import { useState } from "react";

// ============================================
// CONTACT COMPONENT - Tekil Kişi Kartı
// ============================================
// Her bir kişiyi gösteren kart component'i
// ContactList içinde map ile render edilir
//
// Props:
// - data: { id, name, number }

export default function Contact({ data: { id, name, number } }) {
  // Redux dispatch (deleteContact action'ını çağırmak için)
  const dispatch = useDispatch();

  // Local loading state (delete butonu için)
  const [isDeleting, setIsDeleting] = useState(false);

  // ============================================
  // DELETE İŞLEMİ
  // ============================================
  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      // deleteContact operation'ını dispatch et
      await dispatch(deleteContact(id)).unwrap();

      // Başarılı silme bildirimi
      toast.success(`${name} removed from contacts`, {
        duration: 3000,
        icon: "🗑️",
      });
    } catch (error) {
      // Hata durumunda bildirim göster
      toast.error("Failed to delete contact. Please try again.", {
        duration: 4000,
      });
      setIsDeleting(false); // Hata varsa loading'i kapat
    }
    // Başarılı ise setIsDeleting(false) yapmaya gerek yok
    // Çünkü component unmount olacak (listeden silinecek)
  };

  return (
    <Card className={css.card}>
      <CardContent className={css.content}>
        {/* ============================================
            SOL TARAF - Kişi Bilgileri
            ============================================ */}
        <Box className={css.infoSection}>
          {/* İsim Satırı */}
          <Box className={css.infoRow}>
            <PersonIcon className={css.icon} />
            <Typography variant="h6" className={css.name}>
              {name}
            </Typography>
          </Box>

          {/* ============================================
              Telefon Numarası Satırı - tel: Link
              ============================================
              <a href="tel:123-456-7890"> yapısı:
              - Mobil cihazlarda: Arama uygulaması açılır
              - Desktop'ta: Skype, FaceTime vb. açılabilir
              - Kullanıcı deneyimini iyileştirir
          ============================================ */}
          <Box className={css.infoRow}>
            <PhoneIcon className={css.icon} />
            <a href={`tel:${number}`} className={css.phoneLink}>
              <Typography variant="body1" className={css.number}>
                {number}
              </Typography>
            </a>
          </Box>
        </Box>

        {/* ============================================
            SAĞ TARAF - Delete Butonu
            ============================================ */}
        <Box className={css.actionSection}>
          <Tooltip title="Delete contact" arrow>
            <IconButton
              onClick={handleDelete}
              disabled={isDeleting}
              className={css.deleteButton}
              size="large"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
}

// ============================================
// 📝 ESKİ vs YENİ CONTACT
// ============================================
// Eski (7. modül):
// - Basit div ve button
// - react-icons (FaUser, FaPhone)
// - Basit CSS stilleri
//
// Yeni (8. modül):
// - Material-UI Card component
// - Material-UI ikonlar (PersonIcon, PhoneIcon, DeleteIcon)
// - Tooltip (hover'da "Delete contact" mesajı)
// - tel: link (telefon numarasına tıklama)
// - Toast bildirimleri
// - Loading state (silme işlemi sırasında)
// - Daha modern ve responsive tasarım

// ============================================
// 📞 tel: LINK NASIL ÇALIŞIR?
// ============================================
// <a href="tel:123-456-7890">
//
// Mobil Cihazlarda:
// - iOS: Doğrudan arama yapar veya onay ister
// - Android: Telefon uygulaması açılır, numara otomatik yüklenir
//
// Desktop'ta:
// - Skype yüklüyse: Skype açılır
// - FaceTime (Mac): FaceTime açılır
// - Hiçbiri yoksa: Tarayıcıya göre davranış değişir
//
// Format:
// - Tüm formatlar çalışır: tel:1234567890, tel:(123) 456-7890, tel:+90 555 123 45 67
// - Boşluklar ve özel karakterler otomatik temizlenir

// ============================================
// 🔄 SİLME İŞLEMİ AKIŞI
// ============================================
// 1. Kullanıcı Delete butonuna tıklar
//    ↓
// 2. handleDelete çalışır
//    ↓
// 3. isDeleting = true (buton disabled olur)
//    ↓
// 4. dispatch(deleteContact(id))
//    ↓
// 5. Backend'e DELETE /contacts/:id
//    ↓
// 6. İki senaryo:
//    a) Başarılı:
//       - Backend: silinen kişiyi döner
//       - Redux state güncellenir: contacts.items.filter(item => item.id !== id)
//       - ContactList yeniden render → Kişi listeden kaybolur
//       - toast.success("[Name] removed 🗑️")
//       - Component unmount olur
//    b) Başarısız:
//       - toast.error("Failed to delete")
//       - isDeleting = false (buton tekrar aktif olur)

// ============================================
// 🎨 TOOLTIP KULLANIMI
// ============================================
// <Tooltip title="Delete contact" arrow>
//   <IconButton>...</IconButton>
// </Tooltip>
//
// - Hover yapıldığında "Delete contact" mesajı gösterilir
// - arrow: Ok işareti ekler (daha güzel görünüm)
// - Kullanıcı deneyimini iyileştirir (ne yapacağını anlar)
