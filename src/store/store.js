import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import empReducer from "../features/emp/empSlice";
import teamReducer from "../features/team/teamSlice"
import deptReducer from "../features/dept/deptSlice"
import reviewReducer from "../features/review/reviewSlice"
import attendanceReducer from "../features/attendence/attendenceSlice"

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Combine your reducers
const rootReducer = combineReducers({
  auth: authReducer,
  emp: empReducer,
  team: teamReducer,
  dept: deptReducer,
  review: reviewReducer,
  attendance: attendanceReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth","emp","team","dept"], 
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions from serializability warnings
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
