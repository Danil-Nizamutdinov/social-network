import Header from "@src/components/Header/Header";
import Loading from "@src/components/Loading/Loading";
import Player from "@src/components/Player/Player";
import VideoFooter from "@src/components/VideoFooter/VideoFooter";
import {
  useGetVideoQuery,
  useGetVideosQuery,
} from "@src/services/VideoService";
import React from "react";
import { useParams } from "react-router-dom";
import VideoList from "@src/components/VideoList/VideoList";

const VideoPage: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetVideoQuery(Number(id));
  const { data: res, isLoading: isLoadingVideos } = useGetVideosQuery({
    page: 1,
  });
  if (isLoading || isLoadingVideos) return <Loading />;
  return (
    <div>
      <Header />
      {data && (
        <>
          <Player url={data.video.video} />
          <VideoFooter data={data} />
        </>
      )}
      {res && <VideoList videos={res.videos} />}
    </div>
  );
};

export default VideoPage;
