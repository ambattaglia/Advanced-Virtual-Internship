"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { openAuthModal } from "@/redux/authSlice";
import { AiOutlineFileText, AiOutlineBulb, AiOutlineAudio } from "react-icons/ai";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { BiCrown } from "react-icons/bi";
import { RiLeafLine } from "react-icons/ri";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  
  // State for cycling statistics headings (6 headings)
  const [activeIndices, setActiveIndices] = useState<boolean[]>([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);

  // Redirect if logged in
  useEffect(() => {
    if (user) {
      router.push("/for-you");
    }
  }, [user, router]);

  // Cycle active statistics index every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndices((prev) => {
        const next = [...prev];
        const activeIdx = next.indexOf(true);
        next[activeIdx] = false;
        const nextIdx = (activeIdx + 1) % next.length;
        next[nextIdx] = true;
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleLoginClick = () => {
    dispatch(openAuthModal());
  };

  return (
    <>
      {/* Navigation */}
      <nav className="nav">
        <div className="nav__wrapper">
          <figure className="nav__img--mask">
            <Image
              src="/logo.png"
              alt="logo"
              width={200}
              height={40}
              className="nav__img"
              priority
            />
          </figure>
          <ul className="nav__list--wrapper">
            <li className="nav__list nav__list--login" onClick={handleLoginClick}>
              Login
            </li>
            <li className="nav__list nav__list--mobile">About</li>
            <li className="nav__list nav__list--mobile">Contact</li>
            <li className="nav__list nav__list--mobile">Help</li>
          </ul>
        </div>
      </nav>

      {/* Landing Section */}
      <section id="landing">
        <div className="container">
          <div className="row">
            <div className="landing__wrapper">
              <div className="landing__content">
                <div className="landing__content__title">
                  Gain more knowledge <br className="remove--tablet" />
                  in less time
                </div>
                <div className="landing__content__subtitle">
                  Great summaries for busy people,
                  <br className="remove--tablet" /> individuals who barely have time to read,{" "}
                  <br className="remove--tablet" /> and even people who don’t like to read.
                </div>
                <button className="btn home__cta--btn" onClick={handleLoginClick}>
                  Login
                </button>
              </div>
              <figure className="landing__image--mask">
                <Image
                  src="/landing.png"
                  alt="landing"
                  width={380}
                  height={360}
                  priority
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features">
        <div className="container">
          <div className="row">
            <div className="section__title">Understand books in few minutes</div>
            <div className="features__wrapper">
              {/* Feature 1 */}
              <div className="features">
                <div className="features__icon">
                  <AiOutlineFileText size={60} />
                </div>
                <div className="features__title">Read or listen</div>
                <div className="features__sub--title">
                  Save time by getting the core ideas from the best books.
                </div>
              </div>
              {/* Feature 2 */}
              <div className="features">
                <div className="features__icon">
                  <AiOutlineBulb size={60} />
                </div>
                <div className="features__title">Find your next read</div>
                <div className="features__sub--title">
                  Explore book lists and personalized recommendations.
                </div>
              </div>
              {/* Feature 3 */}
              <div className="features">
                <div className="features__icon">
                  <AiOutlineAudio size={60} />
                </div>
                <div className="features__title">Briefcasts</div>
                <div className="features__sub--title">
                  Gain valuable insights from briefcasts
                </div>
              </div>
            </div>

            {/* Statistics Row 1 */}
            <div className="statistics__wrapper">
              <div className="statistics__content--header">
                <div className={`statistics__heading ${activeIndices[0] ? "statistics__heading--active" : ""}`}>
                  Enhance your knowledge
                </div>
                <div className={`statistics__heading ${activeIndices[1] ? "statistics__heading--active" : ""}`}>
                  Achieve greater success
                </div>
                <div className={`statistics__heading ${activeIndices[2] ? "statistics__heading--active" : ""}`}>
                  Improve your health
                </div>
                <div className={`statistics__heading ${activeIndices[3] ? "statistics__heading--active" : ""}`}>
                  Develop better parenting skills
                </div>
                <div className={`statistics__heading ${activeIndices[4] ? "statistics__heading--active" : ""}`}>
                  Increase happiness
                </div>
                <div className={`statistics__heading ${activeIndices[5] ? "statistics__heading--active" : ""}`}>
                  Be the best version of yourself!
                </div>
              </div>
              <div className="statistics__content--details">
                <div className="statistics__data">
                  <div className="statistics__data--number">93%</div>
                  <div className="statistics__data--title">
                    of Summarist members <b>significantly increase</b> reading frequency.
                  </div>
                </div>
                <div className="statistics__data">
                  <div className="statistics__data--number">96%</div>
                  <div className="statistics__data--title">
                    of Summarist members <b>establish better</b> habits.
                  </div>
                </div>
                <div className="statistics__data">
                  <div className="statistics__data--number">90%</div>
                  <div className="statistics__data--title">
                    have made <b>significant positive</b> change to their lives.
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Row 2 */}
            <div className="statistics__wrapper">
              <div className="statistics__content--details statistics__content--details-second">
                <div className="statistics__data">
                  <div className="statistics__data--number">91%</div>
                  <div className="statistics__data--title">
                    of Summarist members <b>report feeling more productive</b> after incorporating the service into their daily routine.
                  </div>
                </div>
                <div className="statistics__data">
                  <div className="statistics__data--number">94%</div>
                  <div className="statistics__data--title">
                    of Summarist members have <b>noticed an improvement</b> in their overall comprehension and retention of information.
                  </div>
                </div>
                <div className="statistics__data">
                  <div className="statistics__data--number">88%</div>
                  <div className="statistics__data--title">
                    of Summarist members <b>feel more informed</b> about current events and industry trends since using the platform.
                  </div>
                </div>
              </div>
              <div className="statistics__content--header statistics__content--header-second">
                <div className={`statistics__heading ${activeIndices[0] ? "statistics__heading--active" : ""}`}>
                  Expand your learning
                </div>
                <div className={`statistics__heading ${activeIndices[1] ? "statistics__heading--active" : ""}`}>
                  Accomplish your goals
                </div>
                <div className={`statistics__heading ${activeIndices[2] ? "statistics__heading--active" : ""}`}>
                  Strengthen your vitality
                </div>
                <div className={`statistics__heading ${activeIndices[3] ? "statistics__heading--active" : ""}`}>
                  Become a better caregiver
                </div>
                <div className={`statistics__heading ${activeIndices[4] ? "statistics__heading--active" : ""}`}>
                  Improve your mood
                </div>
                <div className={`statistics__heading ${activeIndices[5] ? "statistics__heading--active" : ""}`}>
                  Maximize your abilities
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews">
        <div className="row">
          <div className="container">
            <div className="section__title">What our members say</div>
            <div className="reviews__wrapper">
              {/* Review 1 */}
              <div className="review">
                <div className="review__header">
                  <div className="review__name">Hanna M.</div>
                  <div className="review__stars">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <BsStarFill key={idx} className="text-[#0564f1]" style={{ fill: "#0564f1" }} />
                    ))}
                  </div>
                </div>
                <div className="review__body">
                  This app has been a <b>game-changer</b> for me! It&apos;s saved me so much time
                  and effort in reading and comprehending books. Highly recommend it to all book
                  lovers.
                </div>
              </div>

              {/* Review 2 */}
              <div className="review">
                <div className="review__header">
                  <div className="review__name">David B.</div>
                  <div className="review__stars">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <BsStarFill key={idx} className="text-[#0564f1]" style={{ fill: "#0564f1" }} />
                    ))}
                  </div>
                </div>
                <div className="review__body">
                  I love this app! It provides <b>concise and accurate summaries</b> of books in
                  a way that is easy to understand. It&apos;s also very user-friendly and intuitive.
                </div>
              </div>

              {/* Review 3 */}
              <div className="review">
                <div className="review__header">
                  <div className="review__name">Nathan S.</div>
                  <div className="review__stars">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <BsStarFill key={idx} className="text-[#0564f1]" style={{ fill: "#0564f1" }} />
                    ))}
                  </div>
                </div>
                <div className="review__body">
                  This app is a great way to get the main takeaways from a book without having to
                  read the entire thing. <b>The summaries are well-written and informative.</b>{" "}
                  Definitely worth downloading.
                </div>
              </div>

              {/* Review 4 */}
              <div className="review">
                <div className="review__header">
                  <div className="review__name">Ryan R.</div>
                  <div className="review__stars">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <BsStarFill key={idx} className="text-[#0564f1]" style={{ fill: "#0564f1" }} />
                    ))}
                  </div>
                </div>
                <div className="review__body">
                  If you&apos;re a busy person who <b>loves reading but doesn&apos;t have the time</b>{" "}
                  to read every book in full, this app is for you! The summaries are thorough and
                  provide a great overview of the book&apos;s content.
                </div>
              </div>
            </div>

            <div className="reviews__btn--wrapper">
              <button className="btn home__cta--btn" onClick={handleLoginClick}>
                Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Numbers Section */}
      <section id="numbers">
        <div className="container">
          <div className="row">
            <div className="section__title">Start growing with Summarist now</div>
            <div className="numbers__wrapper">
              {/* Stat 1 */}
              <div className="numbers">
                <div className="numbers__icon">
                  <BiCrown size={48} />
                </div>
                <div className="numbers__title">3 Million</div>
                <div className="numbers__sub--title">Downloads on all platforms</div>
              </div>

              {/* Stat 2 */}
              <div className="numbers">
                <div className="numbers__icon numbers__star--icon">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <BsStarFill key={idx} className="text-[#0564f1]" style={{ fill: "#0564f1" }} />
                  ))}
                  <BsStarHalf className="text-[#0564f1]" style={{ fill: "#0564f1" }} />
                </div>
                <div className="numbers__title">4.5 Stars</div>
                <div className="numbers__sub--title">
                  Average ratings on iOS and Google Play
                </div>
              </div>

              {/* Stat 3 */}
              <div className="numbers">
                <div className="numbers__icon">
                  <RiLeafLine size={48} />
                </div>
                <div className="numbers__title">97%</div>
                <div className="numbers__sub--title">
                  Of Summarist members create a better reading habit
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer">
        <div className="container">
          <div className="row">
            <div className="footer__top--wrapper">
              <div className="footer__block">
                <div className="footer__link--title">Actions</div>
                <div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Summarist Magazine</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Cancel Subscription</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Help</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Contact us</a>
                  </div>
                </div>
              </div>

              <div className="footer__block">
                <div className="footer__link--title">Useful Links</div>
                <div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Pricing</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Summarist Business</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Gift Cards</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Authors &amp; Publishers</a>
                  </div>
                </div>
              </div>

              <div className="footer__block">
                <div className="footer__link--title">Company</div>
                <div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">About</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Careers</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Partners</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Code of Conduct</a>
                  </div>
                </div>
              </div>

              <div className="footer__block">
                <div className="footer__link--title">Other</div>
                <div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Sitemap</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Legal Notice</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Terms of Service</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Privacy Policies</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="footer__copyright--wrapper">
              <div className="footer__copyright">Copyright &copy; 2023 Summarist.</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
