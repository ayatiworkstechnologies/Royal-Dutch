"use client";
import DynamicBanner from "@/components/services/DynamicBanner";
import IntroSection from "@/components/services/IntroSection";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";


export default function MedicalDermatologyPage() {
    return (
        <main className="min-h-screen w-full overflow-x-hidden bg-white">
            {/* Banner Section */}
            <DynamicBanner
                mobileImage="/images/medical-dermatology-desktop-mobile.png"
                desktopImage="/images/medical-dermatology-desktop-banner.png"
            />

            {/* {Intro section} */}
            <IntroSection
                title="Medical dermatology"
                paragraphs={[
                    {
                        parts: [
                            {
                                text: "Healthy, confident skin begins with expert care. Our  ",
                            },
                            {
                                text: "Medical dermatology",
                                bold: true,
                            },
                            {
                                text: " ervices combine advanced medical expertise with innovative aesthetic treatments to address a wide range of skin, hair, and cosmetic concerns.",
                            },
                        ],
                    },
                    {
                        parts: [
                            {
                                text: "From",
                            },
                            {
                                text: "preventive skincare",
                                bold: true,
                            },
                            {
                                text: "and medical dermatology to non-surgical aesthetic enhancements, we provide personalized solutions designed to restore skin health, improve appearance, and enhance natural beauty.",
                            },
                        ],
                    },
                    {
                        parts: [
                            {
                                text: "Whether you are seeking treatment for acne, pigmentation, aging concerns, hair loss, or overall skin rejuvenation, our specialists deliver safe, evidence-based care tailored to your unique needs. ",
                            },

                        ],
                    },
                ]}
            />
            {/* {Treatement offers} */}
            <TreatmentOffers
                eyebrow="Treatment Steps"
                title="Why Choose Medical Dermatology "
                description="Unlike conventional beauty treatments, our dermatology and aesthetic solutions are backed by medical science, ensuring both safety and long-lasting results."
                sectionTitle="It Offers:"
                image="/images/why-dermatology.png"
                imageAlt="Dermatology Treatment"
                offers={[
                    {
                        label: "PERSONALIZED SKIN ASSESSMENT:",
                        description:
                            "Comprehensive evaluation to identify your skin concerns and goals. ",
                    },
                    {
                        label: "ADVANCED DERMATOLOGICAL CARE:",
                        description:
                            "Treatment for acne, eczema, pigmentation, rosacea, and other skin conditions. ",
                    },
                    {
                        label: "NON-SURGICAL AESTHETIC SOLUTIONS:",
                        description:
                            "Enhance facial harmony and skin quality without invasive procedures.",
                    },
                    {
                        label: "SKIN REJUVENATION: ",
                        description:
                            "Improve texture, tone, hydration, and overall radiance.",
                    },
                    {
                        label: "ANTI-AGING TREATMENTS:",
                        description:
                            "Reduce fine lines, wrinkles, and signs of premature aging.",
                    },
                ]} />

            {/* {Timeline Steps } */}
            <TimelineSteps
                eyebrow="Treatment Steps"
                title="How Dermatology Works"
                description="Our dermatology specialists identify the underlying skin condition and recommend the most suitable treatment approach for optimal results."
                steps={[
                    {
                        title: "Consultation & Skin Analysis",
                        description:
                            "Our specialists assess your skin condition, medical history, lifestyle factors, and aesthetic goals to create a personalized treatment plan.",
                    },
                    {
                        title: "Diagnosis & Treatment Planning",
                        description:
                            "Advanced diagnostic techniques help identify underlying concerns and determine the most effective treatment approach.",
                    },
                    {
                        title: "Targeted Treatment",
                        description:
                            "Medical dermatology procedures and aesthetic treatments are performed using modern technologies and clinically proven techniques.",
                    },
                    {
                        title: "Maintenance & Follow-Up",
                        description:
                            "Ongoing care and expert guidance help maintain results and support long-term skin health.",
                    },
                ]}
            />
            {/* {Benefits Section} */}
            <BenefitRevealSection
                title="Who Can Benefit From Dermatology Medicine"
                subtitle="Comprehensive diagnosis, treatment, and management of skin, hair, and nail conditions to promote healthier skin and long-term wellness."
                sectionTitle="It’s ideal for those who"
                image="/images/benefits-dermatology.png"
                imageAlt="Dermatology Treatment"
                benefits={[
                    { text: "Want healthier, clearer, and more radiant skin" },
                    { text: "Experience acne, pigmentation, rosacea, or chronic skin concerns" },
                    { text: "Notice signs of aging such as wrinkles, fine lines, or loss of firmness" },
                    { text: "Seek solutions for hair thinning or hair loss" },
                    { text: "Want professional guidance for maintaining long-term skin health" },
                    { text: "Are looking for non-surgical aesthetic enhancements" },
                ]}

            />

            {/* {FAQ section} */}
            <FaqSection
                title="FAQs"
                description=""
                faqs={[
                    {
                        question: "Is Dermatology & Aesthetic Medicine suitable for all skin types?",
                        answer:
                            "Yes. Treatments are customized according to your skin type, concerns, and medical history to ensure safe and effective results.",
                    },
                    {
                        question: "How long does a consultation take?",
                        answer:
                            "A typical consultation lasts between 20–45 minutes, depending on the complexity of your concerns and treatment requirements.",
                    },
                    {
                        question: "When can I see results?",
                        answer:
                            "Results vary based on the treatment performed. Some procedures provide visible improvements immediately, while others may require multiple sessions for optimal outcomes.",
                    },
                    {
                        question: "Is there any downtime after treatment?",
                        answer:
                            "Many aesthetic procedures involve little to no downtime. Your dermatologist will explain any recovery requirements specific to your treatment plan.",
                    },
                    {
                        question: "How often should I visit a dermatologist?",
                        answer:
                            "Regular visits are recommended for preventive skin care, monitoring chronic conditions, and maintaining long-term skin health and appearance.",
                    },
                ]}
            
            />

        </main>
    );
}