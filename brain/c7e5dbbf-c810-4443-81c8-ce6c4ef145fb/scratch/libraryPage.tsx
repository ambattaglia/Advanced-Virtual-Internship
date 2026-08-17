"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { openAuthModal } from "@/redux/authSlice";
import { fetchLibrary } from "@/redux/librarySlice";
import { AiOutlineBook, AiOutlineCheckCircle } from "react-icons/ai";
import { IoBookOutline } from "react-icons/io5";

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
      <div className="w-full flex flex-col justify-center items-center py-16 gap-6 text-center select-none animate-fade-in max-w-[500px] mx-auto">
        <div className="relative w-full h-[220px]">
          <Image
            src="/login.png"
            alt="Login required"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h2 className="text-2xl font-black text-[#032b41]">Log in to view your library</h2>
        <p className="text-sm font-light text-gray-500 max-w-[320px] leading-relaxed">
          Track books you want to read, save your key ideas, and view your reading history.
        </p>
        <button
          onClick={() => dispatch(openAuthModal())}
          className="px-8 py-3.5 bg-[#2bd97c] text-[#032b41] font-bold text-sm rounded-xl hover:bg-[#20ba68] transition-colors shadow-lg shadow-[#2bd97c]/10"
        >
          Login
        </button>
      </div>
    );
  }

  const currentList = activeTab === "saved" ? savedBooks : finishedBooks;

  return (
    <div className="w-full flex flex-col gap-8 animate-fade-in">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-black text-[#032b41] mb-1.5">My Library</h1>
        <p className="text-sm font-medium text-gray-500">
          Access your saved book summaries and review your finished catalog.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex border-b border-gray-200 text-sm font-bold text-gray-400 select-none">
        <button
          onClick={() => setActiveTab("saved")}
          className={`pb-4 px-6 relative transition-colors ${
            activeTab === "saved" ? "text-[#032b41]" : "hover:text-[#032b41]"
          }`}
        >
          <span>Saved Books</span>
          {savedBooks.length > 0 && (
            <span className="ml-2 py-0.5 px-2 bg-gray-100 text-xs rounded-full text-gray-500 font-semibold">
              {savedBooks.length}
            </span>
          )}
          {activeTab === "saved" && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#3ac27c] rounded-t-full"></div>
          )}
        </button>

        <button
          onClick={() => setActiveTab("finished")}
          className={`pb-4 px-6 relative transition-colors ${
            activeTab === "finished" ? "text-[#032b41]" : "hover:text-[#032b41]"
          }`}
        >
          <span>Finished</span>
          {finishedBooks.length > 0 && (
            <span className="ml-2 py-0.5 px-2 bg-gray-100 text-xs rounded-full text-gray-500 font-semibold">
              {finishedBooks.length}
            </span>
          )}
          {activeTab === "finished" && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#3ac27c] rounded-t-full"></div>
          )}
        </button>
      </div>

      {/* Listing Content Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 w-full border border-gray-150 rounded-xl overflow-hidden animate-pulse bg-white"
            >
              <div className="aspect-[2/3] w-full bg-gray-200"></div>
              <div className="p-4 flex flex-col gap-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : currentList.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {currentList.map((book) => (
            <Link
              key={book.id}
              href={`/book/${book.id}`}
              className="flex flex-col border border-gray-150 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-white"
            >
              <div className="relative aspect-[2/3] w-full bg-gray-50">
                <Image
                  src={book.imageLink}
                  alt={book.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover"
                />
                {activeTab === "finished" && (
                  <div className="absolute top-2 right-2 bg-[#2bd97c]/90 text-[#032b41] p-1.5 rounded-full shadow-xs">
                    <AiOutlineCheckCircle size={16} />
                  </div>
                )}
              </div>
              <div className="p-3.5 flex flex-col flex-1">
                <h3 className="font-bold text-sm text-[#032b41] truncate leading-tight hover:text-[#3ac27c] transition-colors mb-1">
                  {book.title}
                </h3>
                <p className="text-xs text-gray-500 font-medium truncate">{book.author}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-4 bg-gray-50/50 border border-dashed border-gray-200 rounded-2xl select-none max-w-[500px] mx-auto w-full">
          <IoBookOutline size={48} className="text-gray-300" />
          <div className="text-center px-4">
            <h3 className="font-bold text-base text-gray-700 mb-1">
              {activeTab === "saved" ? "Your library is empty" : "No finished summaries yet"}
            </h3>
            <p className="text-xs text-gray-400 max-w-[280px] leading-relaxed mx-auto">
              {activeTab === "saved"
                ? "Click 'Save to Library' on any book summary detail page to track it here."
                : "Listen to the end of any audio summary to automatically mark it as completed."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
