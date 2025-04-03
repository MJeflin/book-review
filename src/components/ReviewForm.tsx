
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

interface ReviewFormProps {
  bookId: string;
  onSubmitReview: (rating: number, content: string) => void;
}

const ReviewForm = ({ bookId, onSubmitReview }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0) {
      onSubmitReview(rating, content);
      setRating(0);
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your Rating
        </label>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 focus:outline-none"
            >
              <Star
                size={24}
                className={`transition-colors ${
                  (hoverRating || rating) >= star
                    ? "text-book-accent fill-book-accent"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="reviewContent"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Your Review
        </label>
        <Textarea
          id="reviewContent"
          placeholder="Share your thoughts about this book..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-24"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-book-primary hover:bg-blue-700"
        disabled={rating === 0}
      >
        Submit Review
      </Button>
    </form>
  );
};

export default ReviewForm;
