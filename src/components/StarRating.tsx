
import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  className?: string;
  showValue?: boolean;
}

const StarRating = ({
  rating,
  maxRating = 5,
  size = 16,
  className,
  showValue = false,
}: StarRatingProps) => {
  // Convert rating to array of star values
  const stars = Array.from({ length: maxRating }, (_, i) => {
    const starValue = i + 1;
    if (starValue <= rating) return 1; // Full star
    if (starValue - 0.5 <= rating) return 0.5; // Half star
    return 0; // Empty star
  });

  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex">
        {stars.map((star, index) => (
          <span key={index} className="text-book-accent">
            {star === 1 ? (
              <Star fill="#f59e0b" size={size} />
            ) : star === 0.5 ? (
              <StarHalf fill="#f59e0b" size={size} />
            ) : (
              <Star size={size} />
            )}
          </span>
        ))}
      </div>
      {showValue && (
        <span className="ml-2 text-sm text-gray-600">({rating.toFixed(1)})</span>
      )}
    </div>
  );
};

export default StarRating;
