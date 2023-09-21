import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppRootState } from "../../../store/store";
import { setNewItem } from "../../../store/contentSliceReducer";
import {
  removeSelectedItem,
  selectComments,
} from "../../../store/contentSliceReducer";
import { ItemInterface } from "../../../types/types";

import styles from "./Items.module.scss";

export default function Items() {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  const items = useSelector((state: AppRootState) => state.content.items);
  let commentId = useSelector(
    (state: AppRootState) => state.content.selectedCommentsId,
  );

  const dispatch = useDispatch();

  const addItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      setError(true);
      return;
    }
    setError(false);
    dispatch(setNewItem({ id: Date.now(), title: inputValue, comments: [] }));
    setInputValue("");
  };

  const removeItem = (id: number) => {
    dispatch(removeSelectedItem(id));
  };

  const selectItemHandler = (id: number) => {
    dispatch(selectComments(id));
  };

  useEffect(() => {
    if (items.length === 0) return;
    selectItemHandler(items[0].id);
  }, []);

  return (
    <div className={styles.Items}>
      <h1>Items</h1>
      <form>
        <input
          onClick={() => setError(false)}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          type="text"
          placeholder={error ? "Field cannot be empty" : "Type name here..."}
        />
        <button onClick={addItem} type="submit">
          Add New
        </button>
      </form>
      <ul>
        {items.map((item: ItemInterface) => (
          <li
            className={commentId === item.id ? styles.selected : ""}
            onClick={() => selectItemHandler(item.id)}
            key={item.id}
          >
            <span>{item.title}</span>
            <div>
              <span>{item.comments.length}</span>
              <button
                className={styles.delete}
                onClick={() => removeItem(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
