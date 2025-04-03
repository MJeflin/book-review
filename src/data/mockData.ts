
import { Book, Review, Category } from "../types";

export const categories: Category[] = [
  { id: "cat1", name: "Fiction" },
  { id: "cat2", name: "Non-Fiction" },
  { id: "cat3", name: "Mystery" },
  { id: "cat4", name: "Fantasy" },
  { id: "cat5", name: "Sci-Fi" },
  { id: "cat6", name: "Biography" },
  { id: "cat7", name: "Poetry" },
  { id: "cat8", name: "History" },
];

export const books: Book[] = [
  {
    id: "book1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "cat1",
    description: "A novel of the Jazz Age that follows the mysterious millionaire Jay Gatsby and his obsession with the beautiful Daisy Buchanan.",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=387&auto=format&fit=crop",
    avgRating: 4.5,
  },
  {
    id: "book2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "cat1",
    description: "The story of a young girl's coming-of-age in a small Southern town shadowed by racial prejudice.",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=774&auto=format&fit=crop",
    avgRating: 4.8,
  },
  {
    id: "book3",
    title: "1984",
    author: "George Orwell",
    category: "cat5",
    description: "A dystopian novel set in a totalitarian society where critical thought is suppressed under a surveillance state.",
    coverImage: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=388&auto=format&fit=crop",
    avgRating: 4.7,
  },
  {
    id: "book4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "cat1",
    description: "The story follows Elizabeth Bennet as she deals with issues of manners, upbringing, morality, education, and marriage.",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=387&auto=format&fit=crop",
    avgRating: 4.3,
  },
  {
    id: "book5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    category: "cat1",
    description: "The story of teenage alienation and loss of innocence in a cynical world.",
    coverImage: "https://images.unsplash.com/photo-1623645481161-0d8160281cbf?q=80&w=1740&auto=format&fit=crop",
    avgRating: 4.1,
  },
  {
    id: "book6",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    category: "cat4",
    description: "An epic high-fantasy novel that follows the quest to destroy the One Ring and defeat the Dark Lord Sauron.",
    coverImage: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?q=80&w=390&auto=format&fit=crop",
    avgRating: 4.9,
  },
];

export const reviews: Review[] = [
  {
    id: "rev1",
    bookId: "book1",
    userId: "user1",
    username: "John Doe",
    rating: 5,
    content: "A masterpiece that perfectly captures the Jazz Age.",
    createdAt: "2024-03-10",
  },
  {
    id: "rev2",
    bookId: "book1",
    userId: "user2",
    username: "Guest User",
    rating: 4,
    content: "Very well written, but I found some parts to be slow.",
    createdAt: "2024-03-15",
  },
  {
    id: "rev3",
    bookId: "book2",
    userId: "user3",
    username: "Alice Smith",
    rating: 5,
    content: "One of the most important American novels ever written.",
    createdAt: "2024-03-12",
  },
  {
    id: "rev4",
    bookId: "book3",
    userId: "user1",
    username: "John Doe",
    rating: 5,
    content: "Orwell's dystopian vision is frighteningly relevant today.",
    createdAt: "2024-03-08",
  },
];
