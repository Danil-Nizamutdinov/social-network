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
  endpoints: (build) => ({
    getContacts: build.query<IGetContactsResponse[], number>({
      query: (userId) => ({
        url: "friend/friends",
        method: "get",
        params: {
          userId,
        },
      }),
    }),
    getRequest: build.query<ISendFriendRequestResponse, number>({
      query: (userId) => ({
        url: "friend/request",
        method: "get",
        params: {
          userId,
        },
      }),
    }),
    sendFriendRequest: build.mutation<any, SendFriendRequestArg>({
      query: (data) => ({
        url: "friend/request",
        method: "POST",
        data,
      }),
    }),
    respondToRequest: build.mutation<any, RespondToRequest>({
      query: (data) => ({
        url: "friend/response",
        method: "POST",
        data,
      }),
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
