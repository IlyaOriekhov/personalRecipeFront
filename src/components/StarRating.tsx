interface StarRatingProps {
  rating: number;
  totalRatings: number;
}

const StarRating = ({ rating, totalRatings }: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="text-2xl text-yellow-400">
          ★
        </span>
      ))}
      {halfStar && <span className="text-2xl text-yellow-400">½</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-2xl text-gray-300">
          ☆
        </span>
      ))}
      <span className="ml-2 text-sm text-gray-500">
        ({totalRatings} ratings)
      </span>
    </div>
  );
};

export default StarRating;
