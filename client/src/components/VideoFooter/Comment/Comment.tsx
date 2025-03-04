import React, { useState } from "react";
import arrowDown from "@src/assets/expand-arrow.png";
import ButtonImg from "@src/components/ButtonImg/ButtonImg";
import { IComment } from "@src/types/main";
import styles from "./comment.module.scss";
import CommentItem from "./CommentItem/CommentItem";

const Comment: React.FC<{ comments: IComment[] }> = ({ comments }) => {
  const [isComments, setIsComments] = useState<boolean>(false);
  return (
    <div className={styles.comment}>
      <div className={styles.comment_header}>
        <div>{comments.length} комментариев</div>
        <ButtonImg
          img={arrowDown}
          handleOnClick={() => setIsComments((prev) => !prev)}
        />
      </div>
      <div className={`${styles.comments} ${isComments && styles.active}`}>
        {comments.map((comment: IComment) => (
          <CommentItem comment={comment} key={comment.id} />
        ))}
      </div>
    </div>
  );
};

export default Comment;
