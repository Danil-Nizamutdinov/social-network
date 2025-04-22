import React, { useState } from "react";
import Header from "@src/components/Header/Header";
import VideoList from "@src/components/VideoList/VideoList";
import { useGetVideosQuery } from "@src/services/VideoService";
import Loading from "@src/components/Loading/Loading";
import PaginationBar from "@src/components/PaginationBar/PaginationBar";

const VideosPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = useGetVideosQuery({
    page,
  });

  if (isLoading) return <Loading />;

  return (
    <div>
      <Header url="video" />
      {data && <VideoList videos={data.videos} />}
      {data && (
        <PaginationBar
          totalPages={data.totalPages}
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default VideosPage;
