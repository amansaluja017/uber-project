import { createSlice } from "@reduxjs/toolkit";

const localData = JSON.parse(localStorage.getItem("captianData")) || null;
const localCaptianSignupData = JSON.parse(localStorage.getItem("captianSignupData")) || null;
const localStatus = JSON.parse(localStorage.getItem("captianStatus")) || false;

const initialState = { captianSignupData: localCaptianSignupData, captianData: localData, status: localStatus };

const captianslice = createSlice({
  name: "captian",
  initialState,
  reducers: {
    Captiansignup(state, action) {
      state.captianSignupData = action.payload;
      state.status = false;
      localStorage.setItem("captianSignupData", JSON.stringify(action.payload));
      localStorage.setItem("captianStatus", false);
    },
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

export const { Captianlogin, Captianlogout, Captiansignup } = captianslice.actions;

export default captianslice.reducer;
