"use client";
import DynamicBanner from "@/components/services/DynamicBanner";
import IntroSection from "@/components/services/IntroSection";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";


export default function PainManagementProtocolsPage() {
    return (
        <main className="min-h-screen w-full overflow-x-hidden bg-white">
            {/* Banner Section */}
            <DynamicBanner
                mobileImage="/images/pain-management-protocols-mobile.png"
                desktopImage="/images/pain-management-protocols-desktop.png"
            />
            {/* {Intro section} */}
            <IntroSection
                title="Pain Management Protocols"
                paragraphs={[
                    {
                        parts: [
                            {
                                text: "Pain management protocols are designed to reduce discomfort, improve mobility, and restore daily function through safe, personalized medical care. ",
                            },
                            {
                                text: "Pain Management Protocols",
                                bold: true,
                            },
                            {
                                text: " focus on identifying the root cause of pain and providing effective treatment solutions for long-term relief.",
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
                                text: ", our pain management services combine medical evaluation, targeted therapies, rehabilitation support, and patient education to help individuals move comfortably and improve their quality of life.",
                            },
                        ],
                    },
                ]}
            />
            {/* {Treatement offers} */}
            <TreatmentOffers
                eyebrow="Treatment Benefits"
                title="Why Choose Pain Management Protocols"
                description="Unlike temporary pain relief methods, structured pain management focuses on treating the underlying condition while preventing pain from becoming chronic."
                sectionTitle="It Offers:"
                image="/images/why-pain-management.png"
                imageAlt="Pain Management Protocols"
                offers={[
                    {
                        label: "Targeted Pain Relief:",
                        description:
                            "Helps reduce pain from muscles, joints, nerves, and injuries.",
                    },
                    {
                        label: "Personalized Care Plans:",
                        description:
                            "Treatment is tailored based on your symptoms, condition, and lifestyle.",
                    },
                    {
                        label: "Improved Mobility:",
                        description:
                            "Supports better movement, flexibility, and physical function.",
                    },
                    {
                        label: "Non-Surgical Approach:",
                        description:
                            "Focuses on safe and conservative treatment options whenever possible.",
                    },
                    {
                        label: "Long-Term Wellness:",
                        description:
                            "Helps prevent recurring pain through rehabilitation and guided care.",
                    },
                ]}
            />

            {/* {Timeline Steps } */}
            <TimelineSteps
                eyebrow="Treatment Steps"
                title="How Pain Management Protocols Work"
                description="Pain management is a step-by-step process that begins with diagnosis and continues with customized treatment and recovery support."
                steps={[
                    {
                        title: "Assessment & Diagnosis",
                        description:
                            "A detailed consultation helps identify the source, type, and severity of pain.",
                    },
                    {
                        title: "Personalized Treatment Plan",
                        description:
                            "Our specialists create a care plan based on your condition, medical history, and recovery goals.",
                    },
                    {
                        title: "Pain Relief Therapies",
                        description:
                            "Targeted therapies help reduce inflammation, stiffness, nerve irritation, and discomfort.",
                    },
                    {
                        title: "Rehabilitation Support",
                        description:
                            "Guided exercises and physiotherapy improve strength, mobility, and function.",
                    },
                    {
                        title: "Follow-Up & Prevention",
                        description:
                            "Progress is monitored, and lifestyle guidance is provided to reduce future pain episodes.",
                    },
                ]}
            />
            {/* {Benefits Section} */}
            <BenefitRevealSection
                title="Who Can Benefit From Pain Management Protocols"
                subtitle="Pain management protocols are suitable for patients experiencing acute, recurring, or chronic pain."
                sectionTitle="It's ideal for those who"
                image="/images/who-pain-management.png"
                imageAlt="Pain Management Protocols"
                benefits={[
                    { text: "Suffer from back, neck, shoulder, or joint pain" },
                    { text: "Experience arthritis-related pain or stiffness" },
                    { text: "Have sports injuries or muscle strain" },
                    { text: "Deal with nerve pain, sciatica, or radiating pain" },
                    { text: "Experience post-injury or post-surgical discomfort" },
                    { text: "Want non-surgical pain relief and mobility improvement" },
                ]}
            />

            {/* {FAQ section} */}
            <FaqSection
                title="FAQs"
                description=""
                faqs={[
                    {
                        question: "Is pain management only for chronic pain?",
                        answer:
                            "No. Pain management can help with both acute pain and long-term pain conditions.",
                    },
                    {
                        question: "Will I need surgery?",
                        answer:
                            "Most pain management plans focus on non-surgical methods before considering surgical options.",
                    },
                    {
                        question: "How soon can I feel relief?",
                        answer:
                            "Some patients may experience improvement quickly, while others benefit from a structured treatment plan over multiple sessions.",
                    },
                    {
                        question: "Is the treatment safe?",
                        answer:
                            "Yes. All treatments are planned after a comprehensive medical assessment and customized to your condition.",
                    },
                    {
                        question: "Do I need physiotherapy with pain management?",
                        answer:
                            "In many cases, physiotherapy helps improve mobility, strength, and long-term recovery.",
                    },
                    {
                        question: "Can pain return after treatment?",
                        answer:
                            "Pain may return if the underlying cause is not managed. Follow-up care, exercises, and lifestyle guidance help reduce recurrence.",
                    },
                ]}
            />

        </main>
    );
}