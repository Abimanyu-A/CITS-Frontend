import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  FiUser, FiEdit2, FiTrash2, FiPlus, FiSearch, 
  FiChevronLeft, FiChevronRight, FiClock, FiStar 
} from "react-icons/fi";
import { toast } from "react-toastify";
import { 
  getAllReviews, 
  getEmployeeReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  getReviewVersionHistory
} from "../../features/review/reviewThunk";
import { getAllEmployees } from "../../features/emp/empThunk";
import { resetReviewState, reviewFetched } from "../../features/review/reviewSlice";

import ReviewFormModal from "../../components/reviews/ReviewFormModal";
import ReviewDetails from "../../components/reviews/ReviewDetails";
import LoadingPage from "../../components/layout/LoadingPage";
import Table from "../../components/reviews/Table";
import Pagination from "../../components/layout/Pagination";

const ITEMS_PER_PAGE = 10;

export default function PerformanceReviewPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user.data);
  const { reviews, currentReview, reviewHistory, loading, totalPages, currentPage } = 
    useSelector((state) => state.review);
  const allEmployees = useSelector((state) => state.emp.allEmployees.data);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPage, setSelectedPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [viewMode, setViewMode] = useState("list"); // 'list', 'details', 'history'

  const isManagerOrHigher = ["ceo", "manager","vp"].includes(user?.role);

  useEffect(() => {
    if (isManagerOrHigher) {
      dispatch(getAllReviews({ page: selectedPage, limit: ITEMS_PER_PAGE }));
      dispatch(getAllEmployees());
    } else {
      dispatch(getEmployeeReviews(user?._id));
    }
  }, [dispatch, user, selectedPage, isManagerOrHigher]);

  const handleViewReview = (reviewId) => {
    dispatch(getReview(reviewId))
      .then(() => setViewMode("details"))
      .catch(error => toast.error(error.message));
  };

  const handleViewHistory = (reviewId) => {
    dispatch(getReviewVersionHistory(reviewId))
      .unwrap()
      .then(() => setViewMode("history"))
      .catch(error => toast.error(error.message));
  };

  const handleEditReview = (review) => {
    dispatch(getReview(review._id))
      .then(() => {
        setEditMode(true);
        setModalOpen(true);
      })
      .catch(error => toast.error(error.message));
  };

  const handleAddReview = () => {
    setEditMode(false);
    setModalOpen(true);
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      dispatch(deleteReview(reviewId))
        .unwrap()
        .then(() => toast.success("Review deleted successfully"))
        .catch(error => toast.error(error.message));
    }
  };

  const handleBackToList = () => {
    setViewMode("list");
    dispatch(resetReviewState());
  };

  const filteredReviews = isManagerOrHigher 
    ? reviews?.filter(review => 
        `${review.employeeId.firstName} ${review.employeeId.lastName}`
          .toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.reviewPeriod.toLowerCase().includes(searchTerm.toLowerCase())
      ) || []
    : reviews;

  const columns = isManagerOrHigher
    ? [
        { header: "Employee", accessor: (review) => `${review.employeeId.firstName} ${review.employeeId.lastName}` },
        { header: "Position", accessor: (review) => review.employeeId.position },
        { header: "Review Period", accessor: "reviewPeriod" },
        { header: "Overall Score", accessor: "overallScore" },
        { header: "Review Date", accessor: (review) => new Date(review.reviewDate).toLocaleDateString() },
        {
          header: "Actions",
          accessor: (review) => (
            <div className="flex gap-2">
              <button 
                onClick={() => handleViewReview(review._id)}
                className="btn btn-xs btn-info"
              >
                View
              </button>
              <button 
                onClick={() => handleEditReview(review)}
                className="btn btn-xs btn-warning"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDeleteReview(review._id)}
                className="btn btn-xs btn-error"
              >
                Delete
              </button>
            </div>
          ),
        },
      ]
    : [
        { header: "Review Period", accessor: "reviewPeriod" },
        { header: "Overall Score", accessor: "overallScore" },
        { header: "Review Date", accessor: (review) => new Date(review.reviewDate).toLocaleDateString() },
        {
          header: "Actions",
          accessor: (review) => (
            <div className="flex gap-2">
              <button 
                onClick={() => handleViewReview(review._id)}
                className="btn btn-xs btn-info"
              >
                View
              </button>
              <button 
                onClick={() => handleViewHistory(review._id)}
                className="btn btn-xs btn-secondary"
              >
                History
              </button>
            </div>
          ),
        },
      ];

  if (loading) return <LoadingPage />;

  return (
    <div className="bg-gradient-to-br from-base-300 to-base-200 min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">
              {viewMode === "details" ? "Review Details" : 
               viewMode === "history" ? "Review History" : "Performance Reviews"}
            </h1>
            <p className="text-gray-300 text-sm">
              {isManagerOrHigher 
                ? "Manage employee performance reviews" 
                : "View your performance reviews"}
            </p>
          </div>
          
          {viewMode === "list" && isManagerOrHigher && (
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search reviews..."
                  className="pl-10 pr-4 py-2 w-full rounded-full bg-base-100 border border-base-200 focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button
                onClick={handleAddReview}
                className="btn btn-primary"
              >
                <FiPlus /> Add Review
              </button>
            </div>
          )}
          
          {(viewMode === "details" || viewMode === "history") && (
            <button
              onClick={handleBackToList}
              className="btn btn-ghost"
            >
              <FiChevronLeft /> Back to list
            </button>
          )}
        </div>

        {/* Main Content */}
        {viewMode === "details" ? (
          <ReviewDetails 
            review={currentReview} 
            onEdit={() => handleEditReview(currentReview)}
            isManager={isManagerOrHigher}
          />
        ) : viewMode === "history" ? (
          <div className="bg-base-100 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Review Version History</h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Version</th>
                    <th>Date</th>
                    <th>Overall Score</th>
                    <th>Reviewed By</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviewHistory.map((version) => (
                    <tr key={version._id}>
                      <td>v{version.version}</td>
                      <td>{new Date(version.archivedAt).toLocaleDateString()}</td>
                      <td>{version.overallScore}</td>
                      <td>
                        {version.reviewerId?.firstName} {version.reviewerId?.lastName}
                      </td>
                      <td>
                        <button 
                          className="btn btn-xs btn-info"
                          onClick={() => {
                            dispatch(reviewFetched(version));
                            setViewMode("details");
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-base-100 rounded-lg shadow overflow-hidden">
              <Table 
                data={filteredReviews} 
                columns={columns} 
                emptyMessage="No performance reviews found"
              />
            </div>
            
            {isManagerOrHigher && totalPages > 1 && (
              <div className="mt-4">
                <Pagination 
                  currentPage={selectedPage}
                  totalPages={totalPages}
                  onPageChange={setSelectedPage}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Review Form Modal */}
      <ReviewFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        review={currentReview}
        employees={allEmployees}
        editMode={editMode}
        onSuccess={() => {
          if (isManagerOrHigher) {
            dispatch(getAllReviews({ page: selectedPage, limit: ITEMS_PER_PAGE }));
          } else {
            dispatch(getEmployeeReviews(user?._id));
          }
          setModalOpen(false);
        }}
        reviewerId = {user.employeeId}
      />
    </div>
  );
}