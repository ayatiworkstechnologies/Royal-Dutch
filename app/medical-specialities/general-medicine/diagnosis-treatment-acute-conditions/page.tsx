"use client";
import DynamicBanner from "@/components/services/DynamicBanner";
import IntroSection from "@/components/services/IntroSection";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";


export default function DiagnosisTreatmentAcuteConditionsPage() {
    return (
        <main className="min-h-screen w-full overflow-x-hidden bg-white">
            {/* Banner Section */}
            <DynamicBanner
                mobileImage="/images/medical-dermatology-desktop-mobile.png"
                desktopImage="/images/medical-dermatology-desktop-banner.png"
            />
            {/* {Intro section} */}
            <IntroSection
                title="Diagnosis and treatment of acute conditions"
                paragraphs={[
                    {
                        parts: [
                            {
                                text: "Acute conditions are sudden illnesses or injuries that require prompt medical attention, and ",
                            },
                            {
                                text: "Diagnosis and Treatment of Acute Conditions",
                                bold: true,
                            },
                            {
                                text: " focuses on providing rapid assessment, accurate diagnosis, and effective treatment to support a safe and speedy recovery.",
                            },
                        ],
                    },
                    {
                        parts: [
                            {
                                text: "Using advanced diagnostic tools and evidence-based medical care, our healthcare professionals identify the underlying cause of symptoms and create personalized treatment plans to address immediate health concerns while helping prevent complications.",
                            },
                        ],
                    },
                ]}
            />
            {/* {Treatement offers} */}
            <TreatmentOffers
                eyebrow="Acute Care Services"
                title="Why Choose Diagnosis and Treatment of Acute Conditions"
                description="Our acute care services are designed to provide fast, accurate, and effective treatment for a wide range of sudden illnesses and injuries."
                sectionTitle="It Offers:"
                image="/images/why-diagnosis.png"
                imageAlt="Acute Care Treatment"
                offers={[
                    {
                        label: "Rapid Diagnosis:",
                        description:
                            "Quick assessments and diagnostic testing help identify the cause of symptoms promptly.",
                    },
                    {
                        label: "Immediate Treatment:",
                        description:
                            "Timely medical intervention helps relieve symptoms and prevent complications.",
                    },
                    {
                        label: "Personalized Care Plans:",
                        description:
                            "Treatment is tailored to each patient’s condition, medical history, and recovery needs.",
                    },
                    {
                        label: "Comprehensive Monitoring:",
                        description:
                            "Ongoing observation and follow-up care support effective recovery.",
                    },
                    {
                        label: "Experienced Medical Team:",
                        description:
                            "Skilled healthcare professionals provide expert care for a variety of acute conditions.",
                    },
                ]}
            />

            {/* {Timeline Steps } */}
            <TimelineSteps
                eyebrow="Treatment Process"
                title="How Diagnosis and Treatment of Acute Conditions Works"
                description="A structured approach designed to ensure accurate diagnosis, timely treatment, and optimal recovery."
                steps={[
                    {
                        title: "Medical Assessment",
                        description:
                            "Our doctors perform a detailed evaluation of symptoms, medical history, and overall health status.",
                    },
                    {
                        title: "Diagnostic Testing",
                        description:
                            "Laboratory tests, imaging studies, or other investigations may be performed to confirm the diagnosis.",
                    },
                    {
                        title: "Treatment Initiation",
                        description:
                            "Appropriate medications, therapies, or procedures are provided based on the diagnosed condition.",
                    },
                    {
                        title: "Monitoring & Follow-Up",
                        description:
                            "Recovery is monitored closely, with follow-up consultations to ensure effective treatment outcomes.",
                    },
                ]}
            />
            {/* {Benefits Section} */}
            <BenefitRevealSection
                title="Who Can Benefit From Diagnosis and Treatment of Acute Conditions"
                subtitle="Prompt diagnosis and treatment can help prevent complications and support faster recovery."
                sectionTitle="This service is ideal for individuals who:"
                image="/images/who-diagnosis.png"
                imageAlt="Acute Medical Care"
                benefits={[
                    { text: "Experience sudden fever, infections, or flu-like symptoms" },
                    { text: "Develop respiratory conditions such as cough, cold, or breathing difficulties" },
                    { text: "Suffer from acute pain, inflammation, or minor injuries" },
                    { text: "Require immediate medical attention for unexpected health concerns" },
                    { text: "Experience digestive issues such as vomiting, diarrhea, or abdominal discomfort" },
                    { text: "Need prompt diagnosis and treatment to prevent worsening symptoms" },
                    { text: "Seek professional evaluation for new or unexplained health conditions" },
                    { text: "Require short-term treatment and recovery support" },
                ]}
            />

            {/* {FAQ section} */}
            <FaqSection
                title="FAQs"
                description=""
                faqs={[
                    {
                        question: "What are acute conditions?",
                        answer:
                            "Acute conditions are illnesses or injuries that develop suddenly and usually require prompt medical attention, such as infections, fever, respiratory illnesses, or minor injuries.",
                    },
                    {
                        question: "When should I seek treatment for an acute condition?",
                        answer:
                            "You should seek medical care if symptoms appear suddenly, worsen quickly, or interfere with your daily activities and overall well-being.",
                    },
                    {
                        question: "How is an acute condition diagnosed?",
                        answer:
                            "Diagnosis may involve a physical examination, medical history review, laboratory tests, imaging studies, or other diagnostic procedures depending on the symptoms.",
                    },
                    {
                        question: "Can acute conditions be treated on the same day?",
                        answer:
                            "Many acute conditions can be diagnosed and treated during the same visit, allowing patients to begin recovery as soon as possible.",
                    },
                    {
                        question: "What types of acute conditions do you treat?",
                        answer:
                            "We manage a wide range of conditions, including infections, fever, respiratory illnesses, digestive issues, minor injuries, inflammation, and other sudden health concerns.",
                    },
                    {
                        question: "Will I need follow-up appointments?",
                        answer:
                            "Some conditions may require follow-up visits to monitor recovery and ensure the treatment is working effectively.",
                    },
                    {
                        question: "Can children and elderly patients receive acute care services?",
                        answer:
                            "Yes. Our medical team provides diagnosis and treatment services for patients of all ages, including children, adults, and seniors.",
                    },
                    {
                        question: "How quickly can I book an appointment?",
                        answer:
                            "Appointments can usually be scheduled promptly, ensuring timely access to medical care when urgent health concerns arise.",
                    },
                ]}
            />

        </main>
    );
}