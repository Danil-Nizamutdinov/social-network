import { baseUrl } from "@src/vars";
import { createApi } from "@reduxjs/toolkit/query/react";
import { IChat, IUser } from "@src/types/main";
import axiosBaseQuery from "./axiosBaseQuery";

const chatApi = createApi({
  reducerPath: "ChatApi",
  baseQuery: axiosBaseQuery({ baseUrl }),
  tagTypes: ["getChat"],
  endpoints: (build) => ({
    getChats: build.query<IChat[], number>({
      query: (userId) => ({
        url: "chat/chats",
        method: "get",
        params: {
          userId,
        },
      }),
      providesTags: () => ["getChat"],
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
    createChat: build.mutation<IChat, { user1Id: number; user2Id: number }>({
      query: (data) => ({
        url: "chat/chat",
        method: "POST",
        data,
      }),
      invalidatesTags: ["getChat"],
    }),
    deleteChat: build.mutation<IChat, { chatId: number }>({
      query: (data) => ({
        url: "chat/chat",
        method: "DELETE",
        data,
      }),
      invalidatesTags: ["getChat"],
    }),
    getUsers: build.query<IUser[], string>({
      query: (login) => ({
        url: "user/users",
        method: "get",
        params: {
          login,
        },
      }),
    }),
  }),
});

export const {
  useGetChatsQuery,
  useGetChatQuery,
  useGetUsersQuery,
  useCreateChatMutation,
  useDeleteChatMutation,
} = chatApi;

export default chatApi;
