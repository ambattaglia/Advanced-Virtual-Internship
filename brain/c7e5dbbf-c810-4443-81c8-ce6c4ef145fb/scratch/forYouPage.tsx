"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Book } from "@/redux/playerSlice";
import BookCard from "@/components/BookCard";
import { CardSkeleton, SelectedBookSkeleton } from "@/components/BookSkeleton";
import { AiOutlinePlayCircle } from "react-icons/ai";

export default function ForYou() {
  const router = useRouter();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);

  const [loadingSelected, setLoadingSelected] = useState(true);
  const [loadingRecommended, setLoadingRecommended] = useState(true);
  const [loadingSuggested, setLoadingSuggested] = useState(true);

  // Fetch Selected Book
  useEffect(() => {
    const fetchSelected = async () => {
      try {
        const res = await fetch(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
        );
        const data = await res.json();
        const book = Array.isArray(data) ? data[0] : data;
        setSelectedBook(book);
      } catch (err) {
        console.error("Error fetching selected book:", err);
      } finally {
        setLoadingSelected(false);
      }
    };

    const fetchRecommended = async () => {
      try {
        const res = await fetch(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
        );
        const data = await res.json();
        setRecommendedBooks(data || []);
      } catch (err) {
        console.error("Error fetching recommended books:", err);
      } finally {
        setRecommendedBooks((prev) => (prev.length > 0 ? prev : []));
        setLoadingRecommended(false);
      }
    };

    const fetchSuggested = async () => {
      try {
        const res = await fetch(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
        );
        const data = await res.json();
        setSuggestedBooks(data || []);
      } catch (err) {
        console.error("Error fetching suggested books:", err);
      } finally {
        setSuggestedBooks((prev) => (prev.length > 0 ? prev : []));
        setLoadingSuggested(false);
      }
    };

    fetchSelected();
    fetchRecommended();
    fetchSuggested();
  }, []);

  return (
    <div className="w-full flex flex-col gap-10">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-black text-[#032b41] mb-1.5">For You</h1>
        <p className="text-sm font-medium text-gray-500">
          Check out the daily selection and recommendations tailored for you.
        </p>
      </div>

      {/* Selected Book (Daily Item) */}
      <section>
        <h2 className="text-xl font-bold text-[#032b41] mb-4">Daily Assortment</h2>
        {loadingSelected ? (
          <SelectedBookSkeleton />
        ) : selectedBook ? (
          <Link
            href={`/book/${selectedBook.id}`}
            className="flex flex-col md:flex-row gap-6 bg-[#fb9b50] text-[#032b41] rounded-2xl p-6 hover:shadow-lg transition-shadow cursor-pointer border border-[#fb9b50]/20"
          >
            {/* Cover */}
            <div className="relative w-[140px] h-[210px] md:w-[160px] md:h-[240px] shrink-0 mx-auto md:mx-0 shadow-lg rounded-lg overflow-hidden bg-gray-50">
              <Image
                src={selectedBook.imageLink}
                alt={selectedBook.title}
                fill
                sizes="(max-width: 768px) 140px, 160px"
                className="object-cover"
                priority
              />
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col justify-center text-center md:text-left gap-3">
              <h3 className="text-xl md:text-2xl font-black text-[#032b41] leading-tight">
                {selectedBook.title}
              </h3>
              <p className="text-sm font-bold text-gray-800">{selectedBook.author}</p>
              <p className="text-sm font-light text-gray-900 leading-relaxed max-w-[500px]">
                {selectedBook.subTitle}
              </p>

              {/* Action Button */}
              <div className="mt-3 flex items-center justify-center md:justify-start gap-2 text-sm font-bold text-[#032b41] bg-white w-fit px-5 py-3 rounded-xl hover:bg-gray-50 transition-colors select-none shadow-xs">
                <AiOutlinePlayCircle size={22} className="text-[#3ac27c]" />
                <span>Listen now</span>
              </div>
            </div>
          </Link>
        ) : (
          <div className="p-10 text-center bg-gray-50 border border-dashed border-gray-200 rounded-2xl text-gray-500">
            No selected book available today.
          </div>
        )}
      </section>

      {/* Recommended Section */}
      <section>
        <h2 className="text-xl font-bold text-[#032b41] mb-4">Recommended for you</h2>
        <p className="text-xs font-semibold text-gray-500 mb-6">
          We think you&apos;ll enjoy these based on your reading preferences.
        </p>

        {loadingRecommended ? (
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-none">
            {Array.from({ length: 5 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : recommendedBooks.length > 0 ? (
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            {recommendedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="p-10 text-center bg-gray-50 border border-dashed border-gray-200 rounded-2xl text-gray-500">
            No recommendations available right now.
          </div>
        )}
      </section>

      {/* Suggested Section */}
      <section>
        <h2 className="text-xl font-bold text-[#032b41] mb-4">Suggested Books</h2>
        <p className="text-xs font-semibold text-gray-500 mb-6">
          Trending and top-rated books on Summarist.
        </p>

        {loadingSuggested ? (
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-none">
            {Array.from({ length: 5 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : suggestedBooks.length > 0 ? (
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            {suggestedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="p-10 text-center bg-gray-50 border border-dashed border-gray-200 rounded-2xl text-gray-500">
            No suggestions available right now.
          </div>
        )}
      </section>
    </div>
  );
}
