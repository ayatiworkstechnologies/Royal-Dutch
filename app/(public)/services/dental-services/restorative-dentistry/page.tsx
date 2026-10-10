
"use client";

import DynamicBanner from "@/components/services/DynamicBanner";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";
import ServiceMain from "@/components/services/ServiceMain";

export default function RestorativeDentistryPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* =====================================================
          BANNER
      ====================================================== */}
      <DynamicBanner
        mobileImage="/images/restorative-dentistry-mobile-01.png"
        desktopImage="/images/restorative-dentistry-desktop-01.png"
      />

      {/* =====================================================
          ABOUT THE TREATMENT + SERVICES & PRICES
      ====================================================== */}
      <ServiceMain
        title="Restorative Dentistry"
        description="Restorative Dentistry focuses on repairing damaged, decayed, infected, or weakened teeth to restore comfort, function, and appearance. These services include composite fillings for cavities or small tooth damage, and root canal treatment for teeth with deeper infection or nerve involvement. The goal is to preserve natural teeth wherever possible and help patients eat, speak, and smile with better confidence. Each treatment is planned after dental examination, symptom review, and diagnostic support when required."
        priceListTitle="Restorative Dentistry Services & Prices"
        priceListItems={[
          {
            title: "Composite Filling — 1 Surface",
            price: 250,
            currency: "AED",
            buttonHref:
              "/services/dental-services/restorative-dentistry/composite-filling-1-surface",
          },
          {
            title: "Composite Filling — 2 Surfaces",
            price: 350,
            currency: "AED",
            buttonHref:
              "/services/dental-services/restorative-dentistry/composite-filling-2-surfaces",
          },
          {
            title: "Root Canal Treatment — Anterior Tooth",
            price: 900,
            currency: "AED",
            buttonHref:
              "/services/dental-services/restorative-dentistry/root-canal-treatment-anterior-tooth",
          },
          {
            title: "Root Canal Treatment — Posterior Tooth",
            price: 1400,
            currency: "AED",
            buttonHref:
              "/services/dental-services/restorative-dentistry/root-canal-treatment-posterior-tooth",
          },
        ]}
        rating={4.9}
        reviews={350}
        price={250}
        currency="AED"
        priceLabel="Starting Price"
        buttonText="Book Now"
        buttonHref="/services/dental-services/restorative-dentistry"
      />

      {/* =====================================================
          WHY CHOOSE RESTORATIVE DENTISTRY
      ====================================================== */}
      <TreatmentOffers
        eyebrow="Treatment Benefits"
        title="Why Choose Restorative Dentistry"
        description="Unlike ignoring tooth damage or pain, restorative dentistry helps treat the problem early, protect the remaining tooth structure, and prevent further complications."
        sectionTitle="It Offers:"
        image="/images/why-choose-restorative-dentistry.png"
        imageAlt="Restorative Dentistry Treatment Benefits"
        offers={[
          {
            label: "Tooth Repair:",
            description:
              "Composite fillings restore small to moderate cavities, chips, or damaged tooth surfaces.",
          },
          {
            label: "Natural-Looking Results:",
            description:
              "Tooth-coloured composite material blends with the surrounding tooth shade for a cleaner appearance.",
          },
          {
            label: "Pain And Infection Management:",
            description:
              "Root canal treatment helps treat infected or inflamed tooth pulp and may save the natural tooth.",
          },
          {
            label: "Function Restoration:",
            description:
              "Restorative care helps improve chewing, biting, speech comfort, and daily oral function.",
          },
          {
            label: "Tooth Preservation:",
            description:
              "The treatment aims to preserve natural teeth and avoid unnecessary extraction whenever possible.",
          },
        ]}
      />

      {/* =====================================================
          HOW RESTORATIVE DENTISTRY WORKS
      ====================================================== */}
      <TimelineSteps
        eyebrow="Treatment Steps"
        title="How Restorative Dentistry Works"
        description="Our dental team follows a structured four-step process to repair and restore damaged or infected teeth."
        steps={[
          {
            title: "Dental Assessment",
            description:
              "The dentist examines the affected tooth, checks symptoms, reviews dental history, and may recommend X-rays if needed.",
          },
          {
            title: "Treatment Planning",
            description:
              "A suitable treatment is selected, such as composite filling for surface damage or root canal treatment for deeper infection.",
          },
          {
            title: "Tooth Restoration",
            description:
              "For fillings, the decayed or damaged area is cleaned and restored with composite material. For root canal treatment, the infected pulp is removed, the canal is cleaned, and the tooth is sealed.",
          },
          {
            title: "Final Check And Aftercare",
            description:
              "The bite, comfort, and restoration finish are checked. Aftercare instructions and follow-up guidance are provided to protect the treated tooth.",
          },
        ]}
      />

      {/* =====================================================
          WHO CAN BENEFIT
      ====================================================== */}
      <BenefitRevealSection
        title="Who Can Benefit From Restorative Dentistry"
        subtitle="Restorative dentistry is suitable for patients who need treatment for tooth decay, damage, infection, sensitivity, or pain."
        sectionTitle="It’s Ideal For Those Who:"
        image="/images/who-can-benefit-restorative-dentistry.png"
        imageAlt="Who Can Benefit From Restorative Dentistry"
        benefits={[
          {
            text: "Have tooth decay or cavities",
          },
          {
            text: "Need repair for chipped or damaged teeth",
          },
          {
            text: "Experience tooth pain or sensitivity",
          },
          {
            text: "Have pain while chewing",
          },
          {
            text: "Have deep decay or possible nerve infection",
          },
          {
            text: "Want to preserve a natural tooth",
          },
          {
            text: "Need tooth-coloured fillings",
          },
          {
            text: "Require root canal treatment for front or back teeth",
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
            question: "When Do I Need A Composite Filling?",
            answer:
              "A composite filling may be needed when a tooth has a cavity, small fracture, worn surface, or minor damage that can be repaired with tooth-coloured material.",
          },
          {
            question:
              "What Is The Difference Between 1 Surface And 2 Surface Filling?",
            answer:
              "A 1-surface filling treats decay or damage on one part of the tooth, while a 2-surface filling covers two connected surfaces and usually requires more material and time.",
          },
          {
            question: "When Is Root Canal Treatment Needed?",
            answer:
              "Root canal treatment may be needed when decay, infection, or injury reaches the tooth pulp, causing pain, swelling, sensitivity, or infection around the tooth root.",
          },
          {
            question: "Is Root Canal Treatment Painful?",
            answer:
              "Root canal treatment is performed with local anaesthesia to improve comfort. Some mild soreness may occur after treatment, but it usually settles with proper care.",
          },
          {
            question: "Can A Root Canal Save My Tooth?",
            answer:
              "Yes. Root canal treatment is designed to remove infection from inside the tooth and preserve the natural tooth whenever possible.",
          },
        ]}
      />
    </main>
  );
}
