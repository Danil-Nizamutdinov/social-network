/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import initializeSocket from "./ActionCreators/NotificationAC";

interface Notification {
  id: number;
  message: string;
  receiverId: number;
  senderId?: number;
  read: boolean;
  createdAt: string;
}

interface NotificationState {
  socket: Socket | null;
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
  isConnected: boolean;
}

const initialState: NotificationState = {
  socket: null,
  notifications: [],
  isLoading: false,
  error: null,
  isConnected: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeSocket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initializeSocket.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(initializeSocket.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to initialize socket";
      });
  },
});

export default notificationSlice.reducer;
