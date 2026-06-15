"use client";
import DynamicBanner from "@/components/services/DynamicBanner";
import IntroSection from "@/components/services/IntroSection";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";


export default function RehabilitationAndMobilityRestorationPage() {
    return (
        <main className="min-h-screen w-full overflow-x-hidden bg-white">
            {/* Banner Section */}
            <DynamicBanner
                mobileImage="/images/medical-dermatology-desktop-mobile.png"
                desktopImage="/images/medical-dermatology-desktop-banner.png"
            />
            {/* {Intro section} */}
            <IntroSection
                title="Rehabilitation and Mobility Restoration"
                paragraphs={[
                    {
                        parts: [
                            {
                                text: "Rehabilitation and mobility restoration focuses on helping patients regain strength, balance, flexibility, and confidence after injury, surgery, pain, or reduced movement.",
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
                                text: ", our rehabilitation approach combines guided physiotherapy, therapeutic exercises, mobility training, and personalized recovery plans to support safe and lasting improvement.",
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
                                text: ", this service helps patients move better, reduce discomfort, improve daily function, and return to an active lifestyle with professional care.",
                            },
                        ],
                    },
                ]}
            />
            {/* {Treatement offers} */}
            <TreatmentOffers
                eyebrow="Treatment Benefits"
                title="Why Choose Rehabilitation and Mobility Restoration"
                description="Unlike general exercise programs, rehabilitation is clinically guided and tailored to each patient’s condition, recovery stage, and mobility goals."
                sectionTitle="It Offers:"
                image="/images/why-rehabilitation.png"
                imageAlt="Rehabilitation and Mobility Restoration"
                offers={[
                    {
                        label: "Pain Relief:",
                        description:
                            "Helps reduce joint, muscle, and movement-related discomfort.",
                    },
                    {
                        label: "Improved Mobility:",
                        description:
                            "Restores range of motion, flexibility, and body movement.",
                    },
                    {
                        label: "Strength Recovery:",
                        description:
                            "Builds muscle support after injury, surgery, or weakness.",
                    },
                    {
                        label: "Balance & Coordination:",
                        description:
                            "Improves stability and reduces the risk of falls.",
                    },
                    {
                        label: "Personalized Care:",
                        description:
                            "Each treatment plan is designed based on your body's needs and recovery goals.",
                    },
                ]}
            />

            {/* {Timeline Steps } */}
            <TimelineSteps
                eyebrow="Treatment Process"
                title="How Rehabilitation and Mobility Restoration Works"
                description="Rehabilitation is a step-by-step process that supports recovery, movement correction, and long-term functional improvement."
                steps={[
                    {
                        title: "Assessment & Diagnosis",
                        description:
                            "Our specialist evaluates your pain, mobility, posture, strength, balance, and functional limitations.",
                    },
                    {
                        title: "Personalized Treatment Plan",
                        description:
                            "A recovery plan is created based on your condition, goals, lifestyle, and current mobility level.",
                    },
                    {
                        title: "Guided Therapy & Exercises",
                        description:
                            "Targeted physiotherapy, stretching, strengthening, and mobility exercises are performed under expert supervision.",
                    },
                    {
                        title: "Progressive Mobility Training",
                        description:
                            "Your movement, balance, walking ability, and daily activity performance are gradually improved.",
                    },
                    {
                        title: "Long-Term Recovery Support",
                        description:
                            "Home exercises and lifestyle guidance help maintain results and prevent future movement problems.",
                    },
                ]}
            />
            {/* {Benefits Section} */}
            <BenefitRevealSection
                title="Who Can Benefit From Rehabilitation and Mobility Restoration"
                subtitle="Rehabilitation and mobility restoration is suitable for patients who need support in recovering movement, strength, and physical independence."
                sectionTitle="It's Ideal For Those Who"
                image="/images/who-rehabilitation.png"
                imageAlt="Rehabilitation and Mobility Restoration"
                benefits={[
                    { text: "Recovering after surgery or injury" },
                    { text: "Have joint, back, neck, or muscle pain" },
                    { text: "Experience stiffness or reduced flexibility" },
                    { text: "Need help improving walking or balance" },
                    { text: "Have weakness after illness or inactivity" },
                    { text: "Want to return safely to daily activities" },
                ]}
            />

            {/* {FAQ section} */}
            <FaqSection
                title="FAQs"
                description=""
                faqs={[
                    {
                        question: "Is rehabilitation painful?",
                        answer:
                            "Rehabilitation is designed to be safe and progressive. Some mild discomfort may occur during movement, but therapy is adjusted to your comfort level.",
                    },
                    {
                        question: "How many sessions will I need?",
                        answer:
                            "The number of sessions depends on your condition, recovery goals, and progress after assessment.",
                    },
                    {
                        question: "Can rehabilitation help after surgery?",
                        answer:
                            "Yes. It supports safe recovery, improves strength, restores mobility, and helps patients return to daily activities.",
                    },
                    {
                        question: "Is this suitable for elderly patients?",
                        answer:
                            "Yes. Mobility restoration can help improve balance, strength, walking confidence, and fall prevention in older adults.",
                    },
                    {
                        question: "Do I need a doctor's referral?",
                        answer:
                            "A referral may be helpful, but our team can assess your condition and guide you on the right treatment plan.",
                    },
                ]}
            />

        </main>
    );
}