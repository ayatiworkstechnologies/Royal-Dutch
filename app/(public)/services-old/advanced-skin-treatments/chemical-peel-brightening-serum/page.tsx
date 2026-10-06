"use client";

import DynamicBanner from "@/components/services/DynamicBanner";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";
import ServiceMain from "@/components/services/ServiceMain";

export default function ChemicalPeelBrighteningSerumPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* Banner Section */}
      <DynamicBanner
        mobileImage="/images/chemical-peel-brightening-serum-mobile-01.png"
        desktopImage="/images/chemical-peel-brightening-serum-desktop-01.png"
      />

      {/* Intro Section */}
      <ServiceMain
        title="Chemical Peel With Brightening Serum"
        description="Brighter, smoother-looking skin begins with controlled surface renewal. Our Chemical Peel with Brightening Serum combines professional exfoliation with targeted skincare to refresh dull and uneven-looking skin. A carefully selected peeling solution removes damaged surface cells and excess buildup, while the brightening serum supports hydration and a more luminous complexion. The peel type and strength are customized according to your skin tone, sensitivity, concerns, and treatment goals for controlled and effective care."
        rating={4.9}
        reviews={350}
        price={649}
        currency="AED"
        buttonHref="/services/advanced-skin-treatments/chemical-peel-brightening-serum"
      />

      {/* Treatment Offers */}
      <TreatmentOffers
        eyebrow="Treatment Benefits"
        title="Why Choose A Chemical Peel With Brightening Serum"
        description="Unlike physical scrubs that only exfoliate the surface, a professional chemical peel provides controlled skin renewal followed by targeted brightening and hydrating care."
        sectionTitle="It Offers:"
        image="/images/why-choose-chemical-peel-brightening-serum.png"
        imageAlt="Chemical Peel With Brightening Serum Treatment Benefits"
        offers={[
          {
            label: "Controlled Exfoliation:",
            description:
              "Removes dead surface cells and buildup to reveal fresher-looking skin.",
          },
          {
            label: "Improved Radiance:",
            description:
              "Helps refresh dull, tired-looking skin and restore a brighter complexion.",
          },
          {
            label: "Even-Looking Skin Tone:",
            description:
              "Supports the gradual improvement of uneven tone and visible discoloration.",
          },
          {
            label: "Smoother Texture:",
            description:
              "Helps soften roughness, superficial marks, and the appearance of fine lines.",
          },
          {
            label: "Targeted Serum Care:",
            description:
              "A professionally selected serum hydrates and supports the skin after exfoliation.",
          },
        ]}
      />

      {/* Timeline Steps */}
      <TimelineSteps
        eyebrow="Treatment Steps"
        title="How The Treatment Works"
        description="Our specialists customize the peel strength, application time, and brightening serum based on your skin assessment and individual concerns."
        steps={[
          {
            title: "Consultation And Skin Analysis",
            description:
              "Your skin type, sensitivity, pigmentation concerns, medical history, and current skincare products are carefully reviewed.",
          },
          {
            title: "Cleansing And Skin Preparation",
            description:
              "The treatment area is thoroughly cleansed and degreased to remove makeup, oil, and impurities before applying the peel.",
          },
          {
            title: "Controlled Chemical Peel",
            description:
              "The selected peeling solution is applied for a carefully monitored period to exfoliate damaged surface cells and encourage renewal.",
          },
          {
            title: "Brightening Serum And Protection",
            description:
              "The peel is removed or neutralized when required. A brightening serum, moisturizer, and sunscreen are then applied.",
          },
        ]}
      />

      {/* Benefits Section */}
      <BenefitRevealSection
        title="Who Can Benefit From This Treatment"
        subtitle="A customized resurfacing treatment for people seeking brighter, smoother, and more evenly toned-looking skin."
        sectionTitle="It’s Ideal For Those Who:"
        image="/images/who-choose-chemical-peel-brightening-serum.png"
        imageAlt="Who Can Benefit From Chemical Peel With Brightening Serum"
        benefits={[
          {
            text: "Experience dull, tired, or lacklustre-looking skin",
          },
          {
            text: "Notice uneven-looking skin tone or discoloration",
          },
          {
            text: "Have rough or uneven surface texture",
          },
          {
            text: "Want to improve the appearance of mild acne marks",
          },
          {
            text: "Notice superficial fine lines or sun-related changes",
          },
          {
            text: "Want a brighter and more refreshed complexion",
          },
        ]}
      />

      {/* FAQ Section */}
      <FaqSection
        title="FAQs"
        description=""
        faqs={[
          {
            question: "Is A Chemical Peel Suitable For All Skin Types?",
            answer:
              "Different peel formulations can suit different skin types, but professional assessment is essential. Active infection, open wounds, severe irritation, and certain medical conditions may require postponing treatment.",
          },
          {
            question: "How Long Does The Treatment Take?",
            answer:
              "A superficial Chemical Peel with Brightening Serum usually takes approximately 30 to 45 minutes, depending on the selected peel and application time.",
          },
          {
            question: "When Can I See The Results?",
            answer:
              "The skin may appear smoother and brighter after the initial peeling or recovery period. Tone and texture improvements generally develop gradually over multiple sessions.",
          },
          {
            question: "Is There Any Downtime After The Treatment?",
            answer:
              "A superficial peel may cause temporary redness, dryness, sensitivity, or light flaking for several days. Deeper peels require longer recovery and different aftercare.",
          },
          {
            question: "How Often Can I Have A Chemical Peel?",
            answer:
              "Superficial peels may be repeated every two to five weeks, depending on the formulation and skin response. Your specialist will recommend an appropriate treatment schedule.",
          },
        ]}
      />
    </main>
  );
}