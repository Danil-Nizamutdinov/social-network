import Header from "@src/components/Header/Header";
import Loading from "@src/components/Loading/Loading";
import Player from "@src/components/Player/Player";
import VideoFooter from "@src/components/VideoFooter/VideoFooter";
import {
  useGetVideoQuery,
  useGetVideosQuery,
} from "@src/services/VideoService";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import VideoList from "@src/components/VideoList/VideoList";
import PaginationBar from "@src/components/PaginationBar/PaginationBar";

const VideoPage: React.FC = () => {
  const { id } = useParams();
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, refetch } = useGetVideoQuery(Number(id));
  const { data: res, isLoading: isLoadingVideos } = useGetVideosQuery({
    page,
  });
  if (isLoading || isLoadingVideos) return <Loading />;
  return (
    <div>
      <Header url="video" />
      {data && (
        <>
          <Player url={data.video.video} />
          <VideoFooter data={data} refetch={refetch} />
        </>
      )}
      {res && <VideoList videos={res.videos} />}
      {res && (
        <PaginationBar
          totalPages={res?.totalPages}
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default VideoPage;
