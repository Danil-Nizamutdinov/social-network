import { baseUrl } from "@src/vars";
import { createApi } from "@reduxjs/toolkit/query/react";
import { IChat } from "@src/types/main";
import { axiosQueryWithCheckAuth } from "./axiosBaseQuery";

const chatApi = createApi({
  reducerPath: "ChatApi",
  baseQuery: axiosQueryWithCheckAuth({ baseUrl }),
  endpoints: (build) => ({
    getChats: build.query<IChat[], number>({
      query: (userId) => ({
        url: "chat/chats",
        method: "get",
        params: {
          userId,
        },
      }),
    }),
    getChat: build.query<IChat, { userId: number; chatId: number }>({
      query: ({ userId, chatId }) => ({
        url: "chat/chat",
        method: "get",
        params: {
          userId,
          chatId,
        },
      }),
    }),
  }),
});

export const { useGetChatsQuery, useGetChatQuery } = chatApi;

export default chatApi;
