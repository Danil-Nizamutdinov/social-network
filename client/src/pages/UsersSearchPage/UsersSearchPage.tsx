import Header from "@src/components/Header/Header";
import UserSearchResults from "@src/components/UserSearchResults/UserSearchResults";
import React from "react";
import { useSearchParams } from "react-router-dom";

const UsersSearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search_query") || "";

  return (
    <div>
      <Header url="chats" />
      <UserSearchResults searchQuery={searchQuery} />
    </div>
  );
};

export default UsersSearchPage;
