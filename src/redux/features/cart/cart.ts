"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Movie, Ticket } from "@/redux/types";
export type CartState = {
  addedTickets: { [key in string]: Ticket };
};
const initialState: CartState = {
  addedTickets: {},
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    createOrUpdateTicket(state, action: PayloadAction<Ticket>) {
      const { movie, count } = action.payload;
      const isExistentMovie = state.addedTickets[movie.id];
      if (isExistentMovie) {
        state.addedTickets[movie.id].count = count;
      } else {
        state.addedTickets[movie.id] = action.payload;
      }
    },
    deleteTicket(state, action: PayloadAction<string>) {
      delete state.addedTickets[action.payload];
    },
  },
});
export const { createOrUpdateTicket, deleteTicket } = cartSlice.actions;
export default cartSlice.reducer;
