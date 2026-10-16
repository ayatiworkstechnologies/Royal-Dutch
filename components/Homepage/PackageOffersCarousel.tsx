
"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
  type TransitionEvent,
} from "react";

type PackageOffer = {
  id: number;
  title: string;
  description: string;
  image: string;
  originalPrice: number;
  offerPrice: number;
  bookingHref: string;
};

// ============================================
// PACKAGE DATA
// ============================================

const packages: PackageOffer[] = [
  {
    id: 1,
    title: "Executive Health Checkup",
    description:
      "A little peace of mind starts with a complete picture of your health.",
    image: "/images/executive-health-checkup.png",
    originalPrice: 1999,
    offerPrice: 999,
    bookingHref: "/contact?package=executive-health-checkup",
  },
  {
    id: 2,
    title: "Diabetes Monitoring",
    description:
      "Stay a step ahead with care focused on your everyday wellbeing.",
    image: "/images/diabetes-monitoring.png",
    originalPrice: 999,
    offerPrice: 699,
    bookingHref: "/contact?package=diabetes-monitoring",
  },
  {
    id: 3,
    title: "Annual GP Membership",
    description:
      "Your health, supported. A familiar face for every stage of the year.",
    image: "/images/annual-gp-membership.png",
    originalPrice: 2000,
    offerPrice: 1500,
    bookingHref: "/contact?package=annual-gp-membership",
  },
  {
    id: 4,
    title: "Family Dental Package",
    description:
      "A healthier smile for every generation. Care for the whole family.",
    image: "/images/family-dental-package.png",
    originalPrice: 1800,
    offerPrice: 1200,
    bookingHref: "/contact?package=family-dental-package",
  },
];

const SLIDE_INTERVAL = 3000;
const SLIDE_DURATION = 850;

// Cloned slides make the carousel loop smoothly.
const carouselSlides = [
  packages[packages.length - 1],
  ...packages,
  packages[0],
];

function formatPrice(value: number) {
  return value.toLocaleString("en-AE");
}

function ArrowIcon({
  direction,
}: {
  direction: "left" | "right";
}) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={
          direction === "left"
            ? "M15 18L9 12L15 6"
            : "M9 18L15 12L9 6"
        }
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ============================================
// COMPONENT
// ============================================

export default function PackageOffersCarousel() {
  // Position 1 is the first real slide.
  const [slidePosition, setSlidePosition] = useState(1);

  const [transitionEnabled, setTransitionEnabled] =
    useState(true);

  const [isPaused, setIsPaused] = useState(false);

  const [reducedMotion, setReducedMotion] =
    useState(false);

  const [failedImages, setFailedImages] = useState<
    Record<string, boolean>
  >({});

  const touchStartX = useRef<number | null>(null);
  const isSlidingRef = useRef(false);

  // ============================================
  // ACCESSIBILITY: REDUCED MOTION
  // ============================================

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updatePreference = () => {
      setReducedMotion(media.matches);
    };

    updatePreference();

    media.addEventListener("change", updatePreference);

    return () => {
      media.removeEventListener(
        "change",
        updatePreference
      );
    };
  }, []);

  // ============================================
  // CURRENT ACTIVE SLIDE
  // ============================================

  const activeIndex =
    ((slidePosition - 1) % packages.length +
      packages.length) %
    packages.length;

  // ============================================
  // SLIDER NAVIGATION
  // ============================================

  const moveSlide = useCallback(
    (direction: 1 | -1) => {
      if (isSlidingRef.current) return;

      if (reducedMotion) {
        setSlidePosition((previous) => {
          const current =
            ((previous - 1) % packages.length +
              packages.length) %
            packages.length;

          const next =
            (current + direction + packages.length) %
            packages.length;

          return next + 1;
        });

        return;
      }

      isSlidingRef.current = true;
      setSlidePosition((previous) => previous + direction);
    },
    [reducedMotion]
  );

  const nextSlide = useCallback(() => {
    moveSlide(1);
  }, [moveSlide]);

  const previousSlide = useCallback(() => {
    moveSlide(-1);
  }, [moveSlide]);

  const goToSlide = (index: number) => {
    if (isSlidingRef.current) return;
    if (index === activeIndex) return;

    if (!reducedMotion) {
      isSlidingRef.current = true;
    }

    setSlidePosition(index + 1);
  };

  // ============================================
  // INFINITE LOOP RESET
  // ============================================

  const handleTransitionEnd = (
    event: TransitionEvent<HTMLDivElement>
  ) => {
    if (event.target !== event.currentTarget) return;
    if (event.propertyName !== "transform") return;

    const lastPosition = packages.length + 1;

    if (
      slidePosition === 0 ||
      slidePosition === lastPosition
    ) {
      // Jump from the cloned slide to its real twin
      // without showing the jump to the visitor.

      setTransitionEnabled(false);

      setSlidePosition(
        slidePosition === 0 ? packages.length : 1
      );

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setTransitionEnabled(true);
          isSlidingRef.current = false;
        });
      });

      return;
    }

    isSlidingRef.current = false;
  };

  // ============================================
  // AUTOMATIC SLIDING EVERY 3 SECONDS
  // ============================================

  useEffect(() => {
    if (isPaused || packages.length <= 1) return;

    const timer = window.setTimeout(() => {
      nextSlide();
    }, SLIDE_INTERVAL);

    return () => {
      window.clearTimeout(timer);
    };
  }, [slidePosition, isPaused, nextSlide]);

  // ============================================
  // MOBILE TOUCH SWIPE
  // ============================================

  const handleTouchStart = (
    event: TouchEvent<HTMLDivElement>
  ) => {
    touchStartX.current = event.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (
    event: TouchEvent<HTMLDivElement>
  ) => {
    if (touchStartX.current !== null) {
      const distance =
        touchStartX.current -
        event.changedTouches[0].clientX;

      if (Math.abs(distance) > 50) {
        if (distance > 0) {
          nextSlide();
        } else {
          previousSlide();
        }
      }
    }

    touchStartX.current = null;
    setIsPaused(false);
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <section
      className="w-full overflow-hidden bg-white py-12 sm:py-16 lg:py-20"
      aria-label="Royal Dutch package offers"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        {/* ======================================
            HEADER
        ====================================== */}

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 max-w-[750px]">
            <div className="flex items-end gap-4">
              <h2 className="font-secondary text-[25px] font-medium uppercase leading-[1.2] text-[#872572] sm:text-[30px]">
                Package
                <br />
                Offers
              </h2>

              <span
                aria-hidden="true"
                className="mb-2 h-px w-[50px] bg-gradient-to-r from-[#872572] to-transparent sm:w-[65px]"
              />
            </div>

            <h3 className="mt-6 font-secondary text-[25px] font-semibold leading-[1.3] text-[#171717] sm:text-[30px] lg:text-[34px]">
              Complete Care Packages
            </h3>

            <p className="mt-4 max-w-[720px] font-secondary text-[11px] leading-[2] tracking-[1.2px] text-[#888] sm:text-[12px] sm:tracking-[1.5px]">
              Complete healthcare packages designed to support
              preventive screening, ongoing health monitoring,
              primary care, and family dental wellness.
            </p>
          </div>

          <div className="shrink-0 pt-1">
            <span className="inline-flex rounded-full border border-[#b96da5] bg-[#f7e8f2] px-3 py-[5px] font-secondary text-[10px] font-medium text-[#872572] sm:px-4 sm:text-[11px]">
              All Packages ({packages.length})
            </span>
          </div>
        </div>

        {/* ======================================
            SLIDER SECTION
        ====================================== */}

        <div
          className="mt-9 sm:mt-12 lg:mt-14"
          role="region"
          aria-roledescription="carousel"
          aria-label="Healthcare package offers"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (
              !event.currentTarget.contains(
                event.relatedTarget as Node | null
              )
            ) {
              setIsPaused(false);
            }
          }}
        >
          <div className="flex flex-col items-center gap-5 lg:flex-row lg:gap-6">
            {/* ======================================
                SLIDER VIEWPORT
            ====================================== */}

            <div
              className="w-full min-w-0 flex-1 overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* SLIDING TRACK */}

              <div
                className="flex w-full items-stretch"
                style={{
                  transform: `translate3d(-${
                    slidePosition * 100
                  }%, 0, 0)`,

                  transition:
                    transitionEnabled && !reducedMotion
                      ? `transform ${SLIDE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`
                      : "none",

                  willChange: "transform",
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {carouselSlides.map((item, index) => {
                  const savings =
                    item.originalPrice - item.offerPrice;

                  const discount = Math.round(
                    (savings / item.originalPrice) * 100
                  );

                  const imageFailed = Boolean(
                    failedImages[item.image]
                  );

                  return (
                    <div
                      key={`${item.id}-${index}`}
                      className="w-full min-w-0 shrink-0 px-2 py-6 sm:px-3"
                      aria-hidden={
                        index !== slidePosition
                          ? true
                          : undefined
                      }
                    >
                      {/* IMAGE + CONTENT ROW */}

                      <div className="flex w-full min-w-0 flex-col items-center lg:flex-row">
                        {/* ======================
                            LEFT IMAGE
                        ====================== */}

                        <div
                          className="
                            group relative z-10
                            aspect-[514/320]
                            w-full max-w-[514px]
                            shrink-0 overflow-hidden
                            rounded-[14px]
                            bg-[#f5edf2]
                            lg:w-[45%]
                            xl:h-[320px]
                            xl:w-[514px]
                          "
                        >
                          {!imageFailed ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              width={514}
                              height={320}
                              loading={
                                index <= 2
                                  ? "eager"
                                  : "lazy"
                              }
                              className="
                                block h-full w-full
                                object-cover
                                transition-transform
                                duration-700 ease-out
                                group-hover:scale-[1.04]
                              "
                              onError={() => {
                                setFailedImages(
                                  (previous) => ({
                                    ...previous,
                                    [item.image]: true,
                                  })
                                );
                              }}
                            />
                          ) : (
                            <div className="flex h-full w-full flex-col items-center justify-center px-5 text-center">
                              <p className="font-secondary text-[14px] font-semibold text-[#872572]">
                                Package Image Not Found
                              </p>

                              <p className="mt-2 break-all font-secondary text-[11px] text-[#777]">
                                {item.image}
                              </p>
                            </div>
                          )}

                          {/* DISCOUNT BADGE */}

                          <span
                            className="
                              absolute left-4 top-4
                              z-20 inline-flex
                              items-center rounded-full
                              bg-[#872572]
                              px-3 py-[7px]
                              font-secondary text-[10px]
                              font-semibold text-white
                              shadow-sm
                              sm:left-5 sm:top-5
                            "
                          >
                            {discount}% OFF
                          </span>
                        </div>

                        {/* ======================
                            RIGHT OFFER CARD
                        ====================== */}

                        <div
                          className="
                            relative z-20
                            -mt-5 flex
                            w-[95%] max-w-[570px]
                            flex-col
                            rounded-[14px]
                            border border-[#f1e7ed]
                            bg-white
                            px-6 py-7
                            shadow-[0_0_22px_rgba(135,37,114,0.15)]
                            sm:px-9 sm:py-9
                            lg:-ml-6 lg:mt-0
                            lg:min-h-[340px]
                            lg:min-w-0
                            lg:max-w-none
                            lg:flex-1
                            lg:justify-center
                            lg:px-9
                            xl:px-12
                          "
                        >
                          {/* PACKAGE TITLE */}

                          <h4 className="font-secondary text-[19px] font-semibold leading-[1.4] text-[#222] sm:text-[21px]">
                            {item.title}
                          </h4>

                          <p className="mt-2 font-secondary text-[10px] font-semibold uppercase tracking-[0.5px] text-[#bf5aa4]">
                            Special Offer
                          </p>

                          {/* DESCRIPTION */}

                          <p className="mt-4 min-h-[42px] font-secondary text-[12px] leading-[1.8] text-[#999] sm:text-[13px]">
                            {item.description}
                          </p>

                          {/* DIVIDER */}

                          <div className="my-5 h-px w-full bg-[#e9e9e9]" />

                          {/* PRICE */}

                          <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
                            <div className="flex items-center gap-2">
                              <span className="font-secondary text-[11px] text-[#999]">
                                AED
                              </span>

                              <span className="font-secondary text-[12px] text-[#aaa] line-through">
                                {formatPrice(
                                  item.originalPrice
                                )}
                              </span>
                            </div>

                            <span className="font-secondary text-[10px] font-semibold text-[#a23b89]">
                              Save AED {formatPrice(savings)}
                            </span>

                            <span
                              aria-hidden="true"
                              className="hidden h-[24px] w-px bg-[#ddd] sm:block"
                            />

                            <div className="flex items-baseline gap-2">
                              <span className="font-secondary text-[11px] font-semibold text-[#444]">
                                AED
                              </span>

                              <span className="font-secondary text-[30px] font-bold leading-none tracking-[-1px] text-[#181818] sm:text-[34px]">
                                {formatPrice(
                                  item.offerPrice
                                )}
                              </span>
                            </div>
                          </div>

                          {/* BOOK NOW BUTTON */}

                          <Link
                            href={item.bookingHref}
                            tabIndex={
                              index === slidePosition
                                ? 0
                                : -1
                            }
                            className="
                              mt-5 flex min-h-[48px]
                              w-full items-center
                              justify-center
                              rounded-full
                              bg-[#872572]
                              px-5 py-3
                              font-secondary text-[12px]
                              font-semibold text-white
                              transition-all duration-300
                              hover:bg-[#6c1c5b]
                              hover:shadow-[0_8px_20px_rgba(135,37,114,0.2)]
                              focus-visible:outline
                              focus-visible:outline-2
                              focus-visible:outline-offset-2
                              focus-visible:outline-[#872572]
                            "
                          >
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ======================================
                ARROW CONTROLS
            ====================================== */}

            <div className="flex shrink-0 items-center justify-center gap-5 lg:w-[105px] lg:gap-4">
              <button
                type="button"
                onClick={previousSlide}
                aria-label="Previous package"
                className="
                  flex h-[44px] w-[44px]
                  cursor-pointer items-center
                  justify-center rounded-full
                  bg-[#872572] text-white
                  transition-all duration-300
                  hover:scale-110
                  hover:bg-[#6c1c5b]
                  active:scale-95
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-[#872572]
                "
              >
                <ArrowIcon direction="left" />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next package"
                className="
                  flex h-[44px] w-[44px]
                  cursor-pointer items-center
                  justify-center rounded-full
                  bg-[#872572] text-white
                  transition-all duration-300
                  hover:scale-110
                  hover:bg-[#6c1c5b]
                  active:scale-95
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-[#872572]
                "
              >
                <ArrowIcon direction="right" />
              </button>
            </div>
          </div>

          {/* ======================================
              SLIDE INDICATORS
          ====================================== */}

          <div className="mt-5 flex items-center justify-center gap-2 sm:mt-6">
            {packages.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to ${item.title}`}
                aria-current={
                  activeIndex === index
                    ? "true"
                    : undefined
                }
                className={`h-[6px] cursor-pointer rounded-full transition-all duration-500 ${
                  activeIndex === index
                    ? "w-[30px] bg-[#872572]"
                    : "w-[7px] bg-[#e1c9da] hover:bg-[#b97ca9]"
                }`}
              />
            ))}
          </div>

          <p className="sr-only" aria-live="off">
            Package {activeIndex + 1} of{" "}
            {packages.length}
          </p>
        </div>
      </div>
    </section>
  );
}
