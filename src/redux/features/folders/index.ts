import { IFolder } from "@/types/sidebar";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IFolderState {
  folders: IFolder[] | null;
}

const initialState: IFolderState = { folders: null };

export const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    setFolders(state, action: PayloadAction<IFolder[]>) {
      state.folders = action.payload;
    },
  },
});

export const foldersActions = foldersSlice.actions;
export default foldersSlice.reducer;
