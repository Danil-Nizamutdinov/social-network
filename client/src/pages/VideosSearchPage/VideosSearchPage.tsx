import Header from "@src/components/Header/Header";
import VideosSearchResults from "@src/components/VideosSearchResults/VideosSearchResults";
import React from "react";
import { useSearchParams } from "react-router-dom";

const VideosSearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search_query") || "";

  return (
    <div>
      <Header url="video" />
      <VideosSearchResults searchQuery={searchQuery} />
    </div>
  );
};

export default VideosSearchPage;
