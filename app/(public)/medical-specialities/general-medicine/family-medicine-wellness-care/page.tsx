"use client";
import DynamicBanner from "@/components/services/DynamicBanner";
import IntroSection from "@/components/services/IntroSection";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";


export default function FamilyMedicineAndWellnessCarePage() {
    return (
        <main className="min-h-screen w-full overflow-x-hidden bg-white">
            {/* Banner Section */}
            <DynamicBanner
                mobileImage="/images/family-medicine-wellness-care-mobile.png"
                desktopImage="/images/family-medicine-wellness-care-desktop-1.png"
            />
            {/* {Intro section} */}
            <IntroSection
                title="Family Medicine & Wellness Care"
                paragraphs={[
                    {
                        parts: [
                            {
                                text: "Family Medicine & Wellness Care focuses on providing comprehensive healthcare for individuals and families at every stage of life. ",
                            },
                            {
                                text: "Family Medicine & Wellness Care",
                                bold: true,
                            },
                            {
                                text: " combines preventive care, early diagnosis, chronic disease management, and wellness support to help patients achieve and maintain optimal health.",
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
                                text: ", our experienced physicians provide personalized healthcare plans, routine check-ups, and long-term medical support to promote healthier lives for individuals and families of all ages.",
                            },
                        ],
                    },
                ]}
            />
            {/* {Treatement offers} */}
            <TreatmentOffers
                eyebrow="Why Choose Us"
                title="Why Choose Family Medicine & Wellness Care"
                description="Family Medicine provides continuous, patient-centered healthcare that focuses on prevention, treatment, and long-term wellness."
                sectionTitle="It Offers:"
                image="/images/why-family.png"
                imageAlt="Family Medicine & Wellness Care"
                offers={[
                    {
                        label: "Comprehensive Healthcare:",
                        description:
                            "Provides medical care for children, adults, and seniors under one roof.",
                    },
                    {
                        label: "Preventive Screenings:",
                        description:
                            "Helps detect health concerns early through routine check-ups and assessments.",
                    },
                    {
                        label: "Chronic Disease Management:",
                        description:
                            "Supports the effective management of conditions such as diabetes, hypertension, and asthma.",
                    },
                    {
                        label: "Personalized Wellness Plans:",
                        description:
                            "Tailored guidance to improve lifestyle habits and long-term health outcomes.",
                    },
                    {
                        label: "Continuity of Care:",
                        description:
                            "Builds lasting doctor-patient relationships for ongoing healthcare support.",
                    },
                ]}
            />

            {/* {Timeline Steps } */}
            <TimelineSteps
                eyebrow="Treatment Steps"
                title="How Family Medicine & Wellness Care Works"
                description="A structured approach focused on prevention, early intervention, and lifelong health management."
                steps={[
                    {
                        title: "Health Assessment",
                        description:
                            "A comprehensive evaluation of your medical history, lifestyle, risk factors, and current health concerns is conducted.",
                    },
                    {
                        title: "Preventive Screening",
                        description:
                            "Routine examinations, laboratory investigations, and health screenings help identify potential issues early.",
                    },
                    {
                        title: "Wellness & Treatment Plan",
                        description:
                            "A personalized care plan is developed, including treatment recommendations, lifestyle guidance, and preventive strategies.",
                    },
                    {
                        title: "Ongoing Monitoring & Support",
                        description:
                            "Regular follow-ups ensure your health goals are achieved while providing continuous medical guidance and care.",
                    },
                ]}
            />
            {/* {Benefits Section} */}
            <BenefitRevealSection
                title="Who Can Benefit From Family Medicine & Wellness Care"
                subtitle="Family Medicine services are designed for individuals and families seeking comprehensive healthcare and long-term wellness support."
                sectionTitle="It's Ideal For Those Who"
                image="/images/who-family.png"
                imageAlt="Family Medicine & Wellness Care"
                benefits={[
                    { text: "Want regular health check-ups and preventive care" },
                    { text: "Need management for chronic medical conditions" },
                    { text: "Seek personalized wellness and lifestyle guidance" },
                    { text: "Require healthcare support for the entire family" },
                    { text: "Want early detection and monitoring of health risks" },
                    { text: "Are focused on maintaining long-term health and well-being" },
                ]}
            />

            {/* {FAQ section} */}
            <FaqSection
                title="FAQs"
                description=""
                faqs={[
                    {
                        question: "What is Family Medicine?",
                        answer:
                            "Family Medicine is a medical specialty that provides comprehensive healthcare for individuals and families of all ages, focusing on prevention, diagnosis, treatment, and long-term wellness.",
                    },
                    {
                        question: "How often should I schedule a wellness check-up?",
                        answer:
                            "Most adults benefit from an annual wellness examination, although your physician may recommend more frequent visits based on your health condition and risk factors.",
                    },
                    {
                        question: "Can Family Medicine help manage chronic diseases?",
                        answer:
                            "Yes. Family physicians routinely manage chronic conditions such as diabetes, hypertension, asthma, thyroid disorders, and high cholesterol.",
                    },
                    {
                        question: "What happens during a wellness consultation?",
                        answer:
                            "Your physician reviews your medical history, lifestyle habits, family health background, current concerns, and may recommend preventive screenings or diagnostic tests.",
                    },
                    {
                        question: "Is Family Medicine suitable for children and seniors?",
                        answer:
                            "Yes. Family Medicine provides healthcare services for all age groups, from children and adolescents to adults and elderly patients.",
                    },
                    {
                        question: "Do I need a wellness visit if I feel healthy?",
                        answer:
                            "Absolutely. Preventive care helps identify potential health issues before symptoms appear, supporting better long-term health outcomes.",
                    },
                ]}
            />

        </main>
    );
}