import { createSlice } from "@reduxjs/toolkit";


const favouriteSlice = createSlice({
  name: "favourite",
  initialState: [],
  reducers: 
  {

    addToFavourites: (state, actions) => {
      state.push({ ...actions.payload})
    },
   
    removeFromFavourites: (state, actions) => {
      const newList = state.filter(
        (value) => value.name != actions.payload.name
      );
      return (state = newList);
    },
    
  },
});

export const {
  addToFavourites,
  removeFromFavourites,
} = favouriteSlice.actions;

export default favouriteSlice.reducer;


