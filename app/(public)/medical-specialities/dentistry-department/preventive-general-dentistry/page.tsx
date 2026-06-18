"use client";
import DynamicBanner from "@/components/services/DynamicBanner";
import IntroSection from "@/components/services/IntroSection";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";


export default function PreventiveGeneralDentistryPage() {
    return (
        <main className="min-h-screen w-full overflow-x-hidden bg-white">
            {/* Banner Section */}
            <DynamicBanner
                mobileImage="/images/preventive-general-dentistry-mobile.png"
                desktopImage="/images/preventive-general-dentistry-desktop-1.png"
            />
            {/* {Intro section} */}
            <IntroSection
                title="Preventive & General Dentistry"
                paragraphs={[
                    {
                        parts: [
                            {
                                text: "A healthy smile begins with ",
                            },
                            {
                                text: "Preventive & General Dentistry",
                                bold: true,
                            },
                            {
                                text: " focused on maintaining optimal oral health, preventing dental problems before they develop, and providing comprehensive care for patients of all ages.",
                            },
                        ],
                    },
                    {
                        parts: [
                            {
                                text: "Through regular dental examinations, professional cleanings, early diagnosis, and personalized treatment plans, we help protect your teeth, gums, and overall oral health while preserving your natural smile.",
                            },
                        ],
                    },
                    {
                        parts: [
                            {
                                text: "Whether you require routine dental care, treatment for common oral concerns, or guidance on maintaining excellent oral hygiene, our experienced dental team is committed to providing comfortable and effective care.",
                            },
                        ],
                    },
                ]}
            />
            {/* {Treatement offers} */}
            <TreatmentOffers
                eyebrow="Treatment Benefits"
                title="Why Choose Preventive & General Dentistry"
                description="Preventive dental care is the foundation of a healthy smile and helps reduce the risk of future dental complications."
                sectionTitle="It Offers:"
                image="/images/why-preventive.png"
                imageAlt="Preventive & General Dentistry"
                offers={[
                    {
                        label: "Comprehensive Oral Examinations:",
                        description:
                            "Early detection of dental issues before they become more serious.",
                    },
                    {
                        label: "Professional Teeth Cleaning:",
                        description:
                            "Removes plaque and tartar buildup to maintain healthy teeth and gums.",
                    },
                    {
                        label: "Cavity Prevention:",
                        description:
                            "Protects teeth from decay through preventive treatments and education.",
                    },
                    {
                        label: "Gum Health Management:",
                        description:
                            "Supports healthy gums and helps prevent periodontal disease.",
                    },
                    {
                        label: "Personalized Oral Care Guidance:",
                        description:
                            "Customized recommendations for maintaining optimal oral hygiene at home.",
                    },
                ]}
            />

            {/* {Timeline Steps } */}
            <TimelineSteps
                eyebrow="Treatment Steps"
                title="How Preventive & General Dentistry Works"
                description="Regular preventive care and professional dental treatment help maintain healthy teeth, gums, and long-term oral wellness."
                steps={[
                    {
                        title: "Dental Consultation & Assessment",
                        description:
                            "A thorough examination of your teeth, gums, bite, and overall oral health is conducted to identify any concerns.",
                    },
                    {
                        title: "Diagnosis & Preventive Planning",
                        description:
                            "Our dental team develops a personalized care plan based on your oral health needs and risk factors.",
                    },
                    {
                        title: "Professional Dental Care",
                        description:
                            "Routine treatments such as cleanings, fillings, preventive procedures, and oral health maintenance are performed as needed.",
                    },
                    {
                        title: "Follow-Up & Long-Term Maintenance",
                        description:
                            "Regular check-ups and ongoing care help maintain a healthy smile and prevent future dental problems.",
                    },
                ]}
            />
            {/* {Benefits Section} */}
            <BenefitRevealSection
                title="Who Can Benefit From Preventive & General Dentistry"
                subtitle="Preventive and general dentistry helps patients of all ages maintain healthy teeth, gums, and long-term oral health."
                sectionTitle="Ideal for individuals who"
                image="/images/who-preventive.png"
                imageAlt="Preventive & General Dentistry"
                benefits={[
                    { text: "Want to maintain healthy teeth and gums" },
                    { text: "Require routine dental check-ups and cleanings" },
                    { text: "Wish to prevent cavities and gum disease" },
                    { text: "Experience tooth sensitivity or minor dental concerns" },
                    { text: "Need early detection and management of oral health issues" },
                    { text: "Want long-term dental wellness for themselves and their families" },
                ]}
            />

            {/* {FAQ section} */}
            <FaqSection
                title="FAQs"
                description=""
                faqs={[
                    {
                        question: "How often should I visit the dentist?",
                        answer:
                            "Most patients should schedule a dental check-up and professional cleaning every six months. However, your dentist may recommend more frequent visits based on your oral health needs.",
                    },
                    {
                        question: "Are professional teeth cleanings necessary?",
                        answer:
                            "Yes. Professional cleanings remove plaque and tartar buildup that cannot be eliminated through regular brushing and flossing alone.",
                    },
                    {
                        question: "What happens during a routine dental examination?",
                        answer:
                            "Your dentist will assess your teeth, gums, bite, and overall oral health while checking for cavities, gum disease, and other dental concerns.",
                    },
                    {
                        question: "Can preventive dentistry help avoid major treatments?",
                        answer:
                            "Yes. Early detection and preventive care can significantly reduce the need for more extensive and costly dental procedures in the future.",
                    },
                    {
                        question: "Is general dentistry suitable for children and adults?",
                        answer:
                            "Absolutely. Preventive and general dentistry services are designed to support oral health for patients of all ages.",
                    },
                    {
                        question: "What can I do to maintain good oral health?",
                        answer:
                            "Brushing twice daily, flossing regularly, maintaining a balanced diet, and attending routine dental visits are essential for long-term oral health.",
                    },
                ]}
            />

        </main>
    );
}