import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      console.log(JSON.stringify([...state.items]));
      const item = [...state.items].find(
        (item) => item.id === action.payload.id
      );

      const new_array = item
        ? [...state.items].map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }:item
          )
        : [...state.items, action.payload];

      state.items = new_array;
    },
    removeOneFromBasket: (state, action) => {
      console.log(JSON.stringify([...state.items]));
      const item = [...state.items].find(
        (item) => item.id === action.payload.id
      );

      const new_array = item
        ? [...state.items].map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity - 1 }:item
          )
        : [...state.items, action.payload];

      state.items = new_array;
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(`Cant remove ${action.payload.id}.`);
      }

      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket,removeOneFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.price * item.quantity, 0);
export default basketSlice.reducer;
