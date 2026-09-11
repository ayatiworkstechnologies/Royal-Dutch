"use client";

import DynamicBanner from "@/components/services/DynamicBanner";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";
import ServiceMain from "@/components/services/ServiceMain";

export default function FatFreezingPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* Banner Section */}
      <DynamicBanner
        mobileImage="/images/fat-freezing-mobile-01.png"
        desktopImage="/images/fat-freezing-desktop-01.png"
      />

      {/* Intro Section */}
      <ServiceMain
        title="Fat Freezing — Cryolipolysis"
        description="Shape stubborn areas without surgery using Fat Freezing, clinically known as cryolipolysis. This non-invasive body-contouring treatment uses controlled cooling to target localized fat beneath the skin. The cooled fat cells are gradually processed and eliminated by the body over the following weeks and months, helping reduce the size of the treated fatty bulge. Fat Freezing is designed for body contouring—not overall weight loss—and is most suitable for people who are close to their preferred weight but have resistant pockets of fat."
        rating={4.9}
        reviews={350}
        autoSlideInterval={4000}
        subServices={[
          {
            title: "Single Session",
            description: "One Fat Freezing treatment session.",
            price: 400,
            currency: "AED",
            priceLabel: "Single session price",
            buttonText: "Book Single Session",
            buttonHref:
              "/services/body-laser-treatments/fat-freezing",
          },
          {
            title: "Fat Freezing Package",
            description:
              "Complete package with three treatment sessions.",
            price: 800,
            currency: "AED",
            priceLabel: "Package price",
            badge: "2+1 Sessions",
            buttonText: "Book Package",
            buttonHref:
              "/services/body-laser-treatments/fat-freezing",
          },
        ]}
      />

      {/* Treatment Offers */}
      <TreatmentOffers
        eyebrow="Treatment Benefits"
        title="Why Choose Fat Freezing"
        description="Unlike surgical fat-removal procedures, cryolipolysis targets selected areas without incisions, injections, or general anaesthesia."
        sectionTitle="It Offers:"
        image="/images/why-choose-fat-freezing.png"
        imageAlt="Fat Freezing Cryolipolysis Treatment Benefits"
        offers={[
          {
            label: "Non-Surgical Contouring:",
            description:
              "Targets localized fat without incisions, needles, or surgical recovery.",
          },
          {
            label: "Controlled Cooling:",
            description:
              "Delivers carefully regulated cooling to the selected fatty tissue while protecting the skin.",
          },
          {
            label: "Targeted Treatment:",
            description:
              "Can be used on suitable areas such as the abdomen, flanks, thighs, upper arms, or under the chin.",
          },
          {
            label: "Minimal Downtime:",
            description:
              "Most people can return to their regular routine shortly after treatment.",
          },
          {
            label: "Gradual-Looking Results:",
            description:
              "The treated area changes progressively as the body naturally processes the affected fat cells.",
          },
        ]}
      />

      {/* Timeline Steps */}
      <TimelineSteps
        eyebrow="Treatment Steps"
        title="How Fat Freezing Works"
        description="Our specialists assess the treatment area and customize the applicator placement, cooling settings, and session plan according to your body-contouring goals."
        steps={[
          {
            title: "Consultation And Body Assessment",
            description:
              "The target area, fat distribution, skin condition, medical history, and expected outcome are evaluated to determine your suitability.",
          },
          {
            title: "Marking And Skin Protection",
            description:
              "The selected area is measured and marked. A protective gel pad or membrane is positioned over the skin before treatment begins.",
          },
          {
            title: "Controlled Fat Cooling",
            description:
              "The applicator gently draws the fatty tissue into position and delivers controlled cooling for the prescribed treatment time.",
          },
          {
            title: "Removal And Post-Treatment Care",
            description:
              "The applicator is removed, and the area may be gently massaged. Aftercare guidance is provided before you resume your normal activities.",
          },
        ]}
      />

      {/* Benefits Section */}
      <BenefitRevealSection
        title="Who Can Benefit From Fat Freezing"
        subtitle="A non-surgical body-contouring option for people who want to reduce small, localized areas of stubborn fat."
        sectionTitle="It’s Ideal For Those Who:"
        image="/images/who-choose-fat-freezing.png"
        imageAlt="Who Can Benefit From Fat Freezing Cryolipolysis"
        benefits={[
          {
            text: "Are close to their preferred or healthy body weight",
          },
          {
            text: "Have pinchable, localized pockets of resistant fat",
          },
          {
            text: "Want non-surgical body contouring",
          },
          {
            text: "Prefer minimal interruption to their daily routine",
          },
          {
            text: "Maintain a balanced lifestyle but struggle with specific areas",
          },
          {
            text: "Have realistic expectations about gradual, moderate improvement",
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
              "Is Fat Freezing A Weight-Loss Treatment?",
            answer:
              "No. Fat Freezing is intended to contour localized fatty areas. It is not a treatment for obesity, overall weight loss, loose skin, or cellulite.",
          },
          {
            question:
              "How Long Does A Fat-Freezing Session Take?",
            answer:
              "A session commonly takes approximately 35 to 60 minutes per treatment area, depending on the device, applicator, and selected area.",
          },
          {
            question: "Is The Treatment Painful?",
            answer:
              "You may initially experience strong cooling, pulling, pressure, tingling, or numbness. These sensations commonly reduce as the treated area becomes numb.",
          },
          {
            question: "When Will I See The Results?",
            answer:
              "Changes develop gradually. Some people notice improvement within several weeks, while the treated fatty bulge may continue reducing over approximately four to six months.",
          },
          {
            question:
              "Are There Any Side Effects Or Downtime?",
            answer:
              "Temporary redness, swelling, bruising, tenderness, tingling, or numbness can occur. A rare complication called paradoxical adipose hyperplasia may cause the treated fatty tissue to enlarge and can require surgical correction. A professional assessment is essential before treatment.",
          },
        ]}
      />
    </main>
  );
}