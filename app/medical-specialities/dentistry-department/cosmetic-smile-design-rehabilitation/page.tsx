"use client";
import DynamicBanner from "@/components/services/DynamicBanner";
import IntroSection from "@/components/services/IntroSection";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";


export default function CosmeticSmileDesignRehabilitationPage() {
    return (
        <main className="min-h-screen w-full overflow-x-hidden bg-white">
            {/* Banner Section */}
            <DynamicBanner
                mobileImage="/images/medical-dermatology-desktop-mobile.png"
                desktopImage="/images/medical-dermatology-desktop-banner.png"
            />
            {/* {Intro section} */}
            <IntroSection
                title="Cosmetic Smile Design & Rehabilitation"
                paragraphs={[
                    {
                        parts: [
                            {
                                text: "Transform your smile with advanced ",
                            },
                            {
                                text: "Cosmetic Smile Design & Rehabilitation",
                                bold: true,
                            },
                            {
                                text: " solutions that enhance both aesthetics and functionality. Our personalized approach combines artistry, precision, and modern dental technology to create naturally beautiful smiles that complement your facial features.",
                            },
                        ],
                    },
                    {
                        parts: [
                            {
                                text: "Whether you are looking to improve the appearance of discolored, chipped, misaligned, worn, or missing teeth, our smile rehabilitation treatments are designed to restore confidence while improving oral health and function.",
                            },
                        ],
                    },
                    {
                        parts: [
                            {
                                text: "From subtle cosmetic enhancements to comprehensive smile makeovers, we create customized treatment plans that help you achieve a balanced, healthy, and radiant smile.",
                            },
                        ],
                    },
                ]}
            />
            {/* {Treatement offers} */}
            <TreatmentOffers
                eyebrow="Treatment Benefits"
                title="Why Choose Cosmetic Smile Design & Rehabilitation"
                description="A beautiful smile can significantly improve confidence, appearance, and overall quality of life."
                sectionTitle="It Offers:"
                image="/images/why-choose-cosmetic.png"
                imageAlt="Cosmetic Smile Design & Rehabilitation"
                offers={[
                    {
                        label: "Personalized Smile Makeovers:",
                        description:
                            "Customized treatment plans designed around your facial aesthetics and dental needs.",
                    },
                    {
                        label: "Enhanced Smile Aesthetics:",
                        description:
                            "Improves tooth shape, size, color, alignment, and overall smile harmony.",
                    },
                    {
                        label: "Restoration Of Function:",
                        description:
                            "Addresses worn, damaged, or missing teeth to improve chewing and speaking ability.",
                    },
                    {
                        label: "Natural-Looking Results:",
                        description:
                            "Advanced techniques ensure seamless, aesthetically pleasing outcomes.",
                    },
                    {
                        label: "Long-Term Oral Health Benefits:",
                        description:
                            "Combines cosmetic improvements with functional dental rehabilitation.",
                    },
                ]}
            />

            {/* {Timeline Steps } */}
            <TimelineSteps
                eyebrow="Treatment Steps"
                title="How Cosmetic Smile Design & Rehabilitation Works"
                description="A customized smile makeover process designed to improve both dental aesthetics and oral function."
                steps={[
                    {
                        title: "Consultation & Smile Assessment",
                        description:
                            "A comprehensive evaluation of your teeth, gums, facial features, and smile goals is conducted to understand your needs.",
                    },
                    {
                        title: "Digital Smile Planning",
                        description:
                            "Advanced diagnostic tools and smile analysis techniques are used to design a personalized treatment plan.",
                    },
                    {
                        title: "Customized Treatment",
                        description:
                            "A combination of cosmetic and restorative procedures may be performed to enhance both appearance and function.",
                    },
                    {
                        title: "Final Refinement & Maintenance",
                        description:
                            "Your new smile is carefully evaluated, and personalized care recommendations are provided to maintain long-term results.",
                    },
                ]}
            />
            {/* {Benefits Section} */}
            <BenefitRevealSection
                title="Who Can Benefit From Cosmetic Smile Design & Rehabilitation"
                subtitle="Cosmetic smile rehabilitation is ideal for individuals seeking to enhance the appearance, function, and overall health of their smile."
                sectionTitle="Ideal for individuals who"
                image="/images/who-choose-cosmetic.png"
                imageAlt="Cosmetic Smile Design & Rehabilitation"
                benefits={[
                    { text: "Want a brighter, more attractive smile" },
                    { text: "Have stained, chipped, cracked, or worn teeth" },
                    { text: "Experience gaps or minor alignment concerns" },
                    { text: "Need restoration of damaged or missing teeth" },
                    { text: "Wish to improve smile symmetry and facial harmony" },
                    { text: "Seek a comprehensive smile makeover solution" },
                ]}
            />

            {/* {FAQ section} */}
            <FaqSection
                title="FAQs"
                description="Find answers to common questions about cosmetic smile design, smile makeovers, and dental rehabilitation."
                faqs={[
                    {
                        question: "What is Smile Design?",
                        answer:
                            "Smile Design is a customized dental approach that combines aesthetic and restorative treatments to improve the appearance, balance, and functionality of your smile.",
                    },
                    {
                        question: "What treatments may be included?",
                        answer:
                            "Depending on individual needs, treatments may include teeth whitening, veneers, crowns, bridges, dental implants, orthodontics, and other restorative procedures.",
                    },
                    {
                        question: "How long does a smile rehabilitation take?",
                        answer:
                            "The duration varies based on the complexity of the treatment plan. Some procedures can be completed in a few visits, while comprehensive rehabilitations may require multiple appointments.",
                    },
                    {
                        question: "Will my new smile look natural?",
                        answer:
                            "Yes. Every treatment is carefully planned to complement your facial features, ensuring a natural and harmonious appearance.",
                    },
                    {
                        question: "Is smile design only cosmetic?",
                        answer:
                            "No. In addition to improving aesthetics, smile rehabilitation can restore dental function, oral health, and overall comfort.",
                    },
                    {
                        question: "How long do the results last?",
                        answer:
                            "With proper oral hygiene, regular dental check-ups, and good maintenance habits, the results can remain beautiful and functional for many years.",
                    },
                ]}
            />

        </main>
    );
}