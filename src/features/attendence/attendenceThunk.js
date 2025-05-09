import api from '../../utils/api';
import { setLoading, setError, recordsFetched, employeeRecordsFetched, recordFetched, recordCreated, recordUpdated, recordDeleted, bulkRecordsCreated } from './attendenceSlice';

// Thunk for admins/managers to get all records with filters
export const fetchAllAttendance = (params = {}) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await api.get('/attendance', { params });
    dispatch(recordsFetched(data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
    throw error;
  }
};

// Thunk for employees to get their own records and summary
export const fetchEmployeeAttendance = (employeeId, params = {}) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await api.get(`/attendance/employee/${employeeId}/summary`, { params });
    dispatch(employeeRecordsFetched(data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
    throw error;
  }
};

// Thunk to get single record
export const fetchAttendanceRecord = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await api.get(`/attendance/${id}`);
    dispatch(recordFetched(data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
    throw error;
  }
};

// Thunk to create new record (employees can clock in/out)
export const createAttendanceRecord = (recordData) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await api.post('/attendance', recordData);
    dispatch(recordCreated(data.attendance));
    return data.attendance;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
    throw error;
  }
};

// Thunk to update record (admins/managers can edit any, employees only their own)
export const updateAttendanceRecord = (id, updateData, isAdmin = false) => async (dispatch, getState) => {
  try {
    dispatch(setLoading());
    
    // Employees can only update their own records for clock-out
    if (!isAdmin) {
      const { auth } = getState();
      const { data: record } = await api.get(`/attendance/${id}`);
      
      if (record.employeeId._id !== auth.user._id) {
        throw new Error('You can only update your own attendance records');
      }
      
      // Employees can only update clock-out time and location
      const allowedFields = ['clockOutTime', 'workLocation'];
      Object.keys(updateData).forEach(key => {
        if (!allowedFields.includes(key)) {
          delete updateData[key];
        }
      });
    }

    const { data } = await api.put(`/attendance/${id}`, updateData);
    dispatch(recordUpdated(data.record));
    return data.record;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
    throw error;
  }
};

// Thunk for managers to approve/reject records
export const updateAttendanceStatus = (id, statusData) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await api.patch(`/attendance/${id}/status`, statusData);
    dispatch(recordUpdated(data.record));
    return data.record;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
    throw error;
  }
};

// Thunk to delete record (admin only)
export const deleteAttendanceRecord = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    await api.delete(`/attendance/${id}`);
    dispatch(recordDeleted(id));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
    throw error;
  }
};

// Thunk for bulk create (admin only)
export const bulkCreateAttendance = (records) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await api.post('/attendance/bulk', { records });
    dispatch(bulkRecordsCreated(data.records));
    return data;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
    throw error;
  }
};