"use client";
import DynamicBanner from "@/components/services/DynamicBanner";
import IntroSection from "@/components/services/IntroSection";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";


export default function MusculoskeletalPainManagementPage() {
    return (
        <main className="min-h-screen w-full overflow-x-hidden bg-white">
            {/* Banner Section */}
            <DynamicBanner
                mobileImage="/images/musculoskeletal-pain-management-mobile.png"
                desktopImage="/images/musculoskeletal-pain-management-desktop.png"
            />
            {/* {Intro section} */}
            <IntroSection
                title="Musculoskeletal & Pain Management Therapy"
                paragraphs={[
                    {
                        parts: [
                            {
                                text: "Restore movement, reduce pain, and improve quality of life with our comprehensive ",
                            },
                            {
                                text: "Musculoskeletal & Pain Management Therapy",
                                bold: true,
                            },
                            {
                                text: ". Our treatments are designed to address conditions affecting muscles, joints, bones, ligaments, and tendons while helping patients regain strength, mobility, and function.",
                            },
                        ],
                    },
                    {
                        parts: [
                            {
                                text: "Whether you are recovering from an injury, managing chronic pain, or experiencing movement limitations, our physiotherapy specialists provide personalized rehabilitation programs tailored to your individual needs, lifestyle, and recovery goals.",
                            },
                        ],
                    },
                ]}
            />
            {/* {Treatement offers} */}
            <TreatmentOffers
                eyebrow="Why Choose Us"
                title="Why Choose Musculoskeletal & Pain Management Therapy"
                description="Targeted physiotherapy helps relieve pain, restore mobility, and support long-term physical well-being."
                sectionTitle="It Offers:"
                image="/images/why-musculoskeletal-pain.png"
                imageAlt="Musculoskeletal & Pain Management Therapy"
                offers={[
                    {
                        label: "Pain Relief & Management:",
                        description:
                            "Helps reduce acute and chronic pain affecting muscles, joints, and connective tissues.",
                    },
                    {
                        label: "Improved Mobility:",
                        description:
                            "Enhances flexibility, range of motion, and overall physical function.",
                    },
                    {
                        label: "Injury Recovery Support:",
                        description:
                            "Promotes safe and effective rehabilitation following injuries and physical strain.",
                    },
                    {
                        label: "Posture & Movement Correction:",
                        description:
                            "Improves body mechanics and addresses movement dysfunctions.",
                    },
                    {
                        label: "Strength & Functional Restoration:",
                        description:
                            "Builds strength, stability, and endurance for long-term physical health.",
                    },
                ]}
            />

            {/* {Timeline Steps } */}
            <TimelineSteps
                eyebrow="Treatment Steps"
                title="How Musculoskeletal & Pain Management Therapy Works"
                description="A structured rehabilitation process designed to reduce pain, restore movement, and improve physical performance."
                steps={[
                    {
                        title: "Physical Assessment & Diagnosis",
                        description:
                            "A detailed evaluation is performed to understand symptoms, mobility limitations, posture, and functional challenges.",
                    },
                    {
                        title: "Personalized Treatment Planning",
                        description:
                            "A customized therapy program is created based on your condition, pain levels, and recovery goals.",
                    },
                    {
                        title: "Therapeutic Intervention",
                        description:
                            "Evidence-based physiotherapy techniques, exercises, and manual therapies are used to restore movement and reduce discomfort.",
                    },
                    {
                        title: "Recovery & Long-Term Management",
                        description:
                            "Progress is monitored regularly, and treatment plans are adjusted to support sustainable recovery and injury prevention.",
                    },
                ]}
            />
            {/* {Benefits Section} */}
            <BenefitRevealSection
                title="Who Can Benefit From Musculoskeletal & Pain Management Therapy"
                subtitle="This therapy is suitable for individuals experiencing pain, injuries, or movement-related challenges."
                sectionTitle="It's Ideal For Those Who"
                image="/images/who-musculoskeletal-pain.png"
                imageAlt="Musculoskeletal & Pain Management Therapy"
                benefits={[
                    { text: "Experience neck, back, shoulder, knee, or joint pain" },
                    { text: "Are recovering from sports injuries or physical trauma" },
                    { text: "Suffer from chronic musculoskeletal conditions" },
                    { text: "Have reduced mobility, stiffness, or muscle weakness" },
                    { text: "Require rehabilitation following orthopedic procedures" },
                    { text: "Want to improve posture, movement efficiency, and physical function" },
                ]}
            />

            {/* {FAQ section} */}
            <FaqSection
                title="FAQs"
                description=""
                faqs={[
                    {
                        question: "What conditions can musculoskeletal physiotherapy treat?",
                        answer:
                            "It can help manage back pain, neck pain, joint disorders, sports injuries, muscle strains, ligament injuries, arthritis, and other musculoskeletal conditions.",
                    },
                    {
                        question: "How many therapy sessions will I need?",
                        answer:
                            "The number of sessions depends on your condition, symptom severity, and recovery goals. Your physiotherapist will recommend a personalized treatment plan.",
                    },
                    {
                        question: "Is physiotherapy effective for chronic pain?",
                        answer:
                            "Yes. Physiotherapy helps manage chronic pain by improving strength, mobility, flexibility, and overall physical function.",
                    },
                    {
                        question: "Will the treatment be painful?",
                        answer:
                            "Treatment is designed to be safe and comfortable. Some techniques may cause mild temporary discomfort, but therapy is always tailored to your tolerance and recovery needs.",
                    },
                    {
                        question: "Can physiotherapy help prevent future injuries?",
                        answer:
                            "Absolutely. Physiotherapy improves posture, movement patterns, flexibility, and strength, helping reduce the risk of future injuries.",
                    },
                    {
                        question: "Do I need a referral to start physiotherapy?",
                        answer:
                            "In many cases, a referral is not required. However, requirements may vary depending on your healthcare provider and specific condition.",
                    },
                ]}
            />

        </main>
    );
}