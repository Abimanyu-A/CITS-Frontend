import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reviews: [],
  currentReview: null,
  reviewHistory: [],
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
};

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    reviewsFetched: (state, { payload }) => {
      state.reviews = payload.reviews;
      state.totalPages = payload.totalPages;
      state.currentPage = payload.currentPage;
      state.loading = false;
      state.error = null;
    },
    reviewFetched: (state, { payload }) => {
      state.currentReview = payload;
      state.loading = false;
      state.error = null;
    },
    reviewCreated: (state, { payload }) => {
      state.reviews.unshift(payload);
      state.loading = false;
      state.error = null;
    },
    reviewUpdated: (state, { payload }) => {
      const index = state.reviews.findIndex(r => r._id === payload._id);
      if (index !== -1) {
        state.reviews[index] = payload;
      }
      if (state.currentReview?._id === payload._id) {
        state.currentReview = payload;
      }
      state.loading = false;
      state.error = null;
    },
    reviewDeleted: (state, { payload }) => {
      state.reviews = state.reviews.filter(r => r._id !== payload);
      state.loading = false;
      state.error = null;
    },
    reviewHistoryFetched: (state, { payload }) => {
      state.reviewHistory = payload;
      state.loading = false;
      state.error = null;
    },
    employeeReviewsFetched: (state, { payload }) => {
      state.reviews = payload;
      state.loading = false;
      state.error = null;
    },
    resetReviewState: (state) => {
      state.currentReview = null;
      state.reviewHistory = [];
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setError,
  reviewsFetched,
  reviewFetched,
  reviewCreated,
  reviewUpdated,
  reviewDeleted,
  reviewHistoryFetched,
  employeeReviewsFetched,
  resetReviewState,
} = reviewSlice.actions;

export default reviewSlice.reducer;