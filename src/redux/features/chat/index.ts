import { IChat } from "@/types/chat";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IChatState {
  chats: IChat[] | null;
  activeChat: IChat | null;
  favorites: IChat | null;
}

const initialState: IChatState = {
  chats: null,
  activeChat: null,
  favorites: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats(state, action: PayloadAction<IChat[] | [] | null>) {
      state.chats = action.payload;
    },
    setActiveChat(state, action: PayloadAction<IChat>) {
      state.activeChat = action.payload;
    },
    setFavorites(state, action: PayloadAction<IChat | null>) {
      state.favorites = action.payload;
    },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
