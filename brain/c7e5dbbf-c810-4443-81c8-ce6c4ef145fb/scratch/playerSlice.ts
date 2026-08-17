import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Book {
  id: string;
  title: string;
  author: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating?: number;
  averageRating?: number;
  keyIdeas?: string;
  type?: string;
  status?: string;
  subscriptionRequired: boolean;
  summary: string;
  tags?: string[];
  bookDescription?: string;
  authorDescription?: string;
}

interface PlayerState {
  currentBook: Book | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
  volume: number;
  isMuted: boolean;
}

const initialState: PlayerState = {
  currentBook: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  playbackRate: 1,
  volume: 1,
  isMuted: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setBook: (state, action: PayloadAction<Book | null>) => {
      state.currentBook = action.payload;
      state.isPlaying = false;
      state.currentTime = 0;
      state.duration = 0;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setPlaybackRate: (state, action: PayloadAction<number>) => {
      state.playbackRate = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
      if (action.payload > 0) {
        state.isMuted = false;
      }
    },
    setIsMuted: (state, action: PayloadAction<boolean>) => {
      state.isMuted = action.payload;
    },
    resetPlayer: (state) => {
      return initialState;
    },
  },
});

export const {
  setBook,
  setIsPlaying,
  setCurrentTime,
  setDuration,
  setPlaybackRate,
  setVolume,
  setIsMuted,
  resetPlayer,
} = playerSlice.actions;

export default playerSlice.reducer;
