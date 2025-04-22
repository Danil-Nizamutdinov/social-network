import { baseUrl } from "@src/vars";
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

interface ReactionSubscriptionArg {
  userId: number;
  channelId: number;
}

interface ReactionArg {
  userId: number;
  videoId: number;
}

interface AddReactionArg {
  userId: number;
  videoId: number;
  reactionType: string;
}

const reactionApi = createApi({
  reducerPath: "ReactionApi",
  baseQuery: axiosBaseQuery({ baseUrl }),
  tagTypes: ["Post", "Reaction"],
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
      providesTags: () => ["Post"],
    }),
    subscribe: build.mutation<any, ReactionSubscriptionArg>({
      query: (data) => ({
        url: "reaction/subscribe",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Post"],
    }),
    unsubscribe: build.mutation<any, ReactionSubscriptionArg>({
      query: (data) => ({
        url: "reaction/unsubscribe",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Post"],
    }),
    getReaction: build.query<any, ReactionArg>({
      query: ({ userId, videoId }) => ({
        url: "reaction/reaction",
        method: "get",
        params: {
          userId,
          videoId,
        },
      }),
      providesTags: () => ["Reaction"],
    }),
    addReaction: build.mutation<any, AddReactionArg>({
      query: (data) => ({
        url: "reaction/reaction",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Reaction"],
    }),
  }),
});

export const {
  useGetSubscriptionQuery,
  useSubscribeMutation,
  useUnsubscribeMutation,
  useGetReactionQuery,
  useAddReactionMutation,
} = reactionApi;

export default reactionApi;
