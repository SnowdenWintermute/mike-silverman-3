import { createWrapper } from "next-redux-wrapper";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
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
// export type AppStore = ReturnType<typeof store>;
// export const wrapper = createWrapper<AppStore>(store); // next-redux-wrapper
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<AppStore["getState"]>; // next-redux-wrapper
// export type AppDispatch = ReturnType<AppStore["dispatch"]>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
