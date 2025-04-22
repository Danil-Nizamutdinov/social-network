import Channel from "@src/components/Channel/Channel";
import Header from "@src/components/Header/Header";
import Loading from "@src/components/Loading/Loading";
import { useGetChannelQuery } from "@src/services/ChannelService";
import { IChannel } from "@src/types/main";
import React, { createContext, useContext } from "react";
import { Outlet, useParams } from "react-router-dom";

const ChannelContext = createContext<IChannel | null>(null);

export const useChannelContext = () => {
  return useContext(ChannelContext);
};

const ChannelPage: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetChannelQuery({ channelId: Number(id) });
  if (isLoading || !data) return <Loading />;
  return (
    <ChannelContext.Provider value={data}>
      <div>
        <Header url="video" />
        <Channel />
        <div>
          <Outlet />
        </div>
      </div>
    </ChannelContext.Provider>
  );
};

export default ChannelPage;
