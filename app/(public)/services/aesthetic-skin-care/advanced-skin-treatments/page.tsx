"use client";

import DynamicBanner from "@/components/services/DynamicBanner";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";
import ServiceMain from "@/components/services/ServiceMain";

export default function AdvancedSkinTreatmentsPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* =====================================================
          BANNER
      ====================================================== */}
      <DynamicBanner
        mobileImage="/images/advanced-skin-treatments-mobile-01.png"
        desktopImage="/images/advanced-skin-treatments-desktop-01.png"
      />

      {/* =====================================================
          ABOUT THE TREATMENT + PRICE GRID
      ====================================================== */}
      <ServiceMain
        title="Advanced Skin Treatments"
        description="Advanced aesthetic care combines professional assessment with targeted technologies to address concerns that may not respond fully to a regular skincare routine. Our Advanced Skin Treatments include chemical exfoliation, controlled microneedling, exosome-assisted microneedling, and non-surgical fat freezing. Each treatment plan is customized according to your skin condition, medical history, treatment area, sensitivity, and desired results."
        priceListTitle="Advanced Treatments & Prices"
        priceListItems={[
          {
            title: "Chemical Peel",
            price: 649,
            currency: "AED",
            buttonHref:
              "/services/aesthetic-skin-care/advanced-skin-treatments/chemical-peel",
          },
          {
            title: "Microneedling — Dermapen",
            price: 300,
            currency: "AED",
            buttonHref:
              "/services/aesthetic-skin-care/advanced-skin-treatments/microneedling-dermapen",
          },
          {
            title: "Microneedling + Exosomes",
            price: 499,
            currency: "AED",
            buttonHref:
              "/services/aesthetic-skin-care/advanced-skin-treatments/microneedling-exosomes",
          },
          {
            title: "Fat Freezing — Cryolipolysis",
            price: 400,
            currency: "AED",
            buttonHref:
              "/services/aesthetic-skin-care/advanced-skin-treatments/fat-freezing-cryolipolysis",
          },
        ]}
        rating={4.9}
        reviews={350}
        price={300}
        currency="AED"
        priceLabel="Starting Price"
        buttonText="Book Now"
        buttonHref="/services/aesthetic-skin-care/advanced-skin-treatments"
      />

      {/* =====================================================
          WHY CHOOSE ADVANCED SKIN TREATMENTS
      ====================================================== */}
      <TreatmentOffers
        eyebrow="Treatment Benefits"
        title="Why Choose Advanced Skin Treatments"
        description="Unlike standard facials, advanced treatments use controlled techniques and specialized technologies to provide targeted skin renewal and body-contouring support."
        sectionTitle="It Offers:"
        image="/images/why-choose-advanced-skin-treatments.png"
        imageAlt="Advanced Skin Treatment Benefits"
        offers={[
          {
            label: "Targeted Skin Renewal:",
            description:
              "Addresses concerns such as dullness, uneven texture, enlarged-looking pores, and superficial pigmentation.",
          },
          {
            label: "Collagen Support:",
            description:
              "Microneedling supports the skin’s natural renewal process for a smoother and firmer-looking complexion.",
          },
          {
            label: "Customized Treatment Intensity:",
            description:
              "The procedure, treatment depth, strength, and settings are selected according to individual needs.",
          },
          {
            label: "Advanced Topical Care:",
            description:
              "Professionally selected products or serums may be incorporated according to the treatment protocol.",
          },
          {
            label: "Non-Surgical Body Contouring:",
            description:
              "Cryolipolysis uses controlled cooling to target suitable areas of localized fat without surgery.",
          },
        ]}
      />

      {/* =====================================================
          HOW ADVANCED SKIN TREATMENTS WORK
      ====================================================== */}
      <TimelineSteps
        eyebrow="Treatment Steps"
        title="How Advanced Skin Treatments Work"
        description="Our specialists follow a structured four-step process to ensure every treatment is carefully selected, customized, and supported with appropriate aftercare."
        steps={[
          {
            title: "Consultation And Assessment",
            description:
              "Your skin or body concerns, medical history, sensitivity, previous procedures, and expected results are carefully evaluated.",
          },
          {
            title: "Personalized Treatment Planning",
            description:
              "A suitable procedure, treatment strength, session schedule, preparation instructions, and expected recovery period are discussed.",
          },
          {
            title: "Targeted Procedure",
            description:
              "The selected chemical peel, Dermapen treatment, exosome-assisted microneedling, or cryolipolysis procedure is performed using the appropriate protocol.",
          },
          {
            title: "Aftercare And Follow-Up",
            description:
              "Protective or calming products are applied when required, followed by recovery guidance, sun protection, and follow-up recommendations.",
          },
        ]}
      />

      {/* =====================================================
          WHO CAN BENEFIT
      ====================================================== */}
      <BenefitRevealSection
        title="Who Can Benefit From Advanced Treatments"
        subtitle="These treatments are suitable for people seeking targeted care for skin texture, tone, early ageing concerns, acne marks, or localized body-contouring goals."
        sectionTitle="It’s Ideal For Those Who:"
        image="/images/who-can-benefit-advanced-skin-treatments.png"
        imageAlt="Who Can Benefit From Advanced Skin Treatments"
        benefits={[
          {
            text: "Experience dull, rough, or uneven-looking skin",
          },
          {
            text: "Want to improve the appearance of enlarged pores",
          },
          {
            text: "Notice fine lines or early signs of ageing",
          },
          {
            text: "Want to soften the appearance of mild acne marks",
          },
          {
            text: "Have visible uneven tone or superficial pigmentation",
          },
          {
            text: "Want non-surgical contouring for suitable localized fat areas",
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
            question: "Which Advanced Treatment Is Right For Me?",
            answer:
              "The correct treatment depends on your concern. Chemical peels support surface renewal, microneedling targets texture, exosome-assisted microneedling adds professional topical care, and cryolipolysis supports localized body contouring.",
          },
          {
            question: "How Long Does A Treatment Take?",
            answer:
              "Most advanced treatments take approximately 30 to 75 minutes, depending on the procedure, treatment area, and required preparation.",
          },
          {
            question: "When Can I Expect Results?",
            answer:
              "Results vary by procedure. Skin treatments generally improve gradually as the skin renews, while changes following cryolipolysis may develop over several weeks or months.",
          },
          {
            question: "Is There Any Downtime?",
            answer:
              "Chemical peels and microneedling may cause temporary redness, sensitivity, dryness, or peeling. Cryolipolysis may cause temporary redness, tenderness, bruising, or numbness.",
          },
          {
            question: "How Many Sessions Will I Need?",
            answer:
              "Some people benefit from one session, while others may require a planned course. The number and spacing of treatments are decided after professional assessment.",
          },
        ]}
      />
    </main>
  );
}