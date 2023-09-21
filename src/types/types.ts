export interface CommentInterface {
  text: string;
  color: string;
}

export interface ItemInterface {
  id: number;
  title: string;
  comments: CommentInterface[];
}

export interface ItemsInterface {
  items: ItemInterface[];
  comments: { text: string; color: string }[];
  selectedCommentsId: number;
}
