import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addComment } from "../../../store/contentSliceReducer";
import { AppRootState } from "../../../store/store";
import { CommentInterface } from "../../../types/types";

import styles from "./Comments.module.scss";

export default function Comments() {
  const [inputValue, setInputValue] = useState("");
  const [colorValue, setColorValue] = useState("#000000");
  const [error, setError] = useState(false);

  const comments = useSelector((state: AppRootState) => state.content.comments);
  const commentsId = useSelector(
    (state: AppRootState) => state.content.selectedCommentsId,
  );

  const dispatch = useDispatch();

  const addCommentHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      setError(true);
      return;
    }
    setError(false);
    dispatch(addComment({ text: inputValue, color: colorValue }));
    setInputValue("");
  };

  const selectColorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorValue(e.target.value);
  };

  return (
    <div className={styles.Comments}>
      <h1>Comments {commentsId}</h1>
      <ul>
        {comments.length === 0 ? (
          <li>No any comments</li>
        ) : (
          comments.map((comment: CommentInterface) => (
            <li key={comment.text}>
              <input disabled type="color" value={comment.color} />
              <span>{comment.text}</span>
            </li>
          ))
        )}
      </ul>
      <form>
        <input onChange={selectColorHandler} type="color" />
        <textarea
          onClick={() => setError(false)}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          placeholder={error ? "Field cannot be empty" : "Type name here..."}
        />
        <button
          disabled={!commentsId}
          onClick={addCommentHandler}
          type="submit"
        >
          Add New
        </button>
      </form>
    </div>
  );
}
