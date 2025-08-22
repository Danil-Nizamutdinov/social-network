import { skipToken } from "@reduxjs/toolkit/query";
import ButtonBlue from "@src/components/ButtonBlue/ButtonBlue";
import { useAppDispatch } from "@src/hooks/redux";
import {
  useGetSubscriptionQuery,
  useSubscribeMutation,
  useUnsubscribeMutation,
} from "@src/services/ReactionService";
import { toggle } from "@src/store/reducers/toggleSlice";
import { ActiveToggle } from "@src/types/main";
import React from "react";

interface ChannelActionUserProps {
  userId: number | undefined;
  channelId: number;
  refetch: () => void;
}

const ChannelActionUser: React.FC<ChannelActionUserProps> = ({
  userId,
  channelId,
  refetch,
}) => {
  const { data } = useGetSubscriptionQuery(
    userId && channelId ? { userId, channelId } : skipToken
  );

  const [subscribe] = useSubscribeMutation();
  const [unSubscribe] = useUnsubscribeMutation();

  const dispatch = useAppDispatch();

  const handleSubscribe = async () => {
    if (userId && channelId) {
      await subscribe({ userId, channelId });
      refetch();
    } else {
      dispatch(toggle(ActiveToggle.AUTH));
    }
  };

  const handleUnSubscribe = async () => {
    if (userId && channelId) {
      await unSubscribe({ userId, channelId });
      refetch();
    }
  };

  return (
    <div>
      {data?.isSubscribe ? (
        <ButtonBlue
          text="Вы подписаны"
          isDisabled={false}
          handleOnClick={handleUnSubscribe}
          isSubmit={false}
        />
      ) : (
        <ButtonBlue
          text="Подписаться"
          isDisabled={false}
          handleOnClick={handleSubscribe}
          isSubmit={false}
        />
      )}
    </div>
  );
};

export default ChannelActionUser;
