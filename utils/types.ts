export interface PostType {
  $id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: number;
  cover?: string;
}
