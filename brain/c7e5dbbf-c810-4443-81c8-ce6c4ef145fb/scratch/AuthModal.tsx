"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  closeAuthModal,
  loginUser,
  registerUser,
  loginAsGuest,
  clearError,
} from "@/redux/authSlice";
import { IoCloseSharp } from "react-icons/io5";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function AuthModal() {
  const dispatch = useAppDispatch();
  const { isAuthModalOpen, loading, error } = useAppSelector((state) => state.auth);

  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  // Clear errors when modal opens/closes or toggles tabs
  useEffect(() => {
    dispatch(clearError());
    setLocalError(null);
  }, [isAuthModalOpen, isLoginTab, dispatch]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!email.trim() || !password.trim()) {
      setLocalError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters long.");
      return;
    }

    if (isLoginTab) {
      dispatch(loginUser({ email, password }));
    } else {
      dispatch(registerUser({ email, password }));
    }
  };

  const handleGuestLogin = () => {
    dispatch(loginAsGuest());
  };

  // Human-readable error messages based on Firebase Auth error codes
  const getErrorMessage = () => {
    if (localError) return localError;
    if (!error) return null;

    switch (error) {
      case "auth/email-already-in-use":
        return "This email address is already registered.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/weak-password":
        return "Password is too weak. Please use at least 6 characters.";
      case "auth/user-not-found":
        return "No user found with this email. Please sign up!";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      default:
        return error;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      {/* Modal Container */}
      <div 
        className="relative bg-white w-full max-w-[800px] rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => dispatch(closeAuthModal())}
          className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-gray-800 transition-colors"
          aria-label="Close modal"
        >
          <IoCloseSharp size={24} />
        </button>

        {/* Left Side: Illustration (hidden on mobile) */}
        <div className="hidden md:flex flex-col justify-center items-center bg-[#032b41] text-white p-8 w-1/2">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Welcome to Summarist</h3>
            <p className="text-sm text-gray-300">
              {isLoginTab
                ? "Log in to access key insights from the best non-fiction books."
                : "Create an account to track your progress and unlock premium summaries."}
            </p>
          </div>
          <div className="relative w-full h-[220px] mb-4">
            <Image
              src="/login.png"
              alt="Welcome Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center bg-white">
          <h2 className="text-2xl font-bold text-[#032b41] text-center mb-6">
            {isLoginTab ? "Log in to Summarist" : "Sign up for Summarist"}
          </h2>

          {/* Social / Guest Logins */}
          <div className="flex flex-col gap-3 mb-6">
            <button
              onClick={handleGuestLogin}
              disabled={loading}
              className="flex items-center justify-center gap-3 w-full py-3 px-4 border border-[#3ac27c] bg-[#3ac27c]/10 text-[#032b41] font-medium rounded-xl hover:bg-[#3ac27c]/20 transition-all duration-200"
            >
              <FaUserAlt className="text-[#3ac27c]" />
              <span>Login as Guest</span>
            </button>

            <button
              onClick={handleGuestLogin} // Using guest login for mock google login
              disabled={loading}
              className="flex items-center justify-center gap-3 w-full py-3 px-4 border border-gray-300 bg-white text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200"
            >
              <FcGoogle size={20} />
              <span>Login with Google</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <span className="relative px-3 bg-white text-xs text-gray-400 uppercase">or</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email Input */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Email Address</label>
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.com"
                  disabled={loading}
                  className="w-full py-3 pl-10 pr-4 border border-gray-200 rounded-xl focus:border-[#3ac27c] focus:ring-2 focus:ring-[#3ac27c]/20 outline-none transition-all duration-200 text-sm"
                />
                <span className="absolute left-3.5 text-gray-400">@</span>
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Password</label>
              <div className="relative flex items-center">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  disabled={loading}
                  className="w-full py-3 pl-10 pr-4 border border-gray-200 rounded-xl focus:border-[#3ac27c] focus:ring-2 focus:ring-[#3ac27c]/20 outline-none transition-all duration-200 text-sm"
                />
                <FaLock className="absolute left-3.5 text-gray-400" />
              </div>
            </div>

            {/* Error Message */}
            {getErrorMessage() && (
              <p className="text-xs text-red-500 font-medium bg-red-50 p-2.5 rounded-lg border border-red-100">
                {getErrorMessage()}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-3 bg-[#2bd97c] text-[#032b41] font-bold rounded-xl hover:bg-[#20ba68] disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-all duration-200 flex justify-center items-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#032b41] border-t-transparent rounded-full animate-spin"></div>
              ) : isLoginTab ? (
                "Log In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Toggle Tab */}
          <div className="text-center mt-6 text-sm text-gray-600">
            {isLoginTab ? "New to Summarist? " : "Already have an account? "}
            <button
              onClick={() => setIsLoginTab(!isLoginTab)}
              disabled={loading}
              className="text-[#3ac27c] font-bold hover:underline"
            >
              {isLoginTab ? "Create one here" : "Log in here"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
