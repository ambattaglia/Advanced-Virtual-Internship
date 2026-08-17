"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Book } from "@/redux/playerSlice";
import { AiOutlineStar, AiOutlineClockCircle } from "react-icons/ai";

export default function BookCard({ book }: { book: Book }) {
  // Mock ratings and duration if API doesn't return them
  const rating = book.averageRating || 4.5;
  const ratingCount = book.totalRating || 120;
  const duration = "15 min"; // Mock duration

  return (
    <Link 
      href={`/book/${book.id}`}
      className="flex flex-col w-[160px] md:w-[200px] bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer shrink-0"
    >
      {/* Book Cover */}
      <div className="relative aspect-[2/3] w-full bg-gray-50 overflow-hidden">
        <Image
          src={book.imageLink}
          alt={book.title}
          fill
          sizes="(max-width: 768px) 160px, 200px"
          className="object-cover"
        />
        {book.subscriptionRequired && (
          <span className="absolute top-2.5 right-2.5 bg-[#0365f2] text-white text-[10px] font-bold py-1 px-2.5 rounded-full select-none shadow-xs uppercase tracking-wider">
            Premium
          </span>
        )}
      </div>

      {/* Book Details */}
      <div className="p-3.5 flex flex-col flex-1">
        <h4 className="font-bold text-sm text-[#032b41] truncate hover:text-[#3ac27c] transition-colors leading-tight mb-1" title={book.title}>
          {book.title}
        </h4>
        <p className="text-xs text-gray-500 font-medium truncate mb-2">{book.author}</p>
        <p className="text-xs text-gray-400 font-light truncate mb-2.5">{book.subTitle}</p>

        {/* Rating and Duration */}
        <div className="mt-auto flex items-center justify-between text-[11px] text-gray-400 font-medium">
          <div className="flex items-center gap-1">
            <AiOutlineStar className="text-amber-500" size={14} />
            <span>{rating.toFixed(1)}</span>
            <span className="text-gray-300">({ratingCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <AiOutlineClockCircle size={14} />
            <span>{duration}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
