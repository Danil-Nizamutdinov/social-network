import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "@src/store/store";
import { io, Socket } from "socket.io-client";

const initializeSocket = createAsyncThunk<
  Socket,
  string,
  { dispatch: AppDispatch }
>("notification/initializeSocket", async (token, { dispatch }) => {
  const socket = io("http://localhost:3000/notification", {
    auth: { token },
    autoConnect: true,
  });

  return socket;
});

export default initializeSocket;
