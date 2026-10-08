
"use client";

import DynamicBanner from "@/components/services/DynamicBanner";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";
import ServiceMain from "@/components/services/ServiceMain";

export default function ConsultationDiagnosticsPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* =====================================================
          BANNER
      ====================================================== */}
      <DynamicBanner
        mobileImage="/images/consultation-diagnostics-mobile-01.png"
        desktopImage="/images/consultation-diagnostics-desktop-01.png"
      />

      {/* =====================================================
          ABOUT THE TREATMENT + SERVICES & PRICES
      ====================================================== */}
      <ServiceMain
        title="Consultation & Diagnostics"
        description="Consultation & Diagnostics is the first step toward understanding your oral health, identifying dental concerns, and planning the right treatment. This service includes dental consultation, specialist dental consultation, oral examination, and dental imaging such as periapical X-rays and OPG X-rays. These diagnostic services help assess teeth, gums, jaw, bone support, infections, decay, pain, and other dental conditions. Each consultation is guided by the patient’s symptoms, dental history, examination findings, and required imaging support."
        priceListTitle="Consultation & Diagnostics Services & Prices"
        priceListItems={[
          {
            title: "Dental Consultation",
            price: 150,
            currency: "AED",
            buttonHref:
              "/services/dental-services/consultation-diagnostics/dental-consultation",
          },
          {
            title: "Specialist Dental Consultation",
            price: 250,
            currency: "AED",
            buttonHref:
              "/services/dental-services/consultation-diagnostics/specialist-dental-consultation",
          },
          {
            title: "Oral Examination",
            price: 120,
            currency: "AED",
            buttonHref:
              "/services/dental-services/consultation-diagnostics/oral-examination",
          },
          {
            title: "Dental X-Ray — Periapical",
            price: 100,
            currency: "AED",
            buttonHref:
              "/services/dental-services/consultation-diagnostics/dental-x-ray-periapical",
          },
          {
            title: "OPG X-Ray",
            price: 250,
            currency: "AED",
            buttonHref:
              "/services/dental-services/consultation-diagnostics/opg-x-ray",
          },
        ]}
        rating={4.9}
        reviews={350}
        price={100}
        currency="AED"
        priceLabel="Starting Price"
        buttonText="Book Now"
        buttonHref="/services/dental-services/consultation-diagnostics"
      />

      {/* =====================================================
          WHY CHOOSE CONSULTATION & DIAGNOSTICS
      ====================================================== */}
      <TreatmentOffers
        eyebrow="Treatment Benefits"
        title="Why Choose Consultation & Diagnostics"
        description="Unlike guessing the cause of dental pain or discomfort, consultation and diagnostics help identify the exact concern before starting treatment."
        sectionTitle="It Offers:"
        image="/images/why-choose-consultation-diagnostics.png"
        imageAlt="Consultation and Diagnostics Benefits"
        offers={[
          {
            label: "Professional Dental Assessment:",
            description:
              "A dentist evaluates your teeth, gums, bite, oral tissues, symptoms, and dental history.",
          },
          {
            label: "Specialist Opinion:",
            description:
              "Specialist dental consultation is available for complex concerns that need advanced evaluation.",
          },
          {
            label: "Early Problem Detection:",
            description:
              "Oral examination and X-rays can help detect tooth decay, infection, gum problems, bone changes, impacted teeth, or hidden dental issues.",
          },
          {
            label: "Accurate Treatment Planning:",
            description:
              "Diagnostic findings help create a clear and suitable treatment plan.",
          },
          {
            label: "Imaging Support:",
            description:
              "Periapical X-rays and OPG X-rays provide detailed views to support diagnosis and treatment decisions.",
          },
        ]}
      />

      {/* =====================================================
          HOW CONSULTATION & DIAGNOSTICS WORK
      ====================================================== */}
      <TimelineSteps
        eyebrow="Treatment Steps"
        title="How Consultation & Diagnostics Work"
        description="Our dental team follows a structured four-step process to assess your oral health and recommend the right next step."
        steps={[
          {
            title: "Patient History And Concern Review",
            description:
              "Your symptoms, pain level, dental history, medical history, previous treatments, and current concerns are discussed.",
          },
          {
            title: "Oral Examination",
            description:
              "The dentist examines your teeth, gums, bite, oral tissues, jaw movement, and visible dental concerns.",
          },
          {
            title: "Diagnostic Imaging",
            description:
              "If required, a periapical dental X-ray or OPG X-ray is taken to evaluate teeth, roots, jawbone, infection, or hidden problems.",
          },
          {
            title: "Diagnosis And Treatment Plan",
            description:
              "The findings are explained clearly, and a suitable treatment plan, specialist referral, or follow-up care is recommended.",
          },
        ]}
      />

      {/* =====================================================
          WHO CAN BENEFIT
      ====================================================== */}
      <BenefitRevealSection
        title="Who Can Benefit From Consultation & Diagnostics"
        subtitle="Consultation and diagnostics are suitable for anyone who wants to check, understand, or treat a dental concern."
        sectionTitle="It’s Ideal For Those Who:"
        image="/images/who-can-benefit-consultation-diagnostics.png"
        imageAlt="Who Can Benefit From Consultation and Diagnostics"
        benefits={[
          {
            text: "Have tooth pain, sensitivity, swelling, or bleeding gums",
          },
          {
            text: "Need a routine dental check-up",
          },
          {
            text: "Want a professional oral examination",
          },
          {
            text: "Need specialist dental advice",
          },
          {
            text: "Require X-rays before treatment planning",
          },
          {
            text: "Have suspected decay, infection, or gum problems",
          },
          {
            text: "Need evaluation before extraction, root canal, braces, implants, or other dental care",
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
            question: "When Should I Book A Dental Consultation?",
            answer:
              "You should book a consultation if you have pain, sensitivity, swelling, bleeding gums, bad breath, broken teeth, loose teeth, or if you need a routine dental check-up.",
          },
          {
            question: "What Is Included In An Oral Examination?",
            answer:
              "An oral examination may include checking the teeth, gums, oral tissues, bite, jaw movement, visible cavities, plaque buildup, and signs of infection or inflammation.",
          },
          {
            question: "What Is A Periapical Dental X-Ray?",
            answer:
              "A periapical X-ray is a small dental X-ray that shows a specific tooth area, including the tooth root and surrounding bone.",
          },
          {
            question: "What Is An OPG X-Ray?",
            answer:
              "An OPG X-ray is a panoramic dental X-ray that shows the full mouth, including teeth, jaws, and surrounding structures in one image.",
          },
          {
            question: "Do I Need An X-Ray For Every Dental Visit?",
            answer:
              "No. X-rays are recommended only when needed to support diagnosis, treatment planning, or evaluation of hidden dental concerns.",
          },
        ]}
      />
    </main>
  );
}
