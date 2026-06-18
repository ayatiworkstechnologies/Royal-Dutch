"use client";
import DynamicBanner from "@/components/services/DynamicBanner";
import IntroSection from "@/components/services/IntroSection";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";


export default function WoundCareAndInfectionPreventionPage() {
    return (
        <main className="min-h-screen w-full overflow-x-hidden bg-white">
            {/* Banner Section */}
            <DynamicBanner
                mobileImage="/images/wound-care-infection-prevention-mobile.png"
                desktopImage="/images/wound-care-infection-prevention-desktop-1.png"
            />
            {/* {Intro section} */}
            <IntroSection
                title="Wound Care & Infection Prevention"
                paragraphs={[
                    {
                        parts: [
                            {
                                text: "Proper wound care is essential for promoting healing, preventing complications, and reducing the risk of infection. At ",
                            },
                            {
                                text: "Royal Dutch Medical Centre",
                                bold: true,
                            },
                            {
                                text: ", our wound care specialists provide comprehensive assessment, cleaning, dressing, and monitoring of acute and chronic wounds using evidence-based medical practices.",
                            },
                        ],
                    },
                    {
                        parts: [
                            {
                                text: "Whether recovering from surgery, injury, burns, diabetic ulcers, or chronic skin conditions, our team ensures every wound receives the right treatment to support faster healing and improved outcomes.",
                            },
                        ],
                    },
                    {
                        parts: [
                            {
                                text: "Our personalized approach focuses on infection prevention, pain management, tissue protection, and continuous monitoring to help patients recover safely and comfortably.",
                            },
                        ],
                    },
                ]}
            />
            {/* {Treatement offers} */}
            <TreatmentOffers
                eyebrow="Treatment Benefits"
                title="Why Choose Professional Wound Care"
                description="Unlike basic home treatment, professional wound care involves expert evaluation, advanced dressings, and infection control measures that accelerate healing and minimize complications."
                sectionTitle="It Offers:"
                image="/images/why-wound.png"
                imageAlt="Wound Care & Infection Prevention"
                offers={[
                    {
                        label: "Thorough Wound Assessment:",
                        description:
                            "Identifies the severity, depth, and healing requirements of the wound.",
                    },
                    {
                        label: "Infection Prevention:",
                        description:
                            "Reduces the risk of bacterial contamination and complications.",
                    },
                    {
                        label: "Advanced Dressing Techniques:",
                        description:
                            "Protects wounds while maintaining an optimal healing environment.",
                    },
                    {
                        label: "Pain Management:",
                        description:
                            "Minimizes discomfort during treatment and recovery.",
                    },
                    {
                        label: "Faster Healing:",
                        description:
                            "Supports tissue regeneration and reduces healing time.",
                    },
                    {
                        label: "Continuous Monitoring:",
                        description:
                            "Tracks healing progress and adjusts treatment when necessary.",
                    },
                ]}
            />

            {/* {Timeline Steps } */}
            <TimelineSteps
                eyebrow="Treatment Process"
                title="How Wound Care & Infection Prevention Works"
                description="Wound care follows a structured treatment process designed to clean, protect, and support the body's natural healing mechanisms."
                steps={[
                    {
                        title: "Wound Assessment",
                        description:
                            "Our healthcare professionals evaluate the wound's size, depth, cause, and signs of infection to create a personalized treatment plan.",
                    },
                    {
                        title: "Cleaning & Debridement",
                        description:
                            "The wound is carefully cleaned to remove dirt, bacteria, and damaged tissue, helping create a healthy environment for healing.",
                    },
                    {
                        title: "Dressing Application",
                        description:
                            "Specialized dressings are applied to protect the wound, maintain moisture balance, and prevent contamination.",
                    },
                    {
                        title: "Infection Management",
                        description:
                            "If needed, appropriate antimicrobial treatments are used to control infection and prevent further complications.",
                    },
                    {
                        title: "Healing Monitoring",
                        description:
                            "Regular follow-up assessments ensure proper healing progress and allow timely adjustments to treatment.",
                    },
                ]}
            />
            {/* {Benefits Section} */}
            <BenefitRevealSection
                title="Who Can Benefit From Wound Care & Infection Prevention"
                subtitle="Professional wound care services are suitable for individuals with acute and chronic wounds requiring specialized medical attention."
                sectionTitle="It's Ideal For Those Who"
                image="/images/who-wound.png"
                imageAlt="Wound Care Treatment"
                benefits={[
                    { text: "Have cuts, lacerations, or traumatic injuries" },
                    { text: "Are recovering from surgery and need wound monitoring" },
                    { text: "Experience diabetic foot ulcers or slow-healing wounds" },
                    { text: "Have pressure sores or bedsores" },
                    { text: "Suffer from burns, skin tears, or abrasions" },
                    { text: "Show signs of wound infection such as redness, swelling, or discharge" },
                    { text: "Require specialized wound management for chronic conditions" },
                    { text: "Need professional guidance for safe healing and infection prevention" },
                ]}
            />

            {/* {FAQ section} */}
            <FaqSection
                title="FAQs"
                description=""
                faqs={[
                    {
                        question: "Why is professional wound care important?",
                        answer:
                            "Professional wound care helps prevent infection, promotes faster healing, and reduces the risk of complications that may arise from improper treatment.",
                    },
                    {
                        question: "How often should wound dressings be changed?",
                        answer:
                            "The frequency depends on the type and condition of the wound. Our healthcare professionals will recommend an appropriate dressing schedule.",
                    },
                    {
                        question: "Can wound infections be prevented?",
                        answer:
                            "Yes. Proper cleaning, dressing, hygiene practices, and timely medical intervention significantly reduce the risk of infection.",
                    },
                    {
                        question: "Do diabetic wounds require special care?",
                        answer:
                            "Yes. Diabetic wounds often heal more slowly and require specialized monitoring and treatment to prevent serious complications.",
                    },
                    {
                        question: "When should I seek medical attention for a wound?",
                        answer:
                            "You should seek medical care if the wound is deep, painful, not healing, bleeding excessively, or showing signs of infection such as redness, swelling, warmth, or pus.",
                    },
                    {
                        question: "Is wound care painful?",
                        answer:
                            "Most wound care procedures are designed to minimize discomfort. Our team uses gentle techniques and pain-management strategies whenever necessary.",
                    },
                    {
                        question: "How long does wound healing take?",
                        answer:
                            "Healing time varies depending on the wound type, severity, overall health, and underlying medical conditions. Regular monitoring helps optimize recovery.",
                    },
                    {
                        question: "Can home care be combined with professional wound treatment?",
                        answer:
                            "Yes. Patients are often provided with home care instructions to support healing between clinic visits while maintaining infection prevention measures.",
                    },
                ]}
            />

        </main>
    );
}