
"use client";

import DynamicBanner from "@/components/services/DynamicBanner";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";
import ServiceMain from "@/components/services/ServiceMain";

export default function PhysiotherapySupportPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* =====================================================
          BANNER
      ====================================================== */}
      <DynamicBanner
        mobileImage="/images/physiotherapy-support-mobile-01.png"
        desktopImage="/images/physiotherapy-support-desktop-01.png"
      />

      {/* =====================================================
          ABOUT THE TREATMENT + SERVICES & PRICES
      ====================================================== */}
      <ServiceMain
        title="Physiotherapy Support"
        description="Physiotherapy Support provides professional movement, recovery, and rehabilitation care for patients who need help improving mobility, strength, balance, flexibility, and daily function. This service is suitable for patients recovering from injury, surgery, illness, pain, weakness, or mobility limitations. Physiotherapy sessions can support recovery, reduce stiffness, improve movement confidence, and help patients return to daily activities safely. Each session is planned based on the patient’s condition, mobility level, pain level, doctor’s advice, and rehabilitation goals."
        priceListTitle="Physiotherapy Support Services & Prices"
        priceListItems={[
          {
            title: "Home Physiotherapy Session",
            price: 300,
            currency: "AED",
            buttonHref:
              "/services/home-care-services/physiotherapy-support/home-physiotherapy-session",
          },
          {
            title: "Rehabilitation Session",
            price: 350,
            currency: "AED",
            buttonHref:
              "/services/home-care-services/physiotherapy-support/rehabilitation-session",
          },
        ]}
        rating={4.9}
        reviews={350}
        price={300}
        currency="AED"
        priceLabel="Starting Price"
        buttonText="Book Now"
        buttonHref="/services/home-care-services/physiotherapy-support"
      />

      {/* =====================================================
          WHY CHOOSE PHYSIOTHERAPY SUPPORT
      ====================================================== */}
      <TreatmentOffers
        eyebrow="Service Benefits"
        title="Why Choose Physiotherapy Support"
        description="Unlike general exercise, physiotherapy support is guided by a professional assessment and customized according to the patient’s physical condition and recovery needs."
        sectionTitle="It Offers:"
        image="/images/why-choose-physiotherapy-support.png"
        imageAlt="Physiotherapy Support Benefits"
        offers={[
          {
            label: "Personalized Movement Assessment:",
            description:
              "Mobility, pain, posture, strength, balance, flexibility, and functional ability are evaluated before planning the session.",
          },
          {
            label: "Recovery-Focused Care:",
            description:
              "Sessions are designed to support recovery after injury, surgery, illness, or long-term physical limitation.",
          },
          {
            label: "Pain And Stiffness Support:",
            description:
              "Guided exercises and techniques may help reduce stiffness, improve mobility, and support better movement comfort.",
          },
          {
            label: "Strength And Balance Training:",
            description:
              "Therapy may include exercises to improve muscle strength, coordination, walking ability, and fall-prevention confidence.",
          },
          {
            label: "Home-Based Convenience:",
            description:
              "Home physiotherapy allows patients to receive care in a familiar environment, especially when travel is difficult.",
          },
        ]}
      />

      {/* =====================================================
          HOW PHYSIOTHERAPY SUPPORT WORKS
      ====================================================== */}
      <TimelineSteps
        eyebrow="Service Steps"
        title="How Physiotherapy Support Works"
        description="Our physiotherapy team follows a structured four-step process to provide safe, guided, and goal-based rehabilitation care."
        steps={[
          {
            title: "Assessment And Goal Setting",
            description:
              "The patient’s pain level, movement limitations, strength, balance, walking ability, medical history, and recovery goals are assessed.",
          },
          {
            title: "Personalized Therapy Plan",
            description:
              "A suitable physiotherapy or rehabilitation plan is created based on the patient’s condition, comfort level, and functional needs.",
          },
          {
            title: "Guided Therapy Session",
            description:
              "The session may include mobility exercises, stretching, strengthening, balance training, posture correction, walking support, or rehabilitation activities.",
          },
          {
            title: "Progress Review And Home Exercises",
            description:
              "Progress is reviewed, the plan is adjusted when needed, and safe home exercises or activity guidance may be provided for continued improvement.",
          },
        ]}
      />

      {/* =====================================================
          WHO CAN BENEFIT
      ====================================================== */}
      <BenefitRevealSection
        title="Who Can Benefit From Physiotherapy Support"
        subtitle="Physiotherapy support is suitable for patients who need professional guidance to improve movement, recovery, and daily function."
        sectionTitle="It’s Ideal For Those Who:"
        image="/images/who-can-benefit-physiotherapy-support.png"
        imageAlt="Who Can Benefit From Physiotherapy Support"
        benefits={[
          {
            text: "Are recovering after surgery, injury, or hospitalization",
          },
          {
            text: "Have joint pain, muscle stiffness, or reduced mobility",
          },
          {
            text: "Need rehabilitation after illness or long bed rest",
          },
          {
            text: "Have difficulty walking, balancing, or climbing stairs",
          },
          {
            text: "Need strength and flexibility improvement",
          },
          {
            text: "Require home-based physiotherapy due to travel difficulty",
          },
          {
            text: "Want guided exercises for safer recovery and better function",
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
            question:
              "What Is Included In A Home Physiotherapy Session?",
            answer:
              "A home physiotherapy session may include movement assessment, guided exercises, stretching, strengthening, balance training, walking support, posture correction, and home exercise guidance.",
          },
          {
            question:
              "What Is The Difference Between Physiotherapy And Rehabilitation?",
            answer:
              "Physiotherapy focuses on improving movement, pain, strength, and function. Rehabilitation is a broader recovery process that may include structured therapy for long-term recovery after surgery, injury, illness, or disability.",
          },
          {
            question: "How Many Sessions Will I Need?",
            answer:
              "The number of sessions depends on the patient’s condition, recovery goal, pain level, mobility, and progress. A physiotherapist can recommend a suitable plan after assessment.",
          },
          {
            question:
              "Is Physiotherapy Suitable For Elderly Patients?",
            answer:
              "Yes. Physiotherapy can support elderly patients with mobility, balance, strength, stiffness, walking confidence, and fall-prevention needs.",
          },
          {
            question: "Can Physiotherapy Be Done At Home?",
            answer:
              "Yes. Home physiotherapy is available for patients who prefer treatment at home or find it difficult to travel to a clinic.",
          },
        ]}
      />
    </main>
  );
}
