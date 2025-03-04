import Absence from "@src/components/Absence/Absence";
import Loading from "@src/components/Loading/Loading";
import VideoList from "@src/components/VideoList/VideoList";
import { useGetVideosQuery } from "@src/services/VideoService";
import React from "react";
import { useParams } from "react-router-dom";

const ChannelVideoList: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetVideosQuery({
    page: 1,
    channelId: Number(id),
  });
  if (isLoading) return <Loading />;
  return (
    <div>
      {data?.videos.length ? <VideoList videos={data.videos} /> : <Absence />}
    </div>
  );
};

export default ChannelVideoList;
