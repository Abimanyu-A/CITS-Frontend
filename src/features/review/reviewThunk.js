import api from '../../utils/api';
import { setLoading, setError, reviewsFetched, reviewFetched, reviewCreated, reviewUpdated, reviewDeleted, reviewHistoryFetched, employeeReviewsFetched } from './reviewSlice';

export const createReview = (reviewData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await api.post('/review', reviewData);
    dispatch(reviewCreated(data.review));
    return data;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
    throw error;
  }
};

export const getReview = (reviewId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await api.get(`/review/${reviewId}`);
    dispatch(reviewFetched(data));
    return data;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
    throw error;
  }
};

export const getAllReviews = (params = {}) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await api.get('/review', { params });
    dispatch(reviewsFetched(data));
    return data;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
    throw error;
  }
};

export const updateReview = (reviewId, reviewData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await api.put(`/review/${reviewId}`, reviewData);
    dispatch(reviewUpdated(data.review));
    return data;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
    throw error;
  }
};

export const deleteReview = (reviewId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await api.delete(`/review/ ${reviewId}`);
    dispatch(reviewDeleted(reviewId));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
    throw error;
  }
};

export const getEmployeeReviews = (employeeId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await api.get(`/review/employee/${employeeId}`);
    dispatch(employeeReviewsFetched(data));
    return data;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
    throw error;
  }
};

export const getReviewVersionHistory = (reviewId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await api.get(`/review/history/${reviewId}`);
    dispatch(reviewHistoryFetched(data));
    return data;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
    throw error;
  }
};