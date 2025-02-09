import { configureStore } from "@reduxjs/toolkit";
import userslice from "./UserAuthSlice";
import captianslice from "./CaptianAuthSlice";

export const store = configureStore({
  reducer: {
    user: userslice,
    captian: captianslice,
  },
});
