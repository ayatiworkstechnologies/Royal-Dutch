"use client";

import DynamicBanner from "@/components/services/DynamicBanner";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";
import ServiceMain from "@/components/services/ServiceMain";

export default function ElderlyLongTermCarePage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* =====================================================
          BANNER
      ====================================================== */}
      <DynamicBanner
        mobileImage="/images/elderly-long-term-care-mobile-01.png"
        desktopImage="/images/elderly-long-term-care-desktop-01.png"
      />

      {/* =====================================================
          ABOUT THE TREATMENT + SERVICES & PRICES
      ====================================================== */}
      <ServiceMain
        title="Elderly & Long-Term Care"
        description="Elderly & Long-Term Care provides professional support for patients who need continuous care, regular monitoring, recovery assistance, or long-term medical and personal support at home. This service is suitable for elderly patients, post-operative recovery patients, individuals with chronic health conditions, and patients who need palliative care support. Care is planned based on the patient’s health condition, mobility, comfort, safety needs, and family requirements. Each care plan is personalized to help patients receive consistent support in a familiar and comfortable environment."
        priceListTitle="Elderly & Long-Term Care Services & Prices"
        priceListItems={[
          {
            title: "Elderly Care — 12 Hours",
            price: 650,
            currency: "AED",
            buttonHref:
              "/services/home-care-services/elderly-long-term-care/elderly-care-12-hours",
          },
          {
            title: "Elderly Care — 24 Hours",
            price: 1200,
            currency: "AED",
            buttonHref:
              "/services/home-care-services/elderly-long-term-care/elderly-care-24-hours",
          },
          {
            title: "Post-operative Care Package — Daily",
            price: 700,
            currency: "AED",
            buttonHref:
              "/services/home-care-services/elderly-long-term-care/post-operative-care-package-daily",
          },
          {
            title: "Chronic Disease Monitoring",
            price: 300,
            currency: "AED",
            buttonHref:
              "/services/home-care-services/elderly-long-term-care/chronic-disease-monitoring",
          },
          {
            title: "Palliative Care Support",
            price: 800,
            currency: "AED",
            buttonHref:
              "/services/home-care-services/elderly-long-term-care/palliative-care-support",
          },
        ]}
        rating={4.9}
        reviews={350}
        price={300}
        currency="AED"
        priceLabel="Starting Price"
        buttonText="Book Now"
        buttonHref="/services/home-care-services/elderly-long-term-care"
      />

      {/* =====================================================
          WHY CHOOSE ELDERLY & LONG-TERM CARE
      ====================================================== */}
      <TreatmentOffers
        eyebrow="Service Benefits"
        title="Why Choose Elderly & Long-Term Care"
        description="Unlike short clinical visits, long-term care provides extended support for patients who need continuous attention, comfort, and monitoring."
        sectionTitle="It Offers:"
        image="/images/why-choose-elderly-long-term-care.png"
        imageAlt="Elderly and Long-Term Care Benefits"
        offers={[
          {
            label: "Continuous Care Support:",
            description:
              "12-hour and 24-hour elderly care options are available based on patient and family needs.",
          },
          {
            label: "Post-Operative Recovery Assistance:",
            description:
              "Support is provided for patients recovering after surgery, including monitoring, mobility help, medication reminders, and basic nursing care.",
          },
          {
            label: "Chronic Condition Monitoring:",
            description:
              "Regular monitoring helps support patients living with diabetes, hypertension, heart conditions, respiratory issues, or other long-term illnesses.",
          },
          {
            label: "Palliative Care Support:",
            description:
              "Comfort-focused care is provided for patients with serious illness, helping improve quality of life and daily comfort.",
          },
          {
            label: "Home-Based Comfort:",
            description:
              "Patients can receive care in a familiar environment while families get professional support and peace of mind.",
          },
        ]}
      />

      {/* =====================================================
          HOW ELDERLY & LONG-TERM CARE WORKS
      ====================================================== */}
      <TimelineSteps
        eyebrow="Service Steps"
        title="How Elderly & Long-Term Care Works"
        description="Our team follows a structured four-step process to provide safe, compassionate, and personalized care."
        steps={[
          {
            title: "Patient Assessment",
            description:
              "The patient’s condition, mobility, medical history, daily care needs, medication schedule, and family expectations are reviewed.",
          },
          {
            title: "Care Plan Selection",
            description:
              "A suitable care option is recommended, such as 12-hour elderly care, 24-hour elderly care, post-operative support, chronic disease monitoring, or palliative care support.",
          },
          {
            title: "Daily Care And Monitoring",
            description:
              "The care team provides support such as health monitoring, comfort care, medication reminders, mobility assistance, hygiene support, wound care coordination, and recovery assistance.",
          },
          {
            title: "Follow-Up And Care Adjustment",
            description:
              "The care plan is reviewed regularly and adjusted based on the patient’s recovery, comfort level, symptoms, and changing medical needs.",
          },
        ]}
      />

      {/* =====================================================
          WHO CAN BENEFIT
      ====================================================== */}
      <BenefitRevealSection
        title="Who Can Benefit From Elderly & Long-Term Care"
        subtitle="Elderly and long-term care is suitable for patients and families who need reliable support for extended care, recovery, or chronic condition management."
        sectionTitle="It’s Ideal For Those Who:"
        image="/images/who-can-benefit-elderly-long-term-care.png"
        imageAlt="Who Can Benefit From Elderly and Long-Term Care"
        benefits={[
          {
            text: "Need 12-hour or 24-hour elderly care support",
          },
          {
            text: "Are recovering after surgery or hospitalization",
          },
          {
            text: "Have limited mobility or need daily assistance",
          },
          {
            text: "Require chronic disease monitoring",
          },
          {
            text: "Need medication reminders and basic health observation",
          },
          {
            text: "Need comfort-focused palliative care support",
          },
          {
            text: "Prefer care in a familiar home environment",
          },
          {
            text: "Need professional support for elderly family members",
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
            question: "What Is Included In Elderly Care?",
            answer:
              "Elderly care may include daily assistance, mobility support, medication reminders, basic health monitoring, hygiene support, meal support, comfort care, and coordination with family members.",
          },
          {
            question:
              "What Is The Difference Between 12-Hour And 24-Hour Elderly Care?",
            answer:
              "12-hour care provides support for half-day coverage, while 24-hour care provides full-day support for patients who need continuous monitoring and assistance.",
          },
          {
            question: "What Does Post-Operative Care Include?",
            answer:
              "Post-operative care may include monitoring recovery, medication reminders, wound care coordination, mobility assistance, hygiene support, and follow-up support based on the doctor’s instructions.",
          },
          {
            question: "Who Needs Chronic Disease Monitoring?",
            answer:
              "Patients with long-term conditions such as diabetes, hypertension, heart disease, respiratory conditions, or other ongoing health concerns may benefit from regular monitoring.",
          },
          {
            question: "What Is Palliative Care Support?",
            answer:
              "Palliative care support focuses on comfort, symptom support, emotional care, and quality of life for patients with serious or long-term illness.",
          },
        ]}
      />
    </main>
  );
}