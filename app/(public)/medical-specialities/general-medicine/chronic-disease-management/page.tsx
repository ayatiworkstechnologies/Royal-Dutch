"use client";
import DynamicBanner from "@/components/services/DynamicBanner";
import IntroSection from "@/components/services/IntroSection";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";


export default function ChronicDiseaseManagementPage() {
    return (
        <main className="min-h-screen w-full overflow-x-hidden bg-white">
            {/* Banner Section */}
            <DynamicBanner
                mobileImage="/images/chronic-disease-management-mobile.png"
                desktopImage="/images/chronic-disease-management-desktop-1.png"
            />
            {/* {Intro section} */}
            <IntroSection
                title="Chronic disease management"
                paragraphs={[
                    {
                        parts: [
                            {
                                text: "Living with a long-term health condition requires continuous care, monitoring, and support. ",
                            },
                            {
                                text: "Chronic Disease Management",
                                bold: true,
                            },
                            {
                                text: " focuses on helping patients effectively manage ongoing medical conditions, improve quality of life, and reduce the risk of future complications through personalized and proactive healthcare.",
                            },
                        ],
                    },
                    {
                        parts: [
                            {
                                text: "Our multidisciplinary team provides comprehensive care plans, regular health assessments, medication management, and lifestyle guidance to support long-term wellness. Whether you are managing diabetes, hypertension, asthma, heart disease, thyroid disorders, or other chronic conditions, we are committed to helping you achieve better health outcomes and maintain optimal well-being.",
                            },
                        ],
                    },
                ]}
            />
            {/* {Treatement offers} */}
            <TreatmentOffers
                eyebrow="Treatment Benefits"
                title="Why Choose Chronic Disease Management"
                description="Chronic Disease Management focuses on long-term health maintenance, prevention, and continuous monitoring to keep medical conditions under control."
                sectionTitle="It Offers:"
                image="/images/why-chronic.png"
                imageAlt="Chronic Disease Management"
                offers={[
                    {
                        label: "Personalized Care Plans:",
                        description:
                            "Tailored treatment strategies based on your specific health condition and goals.",
                    },
                    {
                        label: "Regular Health Monitoring:",
                        description:
                            "Continuous tracking of key health indicators to detect changes early.",
                    },
                    {
                        label: "Medication Management:",
                        description:
                            "Ensures medications remain effective and appropriate for your condition.",
                    },
                    {
                        label: "Lifestyle Counseling:",
                        description:
                            "Guidance on nutrition, exercise, stress management, and healthy habits.",
                    },
                    {
                        label: "Complication Prevention:",
                        description:
                            "Reduces the risk of hospitalizations and disease-related complications.",
                    },
                ]}
            />

            {/* {Timeline Steps } */}
            <TimelineSteps
                eyebrow="Treatment Steps"
                title="How Chronic Disease Management Works"
                description="A structured care pathway helps patients manage chronic conditions effectively while promoting long-term wellness."
                steps={[
                    {
                        title: "Initial Health Assessment",
                        description:
                            "A comprehensive evaluation of your medical history, symptoms, medications, lifestyle factors, and health risks is conducted.",
                    },
                    {
                        title: "Personalized Care Plan",
                        description:
                            "An individualized management plan is created, including treatment goals, medications, monitoring schedules, and lifestyle recommendations.",
                    },
                    {
                        title: "Regular Monitoring & Follow-Up",
                        description:
                            "Routine check-ups, screenings, and progress reviews help ensure your condition remains well controlled.",
                    },
                    {
                        title: "Education & Ongoing Support",
                        description:
                            "Patients receive practical guidance and resources to confidently manage their condition and maintain long-term health.",
                    },
                ]}
            />
            {/* {Benefits Section} */}
            <BenefitRevealSection
                title="Who Can Benefit From Chronic Disease Management"
                subtitle="Chronic Disease Management is designed for individuals living with long-term medical conditions that require ongoing monitoring and care."
                sectionTitle="It's ideal for those who"
                image="/images/who-chronic.png"
                imageAlt="Chronic Disease Management"
                benefits={[
                    { text: "Have diabetes or pre-diabetes" },
                    { text: "Live with high blood pressure (hypertension)" },
                    { text: "Manage heart disease or cardiovascular conditions" },
                    { text: "Experience asthma or chronic respiratory disorders" },
                    { text: "Have thyroid disorders requiring regular monitoring" },
                    { text: "Need long-term medication management and preventive care" },
                ]}
            />

            {/* {FAQ section} */}
            <FaqSection
                title="FAQs"
                description=""
                faqs={[
                    {
                        question: "What is Chronic Disease Management?",
                        answer:
                            "Chronic Disease Management is a structured healthcare approach that helps individuals manage long-term medical conditions through ongoing monitoring, treatment, education, and preventive care.",
                    },
                    {
                        question: "Which conditions can be managed through this program?",
                        answer:
                            "Common conditions include diabetes, hypertension, heart disease, asthma, thyroid disorders, chronic kidney disease, arthritis, and other long-term health conditions.",
                    },
                    {
                        question: "How often will I need follow-up appointments?",
                        answer:
                            "The frequency depends on your condition and treatment plan. Some patients may require monthly reviews, while others may need quarterly or annual assessments.",
                    },
                    {
                        question: "Can Chronic Disease Management prevent complications?",
                        answer:
                            "Yes. Regular monitoring and early intervention help reduce the risk of complications, hospitalizations, and disease progression.",
                    },
                    {
                        question: "Will I receive lifestyle and nutrition guidance?",
                        answer:
                            "Absolutely. Lifestyle counseling, dietary recommendations, exercise guidance, and preventive health education are integral parts of the program.",
                    },
                    {
                        question: "Can this program improve my quality of life?",
                        answer:
                            "Yes. Effective management can help control symptoms, improve daily functioning, enhance overall well-being, and support long-term health goals.",
                    },
                ]}
            />

        </main>
    );
}