"use client";
import DynamicBanner from "@/components/services/DynamicBanner";
import IntroSection from "@/components/services/IntroSection";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";


export default function PostinjuryAndPostoperativeRehabilitationPage() {
    return (
        <main className="min-h-screen w-full overflow-x-hidden bg-white">
            {/* Banner Section */}
            <DynamicBanner image="/images/contact-banner.png" />
            {/* {Intro section} */}
            <IntroSection
                title="Post-injury and post-operative rehabilitation"
                paragraphs={[
                    {
                        parts: [
                            {
                                text: "Healthy, radiant skin begins with hydration, and ",
                            },
                            {
                                text: "Post-injury and post-operative rehabilitation",
                                bold: true,
                            },
                            {
                                text: " is the gold standard for achieving it. This advanced, non-invasive treatment cleanses, exfoliates, extracts, and deeply hydrates your skin in one seamless session.",
                            },
                        ],
                    },
                    {
                        parts: [
                            {
                                text: "Offered in ",
                            },
                            {
                                text: "Ras Al Khaimah",
                                bold: true,
                            },
                            {
                                text: ", this facial combines technology with gentle care to deliver visible, immediate results. Whether your skin feels dry, congested, or tired, the Hydra Facial restores balance, smoothness, and a lasting glow.",
                            },
                        ],
                    },
                ]}
            />
            {/* {Treatement offers} */}
            <TreatmentOffers
                eyebrow="Treatment Steps"
                title="Why Choose a Hydra Facial"
                description="Unlike traditional facials that rely on manual techniques, the Hydra Facial uses a medical-grade device to perform multiple functions simultaneously."
                sectionTitle="It Offers:"
                image="/images/service-legacy.jpg"
                imageAlt="Hydra Facial Treatment"
                offers={[
                    {
                        label: "Deep Cleansing:",
                        description:
                            "Removes dead skin cells and impurities with precision.",
                    },
                    {
                        label: "Painless Extractions:",
                        description:
                            "Vacuum-powered suction clears blackheads and unclogs pores.",
                    },
                    {
                        label: "Intense Hydration:",
                        description:
                            "Infuses skin with nourishing serums and antioxidants.",
                    },
                    {
                        label: "Brightening Effect:",
                        description:
                            "Evens out skin tone and restores radiance.",
                    },
                    {
                        label: "Anti-Aging Benefits:",
                        description:
                            "Improves firmness and minimizes fine lines.",
                    },
                ]} />

            {/* {Timeline Steps } */}
            <TimelineSteps
                eyebrow="Treatment Steps"
                title="How Hydra Facial Works"
                description="The Hydra Facial is a multi-step process that revitalizes your skin from within."
                steps={[
                    {
                        title: "Cleansing & Exfoliation",
                        description:
                            "A gentle cleanser removes impurities, while mild exfoliation smooths the surface and prepares the skin for hydration.",
                    },
                    {
                        title: "Acid Peel",
                        description:
                            "A light, non-irritating peel loosens debris from pores and softens dead skin cells for easy removal.",
                    },
                    {
                        title: "Extraction",
                        description:
                            "The patented vacuum technology painlessly extracts blackheads, whiteheads, and excess oil, leaving pores clean and refined.",
                    },
                    {
                        title: "Extraction",
                        description:
                            "The patented vacuum technology painlessly extracts blackheads, whiteheads, and excess oil, leaving pores clean and refined.",
                    },
                ]} />
            {/* {Benefits Section} */}
            <BenefitRevealSection
                title="Who Can Benefit From Hydra Facial"
                subtitle="Hydra Facial is suitable for all skin types, including sensitive, oily, or dry skin."
                sectionTitle="It’s ideal for those who"
                image="/images/vision.png"
                imageAlt="Hydra Facial Treatment"
                benefits={[
                    { text: "Want instant hydration and glow" },
                    { text: "Struggle with dull, uneven skin tone" },
                    { text: "Have enlarged pores or blackheads" },
                    { text: "Experience dryness, flakiness, or fine lines" },
                ]}
            />

            {/* {FAQ section} */}
            <FaqSection
                title="FAQs"
                description="Find answers to common questions about Hydra Facial treatment, results, and aftercare."
                faqs={[
                    {
                        question: "Is Hydra Facial suitable for sensitive skin?",
                        answer:
                            "Yes. Hydra Facial is generally suitable for sensitive skin because it uses a gentle, non-invasive process. The treatment can also be adjusted based on your skin type and concern.",
                    },
                    {
                        question: "How long does a Hydra Facial session take?",
                        answer:
                            "A typical Hydra Facial session takes around 30 to 45 minutes, depending on the skin condition and treatment plan.",
                    },
                    {
                        question: "When can I see results?",
                        answer:
                            "Many clients notice improved hydration, glow, and smoothness immediately after the session. Results may continue to improve with regular treatments.",
                    },
                    {
                        question: "Is there any downtime after Hydra Facial?",
                        answer:
                            "There is usually no downtime. Most clients can return to normal activities immediately after the treatment.",
                    },
                ]}
            />

        </main>
    );
}