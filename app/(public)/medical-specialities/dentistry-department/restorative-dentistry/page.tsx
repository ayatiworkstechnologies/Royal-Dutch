"use client";
import DynamicBanner from "@/components/services/DynamicBanner";
import IntroSection from "@/components/services/IntroSection";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";


export default function RestorativeDentistryPage() {
    return (
        <main className="min-h-screen w-full overflow-x-hidden bg-white">
            {/* Banner Section */}
            <DynamicBanner
                mobileImage="/images/restorative-dentistry-mobile.png"
                desktopImage="/images/restorative-dentistry-desktop.png"
            />
            {/* {Intro section} */}
            <IntroSection
                title="Restorative Dentistry"
                paragraphs={[
                    {
                        parts: [
                            {
                                text: "Restore the health, function, and appearance of your smile with comprehensive ",
                            },
                            {
                                text: "Restorative Dentistry",
                                bold: true,
                            },
                            {
                                text: " solutions. Our treatments are designed to repair damaged teeth, replace missing teeth, and rebuild oral function while maintaining a natural and aesthetically pleasing appearance.",
                            },
                        ],
                    },
                    {
                        parts: [
                            {
                                text: "Whether you are dealing with tooth decay, fractures, worn teeth, or tooth loss, our restorative dental services help improve chewing ability, speech, comfort, and overall oral health.",
                            },
                        ],
                    },
                    {
                        parts: [
                            {
                                text: "Using advanced materials and modern techniques, we provide durable and personalized solutions tailored to your individual needs while preserving long-term dental wellness and functionality.",
                            },
                        ],
                    },
                ]}
            />

            {/* {Treatement offers} */}
            <TreatmentOffers
                eyebrow="Treatment Benefits"
                title="Why Choose Restorative Dentistry"
                description="Restorative dentistry focuses on repairing and replacing damaged teeth to improve both oral health and quality of life."
                sectionTitle="It Offers:"
                image="/images/why-restorative-dentistry.png"
                imageAlt="Restorative Dentistry"
                offers={[
                    {
                        label: "Tooth Repair & Reconstruction:",
                        description:
                            "Restores damaged, fractured, or decayed teeth to optimal function.",
                    },
                    {
                        label: "Replacement Of Missing Teeth:",
                        description:
                            "Provides solutions that improve appearance, comfort, and chewing efficiency.",
                    },
                    {
                        label: "Improved Oral Function:",
                        description:
                            "Enhances biting, chewing, and speaking capabilities.",
                    },
                    {
                        label: "Natural-Looking Restorations:",
                        description:
                            "Modern materials are designed to blend seamlessly with natural teeth.",
                    },
                    {
                        label: "Long-Term Dental Health:",
                        description:
                            "Prevents further complications and supports overall oral wellness.",
                    },
                ]}
            />


            {/* {Timeline Steps } */}
            <TimelineSteps
                eyebrow="Treatment Steps"
                title="How Restorative Dentistry Works"
                description="A personalized restorative approach designed to repair damaged teeth, replace missing teeth, and restore oral health."
                steps={[
                    {
                        title: "Consultation & Oral Assessment",
                        description:
                            "A comprehensive evaluation of your teeth, gums, bite, and oral health is performed to identify restorative needs.",
                    },
                    {
                        title: "Diagnosis & Treatment Planning",
                        description:
                            "A personalized treatment plan is created based on the extent of tooth damage, tooth loss, and functional requirements.",
                    },
                    {
                        title: "Restorative Procedures",
                        description:
                            "Appropriate restorative treatments are performed to repair, strengthen, or replace affected teeth while restoring function and aesthetics.",
                    },
                    {
                        title: "Follow-Up & Maintenance",
                        description:
                            "Regular reviews and preventive care help maintain the longevity and performance of your restorations.",
                    },
                ]}
            />

            {/* {Benefits Section} */}
            <BenefitRevealSection
                title="Who Can Benefit From Restorative Dentistry"
                subtitle="Restorative dentistry helps rebuild oral health, function, and confidence through customized dental solutions."
                sectionTitle="Ideal for individuals who"
                image="/images/who-restorative-dentistry.png"
                imageAlt="Restorative Dentistry"
                benefits={[
                    { text: "Have decayed, damaged, or fractured teeth" },
                    { text: "Experience missing teeth or tooth loss" },
                    { text: "Want to improve chewing and speaking function" },
                    { text: "Need replacement of old or worn dental restorations" },
                    { text: "Wish to restore the appearance and health of their smile" },
                    { text: "Seek long-term solutions for dental damage and tooth replacement" },
                ]}
            />

            {/* {FAQ section} */}
            <FaqSection
                title="FAQs"
                description=""
                faqs={[
                    {
                        question: "What is Restorative Dentistry?",
                        answer:
                            "Restorative dentistry focuses on repairing damaged teeth and replacing missing teeth to restore oral function, health, and appearance.",
                    },
                    {
                        question: "What types of treatments are included?",
                        answer:
                            "Depending on your needs, restorative dentistry may include fillings, crowns, bridges, inlays, onlays, dentures, dental implants, and other tooth restoration procedures.",
                    },
                    {
                        question: "Can restorative dentistry improve appearance as well as function?",
                        answer:
                            "Yes. Modern restorative treatments are designed to restore both the aesthetics and functionality of your smile.",
                    },
                    {
                        question: "How long do dental restorations last?",
                        answer:
                            "The lifespan of restorations varies depending on the treatment, oral hygiene practices, and regular dental care. Many restorations can last for several years with proper maintenance.",
                    },
                    {
                        question: "Is restorative dentistry painful?",
                        answer:
                            "Most restorative procedures are performed using modern techniques and anesthesia to ensure patient comfort throughout treatment.",
                    },
                    {
                        question: "How can I maintain my restorations?",
                        answer:
                            "Good oral hygiene, routine dental check-ups, and following your dentist's recommendations are essential for maintaining long-lasting results.",
                    },
                ]}
            />

        </main>
    );
}