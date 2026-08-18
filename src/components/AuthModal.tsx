"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  closeAuthModal,
  loginUser,
  registerUser,
  loginAsGuest,
  clearError,
} from "@/redux/authSlice";
import { IoCloseSharp } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";

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
    <div className="auth__wrapper" onClick={() => dispatch(closeAuthModal())}>
      <div className="auth" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <div className="auth__close--btn" onClick={() => dispatch(closeAuthModal())}>
          <IoCloseSharp />
        </div>

        <div className="auth__content">
          <div className="auth__title">
            {isLoginTab ? "Log in to Summarist" : "Sign up for Summarist"}
          </div>

          {/* Guest Login */}
          <button className="btn guest__btn--wrapper" onClick={handleGuestLogin} disabled={loading}>
            <div className="guest__icon--mask" style={{ display: "flex", alignItems: "center" }}>
              <FaUserAlt size={16} />
            </div>
            <span>Login as a Guest</span>
          </button>

          <div className="auth__separator">
            <div className="auth__separator--text">or</div>
          </div>

          {/* Google Login (mocked using guest login for this project) */}
          <button className="btn google__btn--wrapper" onClick={handleGuestLogin} disabled={loading}>
            <div className="google__icon--mask" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src="/google.png" alt="Google" style={{ width: "18px", height: "18px" }} />
            </div>
            <span>Login with Google</span>
          </button>

          <div className="auth__separator">
            <div className="auth__separator--text">or</div>
          </div>

          {/* Form */}
          <form className="auth__main--form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="auth__main--input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="auth__main--input"
            />

            {/* Error Message */}
            {getErrorMessage() && (
              <div className="auth__error" style={{ fontSize: "13px", textAlign: "center" }}>
                {getErrorMessage()}
              </div>
            )}

            <button type="submit" className="btn auth__btn" disabled={loading}>
              <span>{isLoginTab ? "Log in" : "Sign up"}</span>
            </button>
          </form>

          {isLoginTab && (
            <div className="auth__forgot--password">
              Forgot your password?
            </div>
          )}
        </div>

        {/* Tab switcher btn at the bottom */}
        <button className="auth__switch--btn" onClick={() => setIsLoginTab(!isLoginTab)} disabled={loading}>
          {isLoginTab ? "Sign up here" : "Log in here"}
        </button>
      </div>
    </div>
  );
}
