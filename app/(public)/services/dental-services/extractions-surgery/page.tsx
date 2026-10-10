
"use client";

import DynamicBanner from "@/components/services/DynamicBanner";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";
import ServiceMain from "@/components/services/ServiceMain";

export default function ExtractionsSurgeryPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* =====================================================
          BANNER
      ====================================================== */}
      <DynamicBanner
        mobileImage="/images/extractions-surgery-mobile-01.png"
        desktopImage="/images/extractions-surgery-desktop-01.png"
      />

      {/* =====================================================
          ABOUT THE TREATMENT + SERVICES & PRICES
      ====================================================== */}
      <ServiceMain
        title="Extractions & Surgery"
        description="Extractions & Surgery includes dental procedures used to remove teeth that are severely damaged, infected, impacted, loose, or not suitable for restoration. This service includes simple tooth extraction, surgical extraction, and wisdom tooth extraction. The procedure is planned carefully after dental examination and diagnostic imaging when required, especially for impacted teeth, broken teeth, or wisdom teeth. The goal is to remove the affected tooth safely, reduce pain or infection risk, and support proper healing with clear aftercare guidance."
        priceListTitle="Extractions & Surgery Services & Prices"
        priceListItems={[
          {
            title: "Simple Tooth Extraction",
            price: 350,
            currency: "AED",
            buttonHref:
              "/services/dental-services/extractions-surgery/simple-tooth-extraction",
          },
          {
            title: "Surgical Extraction",
            price: 800,
            currency: "AED",
            buttonHref:
              "/services/dental-services/extractions-surgery/surgical-extraction",
          },
          {
            title: "Wisdom Tooth Extraction",
            price: 1200,
            currency: "AED",
            buttonHref:
              "/services/dental-services/extractions-surgery/wisdom-tooth-extraction",
          },
        ]}
        rating={4.9}
        reviews={350}
        price={350}
        currency="AED"
        priceLabel="Starting Price"
        buttonText="Book Now"
        buttonHref="/services/dental-services/extractions-surgery"
      />

      {/* =====================================================
          WHY CHOOSE EXTRACTIONS & SURGERY
      ====================================================== */}
      <TreatmentOffers
        eyebrow="Treatment Benefits"
        title="Why Choose Extractions & Surgery"
        description="Unlike delaying treatment for a painful or damaged tooth, timely extraction can help prevent worsening infection, swelling, discomfort, and surrounding dental problems."
        sectionTitle="It Offers:"
        image="/images/why-choose-extractions-surgery.png"
        imageAlt="Extractions and Surgery Treatment Benefits"
        offers={[
          {
            label: "Safe Tooth Removal:",
            description:
              "The tooth is removed using an appropriate technique based on its condition, position, and complexity.",
          },
          {
            label: "Pain And Infection Relief:",
            description:
              "Extraction may be recommended when a tooth causes severe pain, infection, swelling, or repeated discomfort.",
          },
          {
            label: "Surgical Support When Needed:",
            description:
              "Surgical extraction is available for broken, difficult, impacted, or partially erupted teeth.",
          },
          {
            label: "Wisdom Tooth Management:",
            description:
              "Wisdom tooth extraction helps manage impacted, painful, infected, or poorly positioned third molars.",
          },
          {
            label: "Healing Guidance:",
            description:
              "Patients receive clear aftercare instructions to support healing and reduce complications.",
          },
        ]}
      />

      {/* =====================================================
          HOW EXTRACTIONS & SURGERY WORKS
      ====================================================== */}
      <TimelineSteps
        eyebrow="Treatment Steps"
        title="How Extractions & Surgery Works"
        description="Our dental team follows a structured four-step process to ensure careful assessment, safe treatment, and proper recovery guidance."
        steps={[
          {
            title: "Consultation And X-Ray Assessment",
            description:
              "The dentist examines the tooth, reviews symptoms, checks medical history, and may recommend X-rays to assess the root, bone, and tooth position.",
          },
          {
            title: "Treatment Planning",
            description:
              "The suitable extraction method is selected, such as simple extraction, surgical extraction, or wisdom tooth extraction based on complexity.",
          },
          {
            title: "Tooth Extraction Procedure",
            description:
              "The area is numbed with local anaesthesia. The tooth is carefully removed using the appropriate technique, and stitches may be placed if needed.",
          },
          {
            title: "Aftercare And Recovery",
            description:
              "Bleeding control, pain guidance, food precautions, oral hygiene instructions, and follow-up advice are provided to support healing.",
          },
        ]}
      />

      {/* =====================================================
          WHO CAN BENEFIT
      ====================================================== */}
      <BenefitRevealSection
        title="Who Can Benefit From Extractions & Surgery"
        subtitle="Extractions and surgery may be suitable for patients who have teeth that cannot be saved or are causing pain, infection, or oral health problems."
        sectionTitle="It’s Ideal For Those Who:"
        image="/images/who-can-benefit-extractions-surgery.png"
        imageAlt="Who Can Benefit From Extractions and Surgery"
        benefits={[
          {
            text: "Have a severely damaged or decayed tooth",
          },
          {
            text: "Experience tooth pain, swelling, or infection",
          },
          {
            text: "Have a loose tooth that cannot be restored",
          },
          {
            text: "Need removal of a broken tooth",
          },
          {
            text: "Have an impacted or painful wisdom tooth",
          },
          {
            text: "Have repeated gum infection around a wisdom tooth",
          },
          {
            text: "Need extraction before orthodontic or prosthetic treatment",
          },
          {
            text: "Require surgical removal of a difficult tooth",
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
            question: "When Is Tooth Extraction Needed?",
            answer:
              "Tooth extraction may be needed when a tooth is severely decayed, broken, infected, loose, impacted, or cannot be restored with other treatment.",
          },
          {
            question:
              "What Is The Difference Between Simple And Surgical Extraction?",
            answer:
              "Simple extraction is used when the tooth is visible and can be removed easily. Surgical extraction is used for difficult, broken, impacted, or partially erupted teeth.",
          },
          {
            question:
              "Is Wisdom Tooth Extraction Always Necessary?",
            answer:
              "No. Wisdom teeth do not always need removal. Extraction is usually recommended when they cause pain, infection, swelling, decay, crowding, or are impacted.",
          },
          {
            question: "Is Tooth Extraction Painful?",
            answer:
              "The area is numbed with local anaesthesia before extraction. You may feel pressure during the procedure, but pain is usually controlled. Mild soreness may occur after treatment.",
          },
          {
            question:
              "How Long Does Healing Take After Extraction?",
            answer:
              "Initial healing usually takes a few days to one week, but complete gum and bone healing may take longer depending on the tooth, procedure complexity, and aftercare.",
          },
        ]}
      />
    </main>
  );
}
