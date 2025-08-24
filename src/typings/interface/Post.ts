import type { Author } from "./Author";

export interface Post {
  id: number | string;
  title: string;
  body: string;
  authorId: number;
  userId: number;
  created_at: Date;
  updated_at: Date;
  author: Author;
}
