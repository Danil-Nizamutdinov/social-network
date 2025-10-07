/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactState } from "@src/types/storeTypes";

const initialState: ContactState = {
  login: "",
  email: "",
  avatar: "",
  contactId: null,
  chatId: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setContact(state, action: PayloadAction<any>) {
      state.login = action.payload.login;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
      state.contactId = action.payload.contactId;
      state.chatId = action.payload.chatId;
    },
  },
});

export const { setContact } = contactSlice.actions;

export default contactSlice.reducer;
