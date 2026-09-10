"use client";

import DynamicBanner from "@/components/services/DynamicBanner";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";
import ServiceMain from "@/components/services/ServiceMain";

export default function AcneControlFacialPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* Banner Section */}
      <DynamicBanner
        mobileImage="/images/acne-control-facial-mobile-01.png"
        desktopImage="/images/acne-control-facial-desktop-01.png"
      />

      {/* Intro Section */}
      <ServiceMain
        title="Acne Control Facial"
        description="Clearer-looking skin begins with gentle, consistent, and targeted care. Our Acne Control Facial is designed to deeply cleanse congested skin, remove excess oil, and support a healthier-looking complexion. The treatment combines skin analysis, cleansing, gentle exfoliation, careful extraction when appropriate, a soothing mask, hydration, and sun protection. Ideal for oily and acne-prone skin, each step is customized to help calm visible redness, reduce pore congestion, and maintain the skin’s natural moisture balance."
        rating={4.9}
        reviews={350}
        buttonHref="/services/facials/acne-control-facial"
      />

      {/* Treatment Offers */}
      <TreatmentOffers
        eyebrow="Treatment Benefits"
        title="Why Choose An Acne Control Facial"
        description="Unlike harsh acne treatments that may leave the skin feeling dry or irritated, our Acne Control Facial focuses on cleansing congestion while supporting the skin barrier."
        sectionTitle="It Offers:"
        image="/images/why-choose-acne-control-facial.png"
        imageAlt="Acne Control Facial Treatment Benefits"
        offers={[
          {
            label: "Deep Pore Cleansing:",
            description:
              "Removes excess oil, dirt, makeup residue, and impurities that can contribute to congested pores.",
          },
          {
            label: "Gentle Exfoliation:",
            description:
              "Lifts away dead skin cells to improve texture and help prevent surface buildup.",
          },
          {
            label: "Controlled Extraction:",
            description:
              "Careful extraction, when suitable, helps clear blackheads and whiteheads without unnecessary pressure.",
          },
          {
            label: "Oil-Balancing Care:",
            description:
              "Customized products help manage excess shine while maintaining essential skin hydration.",
          },
          {
            label: "Soothing Support:",
            description:
              "A calming mask and lightweight hydration help reduce discomfort and refresh acne-prone skin.",
          },
        ]}
      />

      {/* Timeline Steps */}
      <TimelineSteps
        eyebrow="Treatment Steps"
        title="How An Acne Control Facial Works"
        description="Our skincare specialists assess your skin before customizing each stage to address oiliness, congestion, sensitivity, and visible breakouts safely."
        steps={[
          {
            title: "Consultation And Skin Analysis",
            description:
              "Your skin type, acne pattern, sensitivity, current products, and treatment history are assessed to create an appropriate facial plan.",
          },
          {
            title: "Deep Cleansing And Exfoliation",
            description:
              "The skin is thoroughly cleansed before gentle exfoliation removes dead skin cells, surface oil, and accumulated impurities.",
          },
          {
            title: "Pore Care And Extraction",
            description:
              "Blackheads and whiteheads are carefully extracted where appropriate. Inflamed or sensitive areas are treated gently to avoid unnecessary irritation.",
          },
          {
            title: "Soothing Mask And Protection",
            description:
              "A calming mask and lightweight moisturizer help restore comfort and hydration. Sunscreen is then applied to protect the skin.",
          },
        ]}
      />

      {/* Benefits Section */}
      <BenefitRevealSection
        title="Who Can Benefit From An Acne Control Facial"
        subtitle="A targeted facial for people seeking cleaner pores, balanced oil levels, and calmer, clearer-looking skin."
        sectionTitle="It’s Ideal For Those Who:"
        image="/images/who-choose-acne-control-facial.png"
        imageAlt="Who Can Benefit From An Acne Control Facial"
        benefits={[
          {
            text: "Have oily, combination, or acne-prone skin",
          },
          {
            text: "Experience blackheads, whiteheads, or congested pores",
          },
          {
            text: "Notice frequent mild breakouts or excess facial shine",
          },
          {
            text: "Have rough or uneven-looking skin texture",
          },
          {
            text: "Want professional support for an acne-care routine",
          },
          {
            text: "Need regular maintenance to keep pores feeling clean",
          },
        ]}
      />

      {/* FAQ Section */}
      <FaqSection
        title="FAQs"
        description=""
        faqs={[
          {
            question:
              "Is An Acne Control Facial Suitable For Active Acne?",
            answer:
              "It may benefit mild acne, blackheads, whiteheads, and congested skin. Severe, painful, cystic, or inflamed acne should first be assessed by a dermatologist.",
          },
          {
            question:
              "How Long Does An Acne Control Facial Take?",
            answer:
              "The treatment usually takes approximately 45 to 60 minutes, depending on your skin condition and whether extraction is required.",
          },
          {
            question:
              "When Can I See The Results?",
            answer:
              "Your skin may feel cleaner, smoother, and less oily after the first session. Managing recurring acne generally requires consistent professional care and an appropriate home routine.",
          },
          {
            question:
              "Is There Any Downtime After The Treatment?",
            answer:
              "Mild redness or sensitivity may occur, particularly after extraction, but it generally settles within a few hours. Avoid touching the skin and using harsh products immediately afterward.",
          },
          {
            question:
              "How Often Should I Get An Acne Control Facial?",
            answer:
              "The treatment may be recommended every three to four weeks, depending on your skin condition. Your skincare specialist can advise a suitable schedule after assessment.",
          },
        ]}
      />
    </main>
  );
}