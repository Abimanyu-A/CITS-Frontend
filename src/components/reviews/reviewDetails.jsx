import { FiStar, FiClock, FiUser, FiEdit2 } from "react-icons/fi";
import RatingIndicator from "../ui/RatingIndicator";

export default function ReviewDetails({ review, onEdit, isManager }) {
  if (!review) return null;

  return (
    <div className="bg-base-100 rounded-box shadow-md p-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-base-content">
            {isManager 
              ? `${review.employeeId.firstName} ${review.employeeId.lastName}'s Performance Review`
              : "Your Performance Review"}
          </h2>
          <div className="flex items-center gap-2 text-sm text-base-content/70">
            <FiClock className="text-base-content/50" />
            <span>
              {review.reviewPeriod} • {new Date(review.reviewDate).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        {isManager && (
          <button 
            onClick={onEdit}
            className="btn btn-sm btn-primary gap-2"
          >
            <FiEdit2 className="text-lg" />
            Edit Review
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-base-200 p-6 rounded-box border border-base-300">
          <div className="flex items-center gap-3 mb-4">
            <FiStar className="text-xl text-warning" />
            <h3 className="text-lg font-bold text-base-content">Overall Rating</h3>
          </div>
          <div className="flex items-center gap-6">
            <RatingIndicator score={review.overallScore} max={10} />
            <span className="text-3xl font-bold text-warning">
              {review.overallScore}
              <span className="text-lg font-normal text-base-content/60">/10</span>
            </span>
          </div>
        </div>
        
        <div className="bg-base-200 p-6 rounded-box border border-base-300">
          <div className="flex items-center gap-3 mb-4">
            <FiUser className="text-xl text-primary" />
            <h3 className="text-lg font-bold text-base-content">Reviewed By</h3>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-base-content">
              {review.reviewerId?.firstName} {review.reviewerId?.lastName}
            </p>
            <p className="text-sm text-base-content/60">
              {review.reviewerId?.position}
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-base-content">Detailed Ratings</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(review.ratings).map(([category, score]) => (
            <div key={category} className="bg-base-200 p-4 rounded-box border border-base-300">
              <h4 className="capitalize font-medium mb-3 text-base-content">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </h4>
              <div className="flex items-center gap-4">
                <RatingIndicator score={score} max={5} />
                <span className="font-bold text-secondary">
                  {score}<span className="text-base-content/60">/5</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-base-content">Feedback</h3>
        <div className="bg-base-200 p-6 rounded-box border border-base-300 whitespace-pre-wrap text-base-content">
          {review.feedback}
        </div>
      </div>
    </div>
  );
}