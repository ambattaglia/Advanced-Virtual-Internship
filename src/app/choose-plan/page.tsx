"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { openAuthModal } from "@/redux/authSlice";
import { mockBilling } from "@/services/mockServices";
import { AiOutlineCheckCircle, AiOutlinePlus, AiOutlineMinus, AiOutlineArrowLeft } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { BiCrown } from "react-icons/bi";
import { RiLeafLine } from "react-icons/ri";

export default function ChoosePlan() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [activePlan, setActivePlan] = useState<"yearly" | "monthly">("yearly");
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubscribe = async () => {
    if (!user) {
      dispatch(openAuthModal());
      return;
    }

    setLoading(true);
    try {
      const plan = activePlan === "yearly" ? "premium" : "premium-plus";
      await mockBilling.createCheckoutSession(user.uid, plan);
      router.push("/settings");
    } catch (err) {
      console.error("Subscription Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How does the free trial work?",
      a: "The yearly subscription comes with a 7-day free trial. If you cancel before the 7 days are up, you won't be charged anything. On the 7th day, you will be billed for the yearly rate.",
    },
    {
      q: "Can I cancel my subscription anytime?",
      a: "Yes, you can cancel your subscription at any time. Simply navigate to the settings page in your dashboard and click 'Cancel Subscription'. You will continue to have access to premium features until your billing cycle ends.",
    },
    {
      q: "What is included in the premium subscription?",
      a: "Premium subscription gives you unlimited access to text and audio summaries for all 5,000+ books on the Summarist platform, custom speed controls on the player, and personalized library tracking.",
    },
    {
      q: "What is the difference between Premium and Premium Plus?",
      a: "Premium is billed annually and contains a 7-day free trial. Premium Plus is billed monthly and allows you to pay month-to-month with no long-term commitment.",
    },
  ];

  return (
    <div className="plan" style={{ color: "#032b41", backgroundColor: "#fff", minHeight: "100vh" }}>
      {/* Plan Header */}
      <div className="plan__header--wrapper">
        <div className="plan__header">
          {/* Back Arrow */}
          <div
            onClick={() => router.back()}
            style={{
              position: "absolute",
              top: "24px",
              left: "24px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              color: "#fff",
              fontSize: "14px",
              gap: "4px",
              zIndex: 2,
            }}
          >
            <AiOutlineArrowLeft size={18} />
            <span>Back</span>
          </div>

          <div className="plan__title">
            Get unlimited access to <br />
            many book summaries
          </div>
          <div className="plan__sub--title" style={{ color: "#bac8ce" }}>
            Upgrade to premium to get all features.
          </div>
          <figure className="plan__img--mask">
            <img src="/pricing-top.png" alt="pricing" />
          </figure>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {/* Plan Features */}
          <div className="plan__features--wrapper">
            <div className="plan__features">
              <div className="plan__features--icon">
                <AiOutlineCheckCircle size={60} style={{ color: "#032b41" }} />
              </div>
              <div className="plan__features--text">
                <b>Key ideas in 15 mins</b>
                <br />
                Read or listen to the key takeaways of non-fiction bestsellers.
              </div>
            </div>
            <div className="plan__features">
              <div className="plan__features--icon">
                <BiCrown size={60} style={{ color: "#032b41" }} />
              </div>
              <div className="plan__features--text">
                <b>5,000+ Book summaries</b>
                <br />
                Huge library that grows weekly with new, popular releases.
              </div>
            </div>
            <div className="plan__features">
              <div className="plan__features--icon">
                <RiLeafLine size={60} style={{ color: "#032b41" }} />
              </div>
              <div className="plan__features--text">
                <b>Learn on the go</b>
                <br />
                Switch seamlessly between text and high-quality audio narrations.
              </div>
            </div>
          </div>

          {/* Pricing Selection */}
          <div className="section__title">Choose the plan that fits you</div>

          {/* Yearly Card */}
          <div
            className={`plan__card ${activePlan === "yearly" ? "plan__card--active" : ""}`}
            onClick={() => setActivePlan("yearly")}
          >
            <div className="plan__card--circle">
              {activePlan === "yearly" && <div className="plan__card--dot"></div>}
            </div>
            <div className="plan__card--content">
              <div className="plan__card--title">Yearly</div>
              <div className="plan__card--price">$99.99/year</div>
              <div className="plan__card--text">7-day free trial included</div>
            </div>
          </div>

          <div className="plan__card--separator">or</div>

          {/* Monthly Card */}
          <div
            className={`plan__card ${activePlan === "monthly" ? "plan__card--active" : ""}`}
            onClick={() => setActivePlan("monthly")}
          >
            <div className="plan__card--circle">
              {activePlan === "monthly" && <div className="plan__card--dot"></div>}
            </div>
            <div className="plan__card--content">
              <div className="plan__card--title">Monthly</div>
              <div className="plan__card--price">$9.99/month</div>
              <div className="plan__card--text">No commitment, cancel anytime</div>
            </div>
          </div>

          {/* Sticky CTA */}
          <div className="plan__card--cta">
            <button
              className="btn"
              onClick={handleSubscribe}
              disabled={loading}
              style={{ maxWidth: "300px" }}
            >
              {loading ? (
                "Loading..."
              ) : activePlan === "yearly" ? (
                "Start 7-day free trial"
              ) : (
                "Subscribe now"
              )}
            </button>
            <div className="plan__disclaimer">
              {activePlan === "yearly"
                ? "Cancel before trial ends to avoid charges."
                : "Safe checkout. Cancel subscription anytime."}
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="section__title" style={{ marginTop: "56px" }}>
            Frequently Asked Questions
          </div>
          <div style={{ marginBottom: "56px" }}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div className="accordion__card" key={index}>
                  <div className="accordion__header" onClick={() => toggleFaq(index)}>
                    <div className="accordion__title">{faq.q}</div>
                    <div className={`accordion__icon ${isOpen ? "accordion__icon--rotate" : ""}`}>
                      <IoIosArrowDown size={24} style={{ color: "#032b41" }} />
                    </div>
                  </div>
                  <div className={`collapse ${isOpen ? "show" : ""}`}>
                    <div className="accordion__body">{faq.a}</div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
