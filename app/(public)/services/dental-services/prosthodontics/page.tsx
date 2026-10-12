
"use client";

import DynamicBanner from "@/components/services/DynamicBanner";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";
import ServiceMain from "@/components/services/ServiceMain";

export default function ProsthodonticsPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* =====================================================
          BANNER
      ====================================================== */}
      <DynamicBanner
        mobileImage="/images/prosthodontics-mobile-01.png"
        desktopImage="/images/prosthodontics-desktop-01.png"
      />

      {/* =====================================================
          ABOUT THE TREATMENT + SERVICES & PRICES
      ====================================================== */}
      <ServiceMain
        title="Prosthodontics"
        description="Prosthodontics focuses on restoring missing, damaged, weakened, or heavily restored teeth using crowns, dentures, and customized dental replacements. These services include crown consultation, zirconia crowns, complete dentures, and partial dentures. Prosthodontic treatment helps improve chewing ability, speech comfort, smile appearance, facial support, and overall oral function. Each treatment is planned after dental examination, bite assessment, tooth condition review, and discussion of the patient’s comfort and aesthetic goals."
        priceListTitle="Prosthodontics Services & Prices"
        priceListItems={[
          {
            title: "Crown Consultation",
            price: 250,
            currency: "AED",
            buttonHref:
              "/services/dental-services/prosthodontics/crown-consultation",
          },
          {
            title: "Zirconia Crown",
            price: 1500,
            currency: "AED",
            buttonHref:
              "/services/dental-services/prosthodontics/zirconia-crown",
          },
          {
            title: "Denture — Complete",
            price: 3500,
            currency: "AED",
            buttonHref:
              "/services/dental-services/prosthodontics/denture-complete",
          },
          {
            title: "Denture — Partial",
            price: 2000,
            currency: "AED",
            buttonHref:
              "/services/dental-services/prosthodontics/denture-partial",
          },
        ]}
        rating={4.9}
        reviews={350}
        price={250}
        currency="AED"
        priceLabel="Starting Price"
        buttonText="Book Now"
        buttonHref="/services/dental-services/prosthodontics"
      />

      {/* =====================================================
          WHY CHOOSE PROSTHODONTICS
      ====================================================== */}
      <TreatmentOffers
        eyebrow="Treatment Benefits"
        title="Why Choose Prosthodontics"
        description="Unlike leaving missing or weakened teeth untreated, prosthodontic care helps restore function, protect remaining teeth, and improve smile confidence."
        sectionTitle="It Offers:"
        image="/images/why-choose-prosthodontics.png"
        imageAlt="Prosthodontics Treatment Benefits"
        offers={[
          {
            label: "Tooth Restoration:",
            description:
              "Crowns can protect weakened, broken, root canal-treated, or heavily filled teeth.",
          },
          {
            label: "Natural-Looking Appearance:",
            description:
              "Zirconia crowns provide a strong and aesthetic tooth-coloured restoration.",
          },
          {
            label: "Missing Teeth Replacement:",
            description:
              "Complete or partial dentures help restore chewing, speaking, and smile appearance.",
          },
          {
            label: "Better Oral Function:",
            description:
              "Prosthodontic treatment supports bite balance, chewing comfort, and daily function.",
          },
          {
            label: "Customized Fit:",
            description:
              "Crowns and dentures are planned according to your mouth, bite, tooth shade, gum condition, and comfort needs.",
          },
        ]}
      />

      {/* =====================================================
          HOW PROSTHODONTICS WORKS
      ====================================================== */}
      <TimelineSteps
        eyebrow="Treatment Steps"
        title="How Prosthodontics Works"
        description="Our dental team follows a structured four-step process to plan and provide suitable tooth replacement or restoration."
        steps={[
          {
            title: "Consultation And Assessment",
            description:
              "The dentist examines your teeth, gums, bite, missing teeth, existing restorations, and overall oral condition.",
          },
          {
            title: "Treatment Planning",
            description:
              "A suitable option is recommended, such as zirconia crown, complete denture, partial denture, or further preparation before prosthetic treatment.",
          },
          {
            title: "Impressions And Custom Fabrication",
            description:
              "Measurements, scans, or impressions are taken so the crown or denture can be custom-made for proper fit, function, and appearance.",
          },
          {
            title: "Fitting And Aftercare",
            description:
              "The crown or denture is fitted, adjusted for comfort and bite, and aftercare instructions are provided for long-term maintenance.",
          },
        ]}
      />

      {/* =====================================================
          WHO CAN BENEFIT FROM PROSTHODONTICS
      ====================================================== */}
      <BenefitRevealSection
        title="Who Can Benefit From Prosthodontics"
        subtitle="Prosthodontics is suitable for patients who need tooth protection, replacement, or restoration for better chewing, speaking, and smile confidence."
        sectionTitle="It’s Ideal For Those Who:"
        image="/images/who-can-benefit-prosthodontics.png"
        imageAlt="Who Can Benefit From Prosthodontics"
        benefits={[
          {
            text: "Have missing teeth",
          },
          {
            text: "Need complete or partial dentures",
          },
          {
            text: "Have weakened, broken, or heavily filled teeth",
          },
          {
            text: "Need a crown after root canal treatment",
          },
          {
            text: "Want a strong and natural-looking crown",
          },
          {
            text: "Have difficulty chewing due to missing teeth",
          },
          {
            text: "Want improved smile appearance and oral function",
          },
          {
            text: "Need customized dental replacement options",
          },
        ]}
      />

      {/* =====================================================
          FREQUENTLY ASKED QUESTIONS
      ====================================================== */}
      <FaqSection
        title="FAQs"
        description=""
        faqs={[
          {
            question: "What Is A Zirconia Crown?",
            answer:
              "A zirconia crown is a strong, tooth-coloured dental crown used to cover and protect a damaged, weakened, or root canal-treated tooth.",
          },
          {
            question: "When Do I Need A Denture?",
            answer:
              "A denture may be recommended when several teeth or all teeth are missing and need replacement for chewing, speech, appearance, and facial support.",
          },
          {
            question:
              "What Is The Difference Between Complete And Partial Denture?",
            answer:
              "A complete denture replaces all teeth in an arch, while a partial denture replaces some missing teeth while natural teeth remain.",
          },
          {
            question:
              "How Long Does It Take To Get A Crown Or Denture?",
            answer:
              "The timeline depends on assessment, preparation, impressions, lab fabrication, fitting, and adjustments. Your dentist will explain the expected schedule during consultation.",
          },
          {
            question: "How Do I Care For Crowns And Dentures?",
            answer:
              "Brush and clean daily, maintain good oral hygiene, avoid biting very hard objects, clean dentures as instructed, and attend regular dental check-ups.",
          },
        ]}
      />
    </main>
  );
}
