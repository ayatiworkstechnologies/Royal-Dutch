"use client";

import DynamicBanner from "@/components/services/DynamicBanner";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";
import ServiceMain from "@/components/services/ServiceMain";

export default function NursingClinicalCarePage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* =====================================================
          BANNER
      ====================================================== */}
      <DynamicBanner
        mobileImage="/images/nursing-clinical-care-mobile-01.png"
        desktopImage="/images/nursing-clinical-care-desktop-01.png"
      />

      {/* =====================================================
          ABOUT THE TREATMENT + SERVICES & PRICES
      ====================================================== */}
      <ServiceMain
        title="Nursing & Clinical Care"
        description="Nursing & Clinical Care provides professional medical support for patients who need basic clinical procedures, monitoring, medication support, wound care, injections, sample collection, or nursing assistance in a safe and comfortable setting. These services are suitable for patients who need routine health monitoring, post-treatment care, recovery support, chronic condition assistance, or home-based nursing care under professional guidance. Each service is planned based on the patient’s medical condition, doctor’s advice, care needs, and safety requirements."
        priceListTitle="Nursing & Clinical Care Services & Prices"
        priceListItems={[
          {
            title: "Vital Signs Monitoring",
            price: 150,
            currency: "AED",
            buttonHref:
              "/services/home-care-services/nursing-clinical-care/vital-signs-monitoring",
          },
          {
            title: "Medication Administration",
            price: 150,
            currency: "AED",
            buttonHref:
              "/services/home-care-services/nursing-clinical-care/medication-administration",
          },
          {
            title: "IV Therapy Administration",
            price: 300,
            currency: "AED",
            buttonHref:
              "/services/home-care-services/nursing-clinical-care/iv-therapy-administration",
          },
          {
            title: "Wound Dressing",
            price: "200–500",
            currency: "AED",
            buttonHref:
              "/services/home-care-services/nursing-clinical-care/wound-dressing",
          },
          {
            title: "Catheter Insertion / Care",
            price: 350,
            currency: "AED",
            buttonHref:
              "/services/home-care-services/nursing-clinical-care/catheter-insertion-care",
          },
          {
            title: "Injection Administration",
            price: 100,
            currency: "AED",
            buttonHref:
              "/services/home-care-services/nursing-clinical-care/injection-administration",
          },
          {
            title: "Blood Sample Collection",
            price: 150,
            currency: "AED",
            buttonHref:
              "/services/home-care-services/nursing-clinical-care/blood-sample-collection",
          },
        ]}
        rating={4.9}
        reviews={350}
        price={100}
        currency="AED"
        priceLabel="Starting Price"
        buttonText="Book Now"
        buttonHref="/services/home-care-services/nursing-clinical-care"
      />

      {/* =====================================================
          WHY CHOOSE NURSING & CLINICAL CARE
      ====================================================== */}
      <TreatmentOffers
        eyebrow="Service Benefits"
        title="Why Choose Nursing & Clinical Care"
        description="Unlike managing medical care without support, professional nursing care helps ensure correct technique, hygiene, monitoring, and patient comfort."
        sectionTitle="It Offers:"
        image="/images/why-choose-nursing-clinical-care.png"
        imageAlt="Nursing and Clinical Care Benefits"
        offers={[
          {
            label: "Professional Nursing Support:",
            description:
              "Clinical procedures are performed by trained healthcare professionals.",
          },
          {
            label: "Safe Medication Assistance:",
            description:
              "Medication, injections, and IV therapy are administered carefully according to medical instructions.",
          },
          {
            label: "Regular Health Monitoring:",
            description:
              "Vital signs such as blood pressure, pulse, temperature, oxygen level, and other basic health indicators can be checked.",
          },
          {
            label: "Wound And Catheter Care:",
            description:
              "Wound dressing and catheter care are provided using appropriate hygiene and safety practices.",
          },
          {
            label: "Convenient Clinical Care:",
            description:
              "Patients can receive essential nursing procedures with proper guidance and comfort.",
          },
        ]}
      />

      {/* =====================================================
          HOW NURSING & CLINICAL CARE WORKS
      ====================================================== */}
      <TimelineSteps
        eyebrow="Service Steps"
        title="How Nursing & Clinical Care Works"
        description="Our team follows a structured four-step process to provide safe, hygienic, and patient-focused clinical care."
        steps={[
          {
            title: "Patient Assessment",
            description:
              "The patient’s condition, doctor’s advice, current symptoms, medical history, and required nursing service are reviewed.",
          },
          {
            title: "Care Preparation",
            description:
              "The required equipment, medication, dressing material, sample kit, or clinical supplies are prepared according to the selected service.",
          },
          {
            title: "Clinical Procedure",
            description:
              "The nursing procedure is carried out carefully, such as vital signs monitoring, injection, IV therapy, wound dressing, catheter care, or blood sample collection.",
          },
          {
            title: "Observation And Aftercare",
            description:
              "The patient is monitored after the procedure, and instructions are provided for follow-up care, warning signs, medication timing, or next appointment if needed.",
          },
        ]}
      />

      {/* =====================================================
          WHO CAN BENEFIT
      ====================================================== */}
      <BenefitRevealSection
        title="Who Can Benefit From Nursing & Clinical Care"
        subtitle="Nursing and clinical care is suitable for patients who need professional support for routine procedures, recovery care, or ongoing health monitoring."
        sectionTitle="It’s Ideal For Those Who:"
        image="/images/who-can-benefit-nursing-clinical-care.png"
        imageAlt="Who Can Benefit From Nursing and Clinical Care"
        benefits={[
          {
            text: "Need regular vital signs monitoring",
          },
          {
            text: "Require medication administration support",
          },
          {
            text: "Need injection or IV therapy administration",
          },
          {
            text: "Require wound dressing or dressing changes",
          },
          {
            text: "Need catheter insertion or catheter care",
          },
          {
            text: "Require blood sample collection",
          },
          {
            text: "Are recovering after illness, surgery, or hospitalization",
          },
          {
            text: "Need nursing support for elderly or limited-mobility patients",
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
            question: "What Is Included In Vital Signs Monitoring?",
            answer:
              "Vital signs monitoring may include checking blood pressure, pulse rate, temperature, oxygen saturation, respiratory rate, and other basic health indicators as required.",
          },
          {
            question: "Can Medication Or Injections Be Given By A Nurse?",
            answer:
              "Yes. Medication administration and injection administration can be provided by a trained nurse according to the doctor’s prescription or medical instruction.",
          },
          {
            question: "Is IV Therapy Available?",
            answer:
              "Yes. IV therapy administration is available when medically suitable and prescribed or recommended by a healthcare professional.",
          },
          {
            question: "How Much Does Wound Dressing Cost?",
            answer:
              "Wound dressing costs between AED 200–500, depending on the wound condition, dressing type, materials required, and level of care needed.",
          },
          {
            question: "Can Blood Sample Collection Be Done Safely?",
            answer:
              "Yes. Blood sample collection is performed using hygienic technique and proper sample handling procedures.",
          },
        ]}
      />
    </main>
  );
}