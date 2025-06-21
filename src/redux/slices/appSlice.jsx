import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  searchTerm: "",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setSearchTerm } = appSlice.actions;

export default appSlice.reducer;
