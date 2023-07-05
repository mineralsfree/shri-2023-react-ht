import { configureStore } from "@reduxjs/toolkit";
import { movieApi } from "@/redux/services/movieApi";
import cartReducer from "./features/cart/cart";
import modalReducer from "./features/modal/modal";
import { cinemaApi } from "@/redux/services/cinemaApi";

export const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
    [cinemaApi.reducerPath]: cinemaApi.reducer,
    cart: cartReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([movieApi.middleware, cinemaApi.middleware]),
  devTools: true,
});
export type RootState = ReturnType<typeof store.getState>;
