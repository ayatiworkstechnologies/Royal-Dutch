"use client";
import DynamicBanner from "@/components/services/DynamicBanner";
import IntroSection from "@/components/services/IntroSection";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";


export default function NeurologicalPhysiotherapyPage() {
    return (
        <main className="min-h-screen w-full overflow-x-hidden bg-white">
            {/* Banner Section */}
            <DynamicBanner
                mobileImage="/images/medical-dermatology-desktop-mobile.png"
                desktopImage="/images/medical-dermatology-desktop-banner.png"
            />
            {/* {Intro section} */}
            <IntroSection
                title="Neurological Physiotherapy"
                paragraphs={[
                    {
                        parts: [
                            {
                                text: "Regain independence, improve mobility, and enhance quality of life with our specialized ",
                            },
                            {
                                text: "Neurological Physiotherapy",
                                bold: true,
                            },
                            {
                                text: " services. Designed for individuals affected by neurological conditions, our rehabilitation programs focus on restoring movement, improving balance, and maximizing functional abilities through evidence-based therapeutic approaches.",
                            },
                        ],
                    },
                    {
                        parts: [
                            {
                                text: "At ",
                            },
                            {
                                text: "Royal Dutch Medical Centre",
                                bold: true,
                            },
                            {
                                text: ", our experienced physiotherapists create personalized treatment plans that address each patient's unique challenges while promoting recovery, adaptation, and long-term well-being.",
                            },
                        ],
                    },
                ]}
            />
            {/* {Treatement offers} */}
            <TreatmentOffers
                eyebrow="Benefits"
                title="Why Choose Neurological Physiotherapy"
                description="Targeted neurological rehabilitation helps improve physical function, mobility, and confidence in everyday life."
                sectionTitle="It Offers:"
                image="/images/why-neurological.png"
                imageAlt="Neurological Physiotherapy"
                offers={[
                    {
                        label: "Improved Mobility & Movement Control:",
                        description:
                            "Enhances walking ability, coordination, and overall movement patterns.",
                    },
                    {
                        label: "Balance & Fall Prevention:",
                        description:
                            "Improves stability and reduces the risk of falls and injuries.",
                    },
                    {
                        label: "Muscle Strengthening:",
                        description:
                            "Supports muscle activation, endurance, and functional performance.",
                    },
                    {
                        label: "Enhanced Independence:",
                        description:
                            "Promotes greater confidence and ability in daily activities.",
                    },
                    {
                        label: "Long-Term Functional Recovery:",
                        description:
                            "Supports ongoing rehabilitation and adaptation to neurological conditions.",
                    },
                ]}
            />

            {/* {Timeline Steps } */}
            <TimelineSteps
                eyebrow="Treatment Steps"
                title="How Neurological Physiotherapy Works"
                description="Our rehabilitation approach is designed to improve movement, function, and independence through structured neurological therapy."
                steps={[
                    {
                        title: "Comprehensive Neurological Assessment",
                        description:
                            "A detailed evaluation is conducted to assess strength, balance, mobility, coordination, posture, and functional abilities.",
                    },
                    {
                        title: "Individualized Rehabilitation Planning",
                        description:
                            "A customized therapy program is developed based on your diagnosis, symptoms, and rehabilitation goals.",
                    },
                    {
                        title: "Targeted Neurological Therapy",
                        description:
                            "Specialized exercises, balance training, gait training, and functional rehabilitation techniques are used to improve movement and independence.",
                    },
                    {
                        title: "Continuous Progress Monitoring",
                        description:
                            "Treatment plans are regularly reviewed and adjusted to support ongoing improvement and long-term functional outcomes.",
                    },
                ]}
            />
            {/* {Benefits Section} */}
            <BenefitRevealSection
                title="Who Can Benefit From Neurological Physiotherapy"
                subtitle="Neurological physiotherapy is suitable for individuals experiencing mobility, balance, and functional challenges caused by neurological conditions."
                sectionTitle="It's Ideal For Those Who"
                image="/images/who-neurological.png"
                imageAlt="Neurological Physiotherapy"
                benefits={[
                    { text: "Are recovering from a stroke" },
                    { text: "Have neurological conditions affecting movement and coordination" },
                    { text: "Experience balance problems or frequent falls" },
                    { text: "Have muscle weakness due to neurological disorders" },
                    { text: "Need assistance improving walking ability and functional independence" },
                    { text: "Require long-term rehabilitation to maintain mobility and quality of life" },
                ]}
            />

            {/* {FAQ section} */}
            <FaqSection
                title="FAQs"
                description=""
                faqs={[
                    {
                        question: "What conditions can neurological physiotherapy help treat?",
                        answer:
                            "Neurological physiotherapy can support individuals with stroke, Parkinson’s disease, multiple sclerosis, spinal cord injuries, traumatic brain injuries, peripheral nerve disorders, and other neurological conditions.",
                    },
                    {
                        question: "How does neurological physiotherapy differ from general physiotherapy?",
                        answer:
                            "Neurological physiotherapy specifically focuses on conditions affecting the brain, spinal cord, and nervous system, with treatments aimed at improving movement, coordination, balance, and functional independence.",
                    },
                    {
                        question: "Can physiotherapy help after a stroke?",
                        answer:
                            "Yes. Stroke rehabilitation is one of the most common applications of neurological physiotherapy and can help improve strength, mobility, balance, and daily functioning.",
                    },
                    {
                        question: "How long will rehabilitation take?",
                        answer:
                            "The duration varies depending on the condition, severity of symptoms, and individual goals. Rehabilitation is often a gradual process with ongoing progress over time.",
                    },
                    {
                        question: "Will the treatment plan be customized?",
                        answer:
                            "Absolutely. Every patient receives a personalized rehabilitation program tailored to their neurological condition, physical abilities, and recovery objectives.",
                    },
                    {
                        question: "Can neurological physiotherapy improve quality of life?",
                        answer:
                            "Yes. By enhancing mobility, independence, balance, and functional abilities, neurological physiotherapy can significantly improve overall quality of life and day-to-day confidence.",
                    },
                ]}
            />

        </main>
    );
}