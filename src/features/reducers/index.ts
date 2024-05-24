import { combineReducers } from "@reduxjs/toolkit";
import authSlice from './auth/index.ts'; // Import your auth slice

// Step 1: Define the shape of the entire Redux state
const rootReducer = combineReducers({
  auth: authSlice, // Include your auth slice reducer in the root reducer
  // Add other reducers here if there are more state slices
});

// Step 2: Define the type for the root state using ReturnType<typeof rootReducer>
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer; // Export the root reducer
