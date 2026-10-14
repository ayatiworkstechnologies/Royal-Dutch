
"use client";

import DynamicBanner from "@/components/services/DynamicBanner";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";
import ServiceMain from "@/components/services/ServiceMain";

export default function DocumentationCertificatesPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* =====================================================
          BANNER
      ====================================================== */}
      <DynamicBanner
        mobileImage="/images/documentation-certificates-mobile-01.png"
        desktopImage="/images/documentation-certificates-desktop-01.png"
      />

      {/* =====================================================
          ABOUT THE TREATMENT + SERVICES & PRICES
      ====================================================== */}
      <ServiceMain
        title="Documentation & Certificates"
        description="Documentation & Certificates services provide official medical documents required for work, insurance, health records, or administrative purposes. These services include sick leave certificates, medical reports, and insurance form completion. Each document is prepared based on the patient’s consultation, medical assessment, clinical findings, and required information. Medical documents are issued only when appropriate and supported by the doctor’s evaluation."
        priceListTitle="Documentation & Certificates Services & Prices"
        priceListItems={[
          {
            title: "Sick Leave Certificate",
            price: 50,
            currency: "AED",
            buttonHref:
              "/services/general-practitioner/documentation-certificates/sick-leave-certificate",
          },
          {
            title: "Medical Report",
            price: 150,
            currency: "AED",
            buttonHref:
              "/services/general-practitioner/documentation-certificates/medical-report",
          },
          {
            title: "Insurance Form Completion",
            price: 100,
            currency: "AED",
            buttonHref:
              "/services/general-practitioner/documentation-certificates/insurance-form-completion",
          },
        ]}
        rating={4.9}
        reviews={350}
        price={50}
        currency="AED"
        priceLabel="Starting Price"
        buttonText="Book Now"
        buttonHref="/services/general-practitioner/documentation-certificates"
      />

      {/* =====================================================
          WHY CHOOSE DOCUMENTATION & CERTIFICATES
      ====================================================== */}
      <TreatmentOffers
        eyebrow="Service Benefits"
        title="Why Choose Documentation & Certificates"
        description="Unlike incomplete or unofficial notes, clinic-issued documentation provides clear, structured, and professionally prepared medical information."
        sectionTitle="It Offers:"
        image="/images/why-choose-documentation-certificates.png"
        imageAlt="Documentation and Certificates Service Benefits"
        offers={[
          {
            label: "Official Medical Documents:",
            description:
              "Certificates and reports are prepared in a professional format for relevant use.",
          },
          {
            label: "Doctor-Based Evaluation:",
            description:
              "Documents are issued based on consultation, examination, and clinical judgement.",
          },
          {
            label: "Work And Administrative Support:",
            description:
              "Sick leave certificates may support workplace absence records when medically appropriate.",
          },
          {
            label: "Insurance Assistance:",
            description:
              "Insurance form completion helps patients submit required medical information for claims or approvals.",
          },
          {
            label: "Clear Health Records:",
            description:
              "Medical reports summarize relevant diagnosis, treatment, findings, and recommendations when needed.",
          },
        ]}
      />

      {/* =====================================================
          HOW DOCUMENTATION & CERTIFICATES WORK
      ====================================================== */}
      <TimelineSteps
        eyebrow="Service Steps"
        title="How Documentation & Certificates Work"
        description="Our team follows a structured four-step process to prepare accurate and appropriate medical documentation."
        steps={[
          {
            title: "Consultation Or Record Review",
            description:
              "The doctor reviews the patient’s symptoms, medical history, current condition, previous records, or required documentation request.",
          },
          {
            title: "Medical Assessment",
            description:
              "A clinical evaluation is performed if needed to confirm the medical basis for the certificate, report, or form.",
          },
          {
            title: "Document Preparation",
            description:
              "The required document is prepared, such as a sick leave certificate, medical report, or insurance form completion.",
          },
          {
            title: "Review And Issue",
            description:
              "The document is checked for accuracy, explained if required, and issued according to clinic policy and medical suitability.",
          },
        ]}
      />

      {/* =====================================================
          WHO CAN BENEFIT FROM DOCUMENTATION & CERTIFICATES
      ====================================================== */}
      <BenefitRevealSection
        title="Who Can Benefit From Documentation & Certificates"
        subtitle="These services are suitable for patients who need official medical documentation for work, insurance, personal records, or administrative purposes."
        sectionTitle="It’s Ideal For Those Who:"
        image="/images/who-can-benefit-documentation-certificates.png"
        imageAlt="Who Can Benefit From Documentation and Certificates"
        benefits={[
          {
            text: "Need a sick leave certificate after medical assessment",
          },
          {
            text: "Require a medical report for health records",
          },
          {
            text: "Need documentation for workplace or school purposes",
          },
          {
            text: "Require insurance form completion",
          },
          {
            text: "Need written medical information for claim submission",
          },
          {
            text: "Need documentation after consultation or treatment",
          },
          {
            text: "Require clear summary of diagnosis, findings, or recommendations",
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
            question:
              "Can I Get A Sick Leave Certificate Without Consultation?",
            answer:
              "A sick leave certificate is usually issued only after medical assessment and when the doctor finds it clinically appropriate.",
          },
          {
            question: "What Is Included In A Medical Report?",
            answer:
              "A medical report may include relevant symptoms, diagnosis, examination findings, treatment details, recommendations, and follow-up advice.",
          },
          {
            question: "Can The Clinic Complete Insurance Forms?",
            answer:
              "Yes. Insurance form completion can be provided when the required medical details are available and suitable for documentation.",
          },
          {
            question:
              "How Long Does It Take To Prepare A Medical Report?",
            answer:
              "Preparation time depends on the report details, required information, and record review. The clinic can advise the expected timing.",
          },
          {
            question: "Are Medical Documents Accepted Everywhere?",
            answer:
              "Acceptance depends on the organization, employer, insurer, or authority requesting the document. Patients should confirm specific requirements before submission.",
          },
        ]}
      />
    </main>
  );
}
