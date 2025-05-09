import { useState, useEffect } from "react";
import { FiX, FiUser, FiStar, FiClock } from "react-icons/fi";
import { updateReview, createReview } from "../../features/review/reviewThunk";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

export default function ReviewFormModal({ 
  isOpen, 
  onClose, 
  review, 
  employees, 
  editMode, 
  onSuccess,
  reviewerId
}) {
  const [formData, setFormData] = useState({
    employeeId: "",
    reviewDate: new Date().toISOString().split('T')[0],
    reviewPeriod: "Annual",
    overallScore: 5,
    reviewerId: reviewerId,
    ratings: {
      productivity: 3,
      communication: 3,
      teamwork: 3,
      leadership: 3,
      punctuality: 3,
    },
    feedback: "",
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (review) {
      setFormData({
        employeeId: review.employeeId._id || review.employeeId,
        reviewDate: new Date(review.reviewDate).toISOString().split('T')[0],
        reviewPeriod: review.reviewPeriod,
        overallScore: review.overallScore,
        ratings: review.ratings,
        feedback: review.feedback,
        reviewerId: review.reviewerId
      });
    }
  }, [review]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (category, value) => {
    setFormData(prev => ({
      ...prev,
      ratings: { ...prev.ratings, [category]: parseInt(value) }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      if (editMode) {
        dispatch(updateReview(review._id, formData))
          .then(onSuccess)
          .catch(error => toast.error(error.message));
      } else {
        dispatch(createReview(formData))
          .then(onSuccess)
          .catch(error => toast.error(error.message));
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.employeeId) errors.employeeId = "Employee is required";
    if (!formData.reviewPeriod) errors.reviewPeriod = "Review period is required";
    if (formData.overallScore < 1 || formData.overallScore > 10) {
      errors.overallScore = "Score must be between 1 and 10";
    }
    if (!formData.feedback.trim()) errors.feedback = "Feedback is required";
    return errors;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-base-100 rounded-box shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-base-300">
          <h3 className="text-xl font-bold text-base-content">
            {editMode ? "Edit Performance Review" : "Create Performance Review"}
          </h3>
          <button 
            onClick={onClose} 
            className="btn btn-circle btn-ghost btn-sm"
            aria-label="Close modal"
          >
            <FiX className="text-lg" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2 font-medium">
                  <FiUser className="text-base-content/70" /> Employee
                </span>
              </label>
              <select
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                className={`select select-bordered w-full ${errors.employeeId ? 'select-error' : ''}`}
                disabled={editMode}
              >
                <option value="">Select Employee</option>
                {employees?.map(emp => (
                  <option key={emp._id} value={emp._id}>
                    {emp.firstName} {emp.lastName} ({emp.position})
                  </option>
                ))}
              </select>
              {errors.employeeId && (
                <p className="mt-2 text-sm text-error">{errors.employeeId}</p>
              )}
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2 font-medium">
                  <FiClock className="text-base-content/70" /> Review Period
                </span>
              </label>
              <select
                name="reviewPeriod"
                value={formData.reviewPeriod}
                onChange={handleChange}
                className={`select select-bordered w-full ${errors.reviewPeriod ? 'select-error' : ''}`}
              >
                <option value="Quarterly">Quarterly</option>
                <option value="Bi-Annual">Bi-Annual</option>
                <option value="Annual">Annual</option>
              </select>
              {errors.reviewPeriod && (
                <p className="mt-2 text-sm text-error">{errors.reviewPeriod}</p>
              )}
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2 font-medium">
                  <FiStar className="text-base-content/70" /> Overall Score
                </span>
              </label>
              <div className="bg-base-200 p-4 rounded-box">
                <input
                  type="range"
                  name="overallScore"
                  min="1"
                  max="10"
                  value={formData.overallScore}
                  onChange={handleChange}
                  className="range range-primary range-sm"
                />
                <div className="w-full flex justify-between text-xs px-2 mt-1">
                  {[...Array(10)].map((_, i) => (
                    <span key={i} className="text-base-content/60">{i+1}</span>
                  ))}
                </div>
                <div className="text-center mt-3">
                  <span className="text-2xl font-bold text-primary">
                    {formData.overallScore}
                    <span className="text-lg font-normal text-base-content/60">/10</span>
                  </span>
                </div>
              </div>
              {errors.overallScore && (
                <p className="mt-2 text-sm text-error">{errors.overallScore}</p>
              )}
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Review Date</span>
              </label>
              <input
                type="date"
                name="reviewDate"
                value={formData.reviewDate}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold text-lg text-base-content">Detailed Ratings</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(formData.ratings).map(([category, score]) => (
                <div key={category} className="bg-base-200 p-4 rounded-box">
                  <label className="block mb-3 font-medium capitalize text-base-content">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={score}
                      onChange={(e) => handleRatingChange(category, e.target.value)}
                      className="range range-secondary range-xs"
                    />
                    <div className="w-full flex justify-between text-xs px-1">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <span key={num} className="text-base-content/60">{num}</span>
                      ))}
                    </div>
                    <div className="text-center">
                      <span className="font-bold text-secondary">{score}/5</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Feedback</span>
            </label>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              className={`m-3 textarea textarea-bordered h-16 ${errors.feedback ? 'textarea-error' : ''}`}
              placeholder="Provide detailed feedback..."
            ></textarea>
            {errors.feedback && (
              <p className="mt-2 text-sm text-error">{errors.feedback}</p>
            )}
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="btn btn-ghost border border-base-300"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              {editMode ? "Update Review" : "Create Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}