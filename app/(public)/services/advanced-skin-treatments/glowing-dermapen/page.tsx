"use client";

import DynamicBanner from "@/components/services/DynamicBanner";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";
import ServiceMain from "@/components/services/ServiceMain";

export default function GlowingDermapenPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* Banner Section */}
      <DynamicBanner
        mobileImage="/images/glowing-dermapen-mobile-01.png"
        desktopImage="/images/glowing-dermapen-desktop-01.png"
      />

      {/* Intro Section */}
      <ServiceMain
        title="Glowing Dermapen"
        description="Radiant skin begins with natural renewal. Our Glowing Dermapen treatment uses controlled microneedling to create tiny microchannels on the skin’s surface, supporting its natural repair process. The treatment is designed to encourage collagen renewal, improve product absorption, and soften the appearance of uneven texture, enlarged pores, fine lines, and mild acne marks. Each session is customized according to your skin condition and concerns, helping reveal a smoother, firmer, and more luminous-looking complexion over time."
        rating={4.9}
        reviews={350}
        price={300}
        currency="AED"
        buttonHref="/services/advanced-skin-treatments/glowing-dermapen"
      />

      {/* Treatment Offers */}
      <TreatmentOffers
        eyebrow="Treatment Benefits"
        title="Why Choose Glowing Dermapen"
        description="Unlike surface-level facials, Glowing Dermapen works through controlled microneedling to support renewal beneath the skin’s outermost layer."
        sectionTitle="It Offers:"
        image="/images/why-choose-glowing-dermapen.png"
        imageAlt="Glowing Dermapen Treatment Benefits"
        offers={[
          {
            label: "Collagen Support:",
            description:
              "Encourages the skin’s natural renewal process to promote a firmer and smoother-looking complexion.",
          },
          {
            label: "Improved Skin Texture:",
            description:
              "Helps soften the appearance of roughness, uneven texture, and enlarged-looking pores.",
          },
          {
            label: "Enhanced Radiance:",
            description:
              "Supports the renewal of dull surface skin for a fresher and more luminous appearance.",
          },
          {
            label: "Targeted Mark Care:",
            description:
              "May gradually improve the appearance of mild acne marks and other superficial skin irregularities.",
          },
          {
            label: "Better Serum Absorption:",
            description:
              "The created microchannels support the delivery of carefully selected professional skincare serums.",
          },
        ]}
      />

      {/* Timeline Steps */}
      <TimelineSteps
        eyebrow="Treatment Steps"
        title="How Glowing Dermapen Works"
        description="Our skincare specialists assess your skin and customize the needle depth, treatment intensity, and selected serum for safe and targeted care."
        steps={[
          {
            title: "Consultation And Skin Analysis",
            description:
              "Your skin type, sensitivity, concerns, medical history, and treatment goals are evaluated to determine whether Dermapen is appropriate for you.",
          },
          {
            title: "Cleansing And Skin Preparation",
            description:
              "The treatment area is thoroughly cleansed and disinfected. A topical numbing cream may be applied to improve comfort during the procedure.",
          },
          {
            title: "Controlled Microneedling",
            description:
              "The Dermapen device is gently moved across the skin, creating precise microchannels at a depth selected for your individual concerns.",
          },
          {
            title: "Soothing Serum And Protection",
            description:
              "A suitable serum and calming aftercare products are applied. The treatment concludes with moisturizer and broad-spectrum sunscreen.",
          },
        ]}
      />

      {/* Benefits Section */}
      <BenefitRevealSection
        title="Who Can Benefit From Glowing Dermapen"
        subtitle="A skin-renewal treatment for those seeking smoother texture, improved radiance, and a fresher, more refined-looking complexion."
        sectionTitle="It’s Ideal For Those Who:"
        image="/images/who-choose-glowing-dermapen.png"
        imageAlt="Who Can Benefit From Glowing Dermapen"
        benefits={[
          {
            text: "Experience dull, tired, or uneven-looking skin",
          },
          {
            text: "Want to soften the appearance of fine lines",
          },
          {
            text: "Have rough skin texture or enlarged-looking pores",
          },
          {
            text: "Want to improve the appearance of mild acne marks",
          },
          {
            text: "Notice reduced firmness or early signs of ageing",
          },
          {
            text: "Want gradual improvement in overall skin quality",
          },
        ]}
      />

      {/* FAQ Section */}
      <FaqSection
        title="FAQs"
        description=""
        faqs={[
          {
            question: "Is Glowing Dermapen Suitable For All Skin Types?",
            answer:
              "It can be suitable for many skin types, but a professional assessment is essential. Treatment may need to be postponed for active acne, infection, open wounds, severe irritation, or certain medical conditions.",
          },
          {
            question: "How Long Does A Glowing Dermapen Session Take?",
            answer:
              "The complete appointment usually takes approximately 45 to 60 minutes, including consultation, skin preparation, treatment, and aftercare.",
          },
          {
            question: "When Can I See The Results?",
            answer:
              "The skin may appear fresher after the initial recovery period. Improvements in texture and overall skin quality usually develop gradually as the natural renewal process continues.",
          },
          {
            question: "Is There Any Downtime After The Treatment?",
            answer:
              "Temporary redness, sensitivity, dryness, or mild swelling may occur for approximately one to three days. Recovery time can vary depending on treatment intensity and skin sensitivity.",
          },
          {
            question: "How Many Glowing Dermapen Sessions Will I Need?",
            answer:
              "A course of approximately three to six sessions, spaced four to six weeks apart, may be recommended. The number of sessions depends on your skin condition and treatment goals.",
          },
        ]}
      />
    </main>
  );
}