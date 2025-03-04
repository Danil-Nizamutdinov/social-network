/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActiveToggle } from "@src/types/main";
import { ToggleState } from "@src/types/storeTypes";

const initialState: ToggleState = {
  activeToggle: ActiveToggle.NONE,
  isRegForm: false,
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggle(state, action: PayloadAction<ActiveToggle>) {
      state.activeToggle = action.payload;
    },
    toggleFalse(state) {
      state.activeToggle = ActiveToggle.NONE;
    },
    toggleReg(state, action: PayloadAction<boolean>) {
      state.isRegForm = action.payload;
    },
  },
});

export const { toggle, toggleFalse, toggleReg } = toggleSlice.actions;

export default toggleSlice.reducer;
