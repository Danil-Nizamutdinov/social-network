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

const channelApi = createApi({
  reducerPath: "ChannelApi",
  baseQuery: axiosBaseQuery({ baseUrl }),
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
    }),
  }),
});

export const { useGetChannelQuery } = channelApi;

export default channelApi;
