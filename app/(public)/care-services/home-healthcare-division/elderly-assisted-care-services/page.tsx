"use client";
import DynamicBanner from "@/components/services/DynamicBanner";
import IntroSection from "@/components/services/IntroSection";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";


export default function ElderlyAndAssistedCareServicesPage() {
    return (
        <main className="min-h-screen w-full overflow-x-hidden bg-white">
            {/* Banner Section */}
            <DynamicBanner
                mobileImage="/images/elderly-assisted-care-services-mobile.png"
                desktopImage="/images/elderly-assisted-care-services-desktop.png"
            />
            {/* {Intro section} */}
            <IntroSection
                title="Elderly and Assisted Care Services"
                paragraphs={[
                    {
                        parts: [
                            {
                                text: "Healthy ageing begins with compassionate support, dignity, and trusted medical care. ",
                            },
                            {
                                text: "Elderly and Assisted Care Services",
                                bold: true,
                            },
                            {
                                text: " at Royal Dutch Medical Centre are designed to help seniors live safely, comfortably, and independently with professional healthcare assistance.",
                            },
                        ],
                    },
                    {
                        parts: [
                            {
                                text: "Our care team supports elderly patients with daily living needs, medical monitoring, mobility assistance, medication reminders, recovery support, and emotional companionship — all delivered with patience, respect, and personalized attention.",
                            },
                        ],
                    },
                ]}
            />
            {/* {Treatement offers} */}
            <TreatmentOffers
                eyebrow="Treatment Benefits"
                title="Why Choose Elderly and Assisted Care"
                description="Unlike general caregiving, our elderly care service combines medical supervision, personal assistance, and emotional support to ensure seniors receive complete care based on their health condition and lifestyle needs."
                sectionTitle="It Offers:"
                image="/images/why-elderly.png"
                imageAlt="Elderly and Assisted Care Services"
                offers={[
                    {
                        label: "Personalized Care:",
                        description:
                            "Care plans designed according to each patient's medical and daily needs.",
                    },
                    {
                        label: "Medical Monitoring:",
                        description:
                            "Regular observation of health conditions, vitals, and medication schedules.",
                    },
                    {
                        label: "Daily Living Support:",
                        description:
                            "Assistance with mobility, hygiene, meals, and routine activities.",
                    },
                    {
                        label: "Post-Hospital Care:",
                        description:
                            "Support during recovery after surgery, illness, or hospitalization.",
                    },
                    {
                        label: "Companionship:",
                        description:
                            "Emotional support to reduce loneliness and improve overall wellbeing.",
                    },
                ]}
            />

            {/* {Timeline Steps } */}
            <TimelineSteps
                eyebrow="Care Process"
                title="How Elderly and Assisted Care Works"
                description="Elderly care is a structured support process that ensures comfort, safety, and continuous wellbeing."
                steps={[
                    {
                        title: "Initial Assessment",
                        description:
                            "Our team evaluates the senior's health condition, mobility, daily routine, medication needs, and level of assistance required.",
                    },
                    {
                        title: "Personalized Care Plan",
                        description:
                            "A customized care plan is created based on medical needs, lifestyle preferences, family expectations, and safety requirements.",
                    },
                    {
                        title: "Daily Assistance",
                        description:
                            "Trained caregivers provide support with personal care, movement, meals, medication reminders, and routine activities.",
                    },
                    {
                        title: "Health Monitoring",
                        description:
                            "Vital signs, symptoms, medication adherence, and overall condition are regularly monitored and reported when needed.",
                    },
                    {
                        title: "Family Updates",
                        description:
                            "Families are kept informed about the patient's progress, comfort, and any changes in health status.",
                    },
                ]}
            />
            {/* {Benefits Section} */}
            <BenefitRevealSection
                title="Who Can Benefit From Elderly and Assisted Care Services"
                subtitle="Elderly and Assisted Care Services are suitable for seniors who need extra medical, physical, or emotional support."
                sectionTitle="It's Ideal For Those Who"
                image="/images/who-elderly.png"
                imageAlt="Elderly and Assisted Care Services"
                benefits={[
                    { text: "Need assistance with daily activities" },
                    { text: "Have difficulty walking or moving safely" },
                    { text: "Require medication reminders and monitoring" },
                    { text: "Are recovering after surgery or hospitalization" },
                    { text: "Live alone and need companionship" },
                    { text: "Have age-related weakness or chronic health conditions" },
                    { text: "Need support with hygiene, meals, and routine care" },
                    { text: "Require safe, supervised care at home" },
                ]}
            />

            {/* {FAQ section} */}
            <FaqSection
                title="FAQs"
                description=""
                faqs={[
                    {
                        question: "What is Elderly and Assisted Care?",
                        answer:
                            "Elderly and Assisted Care is a professional support service for seniors who need help with daily activities, health monitoring, mobility, medication reminders, and personal care.",
                    },
                    {
                        question: "Is this service suitable for seniors living alone?",
                        answer:
                            "Yes. It is ideal for elderly individuals who live alone and need regular support, supervision, companionship, or medical assistance.",
                    },
                    {
                        question: "Can caregivers help with medication?",
                        answer:
                            "Yes. Caregivers can remind patients to take medicines on time and monitor basic health routines as guided by the doctor.",
                    },
                    {
                        question: "Is elderly care available after hospitalization?",
                        answer:
                            "Yes. Post-hospital care support helps seniors recover safely after surgery, illness, injury, or hospital discharge.",
                    },
                    {
                        question: "Can the care plan be customized?",
                        answer:
                            "Yes. Every care plan is personalized based on the patient's health condition, daily needs, mobility level, and family preferences.",
                    },
                    {
                        question: "Is this service available at home?",
                        answer:
                            "Yes. Elderly and Assisted Care can be arranged at home for comfort, safety, and convenience.",
                    },
                ]}
            />

        </main>
    );
}