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
        setLoadingSuggested(false);
      }
    };

    fetchSelected();
    fetchRecommended();
    fetchSuggested();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {/* Title */}
        <div className="for-you__title">For You</div>
        <div className="for-you__sub--title" style={{ marginBottom: "24px" }}>
          Check out the daily selection and recommendations tailored for you.
        </div>

        {/* Selected Book (Daily Item) */}
        <div className="for-you__title" style={{ fontSize: "18px", marginBottom: "16px" }}>
          Daily Assortment
        </div>
        {loadingSelected ? (
          <SelectedBookSkeleton />
        ) : selectedBook ? (
          <div className="selected__book">
            <Link href={`/book/${selectedBook.id}`} className="selected__book--content">
              <figure className="selected__img--mask">
                <img
                  src={selectedBook.imageLink}
                  alt={selectedBook.title}
                  className="selected__img"
                />
              </figure>
              <div className="selected__book--text">
                <div className="selected__book--title">{selectedBook.title}</div>
                <div className="selected__book--author">{selectedBook.author}</div>
                <div className="selected__book--duration-wrapper">
                  <div className="selected__book--icon">
                    <AiOutlinePlayCircle style={{ color: "#fff" }} />
                  </div>
                  <div className="selected__book--duration">15 min</div>
                </div>
              </div>
            </Link>
            <div className="selected__book--line"></div>
            <div className="selected__book--sub-title">
              <div className="selected__book--title" style={{ fontSize: "16px", fontWeight: "600" }}>
                {selectedBook.subTitle}
              </div>
              <div className="selected__book--author" style={{ fontSize: "14px", fontWeight: "300" }}>
                {selectedBook.author}
              </div>
            </div>
          </div>
        ) : (
          <div className="finished__books--block-wrapper">
            <div className="finished__books--title">No selected book available today.</div>
          </div>
        )}

        {/* Recommended Section */}
        <div className="for-you__recommended--books-wrapper" style={{ marginTop: "40px" }}>
          <div className="for-you__title">Recommended for you</div>
          <div className="for-you__sub--title" style={{ marginBottom: "24px" }}>
            We think you&apos;ll enjoy these based on your reading preferences.
          </div>

          {loadingRecommended ? (
            <div className="recommended__books--skeleton-wrapper">
              {Array.from({ length: 5 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : recommendedBooks.length > 0 ? (
            <div className="for-you__recommended--books">
              {recommendedBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="finished__books--block-wrapper">
              <div className="finished__books--title">No recommendations available right now.</div>
            </div>
          )}
        </div>

        {/* Suggested Section */}
        <div className="for-you__recommended--books-wrapper" style={{ marginTop: "40px", marginBottom: "40px" }}>
          <div className="for-you__title">Suggested Books</div>
          <div className="for-you__sub--title" style={{ marginBottom: "24px" }}>
            Trending and top-rated books on Summarist.
          </div>

          {loadingSuggested ? (
            <div className="recommended__books--skeleton-wrapper">
              {Array.from({ length: 5 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : suggestedBooks.length > 0 ? (
            <div className="for-you__recommended--books">
              {suggestedBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="finished__books--block-wrapper">
              <div className="finished__books--title">No suggestions available right now.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
