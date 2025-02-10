import { createSlice } from "@reduxjs/toolkit";

const initialState = { captianData: null };

const captianslice = createSlice({
  name: "captian",
  initialState,
  reducers: {
    Captianlogin(state, action) {
      state.captianData = action.payload;
    },
    Captianlogout(state) {
      state.captianData = null;
    },
  },
});

export const { Captianlogin, Captianlogout } = captianslice.actions;

export default captianslice.reducer;
