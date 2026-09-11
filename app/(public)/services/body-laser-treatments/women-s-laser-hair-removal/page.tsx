"use client";

import DynamicBanner from "@/components/services/DynamicBanner";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";
import ServiceMain from "@/components/services/ServiceMain";

export default function WomensLaserHairRemovalPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* =====================================================
          BANNER
      ====================================================== */}
      <DynamicBanner
        mobileImage="/images/womens-laser-hair-removal-mobile-01.png"
        desktopImage="/images/womens-laser-hair-removal-desktop-01.png"
      />

      {/* =====================================================
          INTRO + TREATMENT PRICE CAROUSEL
      ====================================================== */}
      <ServiceMain
        title="Women’s Laser Hair Removal"
        description="Enjoy smoother-looking skin and long-term hair reduction with Women’s Laser Hair Removal. This non-surgical treatment uses controlled laser energy to target pigment within unwanted hair. The laser delivers concentrated light to suitable hair follicles, gradually reducing future growth while protecting the surrounding skin. Treatment can be customized for areas such as the upper lip, chin, underarms, bikini line, arms, hands, legs, feet, abdomen, and back."
        rating={4.9}
        reviews={350}
        autoSlideInterval={4000}
        subServices={[
          {
            title: "Upper Lip",
            description:
              "Laser hair reduction treatment for the upper lip area.",
            price: 50,
            currency: "AED",
            priceLabel: "Treatment price",
            buttonText: "Book Now",
            buttonHref:
              "/services/body-laser-treatments/women-s-laser-hair-removal",
          },

          {
            title: "Chin + Upper Lip",
            description:
              "Laser hair reduction treatment for the chin and upper lip.",
            price: 75,
            currency: "AED",
            priceLabel: "Treatment price",
            buttonText: "Book Now",
            buttonHref:
              "/services/body-laser-treatments/women-s-laser-hair-removal",
          },

          {
            title: "Underarms",
            description:
              "Laser hair reduction treatment for the underarm area.",
            price: 120,
            currency: "AED",
            priceLabel: "Treatment price",
            buttonText: "Book Now",
            buttonHref:
              "/services/body-laser-treatments/women-s-laser-hair-removal",
          },

          {
            title: "Half Bikini Line",
            description:
              "Targeted laser hair reduction for the half bikini line.",
            price: 150,
            currency: "AED",
            priceLabel: "Treatment price",
            buttonText: "Book Now",
            buttonHref:
              "/services/body-laser-treatments/women-s-laser-hair-removal",
          },

          {
            title: "Full Bikini Line",
            description:
              "Complete laser hair reduction treatment for the bikini line.",
            price: 200,
            currency: "AED",
            priceLabel: "Treatment price",
            buttonText: "Book Now",
            buttonHref:
              "/services/body-laser-treatments/women-s-laser-hair-removal",
          },

          {
            title: "Full Arms + Hands",
            description:
              "Laser hair reduction treatment for the full arms and hands.",
            price: 200,
            currency: "AED",
            priceLabel: "Treatment price",
            buttonText: "Book Now",
            buttonHref:
              "/services/body-laser-treatments/women-s-laser-hair-removal",
          },

          {
            title: "Full Arms + Hands + Underarms",
            description:
              "Combined laser treatment for full arms, hands, and underarms.",
            price: 250,
            currency: "AED",
            priceLabel: "Treatment price",
            badge: "Combo",
            buttonText: "Book Now",
            buttonHref:
              "/services/body-laser-treatments/women-s-laser-hair-removal",
          },

          {
            title: "Half Arms + Hands",
            description:
              "Laser hair reduction treatment for the half arms and hands.",
            price: 150,
            currency: "AED",
            priceLabel: "Treatment price",
            buttonText: "Book Now",
            buttonHref:
              "/services/body-laser-treatments/women-s-laser-hair-removal",
          },

          {
            title: "Half Legs + Feet",
            description:
              "Laser hair reduction treatment for the half legs and feet.",
            price: 200,
            currency: "AED",
            priceLabel: "Treatment price",
            buttonText: "Book Now",
            buttonHref:
              "/services/body-laser-treatments/women-s-laser-hair-removal",
          },

          {
            title: "Full Legs + Feet",
            description:
              "Complete laser hair reduction treatment for the legs and feet.",
            price: 300,
            currency: "AED",
            priceLabel: "Treatment price",
            buttonText: "Book Now",
            buttonHref:
              "/services/body-laser-treatments/women-s-laser-hair-removal",
          },

          {
            title: "Full Body — Excluding Belly And Back",
            description:
              "Full-body laser hair reduction excluding the belly and back.",
            price: 450,
            currency: "AED",
            priceLabel: "Treatment price",
            badge: "Full Body",
            buttonText: "Book Now",
            buttonHref:
              "/services/body-laser-treatments/women-s-laser-hair-removal",
          },

          {
            title: "Full Body — Including Belly And Back",
            description:
              "Complete full-body laser hair reduction including the belly and back.",
            price: 650,
            currency: "AED",
            priceLabel: "Treatment price",
            badge: "Full Body",
            buttonText: "Book Now",
            buttonHref:
              "/services/body-laser-treatments/women-s-laser-hair-removal",
          },
        ]}
      />

      {/* =====================================================
          WHY CHOOSE
      ====================================================== */}
      <TreatmentOffers
        eyebrow="Treatment Benefits"
        title="Why Choose Women’s Laser Hair Removal"
        description="Unlike shaving and waxing, which provide temporary results, laser treatment targets suitable hair follicles for progressive and longer-lasting hair reduction."
        sectionTitle="It Offers:"
        image="/images/why-choose-womens-laser-hair-removal.png"
        imageAlt="Women’s Laser Hair Removal Treatment Benefits"
        offers={[
          {
            label: "Long-Term Hair Reduction:",
            description:
              "Gradually reduces the thickness, density, and regrowth of unwanted hair.",
          },
          {
            label: "Smoother-Looking Skin:",
            description:
              "Helps maintain a cleaner, softer, and more evenly groomed appearance.",
          },
          {
            label: "Less Frequent Hair Removal:",
            description:
              "Reduces the time and effort required for regular shaving, waxing, or threading.",
          },
          {
            label: "Reduced Shaving Irritation:",
            description:
              "May help minimize razor cuts, irritation, and recurring ingrown hairs.",
          },
          {
            label: "Customized Treatment:",
            description:
              "Laser settings are selected according to your skin tone, hair colour, hair thickness, and treatment area.",
          },
        ]}
      />

      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}
      <TimelineSteps
        eyebrow="Treatment Steps"
        title="How Women’s Laser Hair Removal Works"
        description="Our specialists assess your skin and hair before customizing the treatment settings for safe, controlled, and effective hair reduction."
        steps={[
          {
            title: "Consultation And Assessment",
            description:
              "Your skin tone, hair colour, hair thickness, treatment areas, medical history, and previous hair-removal methods are evaluated.",
          },
          {
            title: "Shaving And Skin Preparation",
            description:
              "The selected area is cleaned and prepared. Hair should be shaved beforehand, while waxing, threading, and plucking must be avoided.",
          },
          {
            title: "Controlled Laser Treatment",
            description:
              "The laser delivers carefully controlled pulses of light to target suitable hair follicles throughout the selected area.",
          },
          {
            title: "Cooling And Aftercare",
            description:
              "Cooling and soothing products may be applied after treatment. You will receive skincare, sun-protection, and follow-up instructions.",
          },
        ]}
      />

      {/* =====================================================
          WHO CAN BENEFIT
      ====================================================== */}
      <BenefitRevealSection
        title="Who Can Benefit From Women’s Laser Hair Removal"
        subtitle="A professional treatment for women seeking smoother-looking skin and a lasting reduction in unwanted facial or body hair."
        sectionTitle="It’s Ideal For Women Who:"
        image="/images/who-choose-womens-laser-hair-removal.png"
        imageAlt="Who Can Benefit From Women’s Laser Hair Removal"
        benefits={[
          {
            text: "Want to reduce unwanted facial or body hair",
          },
          {
            text: "Experience frequent shaving or waxing irritation",
          },
          {
            text: "Have recurring ingrown hairs in suitable treatment areas",
          },
          {
            text: "Want smoother-looking underarms, arms, or legs",
          },
          {
            text: "Prefer less frequent shaving, threading, or waxing",
          },
          {
            text: "Want treatment customized to their skin and hair type",
          },
        ]}
      />

      {/* =====================================================
          FAQ
      ====================================================== */}
      <FaqSection
        title="FAQs"
        description=""
        faqs={[
          {
            question:
              "Is Laser Hair Removal Suitable For All Skin Types?",
            answer:
              "Modern laser systems can treat a wide range of skin tones when the appropriate device and settings are used. Dark, coarse hair generally responds better than white, grey, red, or very light-blonde hair.",
          },
          {
            question: "How Long Does A Session Take?",
            answer:
              "A small facial area may take approximately 10 to 15 minutes, while larger or multiple body areas may take 60 minutes or longer.",
          },
          {
            question:
              "Is Women’s Laser Hair Removal Painful?",
            answer:
              "Most people describe the sensation as brief warmth or a light snapping feeling. Cooling technology may be used to improve comfort during treatment.",
          },
          {
            question: "How Many Sessions Will I Need?",
            answer:
              "Most people require approximately six or more sessions because hair grows in different cycles. The exact number depends on the area, hair type, skin tone, and individual response.",
          },
          {
            question:
              "Is There Any Downtime Or Side Effects?",
            answer:
              "Downtime is usually minimal. Temporary redness, warmth, tenderness, or mild swelling may occur. Less-common risks include burns, blisters, scarring, and changes in skin colour.",
          },
        ]}
      />
    </main>
  );
}