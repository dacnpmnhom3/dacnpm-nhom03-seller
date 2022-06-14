import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategory: {
    label: "",
    value: "",
    product_variations: [],
    properties: [],
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      console.log(action.payload);
    },
  },
});

export const { setSelectedCategory } = productSlice.actions;
export default productSlice.reducer;
