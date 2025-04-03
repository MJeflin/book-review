
import { Book } from "@/types";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const navigate = useNavigate();

  return (
    <div 
      className="book-card cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow" 
      onClick={() => navigate(`/book/${book.id}`)}
    >
      <div className="h-48 sm:h-60 overflow-hidden">
        <img 
          src={book.coverImage} 
          alt={`${book.title} cover`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="book-title font-semibold text-gray-800 text-lg">{book.title}</h3>
        <p className="book-author text-gray-600 mt-1">{book.author}</p>
        <div className="book-rating mt-2">
          <StarRating rating={book.avgRating} showValue={true} />
        </div>
      </div>
    </div>
  );
};

export default BookCard;
