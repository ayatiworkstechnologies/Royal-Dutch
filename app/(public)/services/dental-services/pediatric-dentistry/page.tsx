
"use client";

import DynamicBanner from "@/components/services/DynamicBanner";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";
import ServiceMain from "@/components/services/ServiceMain";

export default function PediatricDentistryPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* =====================================================
          BANNER
      ====================================================== */}
      <DynamicBanner
        mobileImage="/images/pediatric-dentistry-mobile-01.png"
        desktopImage="/images/pediatric-dentistry-desktop-01.png"
      />

      {/* =====================================================
          ABOUT THE TREATMENT + SERVICES & PRICES
      ====================================================== */}
      <ServiceMain
        title="Pediatric Dentistry"
        description="Pediatric Dentistry focuses on gentle dental care for children, helping protect their teeth, gums, oral hygiene, and overall dental development from an early age. These services include pediatric consultation, pediatric filling, and pediatric cleaning with fluoride. The goal is to make dental visits comfortable for children while identifying problems early, treating cavities, and supporting healthy oral habits. Each visit is planned according to the child’s age, comfort level, dental condition, cooperation, and treatment needs."
        priceListTitle="Pediatric Dentistry Services & Prices"
        priceListItems={[
          {
            title: "Pediatric Consultation",
            price: 150,
            currency: "AED",
            buttonHref:
              "/services/dental-services/pediatric-dentistry/pediatric-consultation",
          },
          {
            title: "Pediatric Filling",
            price: 250,
            currency: "AED",
            buttonHref:
              "/services/dental-services/pediatric-dentistry/pediatric-filling",
          },
          {
            title: "Pediatric Cleaning & Fluoride",
            price: 250,
            currency: "AED",
            buttonHref:
              "/services/dental-services/pediatric-dentistry/pediatric-cleaning-fluoride",
          },
        ]}
        rating={4.9}
        reviews={350}
        price={150}
        currency="AED"
        priceLabel="Starting Price"
        buttonText="Book Now"
        buttonHref="/services/dental-services/pediatric-dentistry"
      />

      {/* =====================================================
          WHY CHOOSE PEDIATRIC DENTISTRY
      ====================================================== */}
      <TreatmentOffers
        eyebrow="Treatment Benefits"
        title="Why Choose Pediatric Dentistry"
        description="Unlike adult dental care, pediatric dentistry focuses on child-friendly communication, gentle handling, prevention, and early dental development."
        sectionTitle="It Offers:"
        image="/images/why-choose-pediatric-dentistry.png"
        imageAlt="Pediatric Dentistry Treatment Benefits"
        offers={[
          {
            label: "Child-Friendly Dental Care:",
            description:
              "The visit is handled gently to help children feel comfortable and less anxious.",
          },
          {
            label: "Early Problem Detection:",
            description:
              "A pediatric consultation can identify cavities, gum concerns, tooth eruption issues, habits, and oral hygiene problems early.",
          },
          {
            label: "Cavity Treatment:",
            description:
              "Pediatric fillings help repair decayed baby teeth or young permanent teeth and restore chewing comfort.",
          },
          {
            label: "Preventive Protection:",
            description:
              "Cleaning and fluoride support better oral hygiene and help reduce the risk of cavities.",
          },
          {
            label: "Healthy Habit Guidance:",
            description:
              "Parents receive advice on brushing, diet, fluoride care, dental visits, and home oral hygiene routines.",
          },
        ]}
      />

      {/* =====================================================
          HOW PEDIATRIC DENTISTRY WORKS
      ====================================================== */}
      <TimelineSteps
        eyebrow="Treatment Steps"
        title="How Pediatric Dentistry Works"
        description="Our dental team follows a structured four-step process to provide safe, gentle, and supportive dental care for children."
        steps={[
          {
            title: "Child-Friendly Consultation",
            description:
              "The dentist checks the child’s teeth, gums, oral habits, dental development, symptoms, and comfort level in a gentle manner.",
          },
          {
            title: "Oral Examination And Care Plan",
            description:
              "A suitable care plan is recommended, such as monitoring, cleaning, fluoride application, filling, or follow-up care.",
          },
          {
            title: "Treatment Or Preventive Care",
            description:
              "The required care is provided, such as pediatric filling, cleaning, fluoride application, or preventive guidance based on the child’s needs.",
          },
          {
            title: "Parent Guidance And Follow-Up",
            description:
              "Parents receive instructions on brushing, diet, cavity prevention, aftercare, and recommended timing for the next dental visit.",
          },
        ]}
      />

      {/* =====================================================
          WHO CAN BENEFIT
      ====================================================== */}
      <BenefitRevealSection
        title="Who Can Benefit From Pediatric Dentistry"
        subtitle="Pediatric dentistry is suitable for children who need dental check-ups, cavity prevention, cleaning, fluoride care, or gentle treatment for tooth concerns."
        sectionTitle="It’s Ideal For Children Who:"
        image="/images/who-can-benefit-pediatric-dentistry.png"
        imageAlt="Who Can Benefit From Pediatric Dentistry"
        benefits={[
          {
            text: "Need their first dental visit",
          },
          {
            text: "Have tooth pain, sensitivity, or cavities",
          },
          {
            text: "Need pediatric filling for baby teeth or young permanent teeth",
          },
          {
            text: "Have plaque buildup or bad breath",
          },
          {
            text: "Need cleaning and fluoride protection",
          },
          {
            text: "Have habits such as thumb sucking or mouth breathing",
          },
          {
            text: "Need routine dental check-ups",
          },
          {
            text: "Feel anxious about dental visits and need gentle care",
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
            question: "When Should My Child First See A Dentist?",
            answer:
              "Children should have early dental visits to monitor tooth development, oral hygiene, and cavity risk. A dentist can advise the right schedule based on the child’s age and needs.",
          },
          {
            question: "Is Pediatric Dentistry Painful?",
            answer:
              "Pediatric dental care is provided gently and carefully. The dentist focuses on comfort, reassurance, and suitable techniques based on the child’s treatment needs.",
          },
          {
            question: "Why Does A Baby Tooth Need A Filling?",
            answer:
              "Baby teeth help with chewing, speech, space maintenance, and proper dental development. A filling may be needed to treat decay and prevent pain or infection.",
          },
          {
            question:
              "What Is Included In Pediatric Cleaning And Fluoride?",
            answer:
              "It may include gentle cleaning, plaque removal, polishing, fluoride application, oral hygiene advice, and brushing guidance for parents and children.",
          },
          {
            question: "How Often Should Children Visit The Dentist?",
            answer:
              "Many children benefit from dental visits every six months, but the dentist may recommend a different schedule based on cavity risk, oral hygiene, and dental development.",
          },
        ]}
      />
    </main>
  );
}
