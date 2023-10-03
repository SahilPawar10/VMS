import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./apiservices/authSlice";
import { staffApi } from "./apiservices/staffSlice";
import { visitorApi } from "./apiservices/visitorSlice";
import authReducer from "./reducers/auth.reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [staffApi.reducerPath]: staffApi.reducer,
    [visitorApi.reducerPath]: visitorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      staffApi.middleware,
      visitorApi.middleware,
    ),
});

setupListeners(store.dispatch);
