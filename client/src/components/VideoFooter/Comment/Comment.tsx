import React, { useState } from "react";
import ButtonImg from "@src/components/ButtonImg/ButtonImg";
import { IComment } from "@src/types/main";
import send from "@src/assets/send.png";
import { useAddCommentMutation } from "@src/services/VideoService";
import { useAppSelector } from "@src/hooks/redux";
import Arrow from "@src/components/Arrow/Next";
import styles from "./comment.module.scss";
import CommentItem from "./CommentItem/CommentItem";

interface CommentProps {
  comments: IComment[];
  videoId: number;
  refetch: () => void;
}

const Comment: React.FC<CommentProps> = ({ comments, videoId, refetch }) => {
  const [isComments, setIsComments] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [rows, setRows] = useState<number>(1);
  const [textareaHeight, setTextareaHeight] = useState<number>(35);

  const [addComment] = useAddCommentMutation();

  const userId = useAppSelector((state) => state.userReducer.user?.id);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    const height = event.target.scrollHeight;

    if (height !== textareaHeight) {
      setRows((prev) => prev + 1);
      setTextareaHeight(height);
    }
  };

  const handleAddComment = async () => {
    if (userId) {
      await addComment({ userId, videoId, content: text });
      setText("");
      refetch();
    }
  };

  return (
    <div className={styles.comment}>
      <div className={styles.comment_header}>
        <div>{comments.length} комментариев</div>
        <button onClick={() => setIsComments((prev) => !prev)} type="button">
          <Arrow deg={isComments ? "-135" : "45"} />
        </button>
      </div>
      <div className={`${styles.comments} ${isComments && styles.active}`}>
        <div className={styles.textarea_box}>
          <textarea
            value={text}
            onChange={handleChange}
            className={styles.textarea}
            placeholder="Оставить комментарий"
            rows={rows}
          />
          <ButtonImg img={send} handleOnClick={handleAddComment} />
        </div>
        {comments.map((comment: IComment) => (
          <CommentItem comment={comment} key={comment.id} />
        ))}
      </div>
    </div>
  );
};

export default Comment;
