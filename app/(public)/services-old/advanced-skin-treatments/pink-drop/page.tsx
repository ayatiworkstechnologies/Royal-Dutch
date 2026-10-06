"use client";

import DynamicBanner from "@/components/services/DynamicBanner";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";
import ServiceMain from "@/components/services/ServiceMain";

export default function PinkDropPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* Banner Section */}
      <DynamicBanner
        mobileImage="/images/pink-drop-mobile-01.png"
        desktopImage="/images/pink-drop-desktop-01.png"
      />

      {/* Intro Section */}
      <ServiceMain
        title="Pink Drop"
        description="Revitalized, glowing skin begins with targeted hydration and nourishment. Pink Drop is a professional multi-active skin booster designed to improve hydration, radiance, skin texture, and overall skin vitality. Its specialized formulation combines hydrating ingredients, vitamins, peptides, and antioxidants to support smoother, softer, and more luminous-looking skin. Professionally applied using a customized microneedling protocol, the treatment helps the selected serum reach the prepared skin while supporting its natural renewal process."
        rating={4.9}
        reviews={350}
        price={499}
        currency="AED"
        buttonHref="/services/advanced-skin-treatments/pink-drop"
      />

      {/* Treatment Offers */}
      <TreatmentOffers
        eyebrow="Treatment Benefits"
        title="Why Choose Pink Drop"
        description="Unlike a conventional facial, Pink Drop combines multi-active skincare ingredients with professional microneedling to target dehydration, dullness, uneven tone, and early signs of ageing."
        sectionTitle="It Offers:"
        image="/images/why-choose-pink-drop.png"
        imageAlt="Pink Drop Treatment Benefits"
        offers={[
          {
            label: "Deep Hydration:",
            description:
              "Hyaluronic acid and moisturizing ingredients help replenish hydration and improve skin softness.",
          },
          {
            label: "Improved Radiance:",
            description:
              "Vitamins and antioxidants support a brighter, fresher, and more luminous-looking complexion.",
          },
          {
            label: "Even-Looking Skin Tone:",
            description:
              "Targeted ingredients help improve the appearance of dullness and uneven pigmentation.",
          },
          {
            label: "Texture And Firmness Support:",
            description:
              "Peptides and professional microneedling support smoother and firmer-looking skin.",
          },
          {
            label: "Multi-Active Skincare:",
            description:
              "A combination of nourishing ingredients addresses several visible skin concerns within one treatment.",
          },
        ]}
      />

      {/* Timeline Steps */}
      <TimelineSteps
        eyebrow="Treatment Steps"
        title="How Pink Drop Works"
        description="Our skincare specialists assess your skin and customize the treatment technique, intensity, and application protocol according to your individual concerns."
        steps={[
          {
            title: "Consultation And Skin Analysis",
            description:
              "Your skin type, sensitivity, medical history, hydration level, and treatment goals are evaluated to determine your suitability.",
          },
          {
            title: "Cleansing And Skin Preparation",
            description:
              "The treatment area is thoroughly cleansed and disinfected. A topical numbing cream may be applied for additional comfort.",
          },
          {
            title: "Pink Drop Microneedling",
            description:
              "The Pink Drop serum is professionally applied while controlled microneedling creates precise microchannels across the treatment area.",
          },
          {
            title: "Soothing Care And Protection",
            description:
              "Calming aftercare products are applied to support skin comfort. You will also receive instructions for cleansing, hydration, and sun protection.",
          },
        ]}
      />

      {/* Benefits Section */}
      <BenefitRevealSection
        title="Who Can Benefit From Pink Drop"
        subtitle="A revitalizing skin-booster treatment for those seeking improved hydration, brightness, texture, and overall skin quality."
        sectionTitle="It’s Ideal For Those Who:"
        image="/images/who-choose-pink-drop.png"
        imageAlt="Who Can Benefit From Pink Drop"
        benefits={[
          {
            text: "Experience dull, tired, or lacklustre-looking skin",
          },
          {
            text: "Have dry, dehydrated, or rough-feeling skin",
          },
          {
            text: "Notice uneven-looking skin tone or texture",
          },
          {
            text: "Want to soften the appearance of fine lines",
          },
          {
            text: "Experience reduced firmness or early signs of ageing",
          },
          {
            text: "Want a smoother and more radiant-looking complexion",
          },
        ]}
      />

      {/* FAQ Section */}
      <FaqSection
        title="FAQs"
        description=""
        faqs={[
          {
            question: "Is Pink Drop Suitable For All Skin Types?",
            answer:
              "It may be suitable for many skin types, but a professional assessment is necessary. Treatment may need to be postponed for active infections, open wounds, inflamed acne, or certain medical conditions.",
          },
          {
            question: "How Long Does A Pink Drop Treatment Take?",
            answer:
              "The complete appointment usually takes approximately 45 to 60 minutes, including consultation, preparation, microneedling, and aftercare.",
          },
          {
            question: "When Can I See The Results?",
            answer:
              "The skin may appear fresher and more hydrated after the initial recovery period. Improvements in texture, tone, and overall skin quality generally develop gradually.",
          },
          {
            question: "Is There Any Downtime After Pink Drop?",
            answer:
              "Temporary redness, sensitivity, dryness, or mild swelling may occur for approximately one to three days. Recovery time varies between individuals.",
          },
          {
            question: "How Many Pink Drop Sessions Will I Need?",
            answer:
              "A personalized course of multiple sessions may be recommended depending on your skin condition and goals. The number and spacing of treatments will be determined after consultation.",
          },
        ]}
      />
    </main>
  );
}