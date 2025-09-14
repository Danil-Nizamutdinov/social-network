import { baseUrl } from "@src/vars";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  IGetContactsResponse,
  ISendFriendRequestResponse,
} from "@src/types/main";
import axiosBaseQuery from "./axiosBaseQuery";

interface SendFriendRequestArg {
  userId: number;
  login: string;
}

interface RespondToRequest {
  requestId: number;
  status: string;
  userId: number;
}

const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: axiosBaseQuery({ baseUrl }),
  tagTypes: ["getRequest", "getContacts"],
  endpoints: (build) => ({
    getContacts: build.query<IGetContactsResponse[], number>({
      query: (userId) => ({
        url: "friend/friends",
        method: "get",
        params: {
          userId,
        },
      }),
      providesTags: () => ["getContacts"],
    }),
    getRequest: build.query<ISendFriendRequestResponse, number>({
      query: (userId) => ({
        url: "friend/request",
        method: "get",
        params: {
          userId,
        },
      }),
      providesTags: () => ["getRequest"],
    }),
    sendFriendRequest: build.mutation<void, SendFriendRequestArg>({
      query: (data) => ({
        url: "friend/request",
        method: "POST",
        data,
      }),
      invalidatesTags: ["getRequest"],
    }),
    respondToRequest: build.mutation<void, RespondToRequest>({
      query: (data) => ({
        url: "friend/response",
        method: "POST",
        data,
      }),
      invalidatesTags: ["getRequest", "getContacts"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetRequestQuery,
  useSendFriendRequestMutation,
  useRespondToRequestMutation,
} = contactApi;

export default contactApi;
