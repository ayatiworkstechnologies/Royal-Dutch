"use client";

import DynamicBanner from "@/components/services/DynamicBanner";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";
import ServiceMain from "@/components/services/ServiceMain";

export default function VitaminCHydrafacialPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* Banner Section */}
      <DynamicBanner
        mobileImage="/images/vitamin-c-hydrafacial-mobile-01.png"
        desktopImage="/images/vitamin-c-hydrafacial-desktop-01.png"
      />

      {/* Intro Section */}
      <ServiceMain
        title="Vitamin C HydraFacial"
        description="Bright, healthy-looking skin begins with deep cleansing and antioxidant care. Our Vitamin C HydraFacial combines cleansing, exfoliation, extraction, hydration, and Vitamin C serum infusion in one refreshing treatment. The treatment helps remove dead skin cells and pore impurities while delivering hydrating and antioxidant-rich ingredients to the skin. Ideal for dull, tired, or uneven-looking skin, this customized facial supports a smoother texture, improved hydration, and a fresh, luminous appearance with minimal downtime."
        rating={4.9}
        reviews={350}
        price={250}
        currency="AED"
        buttonHref="/services/facials/vitamin-c-hydrafacial"
      />

      {/* Treatment Offers */}
      <TreatmentOffers
        eyebrow="Treatment Benefits"
        title="Why Choose A Vitamin C HydraFacial"
        description="Unlike a standard facial, the Vitamin C HydraFacial combines device-assisted cleansing and extraction with targeted antioxidant hydration to refresh and brighten the complexion."
        sectionTitle="It Offers:"
        image="/images/why-choose-vitamin-c-hydrafacial.png"
        imageAlt="Vitamin C HydraFacial Treatment Benefits"
        offers={[
          {
            label: "Deep Cleansing:",
            description:
              "Removes excess oil, makeup residue, accumulated dirt, and surface impurities.",
          },
          {
            label: "Gentle Exfoliation:",
            description:
              "Lifts away dead skin cells to reveal smoother, softer, and fresher-looking skin.",
          },
          {
            label: "Pore Purification:",
            description:
              "Controlled suction helps clear blackheads, whiteheads, and congested pores with minimal discomfort.",
          },
          {
            label: "Vitamin C Infusion:",
            description:
              "Delivers antioxidant-rich serum to support a brighter and more even-looking complexion.",
          },
          {
            label: "Lasting Hydration:",
            description:
              "Replenishes essential moisture and leaves the skin feeling soft, plump, and refreshed.",
          },
        ]}
      />

      {/* Timeline Steps */}
      <TimelineSteps
        eyebrow="Treatment Steps"
        title="How A Vitamin C HydraFacial Works"
        description="Our skincare specialists assess your skin and customize every stage of the treatment to support brightness, hydration, and overall skin health."
        steps={[
          {
            title: "Consultation And Skin Analysis",
            description:
              "Your skin type, sensitivity, hydration level, and primary concerns are evaluated to determine the most appropriate treatment settings and serums.",
          },
          {
            title: "Cleansing And Exfoliation",
            description:
              "The skin is thoroughly cleansed while gentle exfoliation removes dead skin cells and prepares the surface for better product absorption.",
          },
          {
            title: "Pore Extraction And Hydration",
            description:
              "Controlled suction carefully removes excess oil and pore congestion while hydrating ingredients help maintain the skin’s moisture balance.",
          },
          {
            title: "Vitamin C Infusion And Protection",
            description:
              "Vitamin C and nourishing serums are delivered to the skin before moisturizer and sunscreen are applied to complete and protect the results.",
          },
        ]}
      />

      {/* Benefits Section */}
      <BenefitRevealSection
        title="Who Can Benefit From A Vitamin C HydraFacial"
        subtitle="A brightening and hydrating facial designed for people seeking clearer, smoother, and more radiant-looking skin."
        sectionTitle="It’s Ideal For Those Who:"
        image="/images/who-choose-vitamin-c-hydrafacial.png"
        imageAlt="Who Can Benefit From A Vitamin C HydraFacial"
        benefits={[
          {
            text: "Experience dull, tired, or lacklustre-looking skin",
          },
          {
            text: "Want a brighter and more radiant complexion",
          },
          {
            text: "Notice uneven-looking skin tone or texture",
          },
          {
            text: "Have dry, dehydrated, or rough-feeling skin",
          },
          {
            text: "Experience mild blackheads or congested pores",
          },
          {
            text: "Want refreshed skin before an event or special occasion",
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
              "Is A Vitamin C HydraFacial Suitable For All Skin Types?",
            answer:
              "It can be customized for many skin types, including dry, oily, combination, and normal skin. Sensitive or irritated skin should be assessed before treatment.",
          },
          {
            question: "How Long Does A Vitamin C HydraFacial Take?",
            answer:
              "The treatment usually takes approximately 45 to 60 minutes, depending on your skin condition and the selected customization.",
          },
          {
            question: "When Can I See The Results?",
            answer:
              "Many people notice smoother, softer, and more radiant-looking skin immediately after treatment. Individual results may vary depending on skin type and concerns.",
          },
          {
            question: "Is There Any Downtime After The Treatment?",
            answer:
              "There is generally little to no downtime. Mild temporary redness or sensitivity may occur, but it usually settles quickly.",
          },
          {
            question: "How Often Should I Get A Vitamin C HydraFacial?",
            answer:
              "For ongoing skin maintenance, the treatment may be performed every four to six weeks. Your skincare specialist can recommend a suitable schedule for your needs.",
          },
        ]}
      />
    </main>
  );
}