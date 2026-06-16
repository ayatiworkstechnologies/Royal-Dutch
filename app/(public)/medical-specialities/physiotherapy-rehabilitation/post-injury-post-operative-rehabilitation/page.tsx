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
            <DynamicBanner
                mobileImage="/images/post-injury-post-operative-rehabilitation-mobile.png"
                desktopImage="/images/post-injury-post-operative-rehabilitation-desktop.png"
            />
            {/* {Intro section} */}
            <IntroSection
                title="Post-Injury & Post-Operative Rehabilitation"
                paragraphs={[
                    {
                        parts: [
                            {
                                text: "Recover safely and regain your strength with our specialized ",
                            },
                            {
                                text: "Post-Injury & Post-Operative Rehabilitation",
                                bold: true,
                            },
                            {
                                text: " programs. Designed to support healing after injuries, surgeries, and orthopedic procedures, our rehabilitation services focus on restoring mobility, reducing pain, and helping you return to daily activities with confidence.",
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
                                text: ", our physiotherapists develop personalized recovery plans using therapeutic exercises, manual therapy, and functional training to optimize healing, improve movement, and reduce the risk of future complications.",
                            },
                        ],
                    },
                ]}
            />
            {/* {Treatement offers} */}
            <TreatmentOffers
                eyebrow="Benefits"
                title="Why Choose Post-Injury & Post-Operative Rehabilitation"
                description="A structured rehabilitation program helps accelerate recovery, restore function, and support long-term physical wellness after injury or surgery."
                sectionTitle="It Offers:"
                image="/images/who-post-injury.png"
                imageAlt="Post-Injury Rehabilitation"
                offers={[
                    {
                        label: "Faster Recovery Support:",
                        description:
                            "Promotes safe healing and helps patients return to normal activities sooner.",
                    },
                    {
                        label: "Pain & Swelling Management:",
                        description:
                            "Reduces discomfort and supports the recovery process.",
                    },
                    {
                        label: "Restoration of Mobility:",
                        description:
                            "Improves joint movement, flexibility, and range of motion.",
                    },
                    {
                        label: "Strength Rebuilding:",
                        description:
                            "Helps regain muscle strength and physical stability after injury or surgery.",
                    },
                    {
                        label: "Injury Prevention:",
                        description:
                            "Reduces the risk of complications, re-injury, and long-term functional limitations.",
                    },
                ]}
            />

            {/* {Timeline Steps } */}
            <TimelineSteps
                eyebrow="Treatment Steps"
                title="How Post-Injury & Post-Operative Rehabilitation Works"
                description="Our rehabilitation programs follow a structured recovery pathway designed to restore movement, strength, and function safely."
                steps={[
                    {
                        title: "Comprehensive Assessment",
                        description:
                            "A detailed evaluation is conducted to understand your injury, surgical procedure, physical condition, and recovery goals.",
                    },
                    {
                        title: "Personalized Rehabilitation Plan",
                        description:
                            "A customized treatment program is developed based on your stage of recovery and functional requirements.",
                    },
                    {
                        title: "Therapeutic Rehabilitation",
                        description:
                            "Targeted exercises, mobility training, manual therapy, and recovery techniques are implemented to restore function and strength.",
                    },
                    {
                        title: "Progress Monitoring & Functional Recovery",
                        description:
                            "Recovery milestones are monitored closely, and treatment plans are adjusted to ensure optimal long-term outcomes.",
                    },
                ]}
            />
            {/* {Benefits Section} */}
            <BenefitRevealSection
                title="Who Can Benefit From Post-Injury & Post-Operative Rehabilitation"
                subtitle="Rehabilitation programs are designed for individuals recovering from injuries, surgeries, and mobility-related conditions."
                sectionTitle="It's Ideal For Those Who"
                image="/images/who-post-injury.png"
                imageAlt="Post-Injury Rehabilitation"
                benefits={[
                    { text: "Are recovering from orthopedic or general surgical procedures" },
                    { text: "Have sustained sports injuries, fractures, or ligament injuries" },
                    { text: "Underwent joint replacement surgery" },
                    { text: "Experience reduced mobility following injury or surgery" },
                    { text: "Need support rebuilding strength and functional movement" },
                    { text: "Want a structured recovery program to return to daily activities safely" },
                ]}
            />

            {/* {FAQ section} */}
            <FaqSection
                title="FAQs"
                description=""
                faqs={[
                    {
                        question: "Why is rehabilitation important after surgery?",
                        answer:
                            "Rehabilitation helps restore strength, mobility, and function while reducing the risk of complications, stiffness, and delayed recovery.",
                    },
                    {
                        question: "When should I start rehabilitation after surgery?",
                        answer:
                            "The timing depends on the type of surgery and your surgeon's recommendations. Many rehabilitation programs begin shortly after the procedure.",
                    },
                    {
                        question: "How long will my rehabilitation take?",
                        answer:
                            "Recovery timelines vary depending on the nature of the injury or surgery, your overall health, and individual recovery goals.",
                    },
                    {
                        question: "Can physiotherapy help reduce post-surgical pain?",
                        answer:
                            "Yes. Physiotherapy techniques are designed to manage pain, reduce swelling, improve mobility, and support healing.",
                    },
                    {
                        question: "Will my rehabilitation program be customized?",
                        answer:
                            "Absolutely. Every rehabilitation plan is tailored to your condition, recovery stage, physical abilities, and treatment objectives.",
                    },
                    {
                        question: "Can rehabilitation help me return to sports or work?",
                        answer:
                            "Yes. Rehabilitation programs focus on restoring the strength, mobility, and functional skills needed to safely return to work, sports, and daily activities.",
                    },
                ]}
            />

        </main>
    );
}