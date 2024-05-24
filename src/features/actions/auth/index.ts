import { createAsyncThunk } from "@reduxjs/toolkit";
import { register } from "../../services/auth";


// Define the type for the response
interface RegisterResponse {
  // Define the properties of the response object returned by the register function
  success: boolean;
  message: string;
  // Add other properties as needed
}

// Step 1: Define an async thunk action creator with createAsyncThunk
export const registerAsync = createAsyncThunk<RegisterResponse>(
  // Step 2: Specify a unique name for the action
  "auth/register",

  // Step 3: Define the async thunk function that performs the registration
  async () => {
    try {
      // Step 4: Dispatch the registration request to the backend service
      const response = await register();

      // Step 5: Return the response received from the backend
      return response;
    } catch (error) {
      // Step 6: Handle errors if registration fails
      throw error;
    }
  }
);

export default registerAsync; // Export the async thunk action creator

