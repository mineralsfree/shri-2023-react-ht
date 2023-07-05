import { RootState } from "@/redux/store";
import { CartState } from "@/redux/features/cart/cart";
import { Ticket } from "@/redux/types";

const selectCart = (state: RootState): CartState => state.cart;
export const selectTicketAmount = (state: RootState, id: string) =>
  selectCart(state).addedTickets[id]?.count;
export const selectCount = (state: RootState) =>
  Object.values(selectCart(state).addedTickets).reduce(
    (acc, curr) => acc + curr.count,
    0,
  );
export const selectCartMovies = (state: RootState) =>
  Object.values(selectCart(state).addedTickets).map(
    (ticket: Ticket) => ticket.movie,
  );
