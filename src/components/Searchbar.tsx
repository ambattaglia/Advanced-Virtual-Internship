"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineSearch, AiOutlineLoading3Quarters } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { Book } from "@/redux/playerSlice";

export default function Searchbar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounced search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const delayDebounceFn = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(
            query
          )}`
        );
        const data = await res.json();
        setResults(data || []);
      } catch (err) {
        console.error("Search API Error:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = (id: string) => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    router.push(`/book/${id}`);
  };

  return (
    <div className="search__background" ref={containerRef}>
      <div className="search__wrapper">
        {/* Search Content wrapper */}
        <div className="search__content">
          <div className="search">
            <div className="search__input--wrapper">
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                placeholder="Search for books"
                className="search__input"
              />
              <div className="search__icon">
                {loading ? (
                  <AiOutlineLoading3Quarters className="animate-spin text-[#3ac27c]" />
                ) : (
                  <AiOutlineSearch />
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar toggle button (mobile only) */}
          <div className="sidebar__toggle--btn">
            <RxHamburgerMenu />
          </div>
        </div>

        {/* Search Results Dropdown */}
        {isOpen && query.trim() && (
          <div className="search__books--wrapper">
            {loading ? (
              <div style={{ padding: "16px", textAlign: "center", color: "#6b757b" }}>
                Searching books...
              </div>
            ) : results.length > 0 ? (
              results.map((book) => (
                <div
                  key={book.id}
                  onClick={() => handleResultClick(book.id)}
                  className="search__book--link"
                  style={{ cursor: "pointer" }}
                >
                  <figure className="search__book--img-mask">
                    <img
                      src={book.imageLink}
                      alt={book.title}
                      className="search__book--img"
                    />
                  </figure>
                  <div>
                    <div className="search__book--title">{book.title}</div>
                    <div className="search__book--author">{book.author}</div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: "16px", textAlign: "center", color: "#6b757b" }}>
                No books found for "{query}"
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
