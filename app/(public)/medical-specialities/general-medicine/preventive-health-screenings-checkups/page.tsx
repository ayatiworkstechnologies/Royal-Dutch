"use client";
import DynamicBanner from "@/components/services/DynamicBanner";
import IntroSection from "@/components/services/IntroSection";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";


export default function PreventiveHealthScreeningsAndCheckupsPage() {
    return (
        <main className="min-h-screen w-full overflow-x-hidden bg-white">
            {/* Banner Section */}
            <DynamicBanner
                mobileImage="/images/preventive-health-screenings-mobile.png"
                desktopImage="/images/preventive-health-screenings-desktop.png"
            />
            {/* {Intro section} */}
            <IntroSection
                title="Preventive health screenings and check-ups"
                paragraphs={[
                    {
                        parts: [
                            {
                                text: "Your health is your most valuable asset, and prevention is the key to maintaining it. ",
                            },
                            {
                                text: "Preventive Health Screenings & Check-Ups",
                                bold: true,
                            },
                            {
                                text: " are designed to identify potential health concerns before symptoms appear, enabling early intervention and better long-term health outcomes.",
                            },
                        ],
                    },
                    {
                        parts: [
                            {
                                text: "Our comprehensive assessments include vital health evaluations, laboratory investigations, lifestyle risk assessments, and personalized medical recommendations. Regular screenings help you stay informed about your health status and take proactive steps toward a healthier future.",
                            },
                        ],
                    },
                ]}
            />
            {/* {Treatement offers} */}
            <TreatmentOffers
                eyebrow="Health Benefits"
                title="Why Choose Preventive Health Screenings & Check-Ups"
                description="Preventive screenings help identify health risks early and support proactive healthcare for long-term wellness."
                sectionTitle="It Offers:"
                image="/images/who-preventive-health.png"
                imageAlt="Preventive Health Screening"
                offers={[
                    {
                        label: "Early Disease Detection:",
                        description:
                            "Identifies health conditions at their earliest and most treatable stages.",
                    },
                    {
                        label: "Personalized Health Insights:",
                        description:
                            "Provides a detailed understanding of your health status and risk factors.",
                    },
                    {
                        label: "Chronic Disease Prevention:",
                        description:
                            "Helps reduce the risk of diabetes, hypertension, heart disease, and other conditions.",
                    },
                    {
                        label: "Peace of Mind:",
                        description:
                            "Offers reassurance through regular monitoring and professional guidance.",
                    },
                    {
                        label: "Improved Long-Term Health:",
                        description:
                            "Supports healthier lifestyle choices and better overall well-being.",
                    },
                ]}
            />

            {/* {Timeline Steps } */}
            <TimelineSteps
                eyebrow="Screening Process"
                title="How Preventive Health Screenings & Check-Ups Work"
                description="A structured assessment process provides a complete overview of your health and wellness."
                steps={[
                    {
                        title: "Health Consultation",
                        description:
                            "A healthcare professional reviews your medical history, lifestyle habits, family history, and current health concerns.",
                    },
                    {
                        title: "Comprehensive Screening",
                        description:
                            "Diagnostic tests may include blood tests, blood pressure checks, cholesterol screening, diabetes screening, BMI assessment, and other evaluations.",
                    },
                    {
                        title: "Results & Risk Assessment",
                        description:
                            "Your results are carefully analyzed to identify potential health risks and areas requiring attention.",
                    },
                    {
                        title: "Personalized Health Plan",
                        description:
                            "Based on your findings, tailored recommendations and preventive strategies are provided to support long-term wellness.",
                    },
                ]}
            />
            {/* {Benefits Section} */}
            <BenefitRevealSection
                title="Who Can Benefit From Preventive Health Screenings & Check-Ups"
                subtitle="Preventive screenings are suitable for adults of all ages and help support long-term health and wellness."
                sectionTitle="It's ideal for those who"
                image="/images/who-preventive-health.png"
                imageAlt="Preventive Health Screening"
                benefits={[
                    { text: "Want to monitor their overall health regularly" },
                    { text: "Have a family history of diabetes, heart disease, or chronic illnesses" },
                    { text: "Experience lifestyle-related risk factors such as stress or inactivity" },
                    { text: "Are over 40 and require routine age-related health assessments" },
                    { text: "Wish to detect potential health concerns before symptoms develop" },
                    { text: "Want personalized guidance for maintaining long-term wellness" },
                ]}
            />

            {/* {FAQ section} */}
            <FaqSection
                title="FAQs"
                description=""
                faqs={[
                    {
                        question: "Why are preventive health screenings important?",
                        answer:
                            "Preventive screenings help identify potential health issues early, often before symptoms appear, improving treatment outcomes and reducing health risks.",
                    },
                    {
                        question: "How often should I have a health check-up?",
                        answer:
                            "The frequency depends on your age, medical history, and risk factors. Most adults benefit from an annual preventive health assessment.",
                    },
                    {
                        question: "What tests are included in a preventive health screening?",
                        answer:
                            "Tests may include blood pressure monitoring, cholesterol testing, diabetes screening, blood tests, BMI assessment, and other evaluations based on individual needs.",
                    },
                    {
                        question: "Do I need a screening if I feel healthy?",
                        answer:
                            "Yes. Many health conditions develop silently without symptoms. Regular screenings help detect issues early and support ongoing wellness.",
                    },
                    {
                        question: "How long does a preventive health check-up take?",
                        answer:
                            "Depending on the screening package and tests required, appointments typically take between 30 minutes and 2 hours.",
                    },
                    {
                        question: "Can preventive screenings help prevent serious illnesses?",
                        answer:
                            "While screenings do not prevent diseases directly, they help identify risks early, allowing timely intervention and lifestyle modifications.",
                    },
                ]}
            />

        </main>
    );
}