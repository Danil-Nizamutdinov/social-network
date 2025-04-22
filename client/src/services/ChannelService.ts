import { baseUrl } from "@src/vars";
import { createApi } from "@reduxjs/toolkit/query/react";
import { IChannel } from "@src/types/main";
import axiosBaseQuery from "./axiosBaseQuery";

interface GetChannelById {
  channelId: number;
  userId?: number;
}

interface GetChannelByUserId {
  channelId?: number;
  userId: number;
}

type GetChannelArg = GetChannelById | GetChannelByUserId;

interface UpdateDescriptionArg {
  channelId: number;
  description: string;
}

const channelApi = createApi({
  reducerPath: "ChannelApi",
  baseQuery: axiosBaseQuery({ baseUrl }),
  tagTypes: ["Post"],
  endpoints: (build) => ({
    getChannel: build.query<IChannel, GetChannelArg>({
      query: ({ channelId, userId }) => ({
        url: "channel/channel",
        method: "get",
        params: {
          channelId,
          userId,
        },
      }),
      providesTags: () => ["Post"],
    }),
    updateDescription: build.mutation<void, UpdateDescriptionArg>({
      query: (data) => ({
        url: "channel/description",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Post"],
    }),
    updateBackground: build.mutation<void, FormData>({
      query: (data) => ({
        url: "channel/background",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetChannelQuery,
  useUpdateDescriptionMutation,
  useUpdateBackgroundMutation,
} = channelApi;

export default channelApi;
