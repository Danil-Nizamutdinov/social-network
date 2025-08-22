import Absence from "@src/components/Absence/Absence";
import Loading from "@src/components/Loading/Loading";
import PaginationBar from "@src/components/PaginationBar/PaginationBar";
import VideoList from "@src/components/VideoList/VideoList";
import { useAppSelector } from "@src/hooks/redux";
import { useGetVideosQuery } from "@src/services/VideoService";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ChannelVideoList: React.FC = () => {
  const { id } = useParams();
  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = useGetVideosQuery({
    page,
    channelId: Number(id),
  });

  const userId = useAppSelector((state) => state.userReducer.user?.id);
  const isOwner = userId === Number(id);

  if (isLoading) return <Loading />;

  return (
    <div>
      {data?.videos.length ? (
        <VideoList videos={data.videos} isOwner={isOwner} />
      ) : (
        <Absence />
      )}
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

export default ChannelVideoList;
