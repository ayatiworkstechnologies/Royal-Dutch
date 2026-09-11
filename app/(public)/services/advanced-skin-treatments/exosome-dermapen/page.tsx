"use client";

import DynamicBanner from "@/components/services/DynamicBanner";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";
import ServiceMain from "@/components/services/ServiceMain";

export default function ExosomeDermapenPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* Banner Section */}
      <DynamicBanner
        mobileImage="/images/exosome-dermapen-mobile-01.png"
        desktopImage="/images/exosome-dermapen-desktop-01.png"
      />

      {/* Intro Section */}
      <ServiceMain
        title="Exosome Dermapen"
        description="Advanced skin renewal begins with a personalized approach. Exosome Dermapen combines controlled microneedling with a professionally selected exosome-based topical serum to support smoother, firmer, and more radiant-looking skin. The Dermapen creates precise microchannels on the skin’s surface, supporting its natural renewal response and helping the selected serum spread across the treated area. This customized treatment may improve the appearance of dullness, uneven texture, enlarged pores, fine lines, and mild acne marks over a series of sessions."
        rating={4.9}
        reviews={350}
        price={499}
        currency="AED"
        buttonHref="/services/advanced-skin-treatments/exosome-dermapen"
      />

      {/* Treatment Offers */}
      <TreatmentOffers
        eyebrow="Treatment Benefits"
        title="Why Choose Exosome Dermapen"
        description="Unlike a conventional facial, Exosome Dermapen combines controlled microneedling with targeted topical aftercare to support gradual skin renewal and improve overall skin quality."
        sectionTitle="It Offers:"
        image="/images/why-choose-exosome-dermapen.png"
        imageAlt="Exosome Dermapen Treatment Benefits"
        offers={[
          {
            label: "Collagen Support:",
            description:
              "Controlled microneedling supports the skin’s natural renewal process for a firmer and smoother-looking complexion.",
          },
          {
            label: "Improved Skin Texture:",
            description:
              "Helps soften the appearance of roughness, uneven texture, and enlarged-looking pores.",
          },
          {
            label: "Enhanced Radiance:",
            description:
              "Supports healthier-looking skin and helps restore a fresher, more luminous appearance.",
          },
          {
            label: "Targeted Mark Care:",
            description:
              "May gradually reduce the visible appearance of mild acne marks and superficial skin irregularities.",
          },
          {
            label: "Advanced Topical Support:",
            description:
              "A professionally selected exosome-based serum is applied as part of the post-microneedling treatment protocol.",
          },
        ]}
      />

      {/* Timeline Steps */}
      <TimelineSteps
        eyebrow="Treatment Steps"
        title="How Exosome Dermapen Works"
        description="Our skincare specialists assess your skin and customize the treatment depth, intensity, and topical serum according to your concerns and treatment goals."
        steps={[
          {
            title: "Consultation And Skin Analysis",
            description:
              "Your skin type, sensitivity, medical history, current concerns, and previous treatments are reviewed to determine your suitability.",
          },
          {
            title: "Cleansing And Skin Preparation",
            description:
              "The treatment area is thoroughly cleansed and disinfected. A topical numbing cream may be applied to improve comfort during the procedure.",
          },
          {
            title: "Controlled Dermapen Treatment",
            description:
              "The Dermapen device is gently moved across the skin, creating precise microchannels at a depth selected for your individual concerns.",
          },
          {
            title: "Exosome Serum And Aftercare",
            description:
              "The selected topical serum is applied according to the treatment protocol, followed by calming products and detailed post-treatment instructions.",
          },
        ]}
      />

      {/* Benefits Section */}
      <BenefitRevealSection
        title="Who Can Benefit From Exosome Dermapen"
        subtitle="An advanced skin-renewal treatment for people seeking smoother texture, improved firmness, and a refreshed, more radiant-looking complexion."
        sectionTitle="It’s Ideal For Those Who:"
        image="/images/who-choose-exosome-dermapen.png"
        imageAlt="Who Can Benefit From Exosome Dermapen"
        benefits={[
          {
            text: "Experience dull, tired, or uneven-looking skin",
          },
          {
            text: "Want to soften the appearance of fine lines",
          },
          {
            text: "Have rough texture or enlarged-looking pores",
          },
          {
            text: "Want to improve the appearance of mild acne marks",
          },
          {
            text: "Notice reduced firmness or early signs of ageing",
          },
          {
            text: "Want gradual improvement in overall skin quality",
          },
        ]}
      />

      {/* FAQ Section */}
      <FaqSection
        title="FAQs"
        description=""
        faqs={[
          {
            question: "Is Exosome Dermapen Suitable For All Skin Types?",
            answer:
              "It may be suitable for many skin types, but a professional assessment is essential. Treatment may need to be postponed for active acne, skin infections, open wounds, severe irritation, or certain medical conditions.",
          },
          {
            question: "How Long Does An Exosome Dermapen Session Take?",
            answer:
              "The complete appointment usually takes approximately 60 to 75 minutes, including consultation, skin preparation, microneedling, serum application, and aftercare.",
          },
          {
            question: "When Can I See The Results?",
            answer:
              "The skin may appear fresher after the initial recovery period. Improvements in texture, firmness, and overall skin quality usually develop gradually over the following weeks.",
          },
          {
            question: "Is There Any Downtime After The Treatment?",
            answer:
              "Temporary redness, sensitivity, dryness, or mild swelling may occur for approximately one to three days. Recovery time varies according to skin sensitivity and treatment intensity.",
          },
          {
            question: "How Many Exosome Dermapen Sessions Will I Need?",
            answer:
              "A course of approximately three to six sessions, usually spaced four to six weeks apart, may be recommended. The exact number depends on your skin condition and treatment goals.",
          },
        ]}
      />
    </main>
  );
}