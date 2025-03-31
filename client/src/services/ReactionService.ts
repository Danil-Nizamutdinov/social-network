import { baseUrl } from "@src/vars";
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

interface ReactionSubscriptionArg {
  userId: number;
  channelId: number;
}

const reactionApi = createApi({
  reducerPath: "ReactionApi",
  baseQuery: axiosBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getSubscription: build.query<any, ReactionSubscriptionArg>({
      query: ({ userId, channelId }) => ({
        url: "reaction/subscription",
        method: "get",
        params: {
          userId,
          channelId,
        },
      }),
    }),
    subscribe: build.mutation<any, ReactionSubscriptionArg>({
      query: (data) => ({
        url: "reaction/subscribe",
        method: "POST",
        data,
      }),
    }),
    unsubscribe: build.mutation<any, ReactionSubscriptionArg>({
      query: (data) => ({
        url: "reaction/unsubscribe",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const { useGetSubscriptionQuery } = reactionApi;

export default reactionApi;
