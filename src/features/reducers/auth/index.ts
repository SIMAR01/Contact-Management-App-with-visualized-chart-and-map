import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerAsync } from "../../actions/auth";

interface AuthState {
  status: string;
  authLoading: boolean;
  error?: string;
  register: any; // Adjust the type according to the shape of the register action payload
}

const initialState: AuthState = {
  status: "idle",
  authLoading: false,
  register: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // You can add additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      // register api cases
      .addCase(registerAsync.pending, (state) => {
        state.authLoading = true;
        state.status = "idle";
        state.error = undefined; // Clear any previous errors
      })
      .addCase(registerAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "200";
        state.authLoading = false;
        state.register = action.payload;
      })
      .addCase(registerAsync.rejected, (state, action: PayloadAction<string>) => {
        state.status = "idle";
        state.authLoading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const {} = authSlice.actions;
export default authSlice.reducer;
