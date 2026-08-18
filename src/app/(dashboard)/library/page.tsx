"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { openAuthModal } from "@/redux/authSlice";
import { fetchLibrary } from "@/redux/librarySlice";
import { CardSkeleton } from "@/components/BookSkeleton";

export default function Library() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { savedBooks, finishedBooks, loading } = useAppSelector((state) => state.library);
  const [activeTab, setActiveTab] = useState<"saved" | "finished">("saved");

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchLibrary(user.uid));
    }
  }, [user, dispatch]);

  if (!user) {
    return (
      <div className="container">
        <div className="row">
          <div className="section__title page__title">My Library</div>
          <div className="settings__login--wrapper">
            <img
              src="/login.png"
              alt="Login required"
              style={{ width: "100%", maxWidth: "460px", height: "auto", marginBottom: "16px" }}
            />
            <div className="settings__login--text">Log in to view your library</div>
            <button
              onClick={() => dispatch(openAuthModal())}
              className="btn settings__login--btn"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentList = activeTab === "saved" ? savedBooks : finishedBooks;

  return (
    <div className="container">
      <div className="row">
        <div className="section__title page__title">My Library</div>
        <div className="for-you__sub--title" style={{ marginBottom: "24px" }}>
          Access your saved book summaries and review your finished catalog.
        </div>

        {/* Tab Switcher */}
        <div style={{ display: "flex", gap: "24px", borderBottom: "1px solid #e1e7ea", paddingBottom: "16px", marginBottom: "32px", fontSize: "16px", fontWeight: "600", userSelect: "none" }}>
          <span
            onClick={() => setActiveTab("saved")}
            style={{
              cursor: "pointer",
              color: activeTab === "saved" ? "#032b41" : "#6b757b",
              borderBottom: activeTab === "saved" ? "3px solid #2bd97c" : "3px solid transparent",
              paddingBottom: "16px",
              marginBottom: "-17px",
            }}
          >
            Saved Books ({savedBooks.length})
          </span>
          <span
            onClick={() => setActiveTab("finished")}
            style={{
              cursor: "pointer",
              color: activeTab === "finished" ? "#032b41" : "#6b757b",
              borderBottom: activeTab === "finished" ? "3px solid #2bd97c" : "3px solid transparent",
              paddingBottom: "16px",
              marginBottom: "-17px",
            }}
          >
            Finished ({finishedBooks.length})
          </span>
        </div>

        {/* Listing Grid */}
        {loading ? (
          <div className="recommended__books--skeleton-wrapper">
            {Array.from({ length: 4 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : currentList.length > 0 ? (
          <div className="for-you__recommended--books" style={{ flexWrap: "wrap", overflowX: "unset", gap: "32px 16px" }}>
            {currentList.map((book) => (
              <Link key={book.id} href={`/book/${book.id}`} className="for-you__recommended--books-link" style={{ textDecoration: "none" }}>
                <figure className="recommended__book--img-mask">
                  <img
                    src={book.imageLink}
                    alt={book.title}
                    className="recommended__book--img"
                  />
                </figure>
                <div className="recommended__book--title">{book.title}</div>
                <div className="recommended__book--author">{book.author}</div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="finished__books--block-wrapper">
            <div className="finished__books--title">
              {activeTab === "saved"
                ? "You don't have any books saved!"
                : "You haven't finished any books yet!"}
            </div>
            <div className="finished__books--sub-title">
              Go back to explore books.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
