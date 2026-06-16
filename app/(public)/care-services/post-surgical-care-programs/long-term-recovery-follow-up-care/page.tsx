"use client";
import DynamicBanner from "@/components/services/DynamicBanner";
import IntroSection from "@/components/services/IntroSection";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";


export default function LongtermRecoveryandFollowupCarePage() {
    return (
        <main className="min-h-screen w-full overflow-x-hidden bg-white">
            {/* Banner Section */}
            <DynamicBanner
                mobileImage="/images/long-term-recovery-follow-up-care-mobile.png"
                desktopImage="/images/long-term-recovery-follow-up-care-desktop.png"
            />
            {/* {Intro section} */}
            <IntroSection
                title="Long-Term Recovery and Follow-Up Care"
                paragraphs={[
                    {
                        parts: [
                            {
                                text: "Recovery doesn't end when treatment is completed. At ",
                            },
                            {
                                text: "Royal Dutch Medical Centre",
                                bold: true,
                            },
                            {
                                text: ", our Long-Term Recovery and Follow-Up Care program ensures patients receive continuous support, monitoring, and guidance throughout their healing journey.",
                            },
                        ],
                    },
                    {
                        parts: [
                            {
                                text: "Whether recovering from surgery, injury, chronic illness, neurological conditions, or rehabilitation programs, our multidisciplinary team provides personalized care plans designed to promote optimal recovery, prevent complications, and improve quality of life.",
                            },
                        ],
                    },
                    {
                        parts: [
                            {
                                text: "Through regular assessments, progress tracking, medication management, and lifestyle guidance, we help patients regain confidence, independence, and long-term wellness.",
                            },
                        ],
                    },
                ]}
            />
            {/* {Treatement offers} */}
            <TreatmentOffers
                eyebrow="Treatment Benefits"
                title="Why Choose Long-Term Recovery and Follow-Up Care"
                description="Unlike short-term treatment plans that focus only on immediate recovery, long-term follow-up care provides continuous medical supervision to ensure sustained health improvements and prevent setbacks."
                sectionTitle="It Offers:"
                image="/images/why-longterm.png"
                imageAlt="Long-Term Recovery and Follow-Up Care"
                offers={[
                    {
                        label: "Personalized Recovery Plans:",
                        description:
                            "Tailored care programs based on individual health needs and recovery goals.",
                    },
                    {
                        label: "Regular Health Monitoring:",
                        description:
                            "Ongoing assessments help track progress and detect concerns early.",
                    },
                    {
                        label: "Medication Management:",
                        description:
                            "Ensures treatments remain effective while minimizing side effects.",
                    },
                    {
                        label: "Rehabilitation Support:",
                        description:
                            "Continuous physiotherapy and therapeutic guidance for improved mobility and function.",
                    },
                    {
                        label: "Prevention of Complications:",
                        description:
                            "Early intervention reduces the risk of relapses or secondary health issues.",
                    },
                    {
                        label: "Patient and Family Education:",
                        description:
                            "Provides valuable guidance for long-term self-care and disease management.",
                    },
                ]}
            />

            {/* {Timeline Steps } */}
            <TimelineSteps
                eyebrow="Treatment Process"
                title="How Long-Term Recovery and Follow-Up Care Works"
                description="Our comprehensive recovery program follows a structured approach to support patients at every stage of their healing process."
                steps={[
                    {
                        title: "Initial Recovery Assessment",
                        description:
                            "A thorough evaluation is conducted to understand the patient's condition, recovery status, medical history, and long-term healthcare needs.",
                    },
                    {
                        title: "Personalized Care Plan",
                        description:
                            "Our specialists develop a customized recovery strategy that may include medical reviews, rehabilitation sessions, lifestyle recommendations, and medication management.",
                    },
                    {
                        title: "Regular Follow-Up Visits",
                        description:
                            "Scheduled consultations help monitor progress, adjust treatments when necessary, and address any new concerns promptly.",
                    },
                    {
                        title: "Rehabilitation & Support",
                        description:
                            "Patients receive ongoing physiotherapy, counseling, nutritional guidance, and supportive care to enhance recovery outcomes.",
                    },
                    {
                        title: "Long-Term Wellness Management",
                        description:
                            "Continuous monitoring and preventive healthcare strategies help patients maintain health, independence, and quality of life.",
                    },
                ]}
            />
            {/* {Benefits Section} */}
            <BenefitRevealSection
                title="Who Can Benefit From Long-Term Recovery and Follow-Up Care"
                subtitle="Long-Term Recovery and Follow-Up Care is beneficial for individuals requiring ongoing medical supervision, rehabilitation, and support after treatment."
                sectionTitle="It's Ideal For Those Who"
                image="/images/who-longterm.png"
                imageAlt="Long-Term Recovery and Follow-Up Care"
                benefits={[
                    { text: "Recovering from surgery or major medical procedures" },
                    {
                        text: "Managing chronic illnesses such as diabetes, heart disease, or respiratory conditions",
                    },
                    { text: "Recovering from neurological disorders or stroke" },
                    { text: "Requiring long-term physiotherapy or rehabilitation" },
                    { text: "Experiencing mobility challenges or reduced independence" },
                    { text: "Needing continuous medication monitoring and adjustment" },
                    { text: "Seeking preventive care to avoid complications or relapses" },
                    {
                        text: "Looking for professional guidance throughout their recovery journey",
                    },
                ]}
            />

            {/* {FAQ section} */}
            <FaqSection
                title="FAQs"
                description=""
                faqs={[
                    {
                        question: "What is long-term recovery and follow-up care?",
                        answer:
                            "Long-term recovery and follow-up care is a structured healthcare program that provides ongoing medical monitoring, rehabilitation, and support after treatment or hospitalization.",
                    },
                    {
                        question: "Who needs follow-up care?",
                        answer:
                            "Patients recovering from surgery, chronic illnesses, injuries, neurological conditions, or extended hospital stays often benefit from follow-up care.",
                    },
                    {
                        question: "How often are follow-up appointments scheduled?",
                        answer:
                            "The frequency depends on the patient's condition and recovery plan. Appointments may be weekly, monthly, or scheduled as needed by the healthcare team.",
                    },
                    {
                        question: "Can follow-up care be provided at home?",
                        answer:
                            "Yes. Depending on the patient's needs, home visits, teleconsultations, and home-based rehabilitation services may be available.",
                    },
                    {
                        question: "What services are included in follow-up care?",
                        answer:
                            "Services may include medical reviews, physiotherapy, medication management, nutritional guidance, chronic disease monitoring, and wellness counseling.",
                    },
                    {
                        question: "Does follow-up care help prevent complications?",
                        answer:
                            "Yes. Regular monitoring allows healthcare professionals to identify potential issues early and take preventive action before complications develop.",
                    },
                    {
                        question: "Can family members be involved in the recovery plan?",
                        answer:
                            "Absolutely. Family education and caregiver support are important components of successful long-term recovery.",
                    },
                    {
                        question: "How do I get started with long-term recovery care?",
                        answer:
                            "Simply schedule a consultation with our medical team. We will assess your condition and create a personalized recovery plan tailored to your needs.",
                    },
                ]}
            />

        </main>
    );
}