import { IChat } from "@/types/chat";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IChatState {
  chats: IChat[] | null;
}

const initialState: IChatState = { chats: null };

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats(state, action: PayloadAction<IChat[]>) {
      state.chats = action.payload;
    },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
