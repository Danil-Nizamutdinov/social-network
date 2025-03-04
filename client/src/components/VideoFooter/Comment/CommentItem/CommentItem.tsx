import { IComment } from "@src/types/main";
import React from "react";
import { urlStatic } from "@src/vars";
import convertToReadableDate from "@src/helper/readableDate";
import styles from "./comment-item.module.scss";
import CommentAction from "./CommentAction/CommentAction";

const CommentItem: React.FC<{ comment: IComment }> = ({ comment }) => {
  return (
    <div className={styles.comment}>
      <div className={styles.img_box}>
        <img src={urlStatic + comment.user.avatar} alt="avatar" />
      </div>
      <div className={styles.comment_content}>
        <h1>{comment.user.login}</h1>
        <p className={styles.date}>
          {convertToReadableDate(comment.createdAt)}
        </p>
        <p>{comment.content}</p>
        <CommentAction like={comment.like} dislike={comment.dislike} />
      </div>
    </div>
  );
};

export default CommentItem;
