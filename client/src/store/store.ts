import { combineReducers, configureStore } from "@reduxjs/toolkit";
import videoApi from "@src/services/VideoService";
import channelApi from "@src/services/ChannelService";
import chatApi from "@src/services/ChatService";
import toggleReducer from "./reducers/toggleSlice";
import userReducer from "./reducers/userSlice";

const rootReducer = combineReducers({
  [videoApi.reducerPath]: videoApi.reducer,
  [channelApi.reducerPath]: channelApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer,
  toggleReducer,
  userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      videoApi.middleware,
      channelApi.middleware,
      chatApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
