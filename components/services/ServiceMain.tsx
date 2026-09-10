"use client";

import ServiceBookingButton from "@/components/ui/ServiceBookingButton";

interface ServiceMainProps {
  title: string;
  description?: string | null;
  categoryName?: string;

  rating?: number;
  reviews?: number;

  price?: string | number | null;
  currency?: string;

  durationMinutes?: number | null;

  buttonText?: string;
  buttonHref?: string;
}

export default function ServiceMain({
  title,
  description,
  categoryName = "Treatment",

  rating = 4.9,
  reviews = 350,

  price = null,
  currency = "",

  durationMinutes = null,

  buttonText = "Book Now",
  buttonHref = "/book-appointment",
}: ServiceMainProps) {
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

          xl:px-[60px]
        "
      >
        {/* =========================================
            LEFT SIDE
        ========================================== */}
        <div className="w-full">
          {/* Small label */}
          <p
            className="
              mb-[4px]
              text-[10px]
              font-semibold
              uppercase
              leading-none
              tracking-[0.18em]
              text-[#8b1d72]
            "
          >
            TREATMENT
          </p>

          {/* Service Name */}
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
        </div>

        {/* =========================================
            RIGHT SIDE CARD
        ========================================== */}
        <div className="w-full lg:w-[390px]">
          <div
            className="
              w-full
              rounded-[14px]
              border
              border-[#E2E2E2]
              bg-white
              px-[16px]
              pb-[16px]
              pt-[15px]
              shadow-[0_2px_8px_rgba(0,0,0,0.025)]
            "
          >
            {/* Card small label */}
            <p
              className="
                mb-[4px]
                font-secondary
                text-[9px]
                font-semibold
                uppercase
                leading-none
                tracking-[0.04em]
                text-[#8b1d72] py-3
              "
            >
              TREATMENT PRICES
            </p>

            {/* Card title */}
            <h2
              className="
                max-w-[330px]
                font-primary
                text-[20px]
                font-bold
                uppercase
                leading-[1.05]
                tracking-[-0.02em] pb-2
                text-black
              "
            >
              {title}
            </h2>

            {/* Price + Duration */}
            {(price != null || durationMinutes != null) && (
              <div className="mt-[7px] flex flex-wrap items-center gap-x-4 gap-y-1 " >
                {price != null && (
                  <span className="font-secondary text-[10px] font-semibold text-[#222]">
                    {currency} {price}
                  </span>
                )}

                {durationMinutes != null && (
                  <span className="font-secondary text-[9px] text-[#777]">
                    {durationMinutes} mins
                  </span>
                )}
              </div>
            )}

            {/* Rating */}
            <div className="mt-[6px] flex items-center gap-[5px]">
              <span className="font-secondary text-[9px] font-semibold text-black">
                {rating}
              </span>

              <div className="flex items-center gap-[1px]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className="text-[10px] leading-none text-[#F6B800]"
                  >
                    ★
                  </span>
                ))}
              </div>

              <span className="font-secondary text-[8px] font-medium text-[#555555]">
                ({reviews})
              </span>
            </div>

            {/* Book Button */}
            <ServiceBookingButton
              href={buttonHref}
              className="
                mt-[14px]
                flex
                h-[44px]
                w-full
                items-center
                justify-center
                rounded-full
                bg-[#8b1d72]
                font-secondary
                text-[11px]
                font-semibold
                text-white
                transition-all
                duration-300

                hover:bg-[#70155c]
                hover:shadow-[0_5px_15px_rgba(139,29,114,0.22)]

                active:scale-[0.99]
              "
            >
              {buttonText}
            </ServiceBookingButton>
          </div>
        </div>
      </div>
    </section>
  );
}