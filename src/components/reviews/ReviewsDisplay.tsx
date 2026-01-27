import { Star, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { getItemReviews, Review } from "@/data/mockReviews";

interface ReviewsDisplayProps {
  itemId: string;
  showAll?: boolean;
}

export function ReviewsDisplay({ itemId, showAll = false }: ReviewsDisplayProps) {
  const itemReviews = getItemReviews(itemId);

  if (!itemReviews) {
    return null;
  }

  const reviewsToShow = showAll ? itemReviews.reviews : itemReviews.reviews.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex items-center gap-4 p-4 bg-secondary rounded-xl">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">{itemReviews.averageRating}</div>
          <div className="flex items-center gap-0.5 justify-center my-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= itemReviews.averageRating
                    ? "fill-accent text-accent"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <div className="text-xs text-muted-foreground">
            {itemReviews.totalReviews} avis
          </div>
        </div>
        
        {/* Rating bars */}
        <div className="flex-1 space-y-1">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = itemReviews.reviews.filter((r) => Math.floor(r.rating) === rating).length;
            const percentage = (count / itemReviews.reviews.length) * 100 || 0;
            return (
              <div key={rating} className="flex items-center gap-2 text-xs">
                <span className="w-3">{rating}</span>
                <Star className="w-3 h-3 fill-accent text-accent" />
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviewsToShow.map((review, index) => (
          <ReviewCard key={review.id} review={review} index={index} />
        ))}
      </div>

      {!showAll && itemReviews.reviews.length > 3 && (
        <button className="text-primary font-medium hover:underline">
          Voir tous les avis ({itemReviews.totalReviews})
        </button>
      )}
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-4 border border-border rounded-xl"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-semibold">
              {review.userName.charAt(0)}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{review.userName}</span>
              {review.verified && (
                <CheckCircle2 className="w-4 h-4 text-nature" />
              )}
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3 h-3 ${
                    star <= review.rating
                      ? "fill-accent text-accent"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">
          {new Date(review.date).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{review.comment}</p>
    </motion.div>
  );
}

interface RatingBadgeProps {
  rating: number;
  count?: number;
  size?: "sm" | "md";
}

export function RatingBadge({ rating, count, size = "md" }: RatingBadgeProps) {
  const sizeClasses = {
    sm: "text-xs gap-0.5 px-1.5 py-0.5",
    md: "text-sm gap-1 px-2 py-1",
  };

  const starSize = size === "sm" ? "w-3 h-3" : "w-4 h-4";

  return (
    <div
      className={`inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm ${sizeClasses[size]}`}
    >
      <Star className={`${starSize} fill-accent text-accent`} />
      <span className="font-semibold">{rating.toFixed(1)}</span>
      {count !== undefined && (
        <span className="text-muted-foreground">({count})</span>
      )}
    </div>
  );
}
