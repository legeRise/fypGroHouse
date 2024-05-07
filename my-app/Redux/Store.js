import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
export const Store =configureStore({
reducer :{
  CartSlice,
},
});


// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./CartSlice"; // Assuming you export the reducer as default from CartSlice.js

// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//   },
// });

// export default store;

