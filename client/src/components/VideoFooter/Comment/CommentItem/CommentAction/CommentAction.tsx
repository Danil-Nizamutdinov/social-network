import React from "react";
import dislikeImg from "@src/assets/dislike.png";
import likeImg from "@src/assets/like.png";
import ButtonImg from "@src/components/ButtonImg/ButtonImg";
import styles from "./comment-action.module.scss";

interface CommentActionProps {
  like: number;
  dislike: number;
}

const CommentAction: React.FC<CommentActionProps> = ({ like, dislike }) => {
  return (
    <div className={styles.comment_action}>
      <div className={styles.action_item}>
        <ButtonImg img={likeImg} handleOnClick={() => {}} />
        <p>{like}</p>
      </div>

      <div className={styles.action_item}>
        <span className={styles.img_box}>
          <ButtonImg img={dislikeImg} handleOnClick={() => {}} />
        </span>
        <p>{dislike}</p>
      </div>
    </div>
  );
};

export default CommentAction;
