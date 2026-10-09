
"use client";

import DynamicBanner from "@/components/services/DynamicBanner";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";
import ServiceMain from "@/components/services/ServiceMain";

export default function PreventiveDentistryPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* =====================================================
          BANNER
      ====================================================== */}
      <DynamicBanner
        mobileImage="/images/preventive-dentistry-mobile-01.png"
        desktopImage="/images/preventive-dentistry-desktop-01.png"
      />

      {/* =====================================================
          ABOUT THE TREATMENT + SERVICES & PRICES
      ====================================================== */}
      <ServiceMain
        title="Preventive Dentistry"
        description="Preventive Dentistry focuses on maintaining healthy teeth and gums by preventing dental problems before they become more serious. These services include scaling and polishing, fluoride application, and dental cleaning packages. They help remove plaque and tartar buildup, support enamel protection, freshen the mouth, and reduce the risk of cavities, gum inflammation, bad breath, and long-term oral health issues. Each preventive care plan is recommended based on your oral condition, gum health, cleaning needs, sensitivity, and dental history."
        priceListTitle="Preventive Dentistry Services & Prices"
        priceListItems={[
          {
            title: "Scaling & Polishing",
            price: 250,
            currency: "AED",
            buttonHref:
              "/services/dental-services/preventive-dentistry/scaling-polishing",
          },
          {
            title: "Fluoride Application",
            price: 150,
            currency: "AED",
            buttonHref:
              "/services/dental-services/preventive-dentistry/fluoride-application",
          },
          {
            title: "Dental Cleaning Package",
            price: 300,
            currency: "AED",
            buttonHref:
              "/services/dental-services/preventive-dentistry/dental-cleaning-package",
          },
        ]}
        rating={4.9}
        reviews={350}
        price={150}
        currency="AED"
        priceLabel="Starting Price"
        buttonText="Book Now"
        buttonHref="/services/dental-services/preventive-dentistry"
      />

      {/* =====================================================
          WHY CHOOSE PREVENTIVE DENTISTRY
      ====================================================== */}
      <TreatmentOffers
        eyebrow="Treatment Benefits"
        title="Why Choose Preventive Dentistry"
        description="Unlike waiting until pain or infection develops, preventive dentistry helps protect your oral health through regular care and early maintenance."
        sectionTitle="It Offers:"
        image="/images/why-choose-preventive-dentistry.png"
        imageAlt="Preventive Dentistry Treatment Benefits"
        offers={[
          {
            label: "Plaque And Tartar Removal:",
            description:
              "Scaling helps remove hardened deposits that regular brushing cannot fully clean.",
          },
          {
            label: "Cleaner And Fresher Mouth:",
            description:
              "Polishing helps smooth the tooth surface and improve the feeling of cleanliness.",
          },
          {
            label: "Enamel Protection:",
            description:
              "Fluoride application helps strengthen tooth enamel and support cavity prevention.",
          },
          {
            label: "Gum Health Support:",
            description:
              "Regular cleaning can help reduce gum inflammation, bleeding, and irritation caused by buildup.",
          },
          {
            label: "Early Prevention:",
            description:
              "Routine preventive visits help identify concerns early before they progress into complex dental problems.",
          },
        ]}
      />

      {/* =====================================================
          HOW PREVENTIVE DENTISTRY WORKS
      ====================================================== */}
      <TimelineSteps
        eyebrow="Treatment Steps"
        title="How Preventive Dentistry Works"
        description="Our dental team follows a structured four-step process to keep your teeth and gums clean, healthy, and protected."
        steps={[
          {
            title: "Oral Health Assessment",
            description:
              "The dentist checks your teeth, gums, plaque buildup, tartar deposits, sensitivity, and overall oral hygiene condition.",
          },
          {
            title: "Scaling And Cleaning",
            description:
              "Plaque and tartar are removed from the tooth surfaces and gumline using appropriate dental cleaning techniques.",
          },
          {
            title: "Polishing Or Fluoride Care",
            description:
              "Teeth may be polished for a smoother surface, and fluoride may be applied when recommended to support enamel strength.",
          },
          {
            title: "Oral Hygiene Guidance",
            description:
              "You receive brushing, flossing, diet, sensitivity care, and follow-up advice to help maintain results at home.",
          },
        ]}
      />

      {/* =====================================================
          WHO CAN BENEFIT
      ====================================================== */}
      <BenefitRevealSection
        title="Who Can Benefit From Preventive Dentistry"
        subtitle="Preventive dentistry is suitable for children, teens, and adults who want to maintain cleaner teeth, healthier gums, and better long-term oral health."
        sectionTitle="It’s Ideal For Those Who:"
        image="/images/who-can-benefit-preventive-dentistry.png"
        imageAlt="Who Can Benefit From Preventive Dentistry"
        benefits={[
          {
            text: "Need regular dental cleaning",
          },
          {
            text: "Have plaque or tartar buildup",
          },
          {
            text: "Experience bad breath or stained teeth",
          },
          {
            text: "Have bleeding, swollen, or irritated gums",
          },
          {
            text: "Want to reduce the risk of cavities",
          },
          {
            text: "Need fluoride support for enamel protection",
          },
          {
            text: "Want routine oral health maintenance",
          },
          {
            text: "Prefer early prevention instead of complex treatment later",
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
            question:
              "How Often Should I Get Scaling And Polishing?",
            answer:
              "Most people benefit from dental cleaning every six months, but your dentist may recommend a different schedule based on gum health, tartar buildup, and oral hygiene needs.",
          },
          {
            question:
              "Is Scaling And Polishing Painful?",
            answer:
              "Scaling and polishing are usually well tolerated. Mild sensitivity or gum tenderness may occur, especially if there is heavy buildup or gum inflammation.",
          },
          {
            question:
              "What Does Fluoride Application Do?",
            answer:
              "Fluoride helps strengthen tooth enamel and supports protection against cavities, especially for patients with higher decay risk or sensitivity concerns.",
          },
          {
            question:
              "What Is Included In A Dental Cleaning Package?",
            answer:
              "A dental cleaning package may include oral assessment, scaling, polishing, cleaning guidance, and preventive care advice depending on the patient’s needs.",
          },
          {
            question:
              "Can Preventive Dentistry Help With Bad Breath?",
            answer:
              "Yes. Dental cleaning can help reduce plaque, tartar, and bacteria buildup, which are common causes of bad breath.",
          },
        ]}
      />
    </main>
  );
}
