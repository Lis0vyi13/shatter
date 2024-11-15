// store/chatSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

interface IModalChildren {
  children: ReactNode | null;
}

interface IModalProps extends IModalChildren {
  isOpen: boolean;
}

interface IModal {
  createChatModal: IModalProps;
}

const initialState: IModal = {
  createChatModal: {
    isOpen: false,
    children: null,
  },
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<IModalProps>) {
      state.createChatModal = action.payload;
    },
    closeModal(state) {
      state.createChatModal = {
        isOpen: false,
        children: null,
      };
    },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
