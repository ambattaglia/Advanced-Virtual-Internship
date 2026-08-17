"use client";

import { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "@/redux/store";
import { setIsPlaying as setReduxIsPlaying, setCurrentTime as setReduxCurrentTime, setDuration as setReduxDuration } from "@/redux/playerSlice";

export function useAudioPlayer(audioUrl: string | undefined, onEndedCallback?: () => void) {
  const dispatch = useAppDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [volume, setVolume] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio
  useEffect(() => {
    if (!audioUrl) return;

    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    // Event listeners
    const onLoadedMetadata = () => {
      setDuration(audio.duration);
      dispatch(setReduxDuration(audio.duration));
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      dispatch(setReduxCurrentTime(audio.currentTime));
    };

    const onEnded = () => {
      setIsPlaying(false);
      dispatch(setReduxIsPlaying(false));
      if (onEndedCallback) {
        onEndedCallback();
      }
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    // Set initial values
    audio.playbackRate = playbackRate;
    audio.volume = isMuted ? 0 : volume;

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audioRef.current = null;
    };
  }, [audioUrl, dispatch]);

  // Sync controls with audio ref
  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      dispatch(setReduxIsPlaying(true));
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      dispatch(setReduxIsPlaying(false));
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
      dispatch(setReduxCurrentTime(time));
    }
  };

  const changeSpeed = (rate: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
    setPlaybackRate(rate);
  };

  const skipForward = () => {
    if (audioRef.current) {
      const newTime = Math.min(audioRef.current.currentTime + 15, duration);
      seek(newTime);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      const newTime = Math.max(audioRef.current.currentTime - 15, 0);
      seek(newTime);
    }
  };

  const changeVolume = (vol: number) => {
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
    setVolume(vol);
    if (vol > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.volume = !isMuted ? 0 : volume;
    }
    setIsMuted(!isMuted);
  };

  return {
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    volume,
    isMuted,
    play,
    pause,
    togglePlay,
    seek,
    changeSpeed,
    skipForward,
    skipBackward,
    changeVolume,
    toggleMute,
  };
}
