"use client";

import DynamicBanner from "@/components/services/DynamicBanner";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";
import ServiceMain from "@/components/services/ServiceMain";

export default function HydrafacialPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* Banner Section */}
      <DynamicBanner
        mobileImage="/images/hydrafacial-mobile-01.png"
        desktopImage="/images/hydrafacial-desktop-01.png"
      />

      {/* Intro Section */}
      <ServiceMain
        title="HydraFacial"
        description="Healthy, radiant skin begins with deep cleansing and lasting hydration. HydraFacial is a gentle, non-invasive treatment that combines cleansing, exfoliation, extraction, and serum infusion in one comfortable session. Using controlled suction and specialized treatment tips, HydraFacial helps remove surface impurities and congested pores while delivering hydrating serums selected for your skin’s needs. The treatment supports smoother texture, improved hydration, and a brighter-looking complexion with minimal discomfort and little to no downtime."
        rating={4.9}
        reviews={350}
        buttonHref="/services/facials/hydrafacial"
      />

      {/* Treatment Offers */}
      <TreatmentOffers
        eyebrow="Treatment Benefits"
        title="Why Choose HydraFacial"
        description="Unlike conventional facials, HydraFacial combines multiple skincare steps using device-assisted technology to deeply cleanse, refresh, and hydrate the skin."
        sectionTitle="It Offers:"
        image="/images/why-choose-hydrafacial.png"
        imageAlt="HydraFacial Treatment Benefits"
        offers={[
          {
            label: "Deep Cleansing:",
            description:
              "Removes accumulated dirt, excess oil, makeup residue, and surface impurities.",
          },
          {
            label: "Gentle Exfoliation:",
            description:
              "Lifts away dead skin cells to reveal smoother, softer, and brighter-looking skin.",
          },
          {
            label: "Pore Extraction:",
            description:
              "Controlled suction helps clear blackheads, whiteheads, and congested pores with minimal discomfort.",
          },
          {
            label: "Intensive Hydration:",
            description:
              "Infuses the skin with moisturizing serums to improve softness, comfort, and suppleness.",
          },
          {
            label: "Customized Skincare:",
            description:
              "Treatment serums can be selected according to concerns such as dryness, dullness, congestion, and uneven texture.",
          },
        ]}
      />

      {/* Timeline Steps */}
      <TimelineSteps
        eyebrow="Treatment Steps"
        title="How HydraFacial Works"
        description="Our skincare specialists assess your skin and personalize each stage of the HydraFacial to address your individual concerns and skincare goals."
        steps={[
          {
            title: "Consultation And Skin Analysis",
            description:
              "Your skin type, hydration level, sensitivity, and primary concerns are evaluated to create a suitable treatment plan.",
          },
          {
            title: "Cleansing And Exfoliation",
            description:
              "The skin is deeply cleansed while gentle exfoliation removes dead skin cells and prepares the surface for the following steps.",
          },
          {
            title: "Pore Extraction",
            description:
              "Controlled suction carefully removes excess oil, blackheads, and impurities from congested pores with minimal discomfort.",
          },
          {
            title: "Serum Infusion And Protection",
            description:
              "Hydrating and nourishing serums are delivered to the skin before moisturizer and sunscreen are applied to complete the treatment.",
          },
        ]}
      />

      {/* Benefits Section */}
      <BenefitRevealSection
        title="Who Can Benefit From HydraFacial"
        subtitle="A customizable treatment for people seeking clearer, smoother, better-hydrated, and more radiant-looking skin."
        sectionTitle="It’s Ideal For Those Who:"
        image="/images/who-choose-hydrafacial.png"
        imageAlt="Who Can Benefit From HydraFacial"
        benefits={[
          {
            text: "Want an instantly refreshed and radiant-looking complexion",
          },
          {
            text: "Experience dry, dehydrated, or rough-textured skin",
          },
          {
            text: "Have oily skin, blackheads, or congested pores",
          },
          {
            text: "Notice dullness or uneven-looking skin tone",
          },
          {
            text: "Want to soften the appearance of fine lines",
          },
          {
            text: "Prefer a gentle treatment with minimal downtime",
          },
        ]}
      />

      {/* FAQ Section */}
      <FaqSection
        title="FAQs"
        description=""
        faqs={[
          {
            question: "Is HydraFacial Suitable For All Skin Types?",
            answer:
              "HydraFacial can be customized for many skin types, including dry, oily, combination, and sensitive skin. A professional skin assessment helps determine whether the treatment is appropriate for you.",
          },
          {
            question: "How Long Does A HydraFacial Take?",
            answer:
              "A standard HydraFacial usually takes approximately 30 to 60 minutes, depending on the selected treatment and any additional customization.",
          },
          {
            question: "When Can I See The Results?",
            answer:
              "Many people notice smoother, softer, and more hydrated-looking skin immediately after treatment. Individual results may vary based on skin type and concerns.",
          },
          {
            question: "Is There Any Downtime After HydraFacial?",
            answer:
              "HydraFacial generally involves little to no downtime. Mild temporary redness or sensitivity may occur but usually settles quickly.",
          },
          {
            question: "How Often Should I Get A HydraFacial?",
            answer:
              "A HydraFacial may be performed every four to six weeks for ongoing skin maintenance. Your skincare specialist can recommend a suitable schedule based on your skin’s needs.",
          },
        ]}
      />
    </main>
  );
}