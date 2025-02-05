import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IChat, IParticipantOnline } from "@/types/chat";

interface IChatState {
  chats: IChat[] | null;
  activeChat: string;
  favorites: IChat | null;
  isLoading: boolean;
  onlineParticipants: IParticipantOnline[] | null;
}

const initialState: IChatState = {
  chats: null,
  activeChat: "",
  favorites: null,
  isLoading: false,
  onlineParticipants: null,
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
    setOnlineParticipants(
      state,
      action: PayloadAction<IParticipantOnline[] | null>,
    ) {
      state.onlineParticipants = action.payload;
    },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
