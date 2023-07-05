import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ModalSlice = {
  isOpen: boolean;
  message: string;
  id: string;
};
const initialState: ModalSlice = {
  isOpen: false,
  id: "",
  message: "",
};
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ message: string; id: string }>,
    ) => {
      state.isOpen = true;
      state.id = action.payload.id;
      state.message = action.payload.message;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.message = "";
      state.id = "";
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
