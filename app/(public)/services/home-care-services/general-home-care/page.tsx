"use client";

import DynamicBanner from "@/components/services/DynamicBanner";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";
import ServiceMain from "@/components/services/ServiceMain";

export default function GeneralHomeCarePage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* =====================================================
          BANNER
      ====================================================== */}
      <DynamicBanner
        mobileImage="/images/general-home-care-mobile-01.png"
        desktopImage="/images/general-home-care-desktop-01.png"
      />

      {/* =====================================================
          ABOUT THE TREATMENT + SERVICES & PRICES
      ====================================================== */}
      <ServiceMain
        title="General Home Care"
        description="General Home Care provides professional healthcare support in the comfort of your home for patients who need convenient, safe, and personalized medical care. This service includes home care assessment visits, GP home visits, specialist consultations, and nursing visits during day or night shifts. It is designed for patients who may find clinic visits difficult due to age, illness, recovery needs, mobility limitations, or ongoing medical support requirements. Each visit is planned based on the patient’s condition, medical history, care needs, comfort, and required level of support."
        priceListTitle="General Home Care Services & Prices"
        priceListItems={[
          {
            title: "Home Care Assessment Visit",
            price: 350,
            currency: "AED",
            buttonHref:
              "/services/home-care-services/general-home-care/home-care-assessment-visit",
          },
          {
            title: "GP Home Visit",
            price: 500,
            currency: "AED",
            buttonHref:
              "/services/home-care-services/general-home-care/gp-home-visit",
          },
          {
            title: "Specialist Home Visit",
            price: 750,
            currency: "AED",
            buttonHref:
              "/services/home-care-services/general-home-care/specialist-home-visit",
          },
          {
            title: "Nursing Visit — Day Shift",
            price: 250,
            currency: "AED",
            buttonHref:
              "/services/home-care-services/general-home-care/nursing-visit-day-shift",
          },
          {
            title: "Nursing Visit — Night Shift",
            price: 350,
            currency: "AED",
            buttonHref:
              "/services/home-care-services/general-home-care/nursing-visit-night-shift",
          },
        ]}
        rating={4.9}
        reviews={350}
        price={250}
        currency="AED"
        priceLabel="Starting Price"
        buttonText="Book Now"
        buttonHref="/services/home-care-services/general-home-care"
      />

      {/* =====================================================
          WHY CHOOSE GENERAL HOME CARE
      ====================================================== */}
      <TreatmentOffers
        eyebrow="Service Benefits"
        title="Why Choose General Home Care"
        description="Unlike regular clinic visits, general home care allows patients to receive medical attention in a familiar and comfortable environment."
        sectionTitle="It Offers:"
        image="/images/why-choose-general-home-care.png"
        imageAlt="General Home Care Benefits"
        offers={[
          {
            label: "Medical Care At Home:",
            description:
              "Receive professional healthcare support without the stress of travelling to a clinic or hospital.",
          },
          {
            label: "Personalized Assessment:",
            description:
              "The patient’s symptoms, medical condition, mobility, and care needs are reviewed before planning support.",
          },
          {
            label: "GP And Specialist Visits:",
            description:
              "Doctor consultations can be arranged at home based on the patient’s medical requirement.",
          },
          {
            label: "Day And Night Nursing Support:",
            description:
              "Nursing visits are available for monitoring, medication support, wound care, injections, and general patient care.",
          },
          {
            label: "Comfortable Recovery:",
            description:
              "Patients can rest and recover in a familiar home setting while receiving professional guidance.",
          },
        ]}
      />

      {/* =====================================================
          HOW GENERAL HOME CARE WORKS
      ====================================================== */}
      <TimelineSteps
        eyebrow="Service Steps"
        title="How General Home Care Works"
        description="Our team follows a structured four-step process to provide safe, convenient, and personalized care at home."
        steps={[
          {
            title: "Care Assessment",
            description:
              "The patient’s health condition, symptoms, medical history, mobility, and care requirements are reviewed.",
          },
          {
            title: "Service Selection And Scheduling",
            description:
              "A suitable service is selected, such as assessment visit, GP visit, specialist visit, or nursing visit, and the home appointment is scheduled.",
          },
          {
            title: "Professional Home Visit",
            description:
              "The healthcare provider visits the patient’s home to assess, consult, monitor, treat, or support the patient according to the care requirement.",
          },
          {
            title: "Follow-Up And Continued Support",
            description:
              "Further visits, nursing care, specialist consultation, or ongoing monitoring may be recommended depending on the patient’s condition and recovery progress.",
          },
        ]}
      />

      {/* =====================================================
          WHO CAN BENEFIT
      ====================================================== */}
      <BenefitRevealSection
        title="Who Can Benefit From General Home Care"
        subtitle="General home care is suitable for patients and families who need medical support in a private, comfortable, and convenient setting."
        sectionTitle="It’s Ideal For Those Who:"
        image="/images/who-can-benefit-general-home-care.png"
        imageAlt="Who Can Benefit From General Home Care"
        benefits={[
          {
            text: "Need medical care at home instead of visiting a clinic",
          },
          {
            text: "Are elderly or have limited mobility",
          },
          {
            text: "Are recovering after surgery, illness, or hospitalization",
          },
          {
            text: "Require GP consultation at home",
          },
          {
            text: "Require specialist consultation at home",
          },
          {
            text: "Need nursing support during the day or night",
          },
          {
            text: "Need help with wound care, injections, medication support, or health monitoring",
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
            question: "What Is Included In A Home Care Assessment Visit?",
            answer:
              "A healthcare professional assesses the patient’s condition, symptoms, mobility, medical history, and the type of care required at home.",
          },
          {
            question: "Can A GP Visit The Patient At Home?",
            answer:
              "Yes. A GP home visit can be arranged for general medical consultation, assessment, and basic treatment guidance.",
          },
          {
            question: "Can A Specialist Home Visit Be Arranged?",
            answer:
              "Yes. Specialist home visits can be arranged based on the patient’s medical condition and consultation requirement.",
          },
          {
            question: "What Can A Nurse Help With At Home?",
            answer:
              "A nurse may assist with basic health monitoring, wound care, medication support, injections, patient hygiene support, and general nursing care based on the care plan.",
          },
          {
            question: "Is Night Shift Nursing Available?",
            answer:
              "Yes. Nursing visits are available for both day shift and night shift depending on the patient’s needs and schedule.",
          },
        ]}
      />
    </main>
  );
}