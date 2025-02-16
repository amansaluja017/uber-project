import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import userslice from "./UserAuthSlice";
import captianslice from "./CaptianAuthSlice";
import socketslice from './SocketSlice.js'

export const store = configureStore({
  reducer: {
    user: userslice,
    captian: captianslice,
    socket: socketslice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
