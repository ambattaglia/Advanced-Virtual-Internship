"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { openAuthModal } from "@/redux/authSlice";
import { mockBilling } from "@/services/mockServices";
import { AiOutlineCheckCircle, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { IoArrowBackSharp } from "react-icons/io5";

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
      // Yearly represents "premium", Monthly represents "premium-plus" (or we can just set premium)
      const plan = activePlan === "yearly" ? "premium" : "premium-plus";
      await mockBilling.createCheckoutSession(user.uid, plan);
      router.push("/settings");
    } catch (err) {
      console.error("Subscription Error:", err);
    } finally {
      setLoading(false);
    }
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
    <div className="w-full flex flex-col min-h-screen bg-[#032b41] text-white">
      {/* Top Banner Header Image */}
      <div className="relative w-full h-[220px] md:h-[300px]">
        <Image
          src="/pricing-top.png"
          alt="Pricing banner"
          fill
          className="object-cover opacity-80"
          priority
        />
        {/* Back navigation */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 flex items-center gap-2 py-2 px-4 bg-black/40 hover:bg-black/60 rounded-xl font-semibold text-xs border border-white/10 transition-colors"
        >
          <IoArrowBackSharp size={16} />
          <span>Back</span>
        </button>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 bg-gradient-to-t from-[#032b41] via-transparent to-black/20">
          <h1 className="text-3xl md:text-5xl font-black mb-3">Get unlimited access</h1>
          <p className="text-sm md:text-base font-light text-gray-300">
            Join millions of people who learn faster and grow daily.
          </p>
        </div>
      </div>

      <div className="max-w-[800px] w-full mx-auto px-6 py-12 flex flex-col gap-16">
        {/* Plan Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left border-b border-white/10 pb-12">
          <div className="flex flex-col items-center md:items-start gap-3">
            <AiOutlineCheckCircle size={32} className="text-[#3ac27c]" />
            <h3 className="font-bold text-lg">Key ideas in 15 mins</h3>
            <p className="text-xs text-gray-300 font-light leading-relaxed">
              Read or listen to the key takeaways of non-fiction bestsellers.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start gap-3">
            <AiOutlineCheckCircle size={32} className="text-[#3ac27c]" />
            <h3 className="font-bold text-lg">5,000+ Book summaries</h3>
            <p className="text-xs text-gray-300 font-light leading-relaxed">
              Huge library that grows weekly with new, popular releases.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start gap-3">
            <AiOutlineCheckCircle size={32} className="text-[#3ac27c]" />
            <h3 className="font-bold text-lg">Learn on the go</h3>
            <p className="text-xs text-gray-300 font-light leading-relaxed">
              Switch seamlessly between text and high-quality audio narrations.
            </p>
          </div>
        </section>

        {/* Pricing Selection */}
        <section className="flex flex-col items-center gap-8">
          <h2 className="text-2xl font-bold">Choose the plan that fits you</h2>

          {/* Toggle buttons */}
          <div className="flex bg-[#04334d] border border-white/10 rounded-xl p-1 w-full max-w-[500px]">
            <button
              onClick={() => setActivePlan("yearly")}
              className={`flex-1 text-center py-3.5 rounded-lg text-sm font-bold transition-all duration-200 ${
                activePlan === "yearly"
                  ? "bg-[#2bd97c] text-[#032b41]"
                  : "text-white hover:bg-white/5"
              }`}
            >
              Yearly (Premium)
            </button>
            <button
              onClick={() => setActivePlan("monthly")}
              className={`flex-1 text-center py-3.5 rounded-lg text-sm font-bold transition-all duration-200 ${
                activePlan === "monthly"
                  ? "bg-[#2bd97c] text-[#032b41]"
                  : "text-white hover:bg-white/5"
              }`}
            >
              Monthly (Premium Plus)
            </button>
          </div>

          {/* Pricing Info Card */}
          <div className="w-full max-w-[500px] bg-[#04334d] border border-white/10 rounded-2xl p-8 flex flex-col items-center gap-6 shadow-xl">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-1">
                {activePlan === "yearly" ? "Summarist Premium" : "Summarist Premium Plus"}
              </h3>
              <p className="text-xs text-gray-300 font-light">
                {activePlan === "yearly"
                  ? "7-day free trial, then $99.99/year"
                  : "Billed monthly, cancel anytime for $9.99/month"}
              </p>
            </div>

            <div className="text-4xl font-black text-[#2bd97c]">
              {activePlan === "yearly" ? "$99.99" : "$9.99"}
              <span className="text-xs font-semibold text-gray-300 ml-1">
                /{activePlan === "yearly" ? "year" : "month"}
              </span>
            </div>

            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full py-4 bg-[#2bd97c] hover:bg-[#20ba68] text-[#032b41] font-bold rounded-xl transition-colors flex justify-center items-center shadow-lg shadow-[#2bd97c]/10"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#032b41] border-t-transparent rounded-full animate-spin"></div>
              ) : activePlan === "yearly" ? (
                "Start 7-day free trial"
              ) : (
                "Subscribe now"
              )}
            </button>

            <p className="text-[10px] text-gray-400 text-center font-light leading-relaxed">
              Cancel before trial ends to avoid charge. Safe checkout.
            </p>
          </div>
        </section>

        {/* FAQs Accordion */}
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-center mb-4">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-[#04334d] border border-white/10 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 flex items-center justify-between text-left font-bold text-sm hover:bg-white/2 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-[#2bd97c]">
                      {isOpen ? <AiOutlineMinus size={18} /> : <AiOutlinePlus size={18} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-gray-300 font-light leading-relaxed border-t border-white/5 animate-fade-in whitespace-pre-line">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
