"use client";
import DynamicBanner from "@/components/services/DynamicBanner";
import IntroSection from "@/components/services/IntroSection";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";


export default function CosmeticInjectablesPage() {
    return (
        <main className="min-h-screen w-full overflow-x-hidden bg-white">
            {/* Banner Section */}
            <DynamicBanner
                mobileImage="/images/cosmetic-injectables-mobile.png"
                desktopImage="/images/cosmetic-injectables-desktop.png"
            />
            {/* {Intro section} */}
            <IntroSection
                title="Cosmetic Injectables"
                paragraphs={[
                    {
                        parts: [
                            {
                                text: "Enhance your natural beauty with ",
                            },
                            {
                                text: "Cosmetic Injectables",
                                bold: true,
                            },
                            {
                                text: " designed to restore youthful contours, soften facial lines, and improve overall facial harmony without the need for surgery.",
                            },
                        ],
                    },
                    {
                        parts: [
                            {
                                text: "Our expert practitioners use clinically proven injectable treatments to address signs of aging, volume loss, and facial asymmetry while maintaining natural-looking results. Every treatment plan is tailored to your unique facial structure, aesthetic goals, and skin condition.",
                            },
                        ],
                    },
                    {
                        parts: [
                            {
                                text: "Whether you want to smooth wrinkles, restore lost volume, define facial features, or achieve a refreshed appearance, ",
                            },
                            {
                                text: "Cosmetic Injectables",
                                bold: true,
                            },
                            {
                                text: " provide safe, effective, and minimally invasive solutions with little to no downtime.",
                            },
                        ],
                    },
                ]}
            />
            {/* {Treatement offers} */}
            <TreatmentOffers
                eyebrow="Treatment Benefits"
                title="Why Choose Cosmetic Injectables"
                description="Cosmetic Injectables provide precise, non-surgical facial rejuvenation with minimal downtime and long-lasting results."
                sectionTitle="It Offers:"
                image="/images/why-cosmetic.png"
                imageAlt="Cosmetic Injectables Treatment"
                offers={[
                    {
                        label: "Wrinkle Reduction:",
                        description:
                            "Softens dynamic lines and wrinkles for a smoother, more youthful appearance.",
                    },
                    {
                        label: "Facial Volume Restoration:",
                        description:
                            "Replenishes volume loss in areas affected by aging for a refreshed look.",
                    },
                    {
                        label: "Enhanced Facial Contours:",
                        description:
                            "Improves definition of the cheeks, jawline, chin, and lips for balanced facial harmony.",
                    },
                    {
                        label: "Natural-Looking Results:",
                        description:
                            "Subtle enhancements designed to complement your unique facial features.",
                    },
                    {
                        label: "Minimal Downtime:",
                        description:
                            "Quick, convenient treatments that allow most patients to resume daily activities immediately.",
                    },
                ]}
            />

            {/* {Timeline Steps } */}
            <TimelineSteps
                eyebrow="Treatment Steps"
                title="How Cosmetic Injectables Work"
                description="Cosmetic Injectables are carefully planned and administered to enhance facial features, restore volume, and achieve natural-looking rejuvenation."
                steps={[
                    {
                        title: "Consultation & Facial Assessment",
                        description:
                            "A detailed evaluation of your facial anatomy, skin quality, and aesthetic goals is conducted to create a personalized treatment plan.",
                    },
                    {
                        title: "Treatment Planning",
                        description:
                            "The practitioner identifies targeted treatment areas and determines the most suitable injectable approach for optimal results.",
                    },
                    {
                        title: "Precise Injection Procedure",
                        description:
                            "Injectables are carefully administered using advanced techniques to achieve balanced, natural-looking enhancements.",
                    },
                    {
                        title: "Results & Follow-Up",
                        description:
                            "Treatment outcomes are reviewed, and personalized aftercare guidance is provided to maximize and maintain results.",
                    },
                ]}
            />
            {/* {Benefits Section} */}
            <BenefitRevealSection
                title="Who Can Benefit From Cosmetic Injectables"
                subtitle="Cosmetic Injectables are suitable for individuals seeking facial rejuvenation, enhanced contours, and natural-looking aesthetic improvements."
                sectionTitle="Ideal for individuals who"
                image="/images/who-cosmetics.png"
                imageAlt="Cosmetic Injectables Treatment"
                benefits={[
                    { text: "Want to reduce fine lines and facial wrinkles" },
                    { text: "Experience age-related volume loss" },
                    { text: "Desire fuller, more defined facial features" },
                    { text: "Wish to improve facial balance and symmetry" },
                    { text: "Seek non-surgical anti-aging solutions" },
                    { text: "Want subtle enhancements with minimal recovery time" },
                ]}
            />

            {/* {FAQ section} */}
            <FaqSection
                title="FAQs"
                description=""
                faqs={[
                    {
                        question: "Are Cosmetic Injectables safe?",
                        answer:
                            "Yes. When performed by qualified medical professionals, cosmetic injectables are considered safe and effective. A thorough consultation helps ensure suitability and treatment safety.",
                    },
                    {
                        question: "How long does the procedure take?",
                        answer:
                            "Most injectable treatments are completed within 15 to 45 minutes, depending on the treatment areas.",
                    },
                    {
                        question: "When will I see results?",
                        answer:
                            "Some treatments provide visible improvements within a few days, while others may continue to improve over several weeks as the product settles.",
                    },
                    {
                        question: "Is there any downtime?",
                        answer:
                            "Most patients can resume normal activities immediately after treatment. Mild redness, swelling, or bruising may occur temporarily.",
                    },
                    {
                        question: "How long do results last?",
                        answer:
                            "Results vary depending on the type of injectable used, treatment area, and individual factors. Your practitioner will discuss expected longevity during your consultation.",
                    },
                    {
                        question: "Will my results look natural?",
                        answer:
                            "Our approach focuses on enhancing your natural features while maintaining facial balance and expression for refined, natural-looking results.",
                    },
                ]}
            />

        </main>
    );
}