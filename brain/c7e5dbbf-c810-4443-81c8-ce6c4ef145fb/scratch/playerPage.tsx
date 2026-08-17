"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { openAuthModal } from "@/redux/authSlice";
import { markBookFinished, fetchLibrary } from "@/redux/librarySlice";
import { setBook } from "@/redux/playerSlice";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { Book } from "@/redux/playerSlice";
import confetti from "canvas-confetti";

import {
  AiOutlinePlayCircle,
  AiOutlinePauseCircle,
  AiOutlineUndo,
  AiOutlineRedo,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

import {
  BiVolumeFull,
  BiVolumeMute,
} from "react-icons/bi";

export default function AudioPlayerPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const [bookDetails, setBookDetails] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [speedDropdownOpen, setSpeedDropdownOpen] = useState(false);

  // Fetch book details
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
        );
        const data = await res.json();
        setBookDetails(data);
        dispatch(setBook(data));
      } catch (err) {
        console.error("Error fetching book details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();

    return () => {
      dispatch(setBook(null));
    };
  }, [id, dispatch]);

  // Fetch library when loaded
  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchLibrary(user.uid));
    }
  }, [user, dispatch]);

  // Callback when audio finishes playing
  const handleAudioEnded = () => {
    if (user?.uid) {
      dispatch(markBookFinished({ uid: user.uid, id }));
      
      // Trigger confetti!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#2bd97c", "#032b41", "#fb9b50", "#0365f2"],
      });

      alert("Congratulations! You've finished this book summary!");
    }
  };

  const {
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    volume,
    isMuted,
    togglePlay,
    seek,
    changeSpeed,
    skipForward,
    skipBackward,
    changeVolume,
    toggleMute,
  } = useAudioPlayer(bookDetails?.audioLink, handleAudioEnded);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center py-20 text-gray-500 gap-4">
        <AiOutlineLoading3Quarters size={40} className="animate-spin text-[#3ac27c]" />
        <span className="font-semibold text-sm">Loading audio player...</span>
      </div>
    );
  }

  if (!bookDetails) {
    return (
      <div className="w-full text-center py-20 text-gray-500">
        Audio content could not be loaded.
      </div>
    );
  }

  const speedOptions = [0.75, 1.0, 1.25, 1.5, 2.0];

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Upper Section: Book description / metadata */}
      <div className="flex flex-col md:flex-row gap-6 border-b border-gray-100 pb-8 items-center md:items-start text-center md:text-left">
        <div className="relative w-[100px] h-[150px] shadow-lg rounded-xl overflow-hidden shrink-0 bg-gray-50 border border-gray-100">
          <Image
            src={bookDetails.imageLink}
            alt={bookDetails.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-2">
          <h1 className="text-xl md:text-2xl font-black text-[#032b41] leading-tight">
            {bookDetails.title}
          </h1>
          <p className="text-sm font-semibold text-[#3ac27c]">{bookDetails.author}</p>
          <p className="text-xs text-gray-400 font-light max-w-[500px]">
            {bookDetails.subTitle}
          </p>
        </div>
      </div>

      {/* Main Interactive Audio Player UI */}
      <div className="bg-[#032b41] text-white rounded-2xl p-6 md:p-8 flex flex-col items-center gap-6 shadow-xl relative overflow-hidden select-none">
        {/* Subtle decorative background glow */}
        <div className="absolute -top-12 -left-12 w-36 h-36 rounded-full bg-[#3ac27c]/10 blur-xl"></div>
        <div className="absolute -bottom-12 -right-12 w-36 h-36 rounded-full bg-[#0365f2]/10 blur-xl"></div>

        {/* Controls Row */}
        <div className="flex items-center gap-8 z-10">
          {/* Skip Backward Button */}
          <button
            onClick={skipBackward}
            className="text-gray-400 hover:text-white transition-colors"
            title="Rewind 15 seconds"
          >
            <AiOutlineUndo size={28} />
          </button>

          {/* Main Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="text-[#2bd97c] hover:scale-105 transition-transform"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <AiOutlinePauseCircle size={68} />
            ) : (
              <AiOutlinePlayCircle size={68} />
            )}
          </button>

          {/* Skip Forward Button */}
          <button
            onClick={skipForward}
            className="text-gray-400 hover:text-white transition-colors"
            title="Fast-forward 15 seconds"
          >
            <AiOutlineRedo size={28} />
          </button>
        </div>

        {/* Timeline Slider Progress Row */}
        <div className="w-full flex items-center gap-4 z-10 text-xs font-semibold text-gray-300">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={(e) => seek(parseFloat(e.target.value))}
            className="flex-1 h-1.5 rounded-lg appearance-none cursor-pointer outline-none bg-gray-600 accent-[#2bd97c]"
          />
          <span>{formatTime(duration)}</span>
        </div>

        {/* Bottom Volume/Speed Controls Row */}
        <div className="w-full flex items-center justify-between border-t border-white/10 pt-4 z-10 text-sm">
          {/* Speed Selection */}
          <div className="relative">
            <button
              onClick={() => setSpeedDropdownOpen(!speedDropdownOpen)}
              className="text-gray-300 hover:text-white font-bold py-1.5 px-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
            >
              Speed: {playbackRate}x
            </button>
            {speedDropdownOpen && (
              <div className="absolute bottom-full mb-2 left-0 bg-[#04334d] border border-white/10 rounded-lg shadow-xl overflow-hidden flex flex-col divide-y divide-white/5">
                {speedOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      changeSpeed(opt);
                      setSpeedDropdownOpen(false);
                    }}
                    className={`py-2 px-5 text-xs text-left hover:bg-white/10 transition-colors ${
                      playbackRate === opt ? "text-[#2bd97c] font-bold" : "text-white"
                    }`}
                  >
                    {opt.toFixed(2)}x
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {isMuted || volume === 0 ? (
                <BiVolumeMute size={20} className="text-red-400" />
              ) : (
                <BiVolumeFull size={20} />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={isMuted ? 0 : volume}
              onChange={(e) => changeVolume(parseFloat(e.target.value))}
              className="w-20 h-1 rounded-lg appearance-none cursor-pointer outline-none bg-gray-600 accent-white"
            />
          </div>
        </div>
      </div>

      {/* Summary Text Paragraphs */}
      <div className="flex flex-col gap-4 border-t border-gray-150 pt-8 mt-4">
        <h2 className="text-xl font-bold text-[#032b41]">Summary</h2>
        <div className="whitespace-pre-line text-sm text-gray-600 font-light leading-relaxed">
          {bookDetails.summary}
        </div>
      </div>
    </div>
  );
}
