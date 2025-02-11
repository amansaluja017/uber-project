import { createSlice } from "@reduxjs/toolkit";

const localData = JSON.parse(localStorage.getItem("captianData")) || null;
const localStatus = JSON.parse(localStorage.getItem("captianStatus")) || false;

const initialState = { captianData: localData, status: localStatus };

const captianslice = createSlice({
  name: "captian",
  initialState,
  reducers: {
    Captianlogin(state, action) {
      state.captianData = action.payload;
      state.status = true;
      localStorage.setItem("captianData", JSON.stringify(action.payload));
      localStorage.setItem("captianStatus", true);
    },
    Captianlogout(state) {
      state.captianData = null;
      state.status = false;
      localStorage.removeItem("captianData");
      localStorage.setItem("captianStatus", false);
    },
  },
});

export const { Captianlogin, Captianlogout } = captianslice.actions;

export default captianslice.reducer;
