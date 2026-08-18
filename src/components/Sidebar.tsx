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

  const handleAuthAction = () => {
    if (user) {
      dispatch(logoutUser());
    } else {
      dispatch(openAuthModal());
    }
  };

  const isTabActive = (path: string) => {
    return pathname.startsWith(path) && path !== "#";
  };

  return (
    <aside className="sidebar sidebar--closed">
      {/* Logo */}
      <div className="sidebar__logo">
        <Image
          src="/logo.png"
          alt="Summarist Logo"
          width={160}
          height={40}
          priority
          style={{ width: "100%", height: "40px", objectFit: "contain" }}
        />
      </div>

      <div className="sidebar__wrapper">
        {/* Navigation List */}
        <div className="sidebar__top">
          {/* For You */}
          <Link href="/for-you" className="sidebar__link--wrapper">
            <div className={`sidebar__link--line ${isTabActive("/for-you") ? "active--tab" : ""}`}></div>
            <div className="sidebar__icon--wrapper">
              <AiOutlineHome />
            </div>
            <div className="sidebar__link--text">For you</div>
          </Link>

          {/* Library */}
          <Link href="/library" className="sidebar__link--wrapper">
            <div className={`sidebar__link--line ${isTabActive("/library") ? "active--tab" : ""}`}></div>
            <div className="sidebar__icon--wrapper">
              <AiOutlineBook />
            </div>
            <div className="sidebar__link--text">My Library</div>
          </Link>

          {/* Highlights */}
          <div className="sidebar__link--wrapper sidebar__link--not-allowed" title="Highlights is coming soon">
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <AiOutlineHighlight />
            </div>
            <div className="sidebar__link--text">Highlights</div>
          </div>

          {/* Search */}
          <div className="sidebar__link--wrapper sidebar__link--not-allowed" title="Search from sidebar is coming soon">
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <AiOutlineSearch />
            </div>
            <div className="sidebar__link--text">Search</div>
          </div>
        </div>

        {/* Bottom List */}
        <div className="sidebar__bottom">
          {/* Settings */}
          <Link href="/settings" className="sidebar__link--wrapper">
            <div className={`sidebar__link--line ${isTabActive("/settings") ? "active--tab" : ""}`}></div>
            <div className="sidebar__icon--wrapper">
              <AiOutlineSetting />
            </div>
            <div className="sidebar__link--text">Settings</div>
          </Link>

          {/* Help */}
          <div className="sidebar__link--wrapper sidebar__link--not-allowed" title="Help & Support is coming soon">
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <AiOutlineQuestionCircle />
            </div>
            <div className="sidebar__link--text">Help &amp; Support</div>
          </div>

          {/* Login/Logout */}
          <div className="sidebar__link--wrapper" onClick={handleAuthAction}>
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              {user ? <AiOutlineLogout /> : <AiOutlineLogin />}
            </div>
            <div className="sidebar__link--text">{user ? "Logout" : "Login"}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
