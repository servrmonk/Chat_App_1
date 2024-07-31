import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log(BASE_URL);

/* For login users */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkApi) => {
    console.log("userdata in authslice => ", userData);
    console.log("thunkApi in thunkApi => ", thunkApi);
    try {
      const response = await axios.post(`${BASE_URL}/user/login`, userData);
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

/* For Signup users */
export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/signup`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* Helper function to manage common states */
const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleFulfilled = (state, action) => {
  state.loading = false;
  state.user = action.payload;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
/* Auth Slice */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    console.log("Builder in extraReducers is ", builder);
    builder
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, handleFulfilled)
      .addCase(loginUser.rejected, handleRejected)
      .addCase(signUpUser.pending, handlePending)
      .addCase(signUpUser.fulfilled, handleFulfilled)
      .addCase(signUpUser.rejected, handleRejected);
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
