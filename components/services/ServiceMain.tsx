"use client";

import { useEffect, useState } from "react";
import ServiceBookingButton from "@/components/ui/ServiceBookingButton";

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
}

interface ServiceMainProps {
  title: string;
  description?: string | null;
  categoryName?: string;

  /* OPTIONAL LEFT-SIDE PRICE GRID */
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

  /*
   * IMPORTANT:
   * Track width = number of slides × 100%
   * Each slide = 100 / number of slides %
   *
   * Example:
   * 8 slides
   * Track = 800%
   * Each slide = 12.5% of track
   * 12.5% of 800% = one full visible carousel width
   */
  const slideWidthPercentage =
    subServices.length > 0
      ? 100 / subServices.length
      : 100;

  /*
   * RESET INDEX
   */
  useEffect(() => {
    if (
      subServices.length > 0 &&
      activeIndex >= subServices.length
    ) {
      setActiveIndex(0);
    }
  }, [activeIndex, subServices.length]);

  /*
   * AUTO SLIDE
   */
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

  /*
   * PREVIOUS
   */
  const goToPrevious = () => {
    if (!hasMultipleSubServices) return;

    setActiveIndex((currentIndex) =>
      currentIndex === 0
        ? subServices.length - 1
        : currentIndex - 1
    );
  };

  /*
   * NEXT
   */
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

          lg:grid-cols-[minmax(0,760px)_390px]
          lg:justify-between
          lg:gap-[100px]
          lg:px-[60px]
          lg:py-[78px]
        "
      >
        {/* =====================================================
            LEFT SIDE
        ====================================================== */}
        <div className="w-full">
          {/* Category */}
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

          {/* Main Title */}
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

          {/* Description */}
          {description && (
            <p
              className="
                max-w-[760px]
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

          {/* =====================================================
              OPTIONAL LEFT-SIDE PRICE GRID
              Existing pages are not affected unless priceListItems
              is provided.
          ====================================================== */}
          {priceListItems.length > 0 && (
            <div className="mt-[20px] max-w-[760px]">
              {/* Price Grid Header */}
              <div className="mb-[10px] flex flex-wrap items-end justify-between gap-2">
                <div>
                  <p
                    className="
                      mb-[4px]
                      font-secondary
                      text-[8px]
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
                      text-[15px]
                      font-semibold
                      uppercase
                      leading-[1.2]
                      tracking-[0.01em]
                      text-[#111111]

                      sm:text-[16px]
                    "
                  >
                    {priceListTitle}
                  </h3>
                </div>

                <span
                  className="
                    rounded-full
                    border
                    border-[#E9D4E3]
                    bg-[#FFF8FC]
                    px-[8px]
                    py-[4px]
                    font-secondary
                    text-[7px]
                    font-semibold
                    uppercase
                    tracking-[0.07em]
                    text-[#8B1D72]
                  "
                >
                  {priceListItems.length} Options
                </span>
              </div>

              {/* Responsive Price Grid: 1 mobile / 2 tablet / 4 desktop */}
              <div className="grid grid-cols-1 gap-[8px] sm:grid-cols-2 lg:grid-cols-4">
                {priceListItems.map((item, index) => (
                  <div
                    key={`${item.title}-${index}`}
                    className="
                      group
                      flex
                      min-h-[58px]
                      min-w-0
                      items-center
                      justify-between
                      gap-[7px]
                      rounded-[11px]
                      border
                      border-[#EAEAEA]
                      bg-[#FCFCFC]
                      px-[10px]
                      py-[8px]
                      transition-all
                      duration-300

                      hover:border-[#DDB8D1]
                      hover:bg-[#FFF9FD]
                      hover:shadow-[0_4px_12px_rgba(139,29,114,0.06)]
                    "
                  >
                    {/* Service Name */}
                    <div className="min-w-0 flex-1">
                      <p
                        className="
                          break-words
                          font-secondary
                          text-[9px]
                          font-medium
                          leading-[1.35]
                          tracking-[0.015em]
                          text-[#555555]
                          transition-colors
                          duration-300

                          group-hover:text-[#222222]
                        "
                      >
                        {item.title}
                      </p>

                      {item.badge && (
                        <span
                          className="
                            mt-[4px]
                            inline-flex
                            max-w-full
                            rounded-full
                            border
                            border-[#EACFE1]
                            bg-white
                            px-[6px]
                            py-[2px]
                            font-secondary
                            text-[6px]
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

                    {/* Price */}
                    <div className="shrink-0 text-right">
                      <span
                        className="
                          block
                          whitespace-nowrap
                          font-primary
                          text-[11px]
                          font-semibold
                          leading-none
                          tracking-[-0.02em]
                          text-[#111111]

                          xl:text-[12px]
                        "
                      >
                        {item.currency || currency} {item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* =====================================================
            RIGHT SIDE
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
            {/* =================================================
                TOP LABEL
            ================================================== */}
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

              {/* Carousel Counter */}
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

            {/* =================================================
                MAIN SERVICE TITLE
            ================================================== */}
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
                SUB SERVICES CAROUSEL
            ================================================== */}
            {hasSubServices && (
              <div className="mt-[22px] w-full min-w-0">
                {/* =============================================
                    SLIDER VIEWPORT
                ============================================== */}
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
                  {/* =============================================
                      SLIDING TRACK
                  ============================================== */}
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
                        activeIndex *
                        slideWidthPercentage
                      }%, 0, 0)`,
                    }}
                  >
                    {subServices.map((service, index) => (
                      <div
                        key={`${service.title}-${index}`}
                        className="
                          min-w-0
                          shrink-0
                        "
                        style={{
                          width: `${slideWidthPercentage}%`,
                        }}
                      >
                        {/* =====================================
                            SUB SERVICE CARD
                        ====================================== */}
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
                          {/* =================================
                              SUB SERVICE HEADER
                          ================================== */}
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
                                  break-words
                                  font-secondary
                                  text-[11px]
                                  font-semibold
                                  uppercase
                                  leading-[1.4]
                                  tracking-[0.04em]
                                  text-[#222222]
                                "
                              >
                                {service.title}
                              </p>

                              {service.description && (
                                <p
                                  className="
                                    mt-[4px]
                                    break-words
                                    font-secondary
                                    text-[9px]
                                    leading-[1.6]
                                    text-[#999999]
                                  "
                                >
                                  {service.description}
                                </p>
                              )}
                            </div>

                            {/* Badge */}
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

                          {/* =================================
                              PRICE
                          ================================== */}
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
                                {service.currency ||
                                  currency}
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

                          {/* =================================
                              DURATION
                          ================================== */}
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
                                {
                                  service.durationMinutes
                                }{" "}
                                mins
                              </p>
                            </div>
                          )}

                          {/* =================================
                              BOOK NOW
                          ================================== */}
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

                {/* =============================================
                    CAROUSEL CONTROLS
                ============================================== */}
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
                    {/* =========================================
                        DOTS
                    ========================================== */}
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

                    {/* =========================================
                        ARROWS
                    ========================================== */}
                    <div className="flex shrink-0 items-center gap-[7px]">
                      {/* Previous */}
                      <button
                        type="button"
                        onClick={goToPrevious}
                        aria-label="Previous option"
                        className="
                          flex
                          h-[36px]
                          w-[36px]
                          shrink-0
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

                      {/* Next */}
                      <button
                        type="button"
                        onClick={goToNext}
                        aria-label="Next option"
                        className="
                          flex
                          h-[36px]
                          w-[36px]
                          shrink-0
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
                ONLY WHEN NO SUB SERVICES
            ================================================== */}
            {!hasSubServices &&
              (price != null ||
                secondaryPrice != null) && (
                <div className="mt-[22px]">
                  {/* =========================================
                      MAIN PRICE
                  ========================================== */}
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

                  {/* =========================================
                      SECONDARY PRICE
                  ========================================== */}
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

                        {/* Package Note */}
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

            {/* Divider */}
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

              {/* Stars */}
              <div className="flex items-center gap-[2px]">
                {Array.from({ length: 5 }).map(
                  (_, index) => (
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
                  )
                )}
              </div>

              {/* Reviews */}
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
                NORMAL BOOK BUTTON
                ONLY WITHOUT SUB SERVICES
            ================================================== */}
            {!hasSubServices && (
              <ServiceBookingButton
                href={buttonHref}
                className="
                  mt-[18px]
                  flex
                  h-[50px]
                  w-full
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