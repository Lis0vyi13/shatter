import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/features/user";
import chatReducer from "@/redux/features/chat";
import foldersReducer from "@/redux/features/folders";
import searchReducer from "@/redux/features/search";
import modalsReducer from "@/redux/features/modals";

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    folders: foldersReducer,
    modals: modalsReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
