import { createSlice } from "@reduxjs/toolkit";

const getBasketFromStorage = () => {
  if (localStorage.getItem("basket")) {
    return JSON.parse(localStorage.getItem("basket"));
  }
  return [];
};

const initialState = {
  products: getBasketFromStorage(),
  drawer: false,
  totalAmount: 0,
};

const saveToStorageFromBasket = (basket) => {
  localStorage.setItem("basket", JSON.stringify(basket));
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const findProduct =
        state.products &&
        state.products.find((product) => product.id === action.payload.id);
      if (findProduct) {
        const extractedProducts = state.products.filter(
          (product) => product.id != action.payload.id
        );
        findProduct.count += action.payload.count;
        state.products = [...extractedProducts, findProduct];
        saveToStorageFromBasket(state.products);
      } else {
        state.products = [...state.products, action.payload];
        saveToStorageFromBasket(state.products);
      }
    },
    setDrawer: (state) => {
      state.drawer = !state.drawer;
    },

    calculateBasket: (state) => {
      state.totalAmount = 0;
      state.products &&
        state.products.map((product) => {
          state.totalAmount += product.price * product.count;
        });
    },

    removeFromBasket: (state, action) => {
      const idToRemove = action.payload;
      state.products = state.products.filter(
        (product) => product.id !== idToRemove
      );
      localStorage.setItem("basket", JSON.stringify(state.products));
    },
  },
});

export const { addToBasket, setDrawer, calculateBasket, removeFromBasket } =
  basketSlice.actions;

export default basketSlice.reducer;
