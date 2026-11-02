
import React from 'react';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, interactive = false }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onRatingChange?.(star)}
          className={`${interactive ? 'cursor-pointer active:scale-125' : 'cursor-default'} transition-transform`}
        >
          <span className={`text-xl ${star <= rating ? 'text-yellow-400' : 'text-gray-200'}`}>
            ★
          </span>
        </button>
      ))}
    </div>
  );
};

export default StarRating;
