import { createSlice } from "@reduxjs/toolkit";

const localData = JSON.parse(localStorage.getItem("userData")) || null;
const localsignupData =
  JSON.parse(localStorage.getItem("localsignupData")) || null;
const localStatus = JSON.parse(localStorage.getItem("status")) || false;

const initialState = {
  usersignupData: localsignupData,
  userId: localData ? localData.id : null,
  userData: localData,
  status: localStatus,
};

const userslice = createSlice({
  name: "user",
  initialState,
  reducers: {
    Signup(state, action) {
      state.usersignupData = action.payload;
      state.status = false;
      localStorage.setItem("usersignupData", JSON.stringify(action.payload));
      localStorage.setItem("status", false);
    },
    login(state, action) {
      state.userData = action.payload;
      state.userId = action.payload.id;
      state.status = true;
      localStorage.setItem("userData", JSON.stringify(action.payload));
      localStorage.setItem("status", true);
    },
    logout(state) {
      state.userData = null;
      state.userId = null;
      state.status = false;
      localStorage.removeItem("userData");
      localStorage.setItem("status", false);
    },
  },
});

export const { Signup, login, logout } = userslice.actions;
export default userslice.reducer;
