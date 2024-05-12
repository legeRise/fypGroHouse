import { createSlice } from "@reduxjs/toolkit";



const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, actions) => {
      const isAvailable = state.find(
        (value) => value.name == actions.payload.name
      );
      if (isAvailable) {
        actions.payload["quantity"] += 1;
      } else {
        state.push({ ...actions.payload, quantity: 1 });
      }
    },
    addManyToCart: (state, actions) => {
      actions.payload.forEach((item) => {
        const isAvailable = state.find((value) => value.name === item.name);
        if (isAvailable) {
          isAvailable.quantity += item.quantity;
        } else {
          state.push({ ...item, quantity: item.quantity });
        }
      });
    },
    removeFromCart: (state, actions) => {
      const newList = state.filter(
        (value) => value.name != actions.payload.name
      );
      return (state = newList);
    },
    incrementQuantity: (state, actions) => {
      const isAvailable = state.find(
        (value) => value.name == actions.payload.name
      );
      if (isAvailable) {
        isAvailable.quantity ++;
      } else {
        console.log("not available");
      }
    },
    decrementQuantity: (state, actions) => {
      const isAvailable = state.find(
        (value) => value.name == actions.payload.name
      );
      if (isAvailable.quantity == 1) {
        isAvailable.quantity = 1;
      } else {
        isAvailable.quantity--;
      }
    },

    clearCart: (state) => {
      return [];
    },

  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;


