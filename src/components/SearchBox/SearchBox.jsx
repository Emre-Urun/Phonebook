import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filters/slice.js";
import { selectNameFilter } from "../../redux/filters/selectors.js";
import css from "./SearchBox.module.css";
import { TextField, InputAdornment, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

// ============================================
// SEARCHBOX COMPONENT - Kişi Arama Kutusu
// ============================================
// Kullanıcının kişileri filtrelemesini sağlar
// Redux state'deki filters.name değerini günceller
//
// Kullanım:
// - ContactsPage içinde render edilir
// - selectFilteredContacts selector'ı bu filtre ile çalışır

export default function SearchBox() {
  // Redux dispatch (changeFilter action'ını çağırmak için)
  const dispatch = useDispatch();

  // Redux state'den mevcut filtre değerini al
  const filter = useSelector(selectNameFilter);

  // ============================================
  // INPUT CHANGE - Filtre Güncelleme
  // ============================================
  // Kullanıcı her karakter yazdığında çalışır
  const handleFilterChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  // ============================================
  // CLEAR BUTTON - Filtreyi Temizle
  // ============================================
  // "X" butonuna tıklandığında çalışır
  // Filtre değerini boş string yapar
  const handleClear = () => {
    dispatch(changeFilter(""));
  };

  return (
    <Box className={css.searchContainer}>
      {/* ============================================
          MATERIAL-UI TEXTFIELD - Arama Input'u
          ============================================
          InputAdornment: Input içinde ikon gösterimi
          - startAdornment: Sol tarafta ikon (SearchIcon)
          - endAdornment: Sağ tarafta ikon (ClearIcon - sadece değer varsa)
      ============================================ */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search contacts by name..."
        value={filter}
        onChange={handleFilterChange}
        className={css.searchField}
        InputProps={{
          // ============================================
          // SOL TARAF İKONU - Search Icon
          // ============================================
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className={css.searchIcon} />
            </InputAdornment>
          ),

          // ============================================
          // SAĞ TARAF İKONU - Clear Button (X)
          // ============================================
          // Sadece filter değeri varsa göster
          endAdornment: filter && (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClear}
                edge="end"
                size="small"
                className={css.clearButton}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

// ============================================
// 📝 ESKİ vs YENİ SEARCHBOX
// ============================================
// Eski (7. modül):
// - Basit input elementi
// - <p> tag'i ile label
// - Basit CSS stilleri
//
// Yeni (8. modül):
// - Material-UI TextField
// - Search ikonu (sol tarafta)
// - Clear butonu (sağ tarafta - sadece değer varsa)
// - InputAdornment ile ikon yerleştirme
// - Daha modern ve kullanıcı dostu tasarım
// - Placeholder metni

// ============================================
// 🔍 NASIL ÇALIŞIR?
// ============================================
// 1. Kullanıcı input'a "john" yazar
//    ↓
// 2. handleFilterChange çalışır
//    ↓
// 3. dispatch(changeFilter("john"))
//    ↓
// 4. Redux: filters.name = "john"
//    ↓
// 5. selectFilteredContacts yeniden hesaplanır
//    ↓
// 6. ContactList yeniden render
//    ↓
// 7. Sadece "john" içeren kişiler gösterilir
//
// Kullanıcı "X" butonuna tıklarsa:
// 1. handleClear çalışır
//    ↓
// 2. dispatch(changeFilter(""))
//    ↓
// 3. Redux: filters.name = ""
//    ↓
// 4. selectFilteredContacts tüm kişileri döndürür
//    ↓
// 5. ContactList yeniden render
//    ↓
// 6. Tüm kişiler gösterilir

// ============================================
// 🎨 INPUT ADORNMENT
// ============================================
// InputAdornment: Input içinde ikon/buton yerleştirme
//
// startAdornment (Sol taraf):
// - SearchIcon gösterilir
// - Her zaman görünür
// - Kullanıcıya "buraya arama yap" mesajı verir
//
// endAdornment (Sağ taraf):
// - ClearIcon (X butonu)
// - Sadece filter değeri varsa görünür
// - Tıklandığında filtre temizlenir
// - Kullanıcı deneyimini iyileştirir (hızlı temizleme)

// ============================================
// 🎯 CLEAR BUTTON KOŞULu
// ============================================
// {filter && ( ... )}
//
// filter = "" (boş) → Clear butonu GÖSTERİLMEZ
// filter = "john" → Clear butonu GÖSTERİLİR
//
// Bu, kullanıcı deneyimini iyileştirir:
// - Boşken X butonu gereksiz
// - Değer varken X butonu ile hızlıca temizleme
