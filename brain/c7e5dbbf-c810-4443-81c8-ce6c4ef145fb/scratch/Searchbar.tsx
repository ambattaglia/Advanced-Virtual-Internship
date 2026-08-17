"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineSearch, AiOutlineLoading3Quarters } from "react-icons/ai";
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
    <div 
      ref={containerRef} 
      className="relative w-full max-w-[640px] z-30"
    >
      {/* Search Input Field */}
      <div className="relative flex items-center w-full bg-white border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-[#3ac27c] transition-all duration-200">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search by title or author..."
          className="w-full py-3.5 pl-5 pr-12 text-sm text-[#032b41] placeholder-gray-400 outline-none"
        />
        <div className="absolute right-4 text-gray-400 pointer-events-none">
          {loading ? (
            <AiOutlineLoading3Quarters size={20} className="animate-spin text-[#3ac27c]" />
          ) : (
            <AiOutlineSearch size={22} />
          )}
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && query.trim() && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl max-h-[360px] overflow-y-auto animate-fade-in divide-y divide-gray-100">
          {loading ? (
            <div className="p-6 flex flex-col justify-center items-center text-gray-500 gap-2 text-sm">
              <AiOutlineLoading3Quarters size={24} className="animate-spin text-[#3ac27c]" />
              <span>Searching books...</span>
            </div>
          ) : results.length > 0 ? (
            results.map((book) => (
              <div
                key={book.id}
                onClick={() => handleResultClick(book.id)}
                className="flex gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="relative w-12 h-16 shrink-0 bg-gray-100 rounded overflow-hidden">
                  <Image
                    src={book.imageLink}
                    alt={book.title}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <span className="font-bold text-sm text-[#032b41] truncate hover:text-[#3ac27c] transition-colors">
                    {book.title}
                  </span>
                  <span className="text-xs text-gray-500 truncate mt-0.5">
                    {book.author}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500 text-sm">
              No books found for &quot;<span className="font-semibold">{query}</span>&quot;
            </div>
          )}
        </div>
      )}
    </div>
  );
}
