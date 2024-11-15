import { UserData } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

interface UserState {
  isAuth: boolean | null;
  user: UserData | User | null;
}

const initialState: UserState = { isAuth: null, user: null };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserData | User>) {
      state.isAuth = true;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state) {
      state.isAuth = false;
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
