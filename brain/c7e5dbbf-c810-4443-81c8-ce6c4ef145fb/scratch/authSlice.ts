import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { mockAuth, User } from "@/services/mockServices";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthModalOpen: boolean;
}

const initialState: AuthState = {
  user: mockAuth.getCurrentUser(),
  loading: false,
  error: null,
  isAuthModalOpen: false,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const user = await mockAuth.register(email, password);
      return user;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const user = await mockAuth.login(email, password);
      return user;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const loginAsGuest = createAsyncThunk(
  "auth/loginGuest",
  async (_, { rejectWithValue }) => {
    try {
      const user = await mockAuth.loginGuest();
      return user;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await mockAuth.logout();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    openAuthModal: (state) => {
      state.isAuthModalOpen = true;
    },
    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthModalOpen = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthModalOpen = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Guest Login
      .addCase(loginAsGuest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsGuest.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthModalOpen = false;
      })
      .addCase(loginAsGuest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setUser, openAuthModal, closeAuthModal } = authSlice.actions;
export default authSlice.reducer;
