"use client";
import DynamicBanner from "@/components/services/DynamicBanner";
import IntroSection from "@/components/services/IntroSection";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";


export default function LaserAndDeviceBasedTreatmentsPage() {
    return (
        <main className="min-h-screen w-full overflow-x-hidden bg-white">
            {/* Banner Section */}
            <DynamicBanner
                mobileImage="/images/medical-dermatology-desktop-mobile.png"
                desktopImage="/images/medical-dermatology-desktop-banner.png"
            />
            {/* {Intro section} */}
            <IntroSection
                title="Laser & Device-Based Treatments"
                paragraphs={[
                    {
                        parts: [
                            {
                                text: "Experience advanced skin rejuvenation with ",
                            },
                            {
                                text: "Laser & Device-Based Treatments",
                                bold: true,
                            },
                            {
                                text: " designed to address a wide range of skin, hair, and aesthetic concerns with precision and minimal downtime.",
                            },
                        ],
                    },
                    {
                        parts: [
                            {
                                text: "Using cutting-edge technology, these treatments target specific concerns such as pigmentation, acne scars, unwanted hair, skin laxity, vascular lesions, and signs of aging. Our specialists customize each treatment plan to deliver safe, effective, and long-lasting results tailored to your unique skin needs.",
                            },
                        ],
                    },
                    {
                        parts: [
                            {
                                text: "Whether your goal is smoother skin, improved texture, enhanced firmness, or a more youthful appearance, ",
                            },
                            {
                                text: "Laser & Device-Based Treatments",
                                bold: true,
                            },
                            {
                                text: " provide clinically proven solutions for visible transformation and long-term skin improvement.",
                            },
                        ],
                    },
                ]}
            />
            {/* {Treatement offers} */}
            <TreatmentOffers
                eyebrow="Treatment Steps"
                title="Why Choose Laser & Device-Based Treatments"
                description="Modern laser and energy-based technologies provide targeted treatments with greater precision, comfort, and effectiveness."
                sectionTitle="It Offers:"
                image="/images/why-laser.png"
                imageAlt="Laser & Device-Based Treatments"
                offers={[
                    {
                        label: "Skin Rejuvenation:",
                        description:
                            "Improves skin texture, tone, and overall radiance for a healthier, refreshed appearance.",
                    },
                    {
                        label: "Pigmentation Correction:",
                        description:
                            "Targets sun damage, dark spots, and uneven skin tone to promote a clearer complexion.",
                    },
                    {
                        label: "Scar & Acne Mark Reduction:",
                        description:
                            "Helps minimize the appearance of acne scars and other skin imperfections for smoother skin.",
                    },
                    {
                        label: "Skin Tightening:",
                        description:
                            "Stimulates collagen production to enhance firmness and achieve younger-looking skin.",
                    },
                    {
                        label: "Hair Reduction Solutions:",
                        description:
                            "Provides long-term reduction of unwanted hair growth with advanced laser technology.",
                    },
                ]}
            />

            {/* {Timeline Steps } */}
            <TimelineSteps
                eyebrow="Treatment Steps"
                title="How Laser & Device-Based Treatments Work"
                description="Laser and energy-based treatments use advanced technology to target specific skin and aesthetic concerns with precision and minimal downtime."
                steps={[
                    {
                        title: "Consultation & Skin Evaluation",
                        description:
                            "A comprehensive assessment is performed to understand your concerns, skin condition, and treatment goals.",
                    },
                    {
                        title: "Customized Treatment Planning",
                        description:
                            "The most suitable laser or device technology is selected based on your skin type and desired outcomes.",
                    },
                    {
                        title: "Targeted Procedure",
                        description:
                            "Advanced laser or energy-based devices precisely treat the selected areas while protecting surrounding tissues.",
                    },
                    {
                        title: "Recovery & Results",
                        description:
                            "Post-treatment care is provided to support healing, optimize results, and maintain long-term skin health.",
                    },
                ]}
            />
            {/* {Benefits Section} */}
            <BenefitRevealSection
                title="Who Can Benefit From Laser & Device-Based Treatments"
                subtitle="Laser & Device-Based Treatments are suitable for individuals seeking advanced, non-surgical solutions for a wide range of skin and aesthetic concerns."
                sectionTitle="Ideal for individuals who"
                image="/images/who-laser.png"
                imageAlt="Laser & Device-Based Treatments"
                benefits={[
                    { text: "Have pigmentation, sun damage, or uneven skin tone" },
                    { text: "Want to improve skin texture and overall complexion" },
                    { text: "Experience acne scars or other skin imperfections" },
                    { text: "Seek non-surgical skin tightening and rejuvenation" },
                    { text: "Desire long-term reduction of unwanted hair" },
                    { text: "Want to address early signs of aging with advanced technology" },
                ]}
            />

            {/* {FAQ section} */}
            <FaqSection
                title="FAQs"
                description=""
                faqs={[
                    {
                        question: "Are Laser & Device-Based Treatments safe?",
                        answer:
                            "Yes. These treatments are performed using clinically approved technologies and are customized according to your skin type and condition for maximum safety and effectiveness.",
                    },
                    {
                        question: "How long does a session take?",
                        answer:
                            "Treatment duration varies depending on the procedure and treatment area but typically ranges from 20 to 60 minutes.",
                    },
                    {
                        question: "When will I see results?",
                        answer:
                            "Some patients notice improvements after a single session, while optimal results often develop gradually over multiple treatments.",
                    },
                    {
                        question: "Is there any downtime?",
                        answer:
                            "Downtime depends on the specific treatment performed. Many procedures require little to no recovery time, while others may involve temporary redness or mild sensitivity.",
                    },
                    {
                        question: "How many sessions will I need?",
                        answer:
                            "The number of sessions varies based on your concerns, treatment goals, and the technology being used. A personalized plan will be recommended during consultation.",
                    },
                    {
                        question: "Are the results long-lasting?",
                        answer:
                            "Results can be long-lasting when combined with proper skincare, sun protection, and recommended maintenance treatments.",
                    },
                ]}
            />

        </main>
    );
}