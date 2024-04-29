import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { productCount: 0, products: [] , changed : false},
  reducers: {
    replaceCart(state, action) {
      state.productCount = action.payload.productCount;
      state.products = action.payload.products;
    },
    addItemsToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.products.find(
        (item) => item.id === newItem.id
      );
      state.productCount++;
      state.changed = true;
      if (!existingItem) {
        state.products.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemsToCart(state, action) {
      const id = action.payload;
      const existingItem = state.products.find((item) => item.id === id);
      state.productCount--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.products = state.products.find((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});



export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
