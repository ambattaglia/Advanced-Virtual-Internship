"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { openAuthModal } from "@/redux/authSlice";
import {
  saveBookToLibrary,
  removeBookFromLibrary,
  fetchLibrary,
} from "@/redux/librarySlice";
import { mockBilling } from "@/services/mockServices";
import { Book } from "@/redux/playerSlice";
import {
  AiOutlineStar,
  AiOutlineClockCircle,
  AiOutlineAudio,
  AiOutlineBook,
  AiOutlineFileText,
} from "react-icons/ai";
import { BsBookmarkDash, BsBookmarkPlusFill } from "react-icons/bs";
import { BiVolumeFull } from "react-icons/bi";

export default function BookDetails() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { savedBooks, loading: libraryLoading } = useAppSelector(
    (state) => state.library
  );

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  const isSaved = savedBooks.some((b) => b.id === id);

  // Fetch book details
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
        );
        const data = await res.json();
        setBook(data);
      } catch (err) {
        console.error("Error fetching book details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookDetails();
  }, [id]);

  // Fetch user library if user is logged in
  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchLibrary(user.uid));
    }
  }, [user, dispatch]);

  const handleLibraryAction = () => {
    if (!user) {
      dispatch(openAuthModal());
      return;
    }

    if (!book) return;

    if (isSaved) {
      dispatch(removeBookFromLibrary({ uid: user.uid, id: book.id }));
    } else {
      dispatch(
        saveBookToLibrary({
          uid: user.uid,
          book: {
            id: book.id,
            title: book.title,
            author: book.author,
            imageLink: book.imageLink,
          },
        })
      );
    }
  };

  const handleReadOrListen = () => {
    if (!user) {
      dispatch(openAuthModal());
      return;
    }

    if (!book) return;

    const subStatus = mockBilling.getSubscriptionStatus(user.uid);
    const hasPremiumAccess = subStatus !== "basic";

    if (book.subscriptionRequired && !hasPremiumAccess && !user.isGuest) {
      // Premium book, user is not subscribed and is not a guest -> sales page
      router.push("/choose-plan");
    } else {
      // Free book, user is subscribed, or user is guest -> player page
      router.push(`/player/${book.id}`);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex flex-col gap-10 animate-pulse">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-[180px] h-[270px] bg-gray-200 rounded-xl shrink-0 mx-auto lg:mx-0"></div>
          <div className="flex-1 flex flex-col justify-center gap-4">
            <div className="h-8 bg-gray-200 rounded w-2/3"></div>
            <div className="h-5 bg-gray-200 rounded w-1/4"></div>
            <div className="h-5 bg-gray-200 rounded w-1/3"></div>
            <div className="flex gap-4 mt-4">
              <div className="h-12 bg-gray-200 rounded-lg w-28"></div>
              <div className="h-12 bg-gray-200 rounded-lg w-28"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="w-full text-center py-20 text-gray-500">
        Book details could not be found.
      </div>
    );
  }

  // Mock metadata if not present
  const rating = book.averageRating || 4.5;
  const ratingCount = book.totalRating || 120;
  const duration = "15 min"; // Mock duration
  const keyIdeas = book.keyIdeas || "10 key ideas";
  const type = book.type || "Audio & Text";

  return (
    <div className="w-full flex flex-col gap-10">
      {/* Top Section: Cover & CTA */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-stretch">
        {/* Image */}
        <div className="relative w-[180px] h-[270px] lg:w-[220px] lg:h-[330px] shadow-2xl rounded-2xl overflow-hidden shrink-0 bg-gray-50 border border-gray-100">
          <Image
            src={book.imageLink}
            alt={book.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Text Details & Buttons */}
        <div className="flex-1 flex flex-col justify-center text-center lg:text-left">
          <h1 className="text-2xl lg:text-4xl font-black text-[#032b41] mb-2 leading-tight">
            {book.title}
          </h1>
          <p className="text-base font-bold text-gray-700 mb-2">By {book.author}</p>
          <p className="text-sm font-light text-gray-500 mb-6 max-w-[600px] leading-relaxed">
            {book.subTitle}
          </p>

          {/* Key details tags */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8 text-xs font-semibold text-gray-600 border-y border-gray-150 py-4">
            <div className="flex items-center gap-1.5">
              <AiOutlineStar className="text-amber-500" size={16} />
              <span>{rating.toFixed(1)}</span>
              <span className="text-gray-400">({ratingCount} ratings)</span>
            </div>
            <span className="text-gray-250">|</span>
            <div className="flex items-center gap-1.5">
              <AiOutlineClockCircle size={16} className="text-gray-500" />
              <span>{duration}</span>
            </div>
            <span className="text-gray-250">|</span>
            <div className="flex items-center gap-1.5">
              <AiOutlineAudio size={16} className="text-gray-500" />
              <span>{type}</span>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <button
              onClick={handleReadOrListen}
              className="flex items-center justify-center gap-3 bg-[#032b41] hover:bg-[#04334d] text-white font-bold py-3.5 px-8 rounded-xl text-sm transition-all duration-200 select-none shadow-md shadow-[#032b41]/10"
            >
              <AiOutlineFileText size={18} />
              <span>Read</span>
            </button>

            <button
              onClick={handleReadOrListen}
              className="flex items-center justify-center gap-3 bg-[#032b41] hover:bg-[#04334d] text-white font-bold py-3.5 px-8 rounded-xl text-sm transition-all duration-200 select-none shadow-md shadow-[#032b41]/10"
            >
              <BiVolumeFull size={18} />
              <span>Listen</span>
            </button>

            {/* Library toggle Button */}
            <button
              onClick={handleLibraryAction}
              disabled={libraryLoading}
              className={`flex items-center justify-center gap-2.5 font-bold py-3.5 px-6 rounded-xl text-sm transition-all duration-200 select-none border ${
                isSaved
                  ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100/50 hover:border-red-300"
                  : "border-gray-200 hover:bg-gray-50 text-[#032b41]"
              }`}
            >
              {isSaved ? (
                <>
                  <BsBookmarkDash size={16} />
                  <span>Remove from Library</span>
                </>
              ) : (
                <>
                  <BsBookmarkPlusFill size={16} className="text-[#3ac27c]" />
                  <span>Save to Library</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Summary & Author */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-6 border-t border-gray-100 pt-10">
        {/* About Book */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div>
            <h3 className="text-xl font-bold text-[#032b41] mb-3">What&apos;s inside?</h3>
            <p className="text-sm font-semibold text-gray-500 mb-4">{keyIdeas}</p>
            <div className="h-1.5 w-16 bg-[#2bd97c] rounded-full"></div>
          </div>
          <div className="flex flex-col gap-4 text-sm text-gray-600 font-light leading-relaxed">
            <h4 className="font-bold text-base text-[#032b41]">Book Description</h4>
            <p className="whitespace-pre-line">
              {book.bookDescription ||
                "This book provides actionable insights and powerful principles to transform your perspective. Discover the core values, key decisions, and habits that separate high-performers from the rest of the world."}
            </p>
          </div>
        </div>

        {/* About Author */}
        <div className="bg-[#f7faf9] rounded-2xl p-6 border border-gray-100 flex flex-col gap-4">
          <h3 className="text-lg font-bold text-[#032b41]">About the Author</h3>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
            Featured writer
          </p>
          <p className="text-sm text-gray-600 font-light leading-relaxed whitespace-pre-line">
            {book.authorDescription ||
              `${book.author} is a highly acclaimed author and subject matter expert. Their work focus on personal development, strategic decision-making, and structural transformation.`}
          </p>
        </div>
      </div>
    </div>
  );
}
