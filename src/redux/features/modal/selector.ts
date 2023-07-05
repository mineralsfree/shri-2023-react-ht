import { RootState } from "@/redux/store";

export const selectConfirmation = (state: RootState) => state.modal;
