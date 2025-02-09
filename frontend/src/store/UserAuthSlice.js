import { createSlice } from "@reduxjs/toolkit";

const initialState = { userData: null };

const userslice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.userData = action.payload;
    },
    logout(state) {
      state.userData = null;
    },
  },
});

export const { login, logout } = userslice.actions;
export default userslice.reducer;
