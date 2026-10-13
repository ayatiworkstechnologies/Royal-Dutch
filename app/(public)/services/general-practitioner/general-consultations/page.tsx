
"use client";

import DynamicBanner from "@/components/services/DynamicBanner";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";
import ServiceMain from "@/components/services/ServiceMain";

export default function GeneralConsultationsPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* =====================================================
          BANNER
      ====================================================== */}
      <DynamicBanner
        mobileImage="/images/general-consultations-mobile-01.png"
        desktopImage="/images/general-consultations-desktop-01.png"
      />

      {/* =====================================================
          ABOUT THE TREATMENT + SERVICES & PRICES
      ====================================================== */}
      <ServiceMain
        title="General Consultations"
        description="General Consultations provide professional medical assessment for common health concerns, follow-up care, ongoing symptoms, and general wellness guidance. These services include GP consultation, follow-up GP consultation, and extended consultation for patients who need more time to discuss detailed concerns, multiple symptoms, chronic conditions, or treatment plans. Each consultation is based on the patient’s symptoms, medical history, current medications, lifestyle, and required level of clinical review."
        priceListTitle="General Consultations Services & Prices"
        priceListItems={[
          {
            title: "GP Consultation",
            price: 175,
            currency: "AED",
            buttonHref:
              "/services/general-practitioner/general-consultations/gp-consultation",
          },
          {
            title: "Follow-up GP Consultation",
            price: 125,
            currency: "AED",
            buttonHref:
              "/services/general-practitioner/general-consultations/follow-up-gp-consultation",
          },
          {
            title: "Extended Consultation",
            price: 250,
            currency: "AED",
            buttonHref:
              "/services/general-practitioner/general-consultations/extended-consultation",
          },
        ]}
        rating={4.9}
        reviews={350}
        price={125}
        currency="AED"
        priceLabel="Starting Price"
        buttonText="Book Now"
        buttonHref="/services/general-practitioner/general-consultations"
      />

      {/* =====================================================
          WHY CHOOSE GENERAL CONSULTATIONS
      ====================================================== */}
      <TreatmentOffers
        eyebrow="Treatment Benefits"
        title="Why Choose General Consultations"
        description="Unlike self-diagnosing or delaying care, a general consultation helps you understand your symptoms and receive appropriate medical guidance."
        sectionTitle="It Offers:"
        image="/images/why-choose-general-consultations.png"
        imageAlt="General Consultations Medical Benefits"
        offers={[
          {
            label: "Professional Medical Assessment:",
            description:
              "A GP reviews your symptoms, medical history, current condition, and health concerns.",
          },
          {
            label: "Follow-Up Care:",
            description:
              "Follow-up consultation helps monitor recovery, review progress, adjust advice, or continue treatment guidance.",
          },
          {
            label: "Extended Time Option:",
            description:
              "Extended consultation is suitable for detailed discussions, multiple symptoms, chronic conditions, or complex concerns.",
          },
          {
            label: "Personalized Health Guidance:",
            description:
              "Advice is provided based on your age, symptoms, risk factors, lifestyle, and medical needs.",
          },
          {
            label: "Next-Step Planning:",
            description:
              "The doctor may recommend tests, medication, specialist referral, lifestyle changes, or further review when required.",
          },
        ]}
      />

      {/* =====================================================
          HOW GENERAL CONSULTATIONS WORK
      ====================================================== */}
      <TimelineSteps
        eyebrow="Treatment Steps"
        title="How General Consultations Work"
        description="Our medical team follows a structured four-step process to provide clear, patient-focused care."
        steps={[
          {
            title: "Symptom And History Review",
            description:
              "The doctor discusses your symptoms, medical history, current medications, allergies, lifestyle, and health concerns.",
          },
          {
            title: "Clinical Assessment",
            description:
              "A physical examination, vital signs check, or focused medical review may be performed based on your complaint.",
          },
          {
            title: "Diagnosis And Care Plan",
            description:
              "The doctor explains the possible cause of symptoms and recommends suitable treatment, investigations, medication, or specialist referral if needed.",
          },
          {
            title: "Follow-Up And Health Guidance",
            description:
              "Follow-up timing, warning signs, lifestyle advice, medication instructions, or ongoing care recommendations are provided.",
          },
        ]}
      />

      {/* =====================================================
          WHO CAN BENEFIT FROM GENERAL CONSULTATIONS
      ====================================================== */}
      <BenefitRevealSection
        title="Who Can Benefit From General Consultations"
        subtitle="General consultations are suitable for patients who need medical advice, symptom review, routine care, or follow-up support."
        sectionTitle="It’s Ideal For Those Who:"
        image="/images/who-can-benefit-general-consultations.png"
        imageAlt="Who Can Benefit From General Consultations"
        benefits={[
          {
            text: "Have fever, cough, cold, flu, sore throat, or body pain",
          },
          {
            text: "Experience headache, fatigue, stomach issues, dizziness, or general discomfort",
          },
          {
            text: "Need medical advice for common illnesses",
          },
          {
            text: "Require follow-up after previous treatment",
          },
          {
            text: "Need review of ongoing symptoms",
          },
          {
            text: "Have multiple health concerns to discuss",
          },
          {
            text: "Need guidance for chronic conditions",
          },
          {
            text: "Want a general health check or medical opinion",
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
            question: "When Should I Book A GP Consultation?",
            answer:
              "You can book a GP consultation for common symptoms, general illness, pain, fever, infections, stomach issues, fatigue, or any health concern that needs medical review.",
          },
          {
            question: "What Is A Follow-Up GP Consultation?",
            answer:
              "A follow-up GP consultation is a review appointment after a previous visit to check recovery, monitor symptoms, review test results, or continue treatment guidance.",
          },
          {
            question: "When Should I Choose An Extended Consultation?",
            answer:
              "An extended consultation is suitable when you have multiple concerns, long-standing symptoms, chronic conditions, or need more time for detailed discussion.",
          },
          {
            question: "Will The Doctor Prescribe Medicine?",
            answer:
              "If required, the doctor may prescribe medication, recommend tests, suggest lifestyle changes, or refer you to a specialist.",
          },
          {
            question: "Do I Need Tests After A General Consultation?",
            answer:
              "Not always. Tests are recommended only when needed based on your symptoms, examination findings, medical history, or clinical judgement.",
          },
        ]}
      />
    </main>
  );
}
