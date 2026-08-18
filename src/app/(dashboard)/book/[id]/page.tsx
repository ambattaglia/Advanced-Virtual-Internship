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
      router.push("/choose-plan");
    } else {
      router.push(`/player/${book.id}`);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="row">
          <div className="inner__wrapper">
            <div className="inner__book--skeleton skeleton" style={{ width: "100%", height: "400px", borderRadius: "8px" }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container">
        <div className="row">
          <div className="section__title" style={{ textAlign: "center", color: "#6b757b" }}>
            Book details could not be found.
          </div>
        </div>
      </div>
    );
  }

  const rating = book.averageRating || 4.5;
  const ratingCount = book.totalRating || 120;
  const duration = "15 min";
  const keyIdeas = book.keyIdeas || "10 key ideas";
  const type = book.type || "Audio & Text";

  return (
    <div className="container">
      <div className="row">
        <div className="inner__wrapper">
          <div className="inner__book">
            <div className="inner-book__title">{book.title}</div>
            <div className="inner-book__author" style={{ fontWeight: "700" }}>By {book.author}</div>
            <div className="inner-book__sub--title">{book.subTitle}</div>

            {/* Book Metrics Grid */}
            <div className="inner-book__wrapper">
              <div className="inner-book__description--wrapper">
                <div className="inner-book__description">
                  <div className="inner-book__icon">
                    <AiOutlineStar style={{ color: "#3ac27c" }} />
                  </div>
                  <span>{rating.toFixed(1)} ({ratingCount} ratings)</span>
                </div>
                <div className="inner-book__description">
                  <div className="inner-book__icon">
                    <AiOutlineClockCircle />
                  </div>
                  <span>{duration}</span>
                </div>
                <div className="inner-book__description">
                  <div className="inner-book__icon">
                    <AiOutlineAudio />
                  </div>
                  <span>{type}</span>
                </div>
                <div className="inner-book__description">
                  <div className="inner-book__icon">
                    <AiOutlineBook />
                  </div>
                  <span>{keyIdeas}</span>
                </div>
              </div>
            </div>

            {/* Read/Listen CTAs */}
            <div className="inner-book__read--btn-wrapper">
              <button className="inner-book__read--btn" onClick={handleReadOrListen}>
                <div className="inner-book__read--icon">
                  <AiOutlineFileText />
                </div>
                <span>Read</span>
              </button>
              <button className="inner-book__read--btn" onClick={handleReadOrListen}>
                <div className="inner-book__read--icon">
                  <BiVolumeFull />
                </div>
                <span>Listen</span>
              </button>
            </div>

            {/* Library Bookmark Action */}
            <div className="inner-book__bookmark" onClick={handleLibraryAction} style={{ userSelect: "none" }}>
              <div className="inner-book__bookmark--icon">
                {isSaved ? <BsBookmarkDash style={{ color: "#f56c6c" }} /> : <BsBookmarkPlusFill style={{ color: "#3ac27c" }} />}
              </div>
              <span>{isSaved ? "Saved to Library" : "Save to Library"}</span>
            </div>

            {/* Tags and Description */}
            <div className="inner-book__secondary--title">What&apos;s inside?</div>
            <div className="inner-book__tags--wrapper">
              <div className="inner-book__tag">{keyIdeas}</div>
              <div className="inner-book__tag">{duration} summary</div>
            </div>
            <div className="inner-book__book--description">
              {book.bookDescription ||
                "This book provides actionable insights and powerful principles to transform your perspective. Discover the core values, key decisions, and habits that separate high-performers from the rest of the world."}
            </div>

            {/* Author Section */}
            <div className="inner-book__author--title">About the Author</div>
            <div className="inner-book__author--description">
              {book.authorDescription ||
                `${book.author} is a highly acclaimed author and subject matter expert. Their work focuses on personal development, strategic decision-making, and structural transformation.`}
            </div>
          </div>

          {/* Book Cover mask */}
          <div className="inner-book--img-wrapper">
            <img src={book.imageLink} alt={book.title} className="inner-book__img" style={{ maxWidth: "220px", borderRadius: "8px" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
