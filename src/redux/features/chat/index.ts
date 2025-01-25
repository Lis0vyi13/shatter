import { IChat } from "@/types/chat";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IChatState {
  chats: IChat[] | null;
  activeChat: string;
  favorites: IChat | null;
  isLoading: boolean;
}

const initialState: IChatState = {
  chats: null,
  activeChat: "",
  favorites: null,
  isLoading: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats(state, action: PayloadAction<IChat[] | [] | null>) {
      state.chats = action.payload;
    },
    setActiveChat(state, action: PayloadAction<string>) {
      state.activeChat = action.payload;
    },
    setFavorites(state, action: PayloadAction<IChat | null>) {
      state.favorites = action.payload;
    },
    setIsChatLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
