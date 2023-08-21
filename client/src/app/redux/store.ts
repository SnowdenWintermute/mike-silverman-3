"use client";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import uiSlice from "./slices/ui-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat([]),
  // devTools: true,
});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
