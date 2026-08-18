"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Book } from "@/redux/playerSlice";
import { AiOutlineStar, AiOutlineClockCircle } from "react-icons/ai";

export default function BookCard({ book }: { book: Book }) {
  // Mock ratings and duration if API doesn't return them
  const rating = book.averageRating || 4.5;
  const duration = "15 min"; // Mock duration

  return (
    <Link href={`/book/${book.id}`} className="for-you__recommended--books-link">
      {book.subscriptionRequired && (
        <div className="book__pill">Premium</div>
      )}
      <figure className="recommended__book--img-mask">
        <img
          src={book.imageLink}
          alt={book.title}
          className="recommended__book--img"
        />
      </figure>
      <div className="recommended__book--title">{book.title}</div>
      <div className="recommended__book--author">{book.author}</div>
      <div className="recommended__book--sub-title">{book.subTitle}</div>
      <div className="recommended__book--details-wrapper">
        <div className="recommended__book--details">
          <div className="recommended__book--details-icon">
            <AiOutlineStar />
          </div>
          <span>{rating.toFixed(1)}</span>
        </div>
        <div className="recommended__book--details">
          <div className="recommended__book--details-icon">
            <AiOutlineClockCircle />
          </div>
          <span>{duration}</span>
        </div>
      </div>
    </Link>
  );
}
