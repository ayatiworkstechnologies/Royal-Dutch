"use client";

import DynamicBanner from "@/components/services/DynamicBanner";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";
import ServiceMain from "@/components/services/ServiceMain";

export default function OtherServicesPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* =====================================================
          BANNER
      ====================================================== */}
      <DynamicBanner
        mobileImage="/images/other-services-mobile-01.png"
        desktopImage="/images/other-services-desktop-01.png"
      />

      {/* =====================================================
          ABOUT THE TREATMENT + SERVICE PRICE
      ====================================================== */}
      <ServiceMain
        title="Other Services"
        description="Professional Ear Piercing is a quick, hygienic, and carefully performed service designed for clean and accurate ear piercing in a safe clinical environment. The procedure includes placement checking, cleaning, marking, piercing, and aftercare guidance to support proper healing and reduce the risk of irritation."
        priceListTitle="Service & Price"
        priceListItems={[
          {
            title: "Ear Piercing",
            price: 150,
            currency: "AED",
            buttonHref:
              "/services/aesthetic-skin-care/other-services/ear-piercing",
          },
        ]}
        rating={4.9}
        reviews={350}
        price={150}
        currency="AED"
        priceLabel="Starting Price"
        buttonText="Book Now"
        buttonHref="/services/aesthetic-skin-care/other-services"
      />

      {/* =====================================================
          WHY CHOOSE EAR PIERCING
      ====================================================== */}
      <TreatmentOffers
        eyebrow="Treatment Benefits"
        title="Why Choose Ear Piercing"
        description="Unlike casual piercing methods, professional ear piercing focuses on hygiene, comfort, correct placement, and proper aftercare."
        sectionTitle="It Offers:"
        image="/images/why-choose-ear-piercing.png"
        imageAlt="Professional Ear Piercing Benefits"
        offers={[
          {
            label: "Safe And Hygienic Care:",
            description:
              "Performed using clean technique and appropriate safety precautions.",
          },
          {
            label: "Accurate Placement:",
            description:
              "The piercing point is marked carefully before the procedure for balanced positioning.",
          },
          {
            label: "Quick Procedure:",
            description:
              "Ear piercing is usually completed within a few minutes.",
          },
          {
            label: "Comfortable Experience:",
            description:
              "The process is simple, guided, and suitable for most age groups.",
          },
          {
            label: "Aftercare Guidance:",
            description:
              "Clear instructions are provided to help protect the area and support healing.",
          },
        ]}
      />

      {/* =====================================================
          HOW EAR PIERCING WORKS
      ====================================================== */}
      <TimelineSteps
        eyebrow="Treatment Steps"
        title="How Ear Piercing Works"
        description="Our team follows a simple four-step process to ensure safe, clean, and accurate piercing."
        steps={[
          {
            title: "Consultation And Placement Check",
            description:
              "The ear area is checked, the preferred piercing position is discussed, and suitability is confirmed before starting.",
          },
          {
            title: "Cleaning And Marking",
            description:
              "The ear is cleaned properly, and the piercing point is marked to ensure correct and balanced placement.",
          },
          {
            title: "Piercing Procedure",
            description:
              "The piercing is performed carefully using a hygienic method with attention to comfort and precision.",
          },
          {
            title: "Aftercare Instructions",
            description:
              "After the procedure, you receive cleaning guidance, healing advice, and precautions to follow at home.",
          },
        ]}
      />

      {/* =====================================================
          WHO CAN BENEFIT
      ====================================================== */}
      <BenefitRevealSection
        title="Who Can Benefit From Ear Piercing"
        subtitle="A professional service for children, teens, and adults who want safe and properly placed ear piercing."
        sectionTitle="It’s Ideal For Those Who:"
        image="/images/who-can-benefit-ear-piercing.png"
        imageAlt="Who Can Benefit From Professional Ear Piercing"
        benefits={[
          {
            text: "Want ear piercing in a clean medical environment",
          },
          {
            text: "Are getting their first ear piercing",
          },
          {
            text: "Need accurate and balanced piercing placement",
          },
          {
            text: "Prefer professional care instead of casual piercing",
          },
          {
            text: "Want clear aftercare instructions",
          },
          {
            text: "Want a quick and simple procedure with proper hygiene",
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
            question: "Is Ear Piercing Painful?",
            answer:
              "Ear piercing may cause a quick pinch or mild discomfort, but the procedure is usually fast and well tolerated.",
          },
          {
            question: "How Long Does Ear Piercing Take?",
            answer:
              "The procedure usually takes only a few minutes, including cleaning, marking, and piercing.",
          },
          {
            question: "Is Ear Piercing Safe For Children?",
            answer:
              "Yes. Ear piercing can be suitable for children when performed in a clean, professional setting with proper care and aftercare guidance.",
          },
          {
            question: "How Should I Care For My Ear After Piercing?",
            answer:
              "Keep the area clean, avoid touching it with unwashed hands, and follow the clinic’s aftercare instructions.",
          },
          {
            question: "When Will The Piercing Heal?",
            answer:
              "Healing time varies from person to person, but earlobe piercings commonly take a few weeks. Proper aftercare helps support smooth healing.",
          },
        ]}
      />
    </main>
  );
}