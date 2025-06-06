
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
  // Non-Fiction (cat2)
  {
    id: "book7",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    category: "cat2",
    description: "A groundbreaking narrative of humanity's creation and evolution that explores how biology and history have defined us.",
    coverImage: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1776&auto=format&fit=crop",
    avgRating: 4.7,
  },
  {
    id: "book8",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "cat2",
    description: "An exploration of the two systems that drive the way we think—System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical.",
    coverImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop",
    avgRating: 4.6,
  },
  // Mystery (cat3)
  {
    id: "book9",
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    category: "cat3",
    description: "A gripping mystery that follows journalist Mikael Blomkvist and the enigmatic computer hacker Lisbeth Salander as they investigate a decades-old disappearance.",
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1374&auto=format&fit=crop",
    avgRating: 4.3,
  },
  {
    id: "book10",
    title: "Gone Girl",
    author: "Gillian Flynn",
    category: "cat3",
    description: "A psychological thriller about the disappearance of a woman on her fifth wedding anniversary and the twisted secrets that surface in the aftermath.",
    coverImage: "https://images.unsplash.com/photo-1610882648335-ced8fc8fa6b6?q=80&w=1887&auto=format&fit=crop",
    avgRating: 4.2,
  },
  // Fantasy (cat4)
  {
    id: "book11",
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    category: "cat4",
    description: "The first book in the Harry Potter series, which follows the journey of a young wizard who discovers his magical heritage.",
    coverImage: "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?q=80&w=1887&auto=format&fit=crop",
    avgRating: 4.8,
  },
  {
    id: "book12",
    title: "A Game of Thrones",
    author: "George R.R. Martin",
    category: "cat4",
    description: "The first book in the epic fantasy series 'A Song of Ice and Fire,' which inspired the popular television series.",
    coverImage: "https://images.unsplash.com/photo-1612036782180-6f0822045d55?q=80&w=1770&auto=format&fit=crop",
    avgRating: 4.7,
  },
  // Sci-Fi (cat5)
  {
    id: "book13",
    title: "Dune",
    author: "Frank Herbert",
    category: "cat5",
    description: "A complex sci-fi epic set on the desert planet Arrakis, which is the only source of the most valuable substance in the universe.",
    coverImage: "https://images.unsplash.com/photo-1606787619248-f301830a5a57?q=80&w=1770&auto=format&fit=crop",
    avgRating: 4.7,
  },
  {
    id: "book14",
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    category: "cat5",
    description: "A comedic sci-fi series that follows the adventures of Arthur Dent, an unwitting human who is saved from Earth's destruction by his friend Ford Prefect.",
    coverImage: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1769&auto=format&fit=crop",
    avgRating: 4.6,
  },
  // Biography (cat6)
  {
    id: "book15",
    title: "Steve Jobs",
    author: "Walter Isaacson",
    category: "cat6",
    description: "The authorized biography of Apple co-founder Steve Jobs, based on more than forty interviews with Jobs over two years.",
    coverImage: "https://images.unsplash.com/photo-1569698134101-f15cde5c0d3b?q=80&w=1335&auto=format&fit=crop",
    avgRating: 4.5,
  },
  {
    id: "book16",
    title: "Becoming",
    author: "Michelle Obama",
    category: "cat6",
    description: "A memoir by former United States first lady Michelle Obama published in 2018.",
    coverImage: "https://images.unsplash.com/photo-1603063550519-60d266242ed1?q=80&w=1780&auto=format&fit=crop",
    avgRating: 4.8,
  },
  // Poetry (cat7)
  {
    id: "book17",
    title: "Milk and Honey",
    author: "Rupi Kaur",
    category: "cat7",
    description: "A collection of poetry and prose about survival, the experience of violence, abuse, love, loss, and femininity.",
    coverImage: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?q=80&w=1770&auto=format&fit=crop",
    avgRating: 4.2,
  },
  {
    id: "book18",
    title: "The Sun and Her Flowers",
    author: "Rupi Kaur",
    category: "cat7",
    description: "A journey of wilting, falling, rooting, rising, and blooming. A celebration of love in all its forms.",
    coverImage: "https://images.unsplash.com/photo-1518843025960-d60217f226f5?q=80&w=1974&auto=format&fit=crop",
    avgRating: 4.3,
  },
  // History (cat8)
  {
    id: "book19",
    title: "Guns, Germs, and Steel",
    author: "Jared Diamond",
    category: "cat8",
    description: "A transdisciplinary non-fiction book that explores how geography, ecology, and environment shaped human history.",
    coverImage: "https://images.unsplash.com/photo-1562655607-97532463bc21?q=80&w=1887&auto=format&fit=crop",
    avgRating: 4.5,
  },
  {
    id: "book20",
    title: "The Silk Roads",
    author: "Peter Frankopan",
    category: "cat8",
    description: "A major reassessment of world history that offers an illuminating new perspective on the forces that have shaped the global economy and politics today.",
    coverImage: "https://images.unsplash.com/photo-1458682625221-3a45f8a844c7?q=80&w=1974&auto=format&fit=crop",
    avgRating: 4.4,
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
