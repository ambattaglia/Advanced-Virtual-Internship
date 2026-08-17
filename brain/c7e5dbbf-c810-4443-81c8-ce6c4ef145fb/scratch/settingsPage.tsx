"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { openAuthModal } from "@/redux/authSlice";
import { mockBilling, SubscriptionStatus } from "@/services/mockServices";
import { AiOutlineLock, AiOutlineCrown, AiOutlineMail, AiOutlineUser } from "react-icons/ai";

export default function Settings() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [subStatus, setSubStatus] = useState<SubscriptionStatus>("basic");
  const [loadingAction, setLoadingAction] = useState(false);

  // Sync state with mock billing service
  useEffect(() => {
    if (user?.uid) {
      setSubStatus(mockBilling.getSubscriptionStatus(user.uid));
    }
  }, [user]);

  const handleUpgrade = () => {
    router.push("/choose-plan");
  };

  const handleCancel = async () => {
    if (!user?.uid) return;
    setLoadingAction(true);
    try {
      await mockBilling.cancelSubscription(user.uid);
      setSubStatus("basic");
      alert("Subscription cancelled successfully.");
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAction(false);
    }
  };

  // If user is not logged in, display the login CTA screen
  if (!user) {
    return (
      <div className="w-full flex flex-col justify-center items-center py-16 gap-6 text-center select-none animate-fade-in max-w-[500px] mx-auto">
        <div className="relative w-full h-[220px]">
          <Image
            src="/login.png"
            alt="Login required"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h2 className="text-2xl font-black text-[#032b41]">Log in to view your settings</h2>
        <p className="text-sm font-light text-gray-500 max-w-[320px] leading-relaxed">
          Manage your subscription plan, view your email, and customize your experience.
        </p>
        <button
          onClick={() => dispatch(openAuthModal())}
          className="px-8 py-3.5 bg-[#2bd97c] text-[#032b41] font-bold text-sm rounded-xl hover:bg-[#20ba68] transition-colors shadow-lg shadow-[#2bd97c]/10"
        >
          Login
        </button>
      </div>
    );
  }

  const isSubscribed = subStatus !== "basic";

  return (
    <div className="w-full flex flex-col gap-10 max-w-[600px] animate-fade-in">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-black text-[#032b41] mb-1.5">Settings</h1>
        <p className="text-sm font-medium text-gray-500">
          Manage your account profile and subscription details.
        </p>
      </div>

      {/* Profile Details */}
      <section className="bg-white border border-gray-150 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-xs">
        <h2 className="text-lg font-bold text-[#032b41] border-b border-gray-100 pb-3 flex items-center gap-2">
          <AiOutlineUser size={20} className="text-[#3ac27c]" />
          <span>Your Profile</span>
        </h2>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Email Address
          </label>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 text-sm text-[#032b41]">
            <AiOutlineMail size={18} className="text-gray-400" />
            <span className="font-semibold">{user.email}</span>
            {user.isGuest && (
              <span className="ml-auto text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-gray-200 px-2 py-0.5 rounded">
                Guest
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Subscription Card */}
      <section className="bg-white border border-gray-150 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-xs">
        <h2 className="text-lg font-bold text-[#032b41] border-b border-gray-100 pb-3 flex items-center gap-2">
          <AiOutlineCrown size={20} className="text-[#3ac27c]" />
          <span>Subscription details</span>
        </h2>

        {isSubscribed ? (
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-[#2bd97c]/10 text-[#3ac27c] rounded-full">
                <AiOutlineCrown size={28} />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#032b41] capitalize">
                  Summarist {subStatus}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Billed {subStatus === "premium" ? "Annually" : "Monthly"}.
                </p>
              </div>
              <span className="ml-auto text-xs font-bold text-[#3ac27c] bg-[#3ac27c]/10 px-3 py-1.5 rounded-full select-none">
                Active
              </span>
            </div>

            <button
              onClick={handleCancel}
              disabled={loadingAction}
              className="mt-2 w-full py-3.5 border border-red-200 text-red-500 hover:bg-red-50 font-bold rounded-xl text-sm transition-colors flex justify-center items-center disabled:opacity-50"
            >
              {loadingAction ? (
                <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Cancel Subscription"
              )}
            </button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-gray-100 text-gray-400 rounded-full">
                <AiOutlineLock size={28} />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#032b41]">Summarist Basic</h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Free tier with limited selected book summary access.
                </p>
              </div>
            </div>

            <button
              onClick={handleUpgrade}
              className="py-3.5 px-6 bg-[#2bd97c] hover:bg-[#20ba68] text-[#032b41] font-bold rounded-xl text-sm transition-colors text-center shadow-md shadow-[#2bd97c]/10 shrink-0"
            >
              Upgrade to Premium
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
