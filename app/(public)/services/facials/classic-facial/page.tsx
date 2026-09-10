"use client";

import DynamicBanner from "@/components/services/DynamicBanner";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";
import ServiceMain from "@/components/services/ServiceMain";

export default function ClassicFacialPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* Banner Section */}
      <DynamicBanner
        mobileImage="/images/classic-facial-mobile-01.png"
        desktopImage="/images/classic-facial-desktop-01.png"
      />

      {/* Intro Section */}
      <ServiceMain
        title="Classic Facial"
        description="Healthy, glowing skin begins with consistent professional care. Our Classic Facial is a gentle treatment designed to cleanse, exfoliate, hydrate, and refresh your skin. The treatment combines deep cleansing, mild exfoliation, optional steam and extraction, facial massage, a customized mask, moisturization, and sun protection. Whether your skin feels dull, dry, oily, or congested, each step is personalized according to your skin type and current concerns."
        rating={4.9}
        reviews={350}
        buttonHref="/services/facials/classic-facial"
      />

      {/* Treatment Offers */}
      <TreatmentOffers
        eyebrow="Treatment Benefits"
        title="Why Choose A Classic Facial"
        description="Unlike a basic home skincare routine, a professional Classic Facial provides deeper cleansing and customized care to maintain healthier, smoother, and more balanced-looking skin."
        sectionTitle="It Offers:"
        image="/images/why-classic-facial-01.png"
        imageAlt="Classic Facial Treatment Benefits"
        offers={[
          {
            label: "Deep Skin Cleansing:",
            description:
              "Removes accumulated dirt, excess oil, makeup residue, and impurities from the skin.",
          },
          {
            label: "Gentle Exfoliation:",
            description:
              "Eliminates dead skin cells to improve skin softness, smoothness, and natural brightness.",
          },
          {
            label: "Pore Care:",
            description:
              "Optional steam and careful extraction help reduce blackheads, whiteheads, and mild congestion.",
          },
          {
            label: "Hydration And Nourishment:",
            description:
              "Replenishes essential moisture and supports a soft, comfortable, and refreshed complexion.",
          },
          {
            label: "Relaxation And Radiance:",
            description:
              "A soothing facial massage helps relieve tension and leaves the skin looking revitalized.",
          },
        ]}
      />

      {/* Timeline Steps */}
      <TimelineSteps
        eyebrow="Treatment Steps"
        title="How A Classic Facial Works"
        description="Our skincare specialists assess your skin and customize each stage of the facial to provide safe, comfortable, and effective care."
        steps={[
          {
            title: "Consultation And Skin Analysis",
            description:
              "Our specialist evaluates your skin type, current concerns, sensitivity, lifestyle, and skincare routine to select the most suitable products.",
          },
          {
            title: "Deep Cleansing And Exfoliation",
            description:
              "The skin is thoroughly cleansed to remove surface impurities. Gentle exfoliation then lifts away dead skin cells and improves texture.",
          },
          {
            title: "Steam, Extraction And Massage",
            description:
              "Steam helps soften congestion before careful extraction, when required. A relaxing facial massage supports circulation and relieves tension.",
          },
          {
            title: "Customized Mask And Hydration",
            description:
              "A mask selected for your skin’s needs is applied, followed by moisturizer and sunscreen to nourish, protect, and maintain the results.",
          },
        ]}
      />

      {/* Benefits Section */}
      <BenefitRevealSection
        title="Who Can Benefit From A Classic Facial"
        subtitle="A gentle skincare treatment for anyone seeking cleaner, softer, better-hydrated, and naturally radiant-looking skin."
        sectionTitle="It’s Ideal For Those Who:"
        image="/images/who-classic-facial-01.png"
        imageAlt="Who Can Benefit From A Classic Facial"
        benefits={[
          {
            text: "Want healthier, cleaner, and more radiant-looking skin",
          },
          {
            text: "Experience dullness, dryness, or uneven skin texture",
          },
          {
            text: "Have mild blackheads, whiteheads, or congested pores",
          },
          {
            text: "Experience excess oil or an unbalanced complexion",
          },
          {
            text: "Want refreshed skin before an event or special occasion",
          },
          {
            text: "Need regular professional care to maintain overall skin health",
          },
        ]}
      />

      {/* FAQ Section */}
      <FaqSection
        title="FAQs"
        description=""
        faqs={[
          {
            question: "Is A Classic Facial Suitable For All Skin Types?",
            answer:
              "Yes. The products and treatment steps can be customized for normal, dry, oily, combination, and sensitive skin. A skin assessment is completed before treatment.",
          },
          {
            question: "How Long Does A Classic Facial Take?",
            answer:
              "A Classic Facial usually takes approximately 45 to 60 minutes, depending on your skin condition and the customized treatment steps.",
          },
          {
            question: "When Can I See The Results?",
            answer:
              "Your skin may feel softer, smoother, and more hydrated immediately after the facial. A refreshed glow is generally visible on the same day.",
          },
          {
            question: "Is There Any Downtime After The Treatment?",
            answer:
              "There is usually no downtime. Mild temporary redness may occur after exfoliation or extraction, but it generally settles within a few hours.",
          },
          {
            question: "How Often Should I Get A Classic Facial?",
            answer:
              "For regular skin maintenance, a Classic Facial is generally recommended every four to six weeks. Your specialist may suggest a different schedule depending on your skin type and concerns.",
          },
        ]}
      />
    </main>
  );
}