import { IUser } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
  isAuth: boolean | null;
  user: IUser | null;
}

const initialState: IUserState = { isAuth: null, user: null };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
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
