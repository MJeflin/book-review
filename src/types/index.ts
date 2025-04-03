
export type User = {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  coverImage: string;
  avgRating: number;
};

export type Review = {
  id: string;
  bookId: string;
  userId: string;
  username: string;
  rating: number;
  content: string;
  createdAt: string;
};

export type Category = {
  id: string;
  name: string;
};
