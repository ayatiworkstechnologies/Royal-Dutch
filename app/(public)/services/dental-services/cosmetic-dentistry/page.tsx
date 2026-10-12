
"use client";

import DynamicBanner from "@/components/services/DynamicBanner";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";
import ServiceMain from "@/components/services/ServiceMain";

export default function CosmeticDentistryPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* =====================================================
          BANNER
      ====================================================== */}
      <DynamicBanner
        mobileImage="/images/cosmetic-dentistry-mobile-01.png"
        desktopImage="/images/cosmetic-dentistry-desktop-01.png"
      />

      {/* =====================================================
          ABOUT THE TREATMENT + SERVICES & PRICES
      ====================================================== */}
      <ServiceMain
        title="Cosmetic Dentistry"
        description="Cosmetic Dentistry focuses on improving the appearance of your smile through treatments that enhance tooth colour, shape, size, alignment, and overall smile harmony. These services include teeth whitening, Hollywood smile consultation, and veneers per tooth. Cosmetic dental care can help brighten stained teeth, improve smile confidence, and create a more balanced, aesthetic appearance. Each treatment is planned after assessing your teeth, gums, smile goals, oral health condition, tooth shade, and facial features."
        priceListTitle="Cosmetic Dentistry Services & Prices"
        priceListItems={[
          {
            title: "Teeth Whitening",
            price: 1200,
            currency: "AED",
            buttonHref:
              "/services/dental-services/cosmetic-dentistry/teeth-whitening",
          },
          {
            title: "Hollywood Smile Consultation",
            price: 250,
            currency: "AED",
            buttonHref:
              "/services/dental-services/cosmetic-dentistry/hollywood-smile-consultation",
          },
          {
            title: "Veneers — Per Tooth",
            price: 1800,
            currency: "AED",
            buttonHref:
              "/services/dental-services/cosmetic-dentistry/veneers-per-tooth",
          },
        ]}
        rating={4.9}
        reviews={350}
        price={250}
        currency="AED"
        priceLabel="Starting Price"
        buttonText="Book Now"
        buttonHref="/services/dental-services/cosmetic-dentistry"
      />

      {/* =====================================================
          WHY CHOOSE COSMETIC DENTISTRY
      ====================================================== */}
      <TreatmentOffers
        eyebrow="Treatment Benefits"
        title="Why Choose Cosmetic Dentistry"
        description="Unlike general dental care, cosmetic dentistry focuses on smile appearance while also considering oral health, comfort, and natural-looking results."
        sectionTitle="It Offers:"
        image="/images/why-choose-cosmetic-dentistry.png"
        imageAlt="Cosmetic Dentistry Treatment Benefits"
        offers={[
          {
            label: "Brighter Smile:",
            description:
              "Teeth whitening helps reduce visible stains and improve overall tooth brightness.",
          },
          {
            label: "Smile Design Planning:",
            description:
              "Hollywood smile consultation helps evaluate your teeth, gums, facial balance, and smile goals before treatment.",
          },
          {
            label: "Tooth Shape Enhancement:",
            description:
              "Veneers can improve the appearance of chipped, uneven, stained, small, or mildly misaligned teeth.",
          },
          {
            label: "Natural-Looking Aesthetics:",
            description:
              "Cosmetic treatment is planned according to tooth shade, smile line, facial features, and personal preference.",
          },
          {
            label: "Confidence Boost:",
            description:
              "A brighter and more balanced smile can improve self-confidence in daily and professional interactions.",
          },
        ]}
      />

      {/* =====================================================
          HOW COSMETIC DENTISTRY WORKS
      ====================================================== */}
      <TimelineSteps
        eyebrow="Treatment Steps"
        title="How Cosmetic Dentistry Works"
        description="Our dental team follows a structured four-step process to plan and deliver safe, personalized, and aesthetic smile care."
        steps={[
          {
            title: "Smile Consultation",
            description:
              "The dentist discusses your smile goals, tooth colour concerns, shape preferences, dental history, and expectations.",
          },
          {
            title: "Oral And Aesthetic Assessment",
            description:
              "Your teeth, gums, bite, tooth shade, facial balance, smile line, and suitability for whitening or veneers are evaluated.",
          },
          {
            title: "Personalized Treatment",
            description:
              "The selected treatment is performed, such as professional teeth whitening or veneer preparation and placement based on the treatment plan.",
          },
          {
            title: "Final Review And Aftercare",
            description:
              "Your smile result is reviewed, adjustments may be made if required, and aftercare instructions are provided to help maintain the outcome.",
          },
        ]}
      />

      {/* =====================================================
          WHO CAN BENEFIT FROM COSMETIC DENTISTRY
      ====================================================== */}
      <BenefitRevealSection
        title="Who Can Benefit From Cosmetic Dentistry"
        subtitle="Cosmetic dentistry is suitable for patients who want to improve smile brightness, tooth shape, and overall dental appearance."
        sectionTitle="It’s Ideal For Those Who:"
        image="/images/who-can-benefit-cosmetic-dentistry.png"
        imageAlt="Who Can Benefit From Cosmetic Dentistry"
        benefits={[
          {
            text: "Want a brighter and cleaner-looking smile",
          },
          {
            text: "Have stained or discoloured teeth",
          },
          {
            text: "Want Hollywood smile planning",
          },
          {
            text: "Have chipped, uneven, or worn-looking teeth",
          },
          {
            text: "Want to improve tooth shape or size",
          },
          {
            text: "Have small gaps or mild cosmetic concerns",
          },
          {
            text: "Want veneers for smile enhancement",
          },
          {
            text: "Want a more confident smile appearance",
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
            question: "Is Teeth Whitening Suitable For Everyone?",
            answer:
              "Teeth whitening may not be suitable for everyone. The dentist will check your tooth condition, sensitivity, fillings, crowns, gum health, and stain type before recommending whitening.",
          },
          {
            question: "How Long Do Teeth Whitening Results Last?",
            answer:
              "Results vary based on oral hygiene, diet, smoking habits, and lifestyle. Avoiding stain-causing foods and drinks can help maintain the brightness longer.",
          },
          {
            question: "What Is A Hollywood Smile Consultation?",
            answer:
              "A Hollywood smile consultation is a smile assessment where the dentist evaluates your teeth, gums, smile line, tooth shade, facial features, and suitable cosmetic treatment options.",
          },
          {
            question: "What Are Veneers?",
            answer:
              "Veneers are thin custom-made shells placed on the front surface of teeth to improve colour, shape, size, and overall smile appearance.",
          },
          {
            question: "How Do I Care For Veneers?",
            answer:
              "Brush and floss daily, avoid biting very hard objects, attend regular dental check-ups, and follow your dentist’s advice to maintain veneer appearance and durability.",
          },
        ]}
      />
    </main>
  );
}
