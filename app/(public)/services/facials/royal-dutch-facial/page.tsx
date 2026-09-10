"use client";

import DynamicBanner from "@/components/services/DynamicBanner";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";
import ServiceMain from "@/components/services/ServiceMain";

export default function RoyalDutchFacialPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* Banner Section */}
      <DynamicBanner
        mobileImage="/images/royal-dutch-facial-mobile-01.png"
        desktopImage="/images/royal-dutch-facial-desktop-01.png"
      />

      {/* Intro Section */}
      <ServiceMain
        title="Royal Dutch Facial"
        description="Experience personalized skincare with the signature Royal Dutch Facial. This comprehensive treatment is designed to deeply cleanse, gently exfoliate, hydrate, and restore your skin’s natural radiance. The facial combines professional skin analysis, cleansing, exfoliation, optional extraction, massage, a customized mask, moisturization, and sun protection. Every stage is adapted to your skin type and concerns, leaving your complexion feeling smoother, balanced, nourished, and refreshed."
        rating={4.9}
        reviews={350}
        buttonHref="/services/facials/royal-dutch-facial"
      />

      {/* Treatment Offers */}
      <TreatmentOffers
        eyebrow="Treatment Benefits"
        title="Why Choose The Royal Dutch Facial"
        description="Unlike a standard one-size-fits-all facial, the Royal Dutch Facial delivers a personalized skincare experience based on your skin’s condition and individual needs."
        sectionTitle="It Offers:"
        image="/images/why-choose-royal-dutch-facial.png"
        imageAlt="Royal Dutch Facial Treatment Benefits"
        offers={[
          {
            label: "Personalized Skin Analysis:",
            description:
              "Identifies your skin type, hydration level, sensitivity, and primary concerns before treatment.",
          },
          {
            label: "Deep Cleansing:",
            description:
              "Removes makeup residue, excess oil, dirt, and impurities that accumulate on the skin.",
          },
          {
            label: "Gentle Skin Renewal:",
            description:
              "Exfoliates dead surface cells to improve softness, smoothness, and visible brightness.",
          },
          {
            label: "Nourishing Hydration:",
            description:
              "Replenishes moisture and supports a softer, more comfortable, and healthier-looking complexion.",
          },
          {
            label: "Relaxation And Radiance:",
            description:
              "A soothing facial massage relieves tension while promoting a refreshed and revitalized appearance.",
          },
        ]}
      />

      {/* Timeline Steps */}
      <TimelineSteps
        eyebrow="Treatment Steps"
        title="How The Royal Dutch Facial Works"
        description="Our skincare specialists customize every stage of the facial according to your skin type, sensitivity, and desired results."
        steps={[
          {
            title: "Consultation And Skin Analysis",
            description:
              "Your skin type, current concerns, sensitivity, lifestyle, and skincare routine are evaluated to create a personalized treatment plan.",
          },
          {
            title: "Deep Cleansing And Exfoliation",
            description:
              "The skin is thoroughly cleansed before gentle exfoliation removes dead cells, excess oil, and surface buildup.",
          },
          {
            title: "Pore Care And Facial Massage",
            description:
              "Careful extraction may be performed where appropriate, followed by a relaxing massage to refresh the skin and relieve facial tension.",
          },
          {
            title: "Customized Mask And Hydration",
            description:
              "A mask selected for your skin’s needs is applied, followed by moisturizer and sunscreen to nourish and protect the complexion.",
          },
        ]}
      />

      {/* Benefits Section */}
      <BenefitRevealSection
        title="Who Can Benefit From The Royal Dutch Facial"
        subtitle="A personalized facial for anyone seeking cleaner, smoother, better-hydrated, and naturally radiant-looking skin."
        sectionTitle="It’s Ideal For Those Who:"
        image="/images/who-choose-royal-dutch-facial.png"
        imageAlt="Who Can Benefit From The Royal Dutch Facial"
        benefits={[
          {
            text: "Want a complete professional skincare experience",
          },
          {
            text: "Experience dull, tired, or uneven-looking skin",
          },
          {
            text: "Have dry, oily, combination, or mildly congested skin",
          },
          {
            text: "Want smoother and softer-looking skin texture",
          },
          {
            text: "Need refreshed skin before a special occasion",
          },
          {
            text: "Want regular professional care for overall skin maintenance",
          },
        ]}
      />

      {/* FAQ Section */}
      <FaqSection
        title="FAQs"
        description=""
        faqs={[
          {
            question:
              "Is The Royal Dutch Facial Suitable For All Skin Types?",
            answer:
              "Yes. The treatment products and steps can be customized for normal, dry, oily, combination, and sensitive skin following a professional assessment.",
          },
          {
            question: "How Long Does The Royal Dutch Facial Take?",
            answer:
              "The complete facial usually takes approximately 60 minutes, depending on your skin condition and the selected treatment steps.",
          },
          {
            question: "When Can I See The Results?",
            answer:
              "Your skin may feel softer, smoother, cleaner, and more hydrated immediately after treatment. The visible result varies according to your skin type and condition.",
          },
          {
            question: "Is There Any Downtime After The Facial?",
            answer:
              "There is generally no downtime. Mild temporary redness may occur after exfoliation or extraction but usually settles within a few hours.",
          },
          {
            question:
              "How Often Should I Get The Royal Dutch Facial?",
            answer:
              "For regular skin maintenance, the facial may be performed every four to six weeks. Your skincare specialist can recommend a suitable schedule.",
          },
        ]}
      />
    </main>
  );
}