import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ItemInterface, ItemsInterface } from "../types/types";

const saveStateToLocalStorage = (state: ItemsInterface) => {
  localStorage.setItem("itemsState", JSON.stringify(state));
};

const initialState: ItemsInterface = {
  items: [],
  comments: [],
  selectedCommentsId: 0,
};

const savedStateString = localStorage.getItem("itemsState");
const savedState = savedStateString ? JSON.parse(savedStateString) : null;
const initialAppState = savedState ? savedState : initialState;

const contentSlice = createSlice({
  name: "auth",
  initialState: initialAppState,
  reducers: {
    setNewItem(state, action: PayloadAction<ItemInterface>) {
      state.items.push(action.payload);
      saveStateToLocalStorage(state);
    },
    removeSelectedItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        (item: ItemInterface) => item.id !== action.payload,
      );
      state.comments = [];
      state.selectedCommentsId = 0;
      saveStateToLocalStorage(state);
    },
    selectComments(state, action: PayloadAction<number>) {
      const selectedComments = state.items.filter(
        (item: ItemInterface) => item.id === action.payload,
      );
      if (selectedComments.length !== 0) {
        state.comments = selectedComments[0].comments;
        state.selectedCommentsId = action.payload;
      }
      saveStateToLocalStorage(state);
    },
    addComment(state, action: PayloadAction<{ text: string; color: string }>) {
      const selectedComments = state.items.filter(
        (item: ItemInterface) => item.id === state.selectedCommentsId,
      );
      selectedComments[0].comments.push(action.payload);
      state.comments = selectedComments[0].comments;
      saveStateToLocalStorage(state);
    },
  },
});

export const contentSliceReducer = contentSlice.reducer;

export const { setNewItem, removeSelectedItem, selectComments, addComment } =
  contentSlice.actions;
