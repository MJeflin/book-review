
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import StarRating from "@/components/StarRating";
import ReviewCard from "@/components/ReviewCard";
import ReviewForm from "@/components/ReviewForm";
import { Button } from "@/components/ui/button";
import { Book, Review } from "@/types";
import { books, reviews as mockReviews, categories } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const BookDetail = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { toast } = useToast();
  
  // Simulate fetching book and reviews from API
  useEffect(() => {
    if (bookId) {
      const foundBook = books.find(b => b.id === bookId);
      if (foundBook) {
        setBook(foundBook);
      }
      
      const bookReviews = mockReviews.filter(r => r.bookId === bookId);
      setReviews(bookReviews);
    }
  }, [bookId]);
  
  const handleSubmitReview = (rating: number, content: string) => {
    const newReview: Review = {
      id: `rev${Date.now()}`,
      bookId: bookId || "",
      userId: "currentUser", // In a real app, this would be the logged-in user's ID
      username: "You", // In a real app, this would be the logged-in user's name
      rating,
      content,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setReviews([newReview, ...reviews]);
    setShowReviewForm(false);
    
    toast({
      title: "Review submitted",
      description: "Your review has been successfully submitted.",
    });
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-gray-500">Book not found.</p>
        </div>
      </div>
    );
  }

  const category = categories.find(c => c.id === book.category);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Book Cover */}
            <div className="md:col-span-1">
              <div className="aspect-[2/3] overflow-hidden rounded-md">
                <img 
                  src={book.coverImage} 
                  alt={`${book.title} cover`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Book Details */}
            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>
              <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
              
              <div className="flex items-center mb-4">
                <StarRating rating={book.avgRating} size={24} showValue={true} />
                <span className="ml-2 text-sm text-gray-500">
                  ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                </span>
              </div>
              
              <div className="mb-4">
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  {category?.name || 'Unknown Category'}
                </span>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-gray-700">{book.description}</p>
              </div>
              
              <Button 
                onClick={() => setShowReviewForm(!showReviewForm)} 
                className="mb-8"
              >
                {showReviewForm ? "Cancel Review" : "Write a Review"}
              </Button>
              
              {showReviewForm && (
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Write Your Review</h3>
                  <ReviewForm bookId={book.id} onSubmitReview={handleSubmitReview} />
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Reviews Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Reviews</h2>
          
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No reviews yet. Be the first to review this book!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
