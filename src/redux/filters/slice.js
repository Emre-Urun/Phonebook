import { createSlice } from "@reduxjs/toolkit";

// ============================================
// FILTERS SLICE
// ============================================
// SearchBox bileşeninde kullanıcının yazdığı arama metnini tutar
// name: Kullanıcının arama kutusuna yazdığı metin
// Örnek: "john" yazarsa, sadece "john" içeren kişiler gösterilir

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    name: "", // Başlangıçta boş string (filtre yok)
  },
  reducers: {
    // ============================================
    // changeFilter - Arama Metnini Güncelle
    // ============================================
    // SearchBox'ta kullanıcı her harf yazdığında bu action çağrılır
    // Örnek kullanım:
    // dispatch(changeFilter("john"))
    changeFilter: (state, action) => {
      state.name = action.payload; // Yeni filtre metnini state'e kaydet
    },
  },
});

// Action creator'ı export et (SearchBox bileşeninde kullanılacak)
export const { changeFilter } = filterSlice.actions;

// Reducer'ı export et (store.js'de kullanılacak)
export default filterSlice.reducer;
