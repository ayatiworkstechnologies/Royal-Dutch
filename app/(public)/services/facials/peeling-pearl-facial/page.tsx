"use client";

import DynamicBanner from "@/components/services/DynamicBanner";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";
import ServiceMain from "@/components/services/ServiceMain";

export default function PeelingPearlFacialPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* Banner Section */}
      <DynamicBanner
        mobileImage="/images/peeling-pearl-facial-mobile-01.png"
        desktopImage="/images/peeling-pearl-facial-desktop-01.png"
      />

      {/* Intro Section */}
      <ServiceMain
        title="Peeling Pearl Facial"
        description="Naturally luminous skin begins with gentle exfoliation and nourishing care. Our Peeling Pearl Facial is designed to cleanse, exfoliate, soften, and refresh dull-looking skin. The treatment combines deep cleansing, a gentle pearl-based peel, facial massage, a nourishing mask, hydration, and sun protection. Ideal for tired, rough, or uneven-looking skin, this luxurious facial helps remove surface buildup and leaves the complexion feeling smoother, softer, and visibly refreshed."
        rating={4.9}
        reviews={350}
        buttonHref="/services/facials/peeling-pearl-facial"
      />

      {/* Treatment Offers */}
      <TreatmentOffers
        eyebrow="Treatment Benefits"
        title="Why Choose A Peeling Pearl Facial"
        description="Unlike a basic facial, the Peeling Pearl Facial combines gentle surface renewal with pearl-based skincare to refine texture and restore a fresh, luminous-looking complexion."
        sectionTitle="It Offers:"
        image="/images/why-choose-peeling-pearl-facial.png"
        imageAlt="Peeling Pearl Facial Treatment Benefits"
        offers={[
          {
            label: "Deep Cleansing:",
            description:
              "Removes makeup residue, excess oil, accumulated dirt, and surface impurities.",
          },
          {
            label: "Gentle Exfoliation:",
            description:
              "Helps lift away dead skin cells and surface buildup without aggressive resurfacing.",
          },
          {
            label: "Smoother Texture:",
            description:
              "Supports softer, more refined-looking skin by reducing roughness and dryness.",
          },
          {
            label: "Enhanced Radiance:",
            description:
              "Refreshes dull-looking skin and promotes a brighter, pearl-like finish.",
          },
          {
            label: "Nourishing Hydration:",
            description:
              "Moisturizing products help restore softness, comfort, and a healthy-looking glow.",
          },
        ]}
      />

      {/* Timeline Steps */}
      <TimelineSteps
        eyebrow="Treatment Steps"
        title="How A Peeling Pearl Facial Works"
        description="Our skincare specialists examine your skin and customize the products and exfoliation intensity according to your skin type and sensitivity."
        steps={[
          {
            title: "Consultation And Skin Analysis",
            description:
              "Your skin type, sensitivity, hydration level, current concerns, and skincare routine are evaluated before treatment begins.",
          },
          {
            title: "Cleansing And Preparation",
            description:
              "The skin is thoroughly cleansed to remove makeup, excess oil, dirt, and other surface impurities.",
          },
          {
            title: "Pearl Peel And Massage",
            description:
              "A gentle pearl-based exfoliating product is applied to remove dead skin cells, followed by a relaxing facial massage.",
          },
          {
            title: "Nourishing Mask And Protection",
            description:
              "A customized mask and moisturizer help replenish hydration. Sunscreen is then applied to protect the refreshed skin.",
          },
        ]}
      />

      {/* Benefits Section */}
      <BenefitRevealSection
        title="Who Can Benefit From A Peeling Pearl Facial"
        subtitle="A gentle brightening and exfoliating facial for people seeking smoother, softer, and more radiant-looking skin."
        sectionTitle="It’s Ideal For Those Who:"
        image="/images/who-choose-peeling-pearl-facial.png"
        imageAlt="Who Can Benefit From A Peeling Pearl Facial"
        benefits={[
          {
            text: "Experience dull, tired, or lacklustre-looking skin",
          },
          {
            text: "Have rough, dry, or uneven-feeling skin texture",
          },
          {
            text: "Want a softer and smoother-looking complexion",
          },
          {
            text: "Notice mild surface buildup or congested pores",
          },
          {
            text: "Want refreshed skin before a special occasion",
          },
          {
            text: "Prefer gentle exfoliation with minimal downtime",
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
              "Is A Peeling Pearl Facial Suitable For All Skin Types?",
            answer:
              "It can be customized for many skin types. Those with highly sensitive, irritated, sunburned, or actively inflamed skin should have a professional assessment before treatment.",
          },
          {
            question: "How Long Does A Peeling Pearl Facial Take?",
            answer:
              "The treatment usually takes approximately 45 to 60 minutes, depending on your skin condition and the selected facial steps.",
          },
          {
            question: "When Can I See The Results?",
            answer:
              "The skin may feel softer, smoother, and more refreshed immediately after treatment. The visible result varies according to skin type and condition.",
          },
          {
            question: "Is There Any Downtime After The Treatment?",
            answer:
              "There is generally little to no downtime. Mild temporary redness or sensitivity may occur following exfoliation but usually settles quickly.",
          },
          {
            question:
              "How Often Should I Get A Peeling Pearl Facial?",
            answer:
              "For regular skin maintenance, the facial may be performed every four to six weeks. Your skincare specialist can recommend a suitable schedule after assessing your skin.",
          },
        ]}
      />
    </main>
  );
}