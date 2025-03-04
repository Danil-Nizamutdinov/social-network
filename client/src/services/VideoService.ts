import { baseUrl } from "@src/vars";
import { createApi } from "@reduxjs/toolkit/query/react";
import { VideosResponse, VideoResponse } from "@src/types/main";
import axiosBaseQuery, { axiosQueryWithCheckAuth } from "./axiosBaseQuery";

interface GetVideosArg {
  page: number;
  channelId?: number;
}

const videoApi = createApi({
  reducerPath: "videoApi",
  baseQuery: axiosBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getVideos: build.query<VideosResponse, GetVideosArg>({
      query: ({ page, channelId }) => ({
        url: "video/videos",
        method: "get",
        params: {
          limit: 9,
          page,
          channelId,
        },
      }),
    }),
    getVideo: build.query<VideoResponse, number>({
      query: (videoId) => ({
        url: "video/video",
        method: "get",
        params: {
          videoId,
        },
      }),
    }),
    addVideo: build.mutation<any, any>({
      query: (data) => ({
        ...axiosQueryWithCheckAuth({ baseUrl }),
        url: "video/video",
        method: "post",
        body: data,
      }),
    }),
  }),
});

export const { useGetVideosQuery, useGetVideoQuery, useAddVideoMutation } =
  videoApi;

export default videoApi;
