"use client";
import DynamicBanner from "@/components/services/DynamicBanner";
import IntroSection from "@/components/services/IntroSection";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";


export default function SkilledNursingCarePage() {
    return (
        <main className="min-h-screen w-full overflow-x-hidden bg-white">
            {/* Banner Section */}
            <DynamicBanner
                mobileImage="/images/skilled-nursing-care-mobile.png"
                desktopImage="/images/skilled-nursing-care-desktop.png"
            />
            {/* {Intro section} */}
            <IntroSection
                title="Skilled nursing care"
                paragraphs={[
                    {
                        parts: [
                            {
                                text: "Skilled Nursing Care provides professional medical support for patients who require ongoing monitoring, treatment, and recovery assistance at home. ",
                            },
                            {
                                text: "Skilled Nursing Care",
                                bold: true,
                            },
                            {
                                text: " is delivered by qualified nurses who provide hospital-quality healthcare in a safe and comfortable home environment.",
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
                                text: ", our nursing services include medication administration, wound care, post-surgical support, chronic disease management, and continuous health monitoring. We focus on improving recovery, promoting independence, and delivering compassionate, personalized care.",
                            },
                        ],
                    },
                ]}
            />
            {/* {Treatement offers} */}
            <TreatmentOffers
                eyebrow="Benefits"
                title="Why Choose Skilled Nursing Care"
                description="Unlike basic caregiving services, Skilled Nursing Care is delivered by licensed healthcare professionals trained to provide advanced medical support and monitoring at home."
                sectionTitle="It Offers:"
                image="/images/why-skilled.png"
                imageAlt="Skilled Nursing Care"
                offers={[
                    {
                        label: "Medication Management:",
                        description:
                            "Ensures medications are administered correctly and on schedule.",
                    },
                    {
                        label: "Wound Care:",
                        description:
                            "Professional dressing changes and wound monitoring to support healing.",
                    },
                    {
                        label: "Post-Surgical Support:",
                        description:
                            "Assistance during recovery to reduce complications and improve outcomes.",
                    },
                    {
                        label: "Health Monitoring:",
                        description:
                            "Regular assessment of vital signs and overall patient condition.",
                    },
                    {
                        label: "Chronic Disease Management:",
                        description:
                            "Ongoing support for diabetes, hypertension, respiratory conditions, and more.",
                    },
                    {
                        label: "Personalized Care Plans:",
                        description:
                            "Customized nursing services tailored to individual healthcare needs.",
                    },
                ]}
            />

            {/* {Timeline Steps } */}
            <TimelineSteps
                eyebrow="Care Process"
                title="How Skilled Nursing Care Works"
                description="Our nursing care process is designed to provide safe, effective, and personalized healthcare support at home."
                steps={[
                    {
                        title: "Initial Health Assessment",
                        description:
                            "A qualified nurse evaluates the patient's condition, treatment requirements, and healthcare goals to create a personalized care plan.",
                    },
                    {
                        title: "Care Plan Implementation",
                        description:
                            "Medical services such as medication administration, wound care, injections, and patient monitoring are provided according to the treatment plan.",
                    },
                    {
                        title: "Ongoing Monitoring & Support",
                        description:
                            "Regular assessments help track progress, adjust care when needed, and ensure optimal recovery and well-being.",
                    },
                ]}
            />
            {/* {Benefits Section} */}
            <BenefitRevealSection
                title="Who Can Benefit From Skilled Nursing Care"
                subtitle="Skilled Nursing Care is suitable for patients who require professional medical assistance, monitoring, or recovery support at home."
                sectionTitle="It's ideal for those who"
                image="/images/who-skilled.png"
                imageAlt="Skilled Nursing Care"
                benefits={[
                    { text: "Are recovering after surgery or hospitalization" },
                    { text: "Require regular medication administration or injections" },
                    { text: "Need professional wound care and dressing changes" },
                    { text: "Live with chronic conditions such as diabetes or hypertension" },
                    { text: "Need elderly care with medical supervision" },
                    { text: "Require rehabilitation and long-term nursing support" },
                ]}
            />

            {/* {FAQ section} */}
            <FaqSection
                title="FAQs"
                description=""
                faqs={[
                    {
                        question: "What is Skilled Nursing Care?",
                        answer:
                            "Skilled Nursing Care involves professional medical services provided by licensed nurses to support recovery, manage health conditions, and deliver specialized care at home.",
                    },
                    {
                        question: "Who provides the nursing care?",
                        answer:
                            "Our services are delivered by qualified and experienced registered nurses trained in a variety of medical and healthcare procedures.",
                    },
                    {
                        question: "Can nursing care be provided at home?",
                        answer:
                            "Yes. Skilled Nursing Care is specifically designed to bring professional healthcare services directly to the patient's home.",
                    },
                    {
                        question: "What conditions can be managed through Skilled Nursing Care?",
                        answer:
                            "Our nurses assist with post-surgical recovery, chronic disease management, wound care, medication administration, elderly care, and rehabilitation support.",
                    },
                    {
                        question: "How often can a nurse visit?",
                        answer:
                            "Visit frequency depends on the patient's condition and treatment plan. Services can be arranged daily, weekly, or as required.",
                    },
                    {
                        question: "Is Skilled Nursing Care suitable for elderly patients?",
                        answer:
                            "Yes. Elderly individuals who require medical supervision, medication support, or chronic condition management can benefit greatly from skilled nursing services.",
                    },
                    {
                        question: "How do I arrange Skilled Nursing Care?",
                        answer:
                            "You can contact Royal Dutch Medical Centre to schedule an assessment and discuss a personalized nursing care plan based on your healthcare needs.",
                    },
                    {
                        question: "What are the benefits of home nursing services?",
                        answer:
                            "Home nursing offers comfort, convenience, personalized attention, reduced hospital visits, and continuous professional medical support in a familiar environment.",
                    },
                ]}
            />

        </main>
    );
}