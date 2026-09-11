"use client";

import DynamicBanner from "@/components/services/DynamicBanner";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";
import ServiceMain from "@/components/services/ServiceMain";

export default function MensLaserHairRemovalPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* =====================================================
          BANNER
      ====================================================== */}
      <DynamicBanner
        mobileImage="/images/mens-laser-hair-removal-mobile-01.png"
        desktopImage="/images/mens-laser-hair-removal-desktop-01.png"
      />

      {/* =====================================================
          INTRO + PRICING CAROUSEL
      ====================================================== */}
      <ServiceMain
        title="Men’s Laser Hair Removal"
        description="Achieve smoother-looking skin and long-term hair reduction with Men’s Laser Hair Removal. The treatment uses controlled laser energy to target pigment within unwanted hair. The laser delivers concentrated light to suitable hair follicles, gradually reducing future growth while protecting the surrounding skin. Treatment can be customized for areas such as the beard, underarms, chest, abdomen, back, arms, and legs."
        rating={4.9}
        reviews={350}
        autoSlideInterval={4000}
        subServices={[
          {
            title: "Beard",
            description: "Men’s laser hair removal for the beard area.",
            price: 100,
            currency: "AED",
            priceLabel: "Treatment price",
            buttonText: "Book Now",
            buttonHref:
              "/services/body-laser-treatments/men-s-laser-hair-removal",
          },
          {
            title: "Underarms",
            description:
              "Laser hair reduction treatment for the underarm area.",
            price: 150,
            currency: "AED",
            priceLabel: "Treatment price",
            buttonText: "Book Now",
            buttonHref:
              "/services/body-laser-treatments/men-s-laser-hair-removal",
          },
          {
            title: "Half Legs",
            description:
              "Laser hair reduction treatment for the half-leg area.",
            price: 400,
            currency: "AED",
            priceLabel: "Treatment price",
            buttonText: "Book Now",
            buttonHref:
              "/services/body-laser-treatments/men-s-laser-hair-removal",
          },
          {
            title: "Full Legs",
            description:
              "Complete laser hair reduction treatment for both full legs.",
            price: 600,
            currency: "AED",
            priceLabel: "Treatment price",
            buttonText: "Book Now",
            buttonHref:
              "/services/body-laser-treatments/men-s-laser-hair-removal",
          },
          {
            title: "Back",
            description:
              "Laser hair reduction treatment for the back area.",
            price: 400,
            currency: "AED",
            priceLabel: "Treatment price",
            buttonText: "Book Now",
            buttonHref:
              "/services/body-laser-treatments/men-s-laser-hair-removal",
          },
          {
            title: "Full Body — Excluding Belly And Back",
            description:
              "Full-body laser hair reduction excluding the belly and back.",
            price: 750,
            currency: "AED",
            priceLabel: "Treatment price",
            badge: "Full Body",
            buttonText: "Book Now",
            buttonHref:
              "/services/body-laser-treatments/men-s-laser-hair-removal",
          },
          {
            title: "Full Body — Including Belly And Back",
            description:
              "Complete full-body laser hair reduction including the belly and back.",
            price: 950,
            currency: "AED",
            priceLabel: "Treatment price",
            badge: "Full Body",
            buttonText: "Book Now",
            buttonHref:
              "/services/body-laser-treatments/men-s-laser-hair-removal",
          },
          {
            title: "Ear Piercing",
            description:
              "Professional ear piercing service.",
            price: 150,
            currency: "AED",
            priceLabel: "Service price",
            badge: "Other Service",
            buttonText: "Book Now",
            buttonHref:
              "/services/body-laser-treatments/men-s-laser-hair-removal",
          },
        ]}
      />

      {/* =====================================================
          TREATMENT BENEFITS
      ====================================================== */}
      <TreatmentOffers
        eyebrow="Treatment Benefits"
        title="Why Choose Men’s Laser Hair Removal"
        description="Unlike shaving and waxing, which offer temporary results, laser treatment targets suitable hair follicles to provide progressive, longer-lasting hair reduction."
        sectionTitle="It Offers:"
        image="/images/why-choose-mens-laser-hair-removal.png"
        imageAlt="Men’s Laser Hair Removal Treatment Benefits"
        offers={[
          {
            label: "Long-Term Hair Reduction:",
            description:
              "Gradually reduces the thickness, density, and regrowth of unwanted hair.",
          },
          {
            label: "Less Frequent Shaving:",
            description:
              "Reduces the time and effort required for regular shaving, trimming, or waxing.",
          },
          {
            label: "Smoother-Looking Skin:",
            description:
              "Creates a cleaner, smoother, and more evenly groomed appearance.",
          },
          {
            label: "Reduced Shaving Irritation:",
            description:
              "May help reduce razor cuts, shaving irritation, and recurring ingrown hairs.",
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
        title="How Men’s Laser Hair Removal Works"
        description="Our specialists assess your skin and hair before customizing the treatment settings for safe, controlled, and effective hair reduction."
        steps={[
          {
            title: "Consultation And Assessment",
            description:
              "Your skin tone, hair colour, hair thickness, medical history, and selected treatment areas are carefully evaluated.",
          },
          {
            title: "Shaving And Skin Preparation",
            description:
              "The treatment area is cleaned and prepared. Hair should be shaved beforehand, while waxing and plucking must be avoided.",
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
        title="Who Can Benefit From Men’s Laser Hair Removal"
        subtitle="A professional grooming treatment for men seeking smoother-looking skin and a lasting reduction in unwanted facial or body hair."
        sectionTitle="It’s Ideal For Men Who:"
        image="/images/who-choose-mens-laser-hair-removal.png"
        imageAlt="Who Can Benefit From Men’s Laser Hair Removal"
        benefits={[
          {
            text: "Want to reduce unwanted facial or body hair",
          },
          {
            text: "Experience frequent shaving irritation or razor bumps",
          },
          {
            text: "Have recurring ingrown hairs in suitable treatment areas",
          },
          {
            text: "Want cleaner beard, cheek, or neckline definition",
          },
          {
            text: "Prefer less frequent shaving, trimming, or waxing",
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
              "A smaller area may take approximately 10 to 20 minutes, while larger or multiple areas can take 60 minutes or longer.",
          },
          {
            question:
              "Is Men’s Laser Hair Removal Painful?",
            answer:
              "Most people describe the sensation as brief warmth or a light snapping feeling. Cooling technology may be used to improve comfort.",
          },
          {
            question: "How Many Sessions Will I Need?",
            answer:
              "Most people require approximately six or more sessions because hair grows in different cycles. The exact number depends on the area, hair type, skin tone, and response.",
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