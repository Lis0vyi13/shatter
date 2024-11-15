import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/features/user";
import chatReducer from "@/redux/features/chat";
import foldersReducer from "@/redux/features/folders";

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    folders: foldersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
