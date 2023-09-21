import { configureStore } from "@reduxjs/toolkit";

import { contentSliceReducer } from "./contentSliceReducer";

export const store = configureStore({
  reducer: {
    content: contentSliceReducer,
  },
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
