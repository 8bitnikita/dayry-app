import Comments from "./Comments/Comments";
import styles from "./Content.module.scss";
import Items from "./Items/Items";

export default function Content() {
  return (
    <div className={styles.container}>
      <div className={styles.Content}>
        <Items />
        <Comments />
      </div>
    </div>
  );
}
