"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { openAuthModal } from "@/redux/authSlice";
import { mockBilling, SubscriptionStatus } from "@/services/mockServices";

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
      <div className="container">
        <div className="row">
          <div className="section__title page__title">Settings</div>
          <div className="settings__login--wrapper">
            <img
              src="/login.png"
              alt="Login required"
              style={{ width: "100%", maxWidth: "460px", height: "auto", marginBottom: "16px" }}
            />
            <div className="settings__login--text">Log in to view your settings</div>
            <button
              onClick={() => dispatch(openAuthModal())}
              className="btn settings__login--btn"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isSubscribed = subStatus !== "basic";

  return (
    <div className="container">
      <div className="row">
        <div className="section__title page__title">Settings</div>

        {/* Subscription Plan Content */}
        <div className="setting__content">
          <div className="settings__sub--title">Your Subscription Plan</div>
          <div className="settings__text" style={{ textTransform: "capitalize", margin: "8px 0" }}>
            {subStatus === "basic" ? "Basic" : `Premium (${subStatus})`}
          </div>
          {isSubscribed ? (
            <button
              onClick={handleCancel}
              disabled={loadingAction}
              className="btn settings__upgrade--btn"
              style={{ backgroundColor: "#f56c6c", color: "#fff" }}
            >
              {loadingAction ? "Cancelling..." : "Cancel Subscription"}
            </button>
          ) : (
            <button
              onClick={handleUpgrade}
              className="btn settings__upgrade--btn"
            >
              Upgrade to Premium
            </button>
          )}
        </div>

        {/* Email Content */}
        <div className="setting__content">
          <div className="settings__sub--title">Email</div>
          <div className="settings__text" style={{ margin: "8px 0" }}>
            {user.email}
          </div>
        </div>
      </div>
    </div>
  );
}
