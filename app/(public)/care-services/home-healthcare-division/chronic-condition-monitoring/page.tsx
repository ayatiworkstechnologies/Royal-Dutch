"use client";
import DynamicBanner from "@/components/services/DynamicBanner";
import IntroSection from "@/components/services/IntroSection";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";


export default function ChronicConditionMonitoringPage() {
    return (
        <main className="min-h-screen w-full overflow-x-hidden bg-white">
            {/* Banner Section */}
            <DynamicBanner
                mobileImage="/images/chronic-condition-monitoring-mobile.png"
                desktopImage="/images/chronic-condition-monitoring-desktop-1.png"
            />
            {/* {Intro section} */}
            <IntroSection
                title="Chronic Condition Monitoring"
                paragraphs={[
                    {
                        parts: [
                            {
                                text: "Chronic Condition Monitoring is a continuous healthcare service designed to help patients manage long-term health conditions with regular medical supervision, timely follow-ups, and personalized care plans.",
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
                                text: ", our doctors monitor your health progress, review symptoms, track vital signs, adjust medications when required, and guide you toward better long-term wellness.",
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
                                text: ", this service is ideal for patients who require ongoing medical attention for conditions such as diabetes, hypertension, heart disease, asthma, thyroid disorders, and other chronic illnesses.",
                            },
                        ],
                    },
                ]}
            />
            {/* {Treatement offers} */}
            <TreatmentOffers
                eyebrow="Treatment Benefits"
                title="Why Choose Chronic Condition Monitoring"
                description="Unlike one-time consultations, Chronic Condition Monitoring focuses on consistent follow-up and preventive care to reduce complications and improve quality of life."
                sectionTitle="It Offers:"
                image="/images/why-chronic-monitoring.png"
                imageAlt="Chronic Condition Monitoring"
                offers={[
                    {
                        label: "Regular Health Tracking:",
                        description:
                            "Monitors symptoms, reports, vital signs, and treatment progress.",
                    },
                    {
                        label: "Personalized Care Plans:",
                        description:
                            "Treatment guidance based on your condition, lifestyle, and medical history.",
                    },
                    {
                        label: "Medication Review:",
                        description:
                            "Doctors assess medication effectiveness and make adjustments when needed.",
                    },
                    {
                        label: "Early Detection:",
                        description:
                            "Helps identify warning signs before conditions become severe.",
                    },
                    {
                        label: "Better Long-Term Control:",
                        description:
                            "Supports stable health and reduces emergency hospital visits.",
                    },
                ]}
            />

            {/* {Timeline Steps } */}
            <TimelineSteps
                eyebrow="Treatment Process"
                title="How Chronic Condition Monitoring Works"
                description="Chronic Condition Monitoring is a structured process that helps patients stay in control of their health."
                steps={[
                    {
                        title: "Initial Consultation",
                        description:
                            "The doctor reviews your medical history, current symptoms, medications, and previous reports.",
                    },
                    {
                        title: "Health Assessment",
                        description:
                            "Vital signs, lab reports, lifestyle factors, and condition-specific risks are evaluated.",
                    },
                    {
                        title: "Care Plan Creation",
                        description:
                            "A personalized monitoring and treatment plan is prepared based on your health needs.",
                    },
                    {
                        title: "Regular Follow-Ups",
                        description:
                            "Progress is reviewed through scheduled consultations, report analysis, and symptom tracking.",
                    },
                    {
                        title: "Ongoing Guidance",
                        description:
                            "Medication, diet, lifestyle, and preventive care advice are updated as needed.",
                    },
                ]}
            />
            {/* {Benefits Section} */}
            <BenefitRevealSection
                title="Who Can Benefit From Chronic Condition Monitoring"
                subtitle="Chronic Condition Monitoring is suitable for patients who need continuous medical guidance and long-term health supervision."
                sectionTitle="It's Ideal For Those Who"
                image="/images/who-chronic-monitoring.png"
                imageAlt="Chronic Condition Monitoring"
                benefits={[
                    { text: "Have diabetes or high blood sugar" },
                    { text: "Struggle with high blood pressure" },
                    { text: "Have heart-related conditions" },
                    { text: "Experience asthma or respiratory issues" },
                    { text: "Need thyroid or hormonal monitoring" },
                    { text: "Require regular medication review" },
                    {
                        text: "Have recurring symptoms or lifestyle-related conditions",
                    },
                    {
                        text: "Want preventive care and better health control",
                    },
                ]}
            />

            {/* {FAQ section} */}
            <FaqSection
                title="FAQs"
                description=""
                faqs={[
                    {
                        question: "What is Chronic Condition Monitoring?",
                        answer:
                            "It is regular medical supervision for long-term health conditions to track progress, prevent complications, and improve treatment outcomes.",
                    },
                    {
                        question: "Who needs this service?",
                        answer:
                            "Patients with diabetes, hypertension, heart disease, asthma, thyroid disorders, or other long-term conditions can benefit from this service.",
                    },
                    {
                        question: "How often should I visit the doctor?",
                        answer:
                            "The frequency depends on your condition. Your doctor will recommend follow-ups based on your health status.",
                    },
                    {
                        question: "Can my medications be adjusted during monitoring?",
                        answer:
                            "Yes. The doctor may review and adjust medications if required to ensure optimal disease control.",
                    },
                    {
                        question: "Is this service only for elderly patients?",
                        answer:
                            "No. It is suitable for adults of all ages who need ongoing care for chronic health conditions.",
                    },
                ]}
            />

        </main>
    );
}