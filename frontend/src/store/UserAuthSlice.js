import { createSlice } from "@reduxjs/toolkit";

const localData = JSON.parse(localStorage.getItem("userData")) || null;
const localStatus = JSON.parse(localStorage.getItem("status")) || false;

const initialState = { userData: localData, status: localStatus };

const userslice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.userData = action.payload;
      state.status = true;
      localStorage.setItem("userData", JSON.stringify(action.payload));
      localStorage.setItem("status", true);
    },
    logout(state) {
      state.userData = null;
      state.status = false;
      localStorage.removeItem("userData");
      localStorage.setItem("status", false);
    },
  },
});

export const { login, logout } = userslice.actions;
export default userslice.reducer;
