"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
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

export default function AudioPlayerPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const [bookDetails, setBookDetails] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

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
      <div className="audio__book--spinner">
        <AiOutlineLoading3Quarters size={64} className="animate-spin text-[#032b41]" />
      </div>
    );
  }

  if (!bookDetails) {
    return (
      <div className="container" style={{ padding: "40px", textAlign: "center", color: "#6b757b" }}>
        Audio content could not be loaded.
      </div>
    );
  }

  return (
    <div>
      {/* Scrollable Summary Text Area */}
      <div className="summary">
        <div className="audio__book--summary">
          <div className="audio__book--summary-title">
            <b>{bookDetails.title}</b>
          </div>
          <div className="audio__book--summary-text">
            {bookDetails.summary}
          </div>
        </div>
      </div>

      {/* Fixed Audio Player Footer */}
      <div className="audio__wrapper">
        {/* Track Details */}
        <div className="audio__track--wrapper">
          <figure className="audio__track--image-mask">
            <img src={bookDetails.imageLink} alt={bookDetails.title} className="audio__track--image" />
          </figure>
          <div className="audio__track--details-wrapper">
            <div className="audio__track--title" style={{ fontWeight: "600", fontSize: "14px" }}>
              {bookDetails.title}
            </div>
            <div className="audio__track--author" style={{ fontSize: "12px" }}>
              {bookDetails.author}
            </div>
          </div>
        </div>

        {/* Audio Controls */}
        <div className="audio__controls">
          <button className="audio__controls--btn" onClick={skipBackward} title="Rewind 15s">
            <AiOutlineUndo size={28} />
          </button>
          
          <button className="audio__controls--btn audio__controls--btn-play" onClick={togglePlay} title={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? (
              <AiOutlinePauseCircle size={32} style={{ color: "#042330" }} />
            ) : (
              <AiOutlinePlayCircle size={32} className="audio__controls--play-icon" style={{ color: "#042330" }} />
            )}
          </button>

          <button className="audio__controls--btn" onClick={skipForward} title="Forward 15s">
            <AiOutlineRedo size={28} />
          </button>
        </div>

        {/* Progress Bar & Time */}
        <div className="audio__progress--wrapper">
          <div className="audio__time">{formatTime(currentTime)}</div>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={(e) => seek(parseFloat(e.target.value))}
            className="audio__progress--bar"
          />
          <div className="audio__time">{formatTime(duration)}</div>
        </div>
      </div>
    </div>
  );
}
