import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "./authTypes";
import { api } from "../../api/axios";

// createAsyncThunk<
//   ReturnType,
//   ArgumentType,
//   ThunkConfig
// >   syntax = new learn

//initialize auth (page refresh)
export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",
  async (_, { rejectWithValue }) => {
    try {
      // RefreshToken cookie automatic send → new accessToken came
      const res = await api.post("/auth/refresh");
      return res.data.data as { accessToken: string; user: User };
    } catch(err) {
      console.error("Refresh failed:", err);
      return rejectWithValue(null);
    }
  }
);

// login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    data: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/auth/login", data);
      return res.data.data as { accessToken: string; user: User };
    } catch (err: unknown) {
      const error = err as import("axios").AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    data: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/auth/register", data);
      return res.data.data as { accessToken: string; user: User };
    } catch (err: unknown) {
      const error = err as import("axios").AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/auth/logout");
    } catch (err: unknown) {
      const error = err as import("axios").AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
  isInitialized: false, // it false still Refresh call got completed
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // here interceptor new accessToken update
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },

    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },

    // here interceptor refresh failed force logout
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.isInitialized = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isInitialized = true;
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isInitialized = true;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        // state.user = action.payload.user;    //if add (state, action)
        // state.accessToken = action.payload.accessToken;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isInitialized = true;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isInitialized = true;
      });
  },
});

export const { logout, setAccessToken } = authSlice.actions;
export default authSlice.reducer;