
"use client";

import DynamicBanner from "@/components/services/DynamicBanner";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";
import ServiceMain from "@/components/services/ServiceMain";

export default function MedicalServicesPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* =====================================================
          BANNER
      ====================================================== */}
      <DynamicBanner
        mobileImage="/images/medical-services-mobile-01.png"
        desktopImage="/images/medical-services-desktop-01.png"
      />

      {/* =====================================================
          ABOUT THE TREATMENT + SERVICES & PRICES
      ====================================================== */}
      <ServiceMain
        title="Medical Services"
        description="Medical Services provide essential clinical support for patients who need ongoing health management, preventive assessment, screening, basic diagnostics, respiratory support, vaccination assistance, or urgent stabilization. These services include chronic disease management, medical fitness assessment, vaccination administration, health screening consultation, ECG service, nebulization, and basic emergency stabilization. Each service is provided based on the patient’s symptoms, medical history, risk factors, current medications, and clinical need."
        priceListTitle="Medical Services & Prices"
        priceListItems={[
          {
            title: "Chronic Disease Management",
            price: 250,
            currency: "AED",
            buttonHref:
              "/services/general-practitioner/medical-services/chronic-disease-management",
          },
          {
            title: "Medical Fitness Assessment",
            price: 200,
            currency: "AED",
            buttonHref:
              "/services/general-practitioner/medical-services/medical-fitness-assessment",
          },
          {
            title: "Vaccination Administration",
            price: 100,
            currency: "AED",
            buttonHref:
              "/services/general-practitioner/medical-services/vaccination-administration",
          },
          {
            title: "Health Screening Consultation",
            price: 250,
            currency: "AED",
            buttonHref:
              "/services/general-practitioner/medical-services/health-screening-consultation",
          },
          {
            title: "ECG Service",
            price: 150,
            currency: "AED",
            buttonHref:
              "/services/general-practitioner/medical-services/ecg-service",
          },
          {
            title: "Nebulization",
            price: 120,
            currency: "AED",
            buttonHref:
              "/services/general-practitioner/medical-services/nebulization",
          },
          {
            title: "Basic Emergency Stabilization",
            price: 350,
            currency: "AED",
            buttonHref:
              "/services/general-practitioner/medical-services/basic-emergency-stabilization",
          },
        ]}
        rating={4.9}
        reviews={350}
        price={100}
        currency="AED"
        priceLabel="Starting Price"
        buttonText="Book Now"
        buttonHref="/services/general-practitioner/medical-services"
      />

      {/* =====================================================
          WHY CHOOSE MEDICAL SERVICES
      ====================================================== */}
      <TreatmentOffers
        eyebrow="Treatment Benefits"
        title="Why Choose Medical Services"
        description="Unlike waiting until symptoms worsen, timely medical support helps assess health concerns, monitor conditions, and guide the next step of care."
        sectionTitle="It Offers:"
        image="/images/why-choose-medical-services.png"
        imageAlt="Medical Services Benefits"
        offers={[
          {
            label: "Ongoing Condition Support:",
            description:
              "Chronic disease management helps monitor long-term conditions such as diabetes, hypertension, cholesterol, asthma, or heart-related concerns.",
          },
          {
            label: "Preventive Health Checks:",
            description:
              "Medical fitness assessment and health screening consultation support early identification of health risks.",
          },
          {
            label: "Basic Diagnostic Support:",
            description:
              "ECG service helps assess heart rhythm and supports clinical decision-making when needed.",
          },
          {
            label: "Respiratory Care:",
            description:
              "Nebulization can support patients with breathing difficulty, wheezing, asthma, or respiratory symptoms when clinically appropriate.",
          },
          {
            label: "Urgent Initial Care:",
            description:
              "Basic emergency stabilization provides immediate clinical support before referral or transfer if advanced care is required.",
          },
        ]}
      />

      {/* =====================================================
          HOW MEDICAL SERVICES WORK
      ====================================================== */}
      <TimelineSteps
        eyebrow="Treatment Steps"
        title="How Medical Services Work"
        description="Our medical team follows a structured four-step process to provide safe, organized, and patient-focused care."
        steps={[
          {
            title: "Medical Review",
            description:
              "The doctor or healthcare professional reviews your symptoms, medical history, medications, allergies, lifestyle, and current health concerns.",
          },
          {
            title: "Clinical Assessment",
            description:
              "Vital signs, physical examination, fitness review, screening assessment, ECG, nebulization need, or emergency status may be checked based on the service.",
          },
          {
            title: "Service Or Treatment Support",
            description:
              "The selected service is provided, such as chronic care review, vaccination administration, ECG recording, nebulization, screening consultation, or stabilization support.",
          },
          {
            title: "Results, Guidance And Follow-Up",
            description:
              "Findings are explained, and you receive advice on medication, lifestyle, follow-up care, specialist referral, emergency transfer, or further tests if required.",
          },
        ]}
      />

      {/* =====================================================
          WHO CAN BENEFIT FROM MEDICAL SERVICES
      ====================================================== */}
      <BenefitRevealSection
        title="Who Can Benefit From Medical Services"
        subtitle="Medical services are suitable for patients who need general medical support, monitoring, screening, preventive care, respiratory support, or urgent initial assessment."
        sectionTitle="It’s Ideal For Those Who:"
        image="/images/who-can-benefit-medical-services.png"
        imageAlt="Who Can Benefit From Medical Services"
        benefits={[
          {
            text: "Have diabetes, hypertension, cholesterol, asthma, or other chronic conditions",
          },
          {
            text: "Need regular health monitoring and medical guidance",
          },
          {
            text: "Require a medical fitness assessment",
          },
          {
            text: "Need vaccination administration support",
          },
          {
            text: "Want a health screening consultation",
          },
          {
            text: "Require ECG service for heart-related assessment",
          },
          {
            text: "Need nebulization for breathing difficulty or wheezing",
          },
          {
            text: "Need basic emergency stabilization before advanced care",
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
            question: "What Is Chronic Disease Management?",
            answer:
              "Chronic disease management involves regular review, monitoring, medication guidance, lifestyle advice, and follow-up planning for long-term conditions such as diabetes, hypertension, asthma, or heart-related concerns.",
          },
          {
            question: "What Is Included In A Medical Fitness Assessment?",
            answer:
              "A medical fitness assessment may include health history review, basic examination, vital signs check, risk assessment, and fitness-related medical advice based on the requirement.",
          },
          {
            question: "When Is An ECG Needed?",
            answer:
              "An ECG may be recommended for chest discomfort, palpitations, dizziness, shortness of breath, routine screening, or monitoring of heart-related concerns.",
          },
          {
            question: "When Is Nebulization Used?",
            answer:
              "Nebulization may be used for breathing difficulty, wheezing, asthma symptoms, bronchitis, or respiratory discomfort when recommended by a healthcare professional.",
          },
          {
            question: "What Does Basic Emergency Stabilization Mean?",
            answer:
              "Basic emergency stabilization provides initial medical support for urgent symptoms before referral, transfer, or advanced emergency care if required.",
          },
        ]}
      />
    </main>
  );
}
