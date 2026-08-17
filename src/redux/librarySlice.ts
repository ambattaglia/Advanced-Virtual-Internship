import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { mockLibrary, LibraryBook } from "@/services/mockServices";

interface LibraryState {
  savedBooks: LibraryBook[];
  finishedBooks: LibraryBook[];
  loading: boolean;
  error: string | null;
}

const initialState: LibraryState = {
  savedBooks: [],
  finishedBooks: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchLibrary = createAsyncThunk(
  "library/fetchLibrary",
  async (uid: string, { rejectWithValue }) => {
    try {
      const items = mockLibrary.getLibrary(uid);
      return items;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const saveBookToLibrary = createAsyncThunk(
  "library/saveBook",
  async (
    { uid, book }: { uid: string; book: Omit<LibraryBook, "savedAt" | "finishedAt"> },
    { rejectWithValue }
  ) => {
    try {
      mockLibrary.saveBook(uid, book);
      // refetch to get updated list
      return mockLibrary.getLibrary(uid);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const removeBookFromLibrary = createAsyncThunk(
  "library/removeBook",
  async ({ uid, id }: { uid: string; id: string }, { rejectWithValue }) => {
    try {
      mockLibrary.unsaveBook(uid, id);
      return mockLibrary.getLibrary(uid);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const markBookFinished = createAsyncThunk(
  "library/markFinished",
  async ({ uid, id }: { uid: string; id: string }, { rejectWithValue }) => {
    try {
      mockLibrary.markFinished(uid, id);
      return mockLibrary.getLibrary(uid);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    clearLibrary: (state) => {
      state.savedBooks = [];
      state.finishedBooks = [];
    },
  },
  extraReducers: (builder) => {
    const handleFulfilled = (state: LibraryState, action: PayloadAction<LibraryBook[]>) => {
      state.loading = false;
      const allBooks = action.payload;
      // Filter saved vs finished
      // Saved books: any book in the list (or those not finished, but usually saved includes both, 
      // though typically saved means it's in the list and finished means it has finishedAt date).
      // Let's separate them: savedBooks is anything that is in the library list.
      // FinishedBooks is anything that has a finishedAt timestamp.
      state.savedBooks = allBooks; // all books that are added to library
      state.finishedBooks = allBooks.filter((b) => b.finishedAt !== undefined);
    };

    builder
      // Fetch
      .addCase(fetchLibrary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLibrary.fulfilled, handleFulfilled)
      .addCase(fetchLibrary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Save
      .addCase(saveBookToLibrary.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveBookToLibrary.fulfilled, handleFulfilled)
      .addCase(saveBookToLibrary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Remove
      .addCase(removeBookFromLibrary.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeBookFromLibrary.fulfilled, handleFulfilled)
      .addCase(removeBookFromLibrary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Finish
      .addCase(markBookFinished.pending, (state) => {
        state.loading = true;
      })
      .addCase(markBookFinished.fulfilled, handleFulfilled)
      .addCase(markBookFinished.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearLibrary } = librarySlice.actions;
export default librarySlice.reducer;
