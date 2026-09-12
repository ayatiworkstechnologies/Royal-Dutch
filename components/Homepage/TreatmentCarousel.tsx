"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import ServiceBookingButton from "@/components/ui/ServiceBookingButton";
import { useEffect, useState } from "react";

const AUTO_PLAY_TIME = 2500;

type Slide = {
  number: string;
  title: string;
  description: string;
  href: string;
  image: string;
};

const slides: Slide[] = [
  {
    number: "01",
    title: "Classic Facial",
    description: "A gentle facial for clean, hydrated, glowing skin.",
    href: "/services/facials/classic-facial",
    image: "/images/classic-facial.png",
  },
  {
    number: "02",
    title: "HydraFacial",
    description: "Deep cleansing and hydration for smoother skin.",
    href: "/services/facials/hydrafacial",
    image: "/images/hydrafacial.png",
  },
  {
    number: "03",
    title: "Vitamin C HydraFacial",
    description: "Brightening Vitamin C facial for hydrated skin.",
    href: "/services/facials/vitamin-c-hydrafacial",
    image: "/images/vitamin-c-hydrafacial.png",
  },
  {
    number: "04",
    title: "Acne Control Facial",
    description: "Clearer skin with targeted acne care.",
    href: "/services/facials/acne-control-facial",
    image: "/images/acne-control-facial.png",
  },
  {
    number: "05",
    title: "Glowing Dermapen",
    description: "Smoother, firmer skin with Dermapen microneedling.",
    href: "/services/advanced-skin-treatments/glowing-dermapen",
    image: "/images/glowing-dermapen.png",
  },
  {
    number: "06",
    title: "Exosome Dermapen",
    description: "Advanced skin renewal with Exosome Dermapen.",
    href: "/services/advanced-skin-treatments/exosome-dermapen",
    image: "/images/exosome-dermapen.png",
  },
  {
    number: "07",
    title: "Pink Drop",
    description: "Hydration and nourishment for radiant skin.",
    href: "/services/advanced-skin-treatments/pink-drop",
    image: "/images/pink-drop.png",
  },
  {
    number: "08",
    title: "Peeling Pearl Facial",
    description: "Gentle exfoliation for smoother, radiant skin.",
    href: "/services/facials/peeling-pearl-facial",
    image: "/images/peeling-pearl-facial.png",
  },
  {
    number: "09",
    title: "C-Peel With Brightening Serum",
    description: "Brightening chemical peel for smoother, radiant skin.",
    href: "/services/advanced-skin-treatments/chemical-peel-brightening-serum",
    image: "/images/c-peel-brightening.png",
  },
  {
    number: "10",
    title: "Royal Dutch Facial",
    description: "Personalized care for smooth, radiant skin.",
    href: "/services/facials/royal-dutch-facial",
    image: "/images/royal-dutch-facial.png",
  },
  {
    number: "11",
    title: "Fat Freezing — Cryolipolysis",
    description: "Non-invasive fat freezing for body contouring.",
    href: "/services/fat-freezing/fat-freezing-cryolipolysis",
    image: "/images/fat-freezing.png",
  },
  {
    number: "12",
    title: "LT-Men’s Laser Hair Removal",
    description: "Men’s laser hair removal for smoother skin.",
    href: "/services/laser-treatments/men-s-laser-hair-removal",
    image: "/images/mens-laser-hair-removal.png",
  },
  {
    number: "13",
    title: "LT-Women’s Laser Hair Removal",
    description: "Women’s laser hair removal for smoother skin.",
    href: "/services/laser-treatments/women-s-laser-hair-removal",
    image: "/images/womens-laser-hair-removal.png",
  },
];

/* =========================================================
   SLIDE ANIMATION
========================================================= */

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 180 : -180,
    opacity: 0,
    scale: 0.92,
  }),

  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },

  exit: (direction: number) => ({
    x: direction > 0 ? -180 : 180,
    opacity: 0,
    scale: 0.92,
  }),
};

export default function TreatmentCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const [direction, setDirection] = useState(1);

  const [isHovered, setIsHovered] = useState(false);

  const [manualPause, setManualPause] = useState(false);

  const activeSlide = slides[activeIndex];

  /* =========================================================
     INDEX
  ========================================================= */

  const getIndex = (offset: number) =>
    (activeIndex + offset + slides.length) % slides.length;

  /* =========================================================
     NEXT
  ========================================================= */

  const nextSlide = (manual = true) => {
    setDirection(1);

    if (manual) {
      setManualPause(true);
    }

    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  /* =========================================================
     PREVIOUS
  ========================================================= */

  const prevSlide = () => {
    setDirection(-1);
    setManualPause(true);

    setActiveIndex(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  /* =========================================================
     GO TO
  ========================================================= */

  const goToSlide = (index: number) => {
    if (index === activeIndex) return;

    setDirection(index > activeIndex ? 1 : -1);
    setManualPause(true);
    setActiveIndex(index);
  };

  /* =========================================================
     AUTOPLAY
  ========================================================= */

  useEffect(() => {
    if (isHovered || manualPause) return;

    const timer = window.setInterval(() => {
      setDirection(1);

      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_PLAY_TIME);

    return () => window.clearInterval(timer);
  }, [isHovered, manualPause]);

  return (
    <section
      className="relative w-full overflow-hidden bg-white py-14 sm:py-16 lg:py-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* =====================================================
          HEADING
      ===================================================== */}

      <div className="mx-auto max-w-[1440px] px-4 text-center sm:px-6 lg:px-8">
        <p className="font-secondary text-[9px] font-semibold uppercase tracking-[4px] text-[#8b1d72] sm:text-[10px]">
          Services
        </p>

        <AnimatePresence mode="wait">
          <motion.h2
            key={activeSlide.title}
            initial={{
              opacity: 0,
              y: 7,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -7,
            }}
            transition={{
              duration: 0.35,
            }}
            className="
              mx-auto
              mt-2
              max-w-[900px]
              font-primary
              text-[22px]
              font-medium
              uppercase
              leading-[1.25]
              tracking-[1.5px]
              text-black

              sm:text-[27px]
              sm:tracking-[2px]

              lg:text-[31px]
            "
          >
            {activeSlide.title}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* =====================================================
          DESKTOP
      ===================================================== */}

      <div className="relative mx-auto mt-8 hidden h-[430px] max-w-[1440px] lg:block">
        {/* LEFT ARROW */}

        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous treatment"
          className="
            absolute
            left-6
            top-[48%]
            z-50
            flex
            h-[42px]
            w-[42px]
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-[#eadce6]
            bg-white
            text-[#8b1d72]
            transition-all
            duration-300

            hover:border-[#8b1d72]
            hover:bg-[#8b1d72]
            hover:text-white

            xl:left-8
          "
        >
          <svg
            className="h-[15px] w-[15px]"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15 5L8 12L15 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* RIGHT ARROW */}

        <button
          type="button"
          onClick={() => nextSlide()}
          aria-label="Next treatment"
          className="
            absolute
            right-6
            top-[48%]
            z-50
            flex
            h-[42px]
            w-[42px]
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-[#eadce6]
            bg-white
            text-[#8b1d72]
            transition-all
            duration-300

            hover:border-[#8b1d72]
            hover:bg-[#8b1d72]
            hover:text-white

            xl:right-8
          "
        >
          <svg
            className="h-[15px] w-[15px]"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M9 5L16 12L9 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* =================================================
            CAROUSEL AREA
        ================================================= */}

        <div className="absolute inset-0 flex items-end justify-center overflow-hidden pb-6">
          {/* FAR LEFT */}

          <PreviewCard
            slide={slides[getIndex(-2)]}
            position="far-left"
            onClick={() => goToSlide(getIndex(-2))}
          />

          {/* LEFT */}

          <PreviewCard
            slide={slides[getIndex(-1)]}
            position="left"
            onClick={() => goToSlide(getIndex(-1))}
          />

          {/* =================================================
              ACTIVE CENTER CARD
          ================================================= */}

          <div
            className="
              absolute
              bottom-6
              left-1/2
              z-30
              h-[390px]
              w-[280px]
              -translate-x-1/2

              xl:h-[415px]
              xl:w-[300px]
            "
          >
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
            >
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: {
                    type: "spring",
                    stiffness: 220,
                    damping: 28,
                    mass: 0.85,
                  },

                  opacity: {
                    duration: 0.28,
                  },

                  scale: {
                    duration: 0.38,
                  },
                }}
                className="
                  absolute
                  inset-0
                  overflow-hidden
                  rounded-[14px]
                  bg-white
                  shadow-[0_18px_50px_rgba(0,0,0,0.11)]
                "
              >
                {/* =============================================
                    SINGLE IMAGE
                ============================================= */}

                <div className="relative h-[295px] w-full xl:h-[315px]">
                  <Image
                    src={activeSlide.image}
                    alt={activeSlide.title}
                    fill
                    priority
                    sizes="300px"
                    className="
                      object-cover
                      object-center
                      transition-transform
                      duration-700
                      ease-out

                      hover:scale-[1.03]
                    "
                  />

                  {/* subtle overlay */}

                  <div className="absolute inset-0 bg-gradient-to-b from-black/[0.03] via-transparent to-black/[0.06]" />

                  {/* NUMBER */}

                  <span
                    className="
                      absolute
                      left-4
                      top-3
                      z-20
                      font-primary
                      text-[47px]
                      font-medium
                      leading-none
                      text-white
                      drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]

                      xl:text-[54px]
                    "
                  >
                    {activeSlide.number}
                  </span>
                </div>

                {/* =============================================
                    CONTENT
                ============================================= */}

                <div className="flex h-[95px] flex-col items-center justify-center bg-white px-4 text-center xl:h-[100px]">
                  <h3
                    className="
                      line-clamp-1
                      font-primary
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[1.3px]
                      text-black

                      xl:text-[11px]
                    "
                  >
                    {activeSlide.title}
                  </h3>

                  <p
                    className="
                      mt-1
                      line-clamp-1
                      font-secondary
                      text-[9px]
                      text-[#777]

                      xl:text-[9.5px]
                    "
                  >
                    {activeSlide.description}
                  </p>

                  <ServiceBookingButton
                    href={activeSlide.href}
                    onClick={() => setManualPause(true)}
                    className="
                      mt-2.5
                      inline-flex
                      h-[27px]
                      w-full
                      max-w-[180px]
                      items-center
                      justify-center
                      rounded-full
                      bg-[#8b1d72]
                      font-secondary
                      text-[9px]
                      font-semibold
                      text-white
                      transition-all
                      duration-300

                      hover:bg-[#70155c]
                      hover:shadow-[0_6px_16px_rgba(139,29,114,0.2)]
                    "
                  >
                    Book Now
                  </ServiceBookingButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT */}

          <PreviewCard
            slide={slides[getIndex(1)]}
            position="right"
            onClick={() => goToSlide(getIndex(1))}
          />

          {/* FAR RIGHT */}

          <PreviewCard
            slide={slides[getIndex(2)]}
            position="far-right"
            onClick={() => goToSlide(getIndex(2))}
          />
        </div>
      </div>

      {/* =====================================================
          MOBILE + TABLET
      ===================================================== */}

      <div className="relative mx-auto mt-8 max-w-[680px] overflow-hidden px-4 lg:hidden">
        <div className="relative h-[430px] sm:h-[500px]">
          {/* LEFT PEEK */}

          <button
            type="button"
            onClick={() => goToSlide(getIndex(-1))}
            className="
              absolute
              left-0
              top-[42%]
              z-10
              h-[210px]
              w-[125px]
              -translate-x-[68%]
              -translate-y-1/2
              overflow-hidden
              rounded-[10px]
              opacity-70
              transition
              duration-300

              sm:h-[270px]
              sm:w-[170px]
              sm:-translate-x-[72%]
            "
          >
            <Image
              src={slides[getIndex(-1)].image}
              alt={slides[getIndex(-1)].title}
              fill
              sizes="170px"
              className="object-cover"
            />
          </button>

          {/* =============================================
              CENTER
          ============================================= */}

          <div
            className="
              absolute
              left-1/2
              top-0
              z-20
              h-[385px]
              w-[270px]
              -translate-x-1/2

              sm:h-[455px]
              sm:w-[330px]
            "
          >
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
            >
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: {
                    type: "spring",
                    stiffness: 210,
                    damping: 27,
                  },

                  opacity: {
                    duration: 0.3,
                  },

                  scale: {
                    duration: 0.4,
                  },
                }}
                className="
                  absolute
                  inset-0
                  overflow-hidden
                  rounded-[13px]
                  bg-white
                  shadow-[0_14px_38px_rgba(0,0,0,0.1)]
                "
              >
                {/* SINGLE IMAGE */}

                <div className="relative h-[280px] sm:h-[340px]">
                  <Image
                    src={activeSlide.image}
                    alt={activeSlide.title}
                    fill
                    priority
                    sizes="330px"
                    className="object-cover object-center"
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-black/[0.03] via-transparent to-black/[0.06]" />

                  <span
                    className="
                      absolute
                      left-4
                      top-3
                      z-20
                      font-primary
                      text-[43px]
                      font-medium
                      leading-none
                      text-white

                      sm:text-[50px]
                    "
                  >
                    {activeSlide.number}
                  </span>
                </div>

                {/* CONTENT */}

                <div className="flex h-[105px] flex-col items-center justify-center px-4 text-center sm:h-[115px]">
                  <h3 className="font-primary text-[10px] font-semibold uppercase leading-[1.35] tracking-[1.3px] sm:text-[12px]">
                    {activeSlide.title}
                  </h3>

                  <p className="mt-1 line-clamp-1 font-secondary text-[9px] text-[#777] sm:text-[10px]">
                    {activeSlide.description}
                  </p>

                  <ServiceBookingButton
                    href={activeSlide.href}
                    onClick={() => setManualPause(true)}
                    className="
                      mt-3
                      inline-flex
                      h-[29px]
                      w-full
                      max-w-[180px]
                      items-center
                      justify-center
                      rounded-full
                      bg-[#8b1d72]
                      font-secondary
                      text-[9px]
                      font-semibold
                      text-white

                      sm:h-[31px]
                      sm:text-[10px]
                    "
                  >
                    Book Now
                  </ServiceBookingButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT PEEK */}

          <button
            type="button"
            onClick={() => goToSlide(getIndex(1))}
            className="
              absolute
              right-0
              top-[42%]
              z-10
              h-[210px]
              w-[125px]
              translate-x-[68%]
              -translate-y-1/2
              overflow-hidden
              rounded-[10px]
              opacity-70
              transition
              duration-300

              sm:h-[270px]
              sm:w-[170px]
              sm:translate-x-[72%]
            "
          >
            <Image
              src={slides[getIndex(1)].image}
              alt={slides[getIndex(1)].title}
              fill
              sizes="170px"
              className="object-cover"
            />
          </button>
        </div>

        {/* MOBILE NAVIGATION */}

        <div className="mt-1 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous treatment"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-[#eadce6]
              bg-white
              text-[#8b1d72]
            "
          >
            ‹
          </button>

          <span className="font-secondary text-[10px] tracking-[2px] text-[#888]">
            {activeIndex + 1} / {slides.length}
          </span>

          <button
            type="button"
            onClick={() => nextSlide()}
            aria-label="Next treatment"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-[#eadce6]
              bg-white
              text-[#8b1d72]
            "
          >
            ›
          </button>
        </div>
      </div>

      {/* =====================================================
          DOTS
      ===================================================== */}

      {/* <div className="mx-auto mt-5 flex max-w-[600px] items-center justify-center gap-1.5 px-4">
        {slides.map((slide, index) => (
          <button
            key={slide.number}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`Go to ${slide.title}`}
            className={`
              h-[3px]
              rounded-full
              transition-all
              duration-500

              ${
                index === activeIndex
                  ? "w-8 bg-[#8b1d72]"
                  : "w-3 bg-[#dedede] hover:bg-[#b765a2]"
              }
            `}
          />
        ))}
      </div> */}
    </section>
  );
}

/* =========================================================
   DESKTOP PREVIEW CARD
========================================================= */

function PreviewCard({
  slide,
  position,
  onClick,
}: {
  slide: Slide;
  position: "far-left" | "left" | "right" | "far-right";
  onClick: () => void;
}) {
  const positionStyle = {
    "far-left":
      "left-[7%] xl:left-[10%] w-[120px] h-[170px] xl:w-[140px] xl:h-[190px] opacity-75 z-[5]",

    left:
      "left-[22%] xl:left-[24%] w-[150px] h-[220px] xl:w-[170px] xl:h-[235px] opacity-95 z-10",

    right:
      "right-[22%] xl:right-[24%] w-[150px] h-[220px] xl:w-[170px] xl:h-[235px] opacity-95 z-10",

    "far-right":
      "right-[7%] xl:right-[10%] w-[120px] h-[170px] xl:w-[140px] xl:h-[190px] opacity-75 z-[5]",
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{
        y: -5,
        scale: 1.025,
      }}
      transition={{
        duration: 0.3,
      }}
      aria-label={`Open ${slide.title}`}
      className={`
        absolute
        bottom-[28px]
        overflow-hidden
        rounded-[10px]
        bg-white
        shadow-[0_10px_28px_rgba(0,0,0,0.07)]

        ${positionStyle[position]}
      `}
    >
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        sizes="180px"
        className="
          object-cover
          object-center
          transition-transform
          duration-500

          hover:scale-[1.04]
        "
      />

      <div className="absolute inset-0 bg-black/[0.025]" />
    </motion.button>
  );
}