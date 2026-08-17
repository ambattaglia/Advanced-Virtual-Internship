"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { openAuthModal, logoutUser } from "@/redux/authSlice";
import {
  AiOutlineHome,
  AiOutlineBook,
  AiOutlineHighlight,
  AiOutlineSearch,
  AiOutlineSetting,
  AiOutlineQuestionCircle,
  AiOutlineLogin,
  AiOutlineLogout,
} from "react-icons/ai";

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const menuItems = [
    { name: "For you", path: "/for-you", icon: AiOutlineHome, disabled: false },
    { name: "Library", path: "/library", icon: AiOutlineBook, disabled: false },
    { name: "Highlights", path: "#", icon: AiOutlineHighlight, disabled: true },
    { name: "Search", path: "#", icon: AiOutlineSearch, disabled: true },
    { name: "Settings", path: "/settings", icon: AiOutlineSetting, disabled: false },
    { name: "Help & Support", path: "#", icon: AiOutlineQuestionCircle, disabled: true },
  ];

  const handleAuthAction = () => {
    if (user) {
      dispatch(logoutUser());
    } else {
      dispatch(openAuthModal());
    }
  };

  return (
    <aside className="w-[200px] md:w-[280px] bg-[#f7faf9] border-r border-gray-200 min-h-screen flex flex-col p-4 md:p-6 shrink-0 sticky top-0 h-screen select-none z-40">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="relative w-10 h-10 shrink-0">
          <Image
            src="/logo.png"
            alt="Summarist Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <span className="text-xl font-bold text-[#032b41] hidden md:inline">
          Summarist
        </span>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.path) && item.path !== "#";

          if (item.disabled) {
            return (
              <div
                key={item.name}
                className="flex items-center gap-4 py-3.5 px-4 text-[#032b41] rounded-xl opacity-50 cursor-not-allowed hover:bg-gray-100/50 transition-colors"
                title={`${item.name} is coming soon`}
              >
                <Icon size={22} className="shrink-0" />
                <span className="text-sm font-semibold hidden md:inline">
                  {item.name}
                </span>
              </div>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-4 py-3.5 px-4 text-[#032b41] rounded-xl font-semibold text-sm transition-all duration-150 ${
                isActive
                  ? "bg-[#2bd97c]/10 text-[#032b41] border-l-4 border-[#3ac27c] pl-3"
                  : "hover:bg-gray-100"
              }`}
            >
              <Icon size={22} className={`shrink-0 ${isActive ? "text-[#3ac27c]" : ""}`} />
              <span className="hidden md:inline">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Auth Control at the Bottom */}
      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={handleAuthAction}
          className="flex items-center gap-4 w-full py-3.5 px-4 text-[#032b41] rounded-xl font-semibold text-sm hover:bg-gray-100 transition-all duration-150 text-left"
        >
          {user ? (
            <>
              <AiOutlineLogout size={22} className="shrink-0" />
              <span className="hidden md:inline">Logout</span>
            </>
          ) : (
            <>
              <AiOutlineLogin size={22} className="shrink-0" />
              <span className="hidden md:inline">Login</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
