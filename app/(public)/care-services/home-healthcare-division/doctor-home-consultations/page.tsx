"use client";
import DynamicBanner from "@/components/services/DynamicBanner";
import IntroSection from "@/components/services/IntroSection";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";


export default function DoctorHomeConsultationsPage() {
    return (
        <main className="min-h-screen w-full overflow-x-hidden bg-white">
            {/* Banner Section */}
            <DynamicBanner
                mobileImage="/images/doctor-home-consultations-mobile.png"
                desktopImage="/images/doctor-home-consultations-desktop-1.png"
            />
            {/* {Intro section} */}
            <IntroSection
                title="Doctor Home Consultations"
                paragraphs={[
                    {
                        parts: [
                            {
                                text: "Quality medical care, delivered to the comfort of your home.",
                            },
                        ],
                    },
                    {
                        parts: [
                            {
                                text: "Doctor Home Consultations by ",
                            },
                            {
                                text: "Royal Dutch Medical Centre",
                                bold: true,
                            },
                            {
                                text: " are designed for patients who prefer safe, convenient, and personalized medical attention without visiting the clinic.",
                            },
                        ],
                    },
                    {
                        parts: [
                            {
                                text: "Our experienced doctors provide professional assessment, diagnosis, treatment advice, and follow-up care at your doorstep in ",
                            },
                            {
                                text: "Ras Al Khaimah",
                                bold: true,
                            },
                            {
                                text: ".",
                            },
                        ],
                    },
                ]}
            />
            {/* {Treatement offers} */}
            <TreatmentOffers
                eyebrow="Treatment Benefits"
                title="Why Choose Doctor Home Consultations"
                description="Doctor home consultations offer comfort, privacy, and timely medical support for patients who need expert care without travel."
                sectionTitle="It Offers:"
                image="/images/why-doctor.png"
                imageAlt="Doctor Home Consultations"
                offers={[
                    {
                        label: "Comfortable Care:",
                        description: "Receive medical attention in your own home environment.",
                    },
                    {
                        label: "Time-Saving Access:",
                        description:
                            "Avoid waiting rooms, travel delays, and clinic queues.",
                    },
                    {
                        label: "Personalized Attention:",
                        description:
                            "One-on-one consultation focused on your health needs.",
                    },
                    {
                        label: "Safe For Elderly Patients:",
                        description:
                            "Ideal for seniors, bedridden patients, and limited-mobility individuals.",
                    },
                    {
                        label: "Continuity Of Care:",
                        description:
                            "Get follow-up guidance, prescriptions, and health monitoring support.",
                    },
                ]}
            />

            {/* {Timeline Steps } */}
            <TimelineSteps
                eyebrow="Treatment Process"
                title="How Doctor Home Consultations Work"
                description="Doctor home consultation is a simple process designed to bring reliable medical care directly to you."
                steps={[
                    {
                        title: "Book Appointment",
                        description:
                            "Schedule your home consultation through phone, WhatsApp, or online enquiry.",
                    },
                    {
                        title: "Doctor Visit",
                        description:
                            "Our doctor visits your home at the confirmed time for evaluation and consultation.",
                    },
                    {
                        title: "Medical Assessment",
                        description:
                            "The doctor reviews symptoms, checks vitals, and provides diagnosis or treatment advice.",
                    },
                    {
                        title: "Prescription & Follow-Up",
                        description:
                            "Receive medication guidance, referrals, or follow-up care recommendations if required.",
                    },
                ]}
            />
            {/* {Benefits Section} */}
            <BenefitRevealSection
                title="Who Can Benefit From Doctor Home Consultations"
                subtitle="Doctor Home Consultations are suitable for patients who need convenient medical care at home."
                sectionTitle="It's Ideal For Those Who"
                image="/images/who-doctor.png"
                imageAlt="Doctor Home Consultations"
                benefits={[
                    { text: "Need medical care without visiting the clinic" },
                    { text: "Are elderly or have limited mobility" },
                    { text: "Require fever, cold, cough, or general illness consultation" },
                    { text: "Need post-hospitalization follow-up care" },
                    { text: "Prefer private and comfortable medical support" },
                    { text: "Need routine checkups or chronic condition monitoring" },
                ]}
            />

            {/* {FAQ section} */}
            <FaqSection
                title="FAQs"
                description=""
                faqs={[
                    {
                        question: "What is a doctor home consultation?",
                        answer:
                            "A doctor home consultation is a medical visit where a qualified doctor comes to your home to assess your health and provide treatment advice.",
                    },
                    {
                        question: "Who can request a home doctor visit?",
                        answer:
                            "Anyone who needs convenient medical care at home, especially elderly patients, children, busy professionals, and patients with mobility issues.",
                    },
                    {
                        question: "Can the doctor provide prescriptions?",
                        answer:
                            "Yes. After assessment, the doctor can provide medication guidance and prescription if required.",
                    },
                    {
                        question: "Is this suitable for emergencies?",
                        answer:
                            "Doctor home consultation is suitable for non-emergency medical needs. For serious emergencies, please visit the nearest hospital or call emergency services.",
                    },
                    {
                        question: "Do you provide home consultations in Ras Al Khaimah?",
                        answer:
                            "Yes, Royal Dutch Medical Centre offers doctor home consultation services in Ras Al Khaimah.",
                    },
                ]}
            />

        </main>
    );
}