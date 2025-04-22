import ButtonImg from "@src/components/ButtonImg/ButtonImg";
import React from "react";
import arrow from "@src/assets/arrow.png";
import likedislike from "@src/assets/likedislike.png";
import activeld from "@src/assets/activeld.png";
import {
  useAddReactionMutation,
  useGetReactionQuery,
} from "@src/services/ReactionService";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import { skipToken } from "@reduxjs/toolkit/query";
import { toggle } from "@src/store/reducers/toggleSlice";
import { ActiveToggle } from "@src/types/main";
import styles from "./video-actions.module.scss";

interface VideoActionsProps {
  likeCounter: number;
  videoId: number;
  refetch: () => void;
}

const VideoActions: React.FC<VideoActionsProps> = ({
  likeCounter,
  videoId,
  refetch,
}) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.userReducer.user?.id);

  const { data } = useGetReactionQuery(
    userId && videoId ? { userId, videoId } : skipToken
  );

  const [addReaction] = useAddReactionMutation();

  const handleAddReaction = async (reactionType: string) => {
    if (userId) {
      await addReaction({ userId, videoId, reactionType });
      refetch();
    } else {
      dispatch(toggle(ActiveToggle.AUTH));
    }
  };

  return (
    <div className={styles.actions_wrapper}>
      <div className={styles.action}>
        {data?.reactionType === "like" ? (
          <ButtonImg
            img={activeld}
            handleOnClick={() => handleAddReaction("like")}
          />
        ) : (
          <ButtonImg
            img={likedislike}
            handleOnClick={() => handleAddReaction("like")}
          />
        )}
        <p className={styles.like_counter}>{likeCounter}</p>
        <div className={styles.dislike_box}>
          {data?.reactionType === "dislike" ? (
            <ButtonImg
              img={activeld}
              handleOnClick={() => handleAddReaction("dislike")}
            />
          ) : (
            <ButtonImg
              img={likedislike}
              handleOnClick={() => handleAddReaction("dislike")}
            />
          )}
        </div>
      </div>
      <div className={styles.action}>
        <ButtonImg img={arrow} handleOnClick={() => {}} />
        <p>Поделиться</p>
      </div>
    </div>
  );
};

export default VideoActions;
