
import { Review } from "@/types";
import StarRating from "./StarRating";
import { formatDistanceToNow } from "date-fns";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="review-card">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-gray-800">{review.username}</h4>
          <StarRating rating={review.rating} size={14} />
        </div>
        <span className="text-sm text-gray-500">
          {review.createdAt}
        </span>
      </div>
      <p className="mt-2 text-gray-700">{review.content}</p>
    </div>
  );
};

export default ReviewCard;
