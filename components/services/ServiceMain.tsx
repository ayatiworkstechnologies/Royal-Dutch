"use client";

import { useEffect, useState } from "react";
import ServiceBookingButton from "@/components/ui/ServiceBookingButton";

/* =========================================================
   TYPES
========================================================= */

interface SubService {
  title: string;
  description?: string;

  price: string | number;
  currency?: string;

  priceLabel?: string;
  badge?: string;

  durationMinutes?: number | null;

  buttonText?: string;
  buttonHref?: string;
}

interface PriceListItem {
  title: string;
  price: string | number;
  currency?: string;
  badge?: string;

  /* Individual treatment-card navigation */
  buttonHref?: string;
}

interface ServiceMainProps {
  title: string;
  description?: string | null;
  categoryName?: string;

  /* LEFT PRICE GRID */
  priceListTitle?: string;
  priceListItems?: PriceListItem[];

  rating?: number;
  reviews?: number;

  /* NORMAL SINGLE SERVICE PRICE */
  price?: string | number | null;
  currency?: string;
  priceLabel?: string;

  /* OPTIONAL SECOND PRICE */
  secondaryPrice?: string | number | null;
  secondaryPriceLabel?: string;
  secondaryPriceNote?: string;

  durationMinutes?: number | null;

  /* SUB SERVICES */
  subServices?: SubService[];

  autoSlideInterval?: number;

  buttonText?: string;
  buttonHref?: string;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function ServiceMain({
  title,
  description,
  categoryName = "Treatment",

  priceListTitle = "Treatment Prices",
  priceListItems = [],

  rating = 4.9,
  reviews = 350,

  price = null,
  currency = "AED",
  priceLabel = "Treatment Price",

  secondaryPrice = null,
  secondaryPriceLabel = "Package",
  secondaryPriceNote = "",

  durationMinutes = null,

  subServices = [],

  autoSlideInterval = 4000,

  buttonText = "Book Now",
  buttonHref = "/book-appointment",
}: ServiceMainProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const hasSubServices = subServices.length > 0;
  const hasMultipleSubServices = subServices.length > 1;

  const slideWidthPercentage =
    subServices.length > 0 ? 100 / subServices.length : 100;

  /* =========================================================
     RESET CAROUSEL
  ========================================================= */

  useEffect(() => {
    if (
      subServices.length > 0 &&
      activeIndex >= subServices.length
    ) {
      setActiveIndex(0);
    }
  }, [activeIndex, subServices.length]);

  /* =========================================================
     AUTO SLIDE
  ========================================================= */

  useEffect(() => {
    if (!hasMultipleSubServices || isPaused) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) =>
        currentIndex === subServices.length - 1
          ? 0
          : currentIndex + 1
      );
    }, autoSlideInterval);

    return () => {
      window.clearInterval(interval);
    };
  }, [
    hasMultipleSubServices,
    isPaused,
    subServices.length,
    autoSlideInterval,
  ]);

  /* =========================================================
     PREVIOUS
  ========================================================= */

  const goToPrevious = () => {
    if (!hasMultipleSubServices) return;

    setActiveIndex((currentIndex) =>
      currentIndex === 0
        ? subServices.length - 1
        : currentIndex - 1
    );
  };

  /* =========================================================
     NEXT
  ========================================================= */

  const goToNext = () => {
    if (!hasMultipleSubServices) return;

    setActiveIndex((currentIndex) =>
      currentIndex === subServices.length - 1
        ? 0
        : currentIndex + 1
    );
  };

  return (
    <section className="w-full bg-white">
      <div
        className="
          mx-auto
          grid
          max-w-[1440px]
          grid-cols-1
          items-start
          gap-10
          px-5
          py-12

          sm:px-8

          lg:grid-cols-[minmax(0,890px)_390px]
          lg:justify-between
          lg:gap-[40px]
          lg:px-[60px]
          lg:py-[78px]
        "
      >
        {/* =====================================================
            LEFT
        ====================================================== */}

        <div className="w-full min-w-0">
          {/* CATEGORY */}

          <p
            className="
              mb-[5px]
              font-secondary
              text-[10px]
              font-semibold
              uppercase
              leading-none
              tracking-[0.18em]
              text-[#8B1D72]
            "
          >
            {categoryName}
          </p>

          {/* TITLE */}

          <h1
            className="
              mb-[13px]
              font-primary
              text-[26px]
              font-semibold
              uppercase
              leading-[1.1]
              tracking-[0.01em]
              text-[#080808]

              sm:text-[29px]
              lg:text-[30px]
            "
          >
            {title}
          </h1>

          {/* DESCRIPTION */}

          {description && (
            <p
              className="
                max-w-[820px]
                whitespace-pre-line
                font-secondary
                text-[12px]
                font-normal
                leading-[2.15]
                tracking-[0.095em]
                text-[#777777]

                sm:text-[12.5px]
              "
            >
              {description}
            </p>
          )}

          {/* =================================================
              PRICE GRID
          ================================================== */}

          {priceListItems.length > 0 && (
            <div className="mt-[28px] w-full max-w-[890px]">
              {/* HEADER */}

              <div className="mb-[16px] flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p
                    className="
                      mb-[6px]
                      font-secondary
                      text-[10px]
                      font-semibold
                      uppercase
                      leading-none
                      tracking-[0.14em]
                      text-[#8B1D72]
                    "
                  >
                    Treatment Pricing
                  </p>

                  <h3
                    className="
                      font-primary
                      text-[20px]
                      font-semibold
                      uppercase
                      leading-[1.2]
                      tracking-[0.01em]
                      text-[#111111]

                      sm:text-[22px]
                    "
                  >
                    {priceListTitle}
                  </h3>
                </div>

                <span
                  className="
                    shrink-0
                    rounded-full
                    border
                    border-[#E9D4E3]
                    bg-[#FFF8FC]
                    px-[12px]
                    py-[6px]
                    font-secondary
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.07em]
                    text-[#8B1D72]
                  "
                >
                  {priceListItems.length} Options
                </span>
              </div>

              {/* =================================================
                  TREATMENT CARDS

                  Mobile : 1
                  Tablet : 2
                  Desktop: 4
              ================================================== */}

              <div
                className="
                  grid
                  grid-cols-1
                  gap-[12px]

                  sm:grid-cols-2
                  xl:grid-cols-4
                "
              >
                {priceListItems.map((item, index) => {
                  /* ===============================================
                     COMMON CARD CONTENT
                  ================================================ */

                  const cardContent = (
                    <div
                      className="
                        grid
                        w-full
                        min-w-0
                        grid-cols-[minmax(0,1fr)_auto]
                        items-center
                        gap-x-3
                      "
                    >
                      {/* SERVICE NAME */}

                      <div className="min-w-0">
                        <p
                          className="
                            font-secondary
                            text-[13px]
                            font-medium
                            leading-[1.4]
                            tracking-[0.01em]
                            text-[#454545]

                            break-normal
                            hyphens-none
                            [overflow-wrap:normal]
                            [word-break:normal]

                            transition-colors
                            duration-300

                            group-hover:text-[#111111]
                          "
                        >
                          {item.title}
                        </p>

                        {item.badge && (
                          <span
                            className="
                              mt-[7px]
                              inline-flex
                              max-w-full
                              rounded-full
                              border
                              border-[#EACFE1]
                              bg-white
                              px-[8px]
                              py-[3px]
                              font-secondary
                              text-[7px]
                              font-semibold
                              uppercase
                              leading-none
                              tracking-[0.04em]
                              text-[#8B1D72]
                            "
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {/* PRICE */}

                      <div
                        className="
                          flex
                          shrink-0
                          items-center
                          justify-end
                          gap-[6px]
                        "
                      >
                        <span
                          className="
                            whitespace-nowrap
                            font-primary
                            text-[15px]
                            font-semibold
                            leading-none
                            tracking-[-0.025em]
                            text-[#111111]

                            2xl:text-[16px]
                          "
                        >
                          {item.currency || currency} {item.price}
                        </span>

                        {/* SMALL ARROW */}

                        {item.buttonHref && (
                          <span
                            aria-hidden="true"
                            className="
                              hidden
                              translate-x-[-3px]
                              text-[15px]
                              leading-none
                              text-[#B79AAC]
                              opacity-0

                              transition-all
                              duration-300

                              group-hover:translate-x-0
                              group-hover:text-[#8B1D72]
                              group-hover:opacity-100

                              2xl:inline
                            "
                          >
                            →
                          </span>
                        )}
                      </div>
                    </div>
                  );

                  /* ===============================================
                     CLICKABLE CARD

                     IMPORTANT:
                     Uses SAME ServiceBookingButton functionality
                     as right-side Book Now.
                  ================================================ */

                  if (item.buttonHref) {
                    return (
                      <ServiceBookingButton
                        key={`${item.title}-${index}`}
                        href={item.buttonHref}
                        className="
                          group
                          flex
                          min-h-[104px]
                          w-full
                          min-w-0
                          cursor-pointer
                          items-center
                          rounded-[15px]
                          border
                          border-[#E7E7E7]
                          bg-[#FCFCFC]
                          px-[18px]
                          py-[16px]
                          text-left
                          no-underline
                          outline-none

                          transition-all
                          duration-300
                          ease-out

                          hover:-translate-y-[3px]
                          hover:border-[#D9A7C9]
                          hover:bg-[#FFF9FC]
                          hover:shadow-[0_10px_25px_rgba(139,29,114,0.08)]

                          focus-visible:border-[#8B1D72]
                          focus-visible:ring-2
                          focus-visible:ring-[#8B1D72]/15

                          active:translate-y-0
                          active:scale-[0.985]
                        "
                      >
                        {cardContent}
                      </ServiceBookingButton>
                    );
                  }

                  /* ===============================================
                     NON-CLICKABLE FALLBACK
                  ================================================ */

                  return (
                    <div
                      key={`${item.title}-${index}`}
                      className="
                        group
                        flex
                        min-h-[104px]
                        w-full
                        min-w-0
                        items-center
                        rounded-[15px]
                        border
                        border-[#E7E7E7]
                        bg-[#FCFCFC]
                        px-[18px]
                        py-[16px]
                      "
                    >
                      {cardContent}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* =====================================================
            RIGHT
        ====================================================== */}

        <div className="w-full min-w-0 lg:w-[390px]">
          <div
            className="
              w-full
              min-w-0
              overflow-hidden
              rounded-[18px]
              border
              border-[#E4E4E4]
              bg-white
              px-[24px]
              py-[24px]
              shadow-[0_5px_20px_rgba(0,0,0,0.04)]
            "
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* TOP */}

            <div className="flex items-center justify-between gap-4">
              <p
                className="
                  font-secondary
                  text-[9px]
                  font-semibold
                  uppercase
                  leading-none
                  tracking-[0.1em]
                  text-[#8B1D72]
                "
              >
                {hasSubServices
                  ? "AVAILABLE OPTIONS"
                  : "TREATMENT PRICES"}
              </p>

              {hasMultipleSubServices && (
                <span
                  className="
                    shrink-0
                    font-secondary
                    text-[9px]
                    font-medium
                    tracking-[0.04em]
                    text-[#9A9A9A]
                  "
                >
                  {String(activeIndex + 1).padStart(2, "0")}
                  {" / "}
                  {String(subServices.length).padStart(2, "0")}
                </span>
              )}
            </div>

            {/* TITLE */}

            <h2
              className="
                mt-[13px]
                font-primary
                text-[21px]
                font-bold
                uppercase
                leading-[1.15]
                tracking-[-0.025em]
                text-[#111111]
              "
            >
              {title}
            </h2>

            {/* =================================================
                SUB SERVICES
            ================================================== */}

            {hasSubServices && (
              <div className="mt-[22px] w-full min-w-0">
                <div
                  className="
                    relative
                    w-full
                    min-w-0
                    max-w-full
                    overflow-hidden
                    rounded-[14px]
                  "
                >
                  {/* TRACK */}

                  <div
                    className="
                      flex
                      items-stretch
                      will-change-transform
                      transition-transform
                      duration-700
                      ease-in-out
                    "
                    style={{
                      width: `${subServices.length * 100}%`,
                      transform: `translate3d(-${
                        activeIndex * slideWidthPercentage
                      }%, 0, 0)`,
                    }}
                  >
                    {subServices.map((service, index) => (
                      <div
                        key={`${service.title}-${index}`}
                        className="min-w-0 shrink-0"
                        style={{
                          width: `${slideWidthPercentage}%`,
                        }}
                      >
                        <div
                          className="
                            flex
                            h-full
                            w-full
                            min-w-0
                            max-w-full
                            flex-col
                            overflow-hidden
                            rounded-[14px]
                            border
                            border-[#EEEEEE]
                            bg-[#FCFCFC]
                            p-[17px]
                          "
                        >
                          {/* SERVICE HEADER */}

                          <div
                            className="
                              flex
                              min-w-0
                              items-start
                              justify-between
                              gap-3
                            "
                          >
                            <div className="min-w-0 flex-1">
                              <p
                                className="
                                  font-secondary
                                  text-[11px]
                                  font-semibold
                                  uppercase
                                  leading-[1.4]
                                  tracking-[0.04em]
                                  text-[#222222]

                                  break-normal
                                  hyphens-none
                                  [overflow-wrap:normal]
                                  [word-break:normal]
                                "
                              >
                                {service.title}
                              </p>

                              {service.description && (
                                <p
                                  className="
                                    mt-[4px]
                                    font-secondary
                                    text-[9px]
                                    leading-[1.6]
                                    text-[#999999]

                                    break-normal
                                    hyphens-none
                                    [overflow-wrap:normal]
                                    [word-break:normal]
                                  "
                                >
                                  {service.description}
                                </p>
                              )}
                            </div>

                            {service.badge && (
                              <span
                                className="
                                  shrink-0
                                  whitespace-nowrap
                                  rounded-full
                                  border
                                  border-[#E9CFE1]
                                  bg-[#FFF7FC]
                                  px-[10px]
                                  py-[5px]
                                  font-secondary
                                  text-[8px]
                                  font-semibold
                                  text-[#8B1D72]
                                "
                              >
                                {service.badge}
                              </span>
                            )}
                          </div>

                          {/* PRICE */}

                          <div className="mt-[18px]">
                            <div className="flex items-baseline gap-[6px]">
                              <span
                                className="
                                  shrink-0
                                  font-secondary
                                  text-[14px]
                                  font-semibold
                                  leading-none
                                  text-[#333333]
                                "
                              >
                                {service.currency || currency}
                              </span>

                              <span
                                className="
                                  font-primary
                                  text-[34px]
                                  font-semibold
                                  leading-none
                                  tracking-[-0.04em]
                                  text-[#111111]
                                "
                              >
                                {service.price}
                              </span>
                            </div>

                            <p
                              className="
                                mt-[5px]
                                font-secondary
                                text-[8px]
                                font-normal
                                tracking-[0.02em]
                                text-[#A0A0A0]
                              "
                            >
                              {service.priceLabel ||
                                "Treatment price"}
                            </p>
                          </div>

                          {/* DURATION */}

                          {service.durationMinutes != null && (
                            <div className="mt-[11px]">
                              <p
                                className="
                                  font-secondary
                                  text-[9px]
                                  font-medium
                                  text-[#666666]
                                "
                              >
                                {service.durationMinutes} mins
                              </p>
                            </div>
                          )}

                          {/* SUB SERVICE BOOK NOW */}

                          <ServiceBookingButton
                            href={
                              service.buttonHref ||
                              buttonHref
                            }
                            className="
                              mt-[18px]
                              flex
                              h-[46px]
                              w-full
                              shrink-0
                              cursor-pointer
                              items-center
                              justify-center
                              rounded-full
                              bg-[#8B1D72]
                              font-secondary
                              text-[11px]
                              font-semibold
                              text-white

                              transition-all
                              duration-300

                              hover:bg-[#74165E]
                              hover:shadow-[0_7px_18px_rgba(139,29,114,0.20)]

                              active:scale-[0.99]
                            "
                          >
                            {service.buttonText ||
                              buttonText}
                          </ServiceBookingButton>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CAROUSEL CONTROLS */}

                {hasMultipleSubServices && (
                  <div
                    className="
                      mt-[15px]
                      flex
                      items-center
                      justify-between
                      gap-4
                    "
                  >
                    {/* DOTS */}

                    <div className="flex min-w-0 items-center gap-[6px]">
                      {subServices.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() =>
                            setActiveIndex(index)
                          }
                          aria-label={`Go to option ${
                            index + 1
                          }`}
                          className={`
                            h-[5px]
                            shrink-0
                            cursor-pointer
                            rounded-full
                            transition-all
                            duration-500
                            ease-in-out

                            ${
                              activeIndex === index
                                ? "w-[20px] bg-[#8B1D72]"
                                : "w-[5px] bg-[#D9D9D9] hover:bg-[#BFBFBF]"
                            }
                          `}
                        />
                      ))}
                    </div>

                    {/* ARROWS */}

                    <div className="flex shrink-0 items-center gap-[7px]">
                      <button
                        type="button"
                        onClick={goToPrevious}
                        aria-label="Previous option"
                        className="
                          flex
                          h-[36px]
                          w-[36px]
                          shrink-0
                          cursor-pointer
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-[#8B1D72]
                          bg-white
                          text-[18px]
                          font-normal
                          leading-none
                          text-[#8B1D72]

                          transition-all
                          duration-300

                          hover:bg-[#8B1D72]
                          hover:text-white
                        "
                      >
                        ‹
                      </button>

                      <button
                        type="button"
                        onClick={goToNext}
                        aria-label="Next option"
                        className="
                          flex
                          h-[36px]
                          w-[36px]
                          shrink-0
                          cursor-pointer
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-[#E5E5E5]
                          bg-white
                          text-[18px]
                          font-normal
                          leading-none
                          text-[#555555]

                          transition-all
                          duration-300

                          hover:border-[#8B1D72]
                          hover:text-[#8B1D72]
                        "
                      >
                        ›
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* =================================================
                NORMAL PRICE
            ================================================== */}

            {!hasSubServices &&
              (price != null || secondaryPrice != null) && (
                <div className="mt-[22px]">
                  {price != null && (
                    <div>
                      <p
                        className="
                          mb-[5px]
                          font-secondary
                          text-[10px]
                          font-medium
                          tracking-[0.02em]
                          text-[#777777]
                        "
                      >
                        {priceLabel}
                      </p>

                      <div className="flex items-baseline gap-[6px]">
                        {currency && (
                          <span
                            className="
                              font-secondary
                              text-[14px]
                              font-semibold
                              leading-none
                              text-[#333333]
                            "
                          >
                            {currency}
                          </span>
                        )}

                        <span
                          className="
                            font-primary
                            text-[32px]
                            font-semibold
                            leading-none
                            tracking-[-0.04em]
                            text-[#111111]
                          "
                        >
                          {price}
                        </span>
                      </div>
                    </div>
                  )}

                  {secondaryPrice != null && (
                    <>
                      <div className="my-[16px] h-px w-full bg-[#EEEEEE]" />

                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p
                            className="
                              mb-[5px]
                              font-secondary
                              text-[10px]
                              font-medium
                              tracking-[0.02em]
                              text-[#777777]
                            "
                          >
                            {secondaryPriceLabel}
                          </p>

                          <div className="flex items-baseline gap-[6px]">
                            {currency && (
                              <span
                                className="
                                  font-secondary
                                  text-[14px]
                                  font-semibold
                                  leading-none
                                  text-[#333333]
                                "
                              >
                                {currency}
                              </span>
                            )}

                            <span
                              className="
                                font-primary
                                text-[32px]
                                font-semibold
                                leading-none
                                tracking-[-0.04em]
                                text-[#111111]
                              "
                            >
                              {secondaryPrice}
                            </span>
                          </div>
                        </div>

                        {secondaryPriceNote && (
                          <span
                            className="
                              shrink-0
                              rounded-full
                              border
                              border-[#EACFE1]
                              bg-[#FFF7FC]
                              px-[11px]
                              py-[6px]
                              font-secondary
                              text-[9px]
                              font-semibold
                              text-[#8B1D72]
                            "
                          >
                            {secondaryPriceNote}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}

            {/* =================================================
                NORMAL DURATION
            ================================================== */}

            {!hasSubServices &&
              durationMinutes != null && (
                <div className="mt-[15px]">
                  <p
                    className="
                      font-secondary
                      text-[10px]
                      font-medium
                      text-[#555555]
                    "
                  >
                    {durationMinutes} mins
                  </p>

                  <p
                    className="
                      mt-[2px]
                      font-secondary
                      text-[8px]
                      text-[#AAAAAA]
                    "
                  >
                    Treatment duration
                  </p>
                </div>
              )}

            {/* DIVIDER */}

            <div className="my-[18px] h-px w-full bg-[#EEEEEE]" />

            {/* =================================================
                RATING
            ================================================== */}

            <div className="flex items-center gap-[6px]">
              <span
                className="
                  font-secondary
                  text-[10px]
                  font-semibold
                  text-[#111111]
                "
              >
                {rating}
              </span>

              <div className="flex items-center gap-[2px]">
                {Array.from({
                  length: 5,
                }).map((_, index) => (
                  <span
                    key={index}
                    className="
                      text-[11px]
                      leading-none
                      text-[#F5B301]
                    "
                  >
                    ★
                  </span>
                ))}
              </div>

              <span
                className="
                  font-secondary
                  text-[9px]
                  font-medium
                  text-[#777777]
                "
              >
                ({reviews})
              </span>
            </div>

            {/* =================================================
                MAIN BOOK NOW
            ================================================== */}

            {!hasSubServices && (
              <ServiceBookingButton
                href={buttonHref}
                className="
                  mt-[18px]
                  flex
                  h-[50px]
                  w-full
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-full
                  bg-[#8B1D72]
                  font-secondary
                  text-[12px]
                  font-semibold
                  text-white

                  transition-all
                  duration-300

                  hover:bg-[#74165E]
                  hover:shadow-[0_7px_18px_rgba(139,29,114,0.22)]

                  active:scale-[0.99]
                "
              >
                {buttonText}
              </ServiceBookingButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}