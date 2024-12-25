import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInputProps {
  value: string;
  debouncedValue: string;
}

interface ISearch {
  searchInput: IInputProps;
}

const initialState: ISearch = {
  searchInput: {
    value: "",
    debouncedValue: "",
  },
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchInputValue(state, action: PayloadAction<string>) {
      state.searchInput.value = action.payload;
    },
    setDebouncedSearchInputValue(state, action: PayloadAction<string>) {
      state.searchInput.debouncedValue = action.payload;
    },
  },
});

export const searchActions = searchSlice.actions;
export default searchSlice.reducer;
