import React from "react";
import Header from "@src/components/Header/Header";
import VideoList from "@src/components/VideoList/VideoList";
import { useGetVideosQuery } from "@src/services/VideoService";
import Loading from "@src/components/Loading/Loading";

const VideosPage: React.FC = () => {
  const { data, isLoading } = useGetVideosQuery({ page: 1 });
  if (isLoading) return <Loading />;
  return (
    <div>
      <Header />
      {data && <VideoList videos={data.videos} />}
    </div>
  );
};
export default VideosPage;
