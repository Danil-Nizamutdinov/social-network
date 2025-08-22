import { baseUrl } from "@src/vars";
import { createApi } from "@reduxjs/toolkit/query/react";
import { VideosResponse, VideoResponse } from "@src/types/main";
import axiosBaseQuery from "./axiosBaseQuery";

interface GetVideosArg {
  page: number;
  channelId?: number;
}

interface AddCommentArg {
  userId: number;
  videoId: number;
  content: string;
}

const videoApi = createApi({
  reducerPath: "videoApi",
  baseQuery: axiosBaseQuery({ baseUrl }),
  tagTypes: ["Post"],
  endpoints: (build) => ({
    getVideos: build.query<VideosResponse, GetVideosArg>({
      query: ({ page, channelId }) => ({
        url: "video/videos",
        method: "get",
        params: {
          limit: 12,
          page,
          channelId,
        },
      }),
      providesTags: () => ["Post"],
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
    searchVideos: build.query<VideosResponse, string>({
      query: (title) => ({
        url: "video/search",
        method: "get",
        params: {
          title,
          page: 1,
          limit: 12,
        },
      }),
    }),
    addVideo: build.mutation<void, FormData>({
      query: (data) => ({
        url: "video/video",
        method: "post",
        data,
      }),
      invalidatesTags: ["Post"],
    }),
    addComment: build.mutation<any, AddCommentArg>({
      query: (data) => ({
        url: "comment/comment",
        method: "post",
        data,
      }),
    }),
    deleteVideo: build.mutation<any, { videoId: number; channelId: number }>({
      query: (data) => ({
        url: "video/video",
        method: "DELETE",
        data,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useAddVideoMutation,
  useAddCommentMutation,
  useSearchVideosQuery,
  useDeleteVideoMutation,
} = videoApi;

export default videoApi;
