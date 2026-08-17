"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { openAuthModal } from "@/redux/authSlice";
import { AiFillFileText, AiFillBulb, AiFillAudio } from "react-icons/ai";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { BiCrown } from "react-icons/bi";
import { RiLeafLine } from "react-icons/ri";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [activeHeading, setActiveHeading] = useState(0);

  // If user is already logged in, redirect them to /for-you page
  useEffect(() => {
    if (user) {
      router.push("/for-you");
    }
  }, [user, router]);

  const handleLoginClick = () => {
    dispatch(openAuthModal());
  };

  const statHeadings = [
    "Enhance your knowledge",
    "Achieve greater success",
    "Improve your health",
    "Develop better parenting skills",
    "Increase happiness",
    "Be the best version of yourself!",
  ];

  const statData = [
    {
      percentage: "93%",
      boldText: "significantly increase",
      text: "reading frequency.",
    },
    {
      percentage: "96%",
      boldText: "establish better",
      text: "habits.",
    },
    {
      percentage: "90%",
      boldText: "have made significant positive",
      text: "change to their lives.",
    },
    {
      percentage: "91%",
      boldText: "report feeling more productive",
      text: "after incorporating the service into their daily routine.",
    },
    {
      percentage: "94%",
      boldText: "have noticed an improvement",
      text: "in their overall comprehension and retention of information.",
    },
    {
      percentage: "88%",
      boldText: "feel more informed",
      text: "about current events and industry trends since using the platform.",
    },
  ];

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="h-20 w-full flex items-center border-b border-gray-100 bg-white sticky top-0 z-40">
        <div className="max-w-[1070px] w-full mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image src="/logo.png" alt="logo" fill className="object-contain" />
            </div>
            <span className="text-xl font-bold text-[#032b41]">Summarist</span>
          </div>
          <ul className="flex items-center gap-6">
            <li
              onClick={handleLoginClick}
              className="text-[#032b41] hover:text-[#3ac27c] font-semibold cursor-pointer transition-colors"
            >
              Login
            </li>
            <li className="text-[#032b41] font-semibold cursor-not-allowed opacity-50 hidden sm:inline">
              About
            </li>
            <li className="text-[#032b41] font-semibold cursor-not-allowed opacity-50 hidden sm:inline">
              Contact
            </li>
            <li className="text-[#032b41] font-semibold cursor-not-allowed opacity-50 hidden sm:inline">
              Help
            </li>
          </ul>
        </div>
      </nav>

      {/* Landing Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1070px] w-full mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-black text-[#032b41] leading-tight mb-6">
                Gain more knowledge <br className="hidden md:inline" />
                in less time
              </h1>
              <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed mb-8">
                Great summaries for busy people, <br className="hidden md:inline" />
                individuals who barely have time to read, <br className="hidden md:inline" />
                and even people who don’t like to read.
              </p>
              <button
                onClick={handleLoginClick}
                className="w-full md:w-auto px-10 py-4 bg-[#2bd97c] text-[#032b41] font-bold text-base rounded-lg hover:bg-[#20ba68] transition-colors shadow-lg shadow-[#2bd97c]/20"
              >
                Login
              </button>
            </div>
            <div className="flex-1 flex justify-center md:justify-end">
              <div className="relative w-full max-w-[400px] h-[300px] md:h-[400px]">
                <Image
                  src="/landing.png"
                  alt="landing"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1070px] w-full mx-auto px-6">
          <h2 className="text-3xl font-black text-[#032b41] text-center mb-16">
            Understand books in a few minutes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="text-[#032b41] mb-6">
                <AiFillFileText size={60} />
              </div>
              <h3 className="text-xl font-bold text-[#032b41] mb-4">Read or listen</h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed max-w-[280px]">
                Save time by getting the core ideas from the best books.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="text-[#032b41] mb-6">
                <AiFillBulb size={60} />
              </div>
              <h3 className="text-xl font-bold text-[#032b41] mb-4">Find your next read</h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed max-w-[280px]">
                Explore book lists and personalized recommendations.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="text-[#032b41] mb-6">
                <AiFillAudio size={60} />
              </div>
              <h3 className="text-xl font-bold text-[#032b41] mb-4">Briefcasts</h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed max-w-[280px]">
                Gain valuable insights from briefcasts.
              </p>
            </div>
          </div>

          {/* Statistics Interactive Section */}
          <div className="flex flex-col lg:flex-row gap-12 items-stretch">
            {/* Interactive Heading List */}
            <div className="flex-1 flex flex-col justify-center">
              {statHeadings.map((heading, index) => (
                <div
                  key={index}
                  onClick={() => setActiveHeading(index)}
                  className={`text-2xl md:text-3xl font-bold py-4 cursor-pointer border-l-4 transition-all duration-200 pl-6 ${
                    activeHeading === index
                      ? "border-[#2bd97c] text-[#032b41] translate-x-2"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {heading}
                </div>
              ))}
            </div>

            {/* Dynamic Stat Card */}
            <div className="w-full lg:w-[400px] bg-[#f1f6f4] rounded-2xl p-8 md:p-12 flex flex-col justify-center gap-6 shadow-xs border border-gray-100">
              <div className="text-[#0365f2] text-5xl font-black animate-scale-in">
                {statData[activeHeading].percentage}
              </div>
              <p className="text-lg text-[#394547] font-light leading-relaxed">
                of Summarist members{" "}
                <strong className="font-bold text-[#032b41]">
                  {statData[activeHeading].boldText}
                </strong>{" "}
                {statData[activeHeading].text}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1070px] w-full mx-auto px-6">
          <h2 className="text-3xl font-black text-[#032b41] text-center mb-16">
            What our members say
          </h2>
          <div className="max-w-[600px] mx-auto flex flex-col gap-8 mb-12">
            {/* Review 1 */}
            <div className="bg-[#fff3d7] p-6 rounded-lg font-light text-gray-700">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-[#032b41]">Hanna M.</span>
                <div className="flex text-[#0564f1]">
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                </div>
              </div>
              <p className="leading-relaxed">
                This app has been a <strong className="font-bold">game-changer</strong> for me!
                It&apos;s saved me so much time and effort in reading and comprehending books.
                Highly recommend it to all book lovers.
              </p>
            </div>

            {/* Review 2 */}
            <div className="bg-[#fff3d7] p-6 rounded-lg font-light text-gray-700">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-[#032b41]">David B.</span>
                <div className="flex text-[#0564f1]">
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                </div>
              </div>
              <p className="leading-relaxed">
                I love this app! It provides <strong className="font-bold">concise and accurate summaries</strong> of books in a way that is easy to understand. It&apos;s also very user-friendly and intuitive.
              </p>
            </div>

            {/* Review 3 */}
            <div className="bg-[#fff3d7] p-6 rounded-lg font-light text-gray-700">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-[#032b41]">Nathan S.</span>
                <div className="flex text-[#0564f1]">
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                </div>
              </div>
              <p className="leading-relaxed">
                This app is a great way to get the main takeaways from a book without having to read the entire thing. <strong className="font-bold">The summaries are well-written and informative.</strong> Definitely worth downloading.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleLoginClick}
              className="px-10 py-4 bg-[#2bd97c] text-[#032b41] font-bold text-base rounded-lg hover:bg-[#20ba68] transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </section>

      {/* Numbers Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1070px] w-full mx-auto px-6">
          <h2 className="text-3xl font-black text-[#032b41] text-center mb-16">
            Start growing with Summarist now
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#d7e9ff] p-8 rounded-2xl flex flex-col items-center text-center">
              <div className="text-[#0365f2] mb-4">
                <BiCrown size={48} />
              </div>
              <h3 className="text-4xl font-bold text-[#032b41] mb-2">3 Million</h3>
              <p className="text-[#394547] text-sm font-light">Downloads on all platforms</p>
            </div>

            <div className="bg-[#d7e9ff] p-8 rounded-2xl flex flex-col items-center text-center">
              <div className="text-[#0365f2] mb-4 flex items-center gap-1">
                <BsStarFill size={20} />
                <BsStarFill size={20} />
                <BsStarFill size={20} />
                <BsStarFill size={20} />
                <BsStarHalf size={20} />
              </div>
              <h3 className="text-4xl font-bold text-[#032b41] mb-2">4.5 Stars</h3>
              <p className="text-[#394547] text-sm font-light">
                Average ratings on iOS and Google Play
              </p>
            </div>

            <div className="bg-[#d7e9ff] p-8 rounded-2xl flex flex-col items-center text-center">
              <div className="text-[#0365f2] mb-4">
                <RiLeafLine size={48} />
              </div>
              <h3 className="text-4xl font-bold text-[#032b41] mb-2">97%</h3>
              <p className="text-[#394547] text-sm font-light">
                Of Summarist members create a better reading habit
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="py-16 bg-[#f1f6f4] border-t border-gray-200">
        <div className="max-w-[1070px] w-full mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-bold text-[#032b41] text-lg mb-4">Actions</h4>
              <ul className="flex flex-col gap-3 text-sm text-gray-500 font-light">
                <li className="cursor-not-allowed hover:underline">Summarist Magazine</li>
                <li className="cursor-not-allowed hover:underline">Cancel Subscription</li>
                <li className="cursor-not-allowed hover:underline">Help</li>
                <li className="cursor-not-allowed hover:underline">Contact us</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#032b41] text-lg mb-4">Useful Links</h4>
              <ul className="flex flex-col gap-3 text-sm text-gray-500 font-light">
                <li className="cursor-not-allowed hover:underline">Pricing</li>
                <li className="cursor-not-allowed hover:underline">Summarist Business</li>
                <li className="cursor-not-allowed hover:underline">Gift Cards</li>
                <li className="cursor-not-allowed hover:underline">Authors & Publishers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#032b41] text-lg mb-4">Company</h4>
              <ul className="flex flex-col gap-3 text-sm text-gray-500 font-light">
                <li className="cursor-not-allowed hover:underline">About</li>
                <li className="cursor-not-allowed hover:underline">Careers</li>
                <li className="cursor-not-allowed hover:underline">Partners</li>
                <li className="cursor-not-allowed hover:underline">Code of Conduct</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#032b41] text-lg mb-4">Other</h4>
              <ul className="flex flex-col gap-3 text-sm text-gray-500 font-light">
                <li className="cursor-not-allowed hover:underline">Sitemap</li>
                <li className="cursor-not-allowed hover:underline">Legal Notice</li>
                <li className="cursor-not-allowed hover:underline">Terms of Service</li>
                <li className="cursor-not-allowed hover:underline">Privacy Policies</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center pt-8 border-t border-gray-200">
            <span className="font-bold text-[#032b41] text-sm">
              Copyright &copy; 2023 Summarist.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
