import { useSearchVideosQuery } from "@src/services/VideoService";
import React from "react";
import { IVideo } from "@src/types/main";
import useWindowWidth from "@src/hooks/useWindowWidth";
import { desktopWidth } from "@src/vars";
import Loading from "../Loading/Loading";
import VideosSearchRItem from "./VideosSearchRItem/VideosSearchRItem";
import styles from "./videos-search-r.module.scss";
import VideoList from "../VideoList/VideoList";
import Absence from "../Absence/Absence";

const VideosSearchResults: React.FC<{ searchQuery: string }> = ({
  searchQuery,
}) => {
  const { data, isLoading } = useSearchVideosQuery(searchQuery);

  const width = useWindowWidth();
  const isDesktop = width >= desktopWidth;

  if (isLoading) return <Loading />;
  if (data?.videos.length === 0) return <Absence />;
  return (
    <div>
      {isDesktop ? (
        <div className={styles.videos_list}>
          {data?.videos?.map((video: IVideo) => (
            <VideosSearchRItem video={video} key={video.id} />
          ))}
        </div>
      ) : (
        data?.videos && <VideoList videos={data?.videos} />
      )}
    </div>
  );
};

export default VideosSearchResults;
