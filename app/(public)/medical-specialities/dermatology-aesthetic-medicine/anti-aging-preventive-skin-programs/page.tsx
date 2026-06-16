"use client";
import DynamicBanner from "@/components/services/DynamicBanner";
import IntroSection from "@/components/services/IntroSection";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";


export default function AntiagingpreventiveSkinProgramsPage() {
    return (
        <main className="min-h-screen w-full overflow-x-hidden bg-white">

            {/* Banner Section */}
            <DynamicBanner
                mobileImage="/images/anti-aging-mobile.png"
                desktopImage="/images/anti-aging-desktop.png"
            />
            {/* {Intro section} */}
            <IntroSection
                title="Anti-Aging & Preventive Skin Programs"
                paragraphs={[
                    {
                        parts: [
                            {
                                text: "Maintain healthy, youthful skin with personalized ",
                            },
                            {
                                text: "Anti-Aging & Preventive Skin Programs",
                                bold: true,
                            },
                            {
                                text: " designed to protect, restore, and preserve your skin at every stage of life.",
                            },
                        ],
                    },
                    {
                        parts: [
                            {
                                text: "Our comprehensive approach combines medical expertise, advanced aesthetic treatments, and customized skincare strategies to address early signs of aging before they become more prominent. By focusing on prevention and long-term skin health, we help you achieve naturally radiant, resilient, and youthful-looking skin.",
                            },
                        ],
                    },
                    {
                        parts: [
                            {
                                text: "Whether you are noticing fine lines, loss of firmness, uneven skin tone, or simply want to maintain healthy skin for years to come, our ",
                            },
                            {
                                text: "Anti-Aging & Preventive Skin Programs",
                                bold: true,
                            },
                            {
                                text: " provide proactive solutions that support lasting skin health, confidence, and a refreshed appearance.",
                            },
                        ],
                    },
                ]}
            />
            {/* {Treatement offers} */}
            <TreatmentOffers
                eyebrow="Treatment Steps"
                title="Why Choose Anti-Aging & Preventive Skin Programs"
                description="A proactive skincare approach helps slow visible aging, maintain skin quality, and support long-term skin health."
                sectionTitle="It Offers:"
                image="/images/why-antiaging.png"
                imageAlt="Anti-Aging & Preventive Skin Programs"
                offers={[
                    {
                        label: "Early Aging Prevention:",
                        description:
                            "Addresses initial signs of aging before they become more noticeable, helping preserve youthful skin.",
                    },
                    {
                        label: "Collagen Stimulation:",
                        description:
                            "Supports natural collagen production to improve skin firmness, elasticity, and overall resilience.",
                    },
                    {
                        label: "Skin Rejuvenation:",
                        description:
                            "Enhances skin texture, hydration, and radiance for a healthier, refreshed appearance.",
                    },
                    {
                        label: "Personalized Skincare Plans:",
                        description:
                            "Customized programs designed around your skin type, concerns, goals, and lifestyle.",
                    },
                    {
                        label: "Long-Term Skin Health:",
                        description:
                            "Promotes healthier, stronger, and more resilient skin while supporting lasting results.",
                    },
                ]}
            />

            {/* {Timeline Steps } */}
            <TimelineSteps
                eyebrow="Treatment Steps"
                title="How Anti-Aging & Preventive Skin Programs Work"
                description="Our personalized anti-aging programs combine preventive care, advanced treatments, and expert guidance to support long-term skin health and youthful-looking skin."
                steps={[
                    {
                        title: "Consultation & Skin Analysis",
                        description:
                            "A detailed assessment of your skin condition, aging concerns, lifestyle factors, and long-term goals is performed.",
                    },
                    {
                        title: "Personalized Program Design",
                        description:
                            "A customized treatment and skincare plan is created to address your unique needs and future skin health goals.",
                    },
                    {
                        title: "Targeted Treatments & Skincare",
                        description:
                            "Advanced dermatological and aesthetic treatments are combined with professional skincare recommendations for optimal results.",
                    },
                    {
                        title: "Ongoing Monitoring & Maintenance",
                        description:
                            "Regular reviews and treatment adjustments help maintain results and support healthy aging over time.",
                    },
                ]}
            />
            {/* {Benefits Section} */}
            <BenefitRevealSection
                title="Who Can Benefit From Anti-Aging & Preventive Skin Programs"
                subtitle="Anti-Aging & Preventive Skin Programs are designed for individuals who want to maintain healthy, youthful skin and proactively manage the effects of aging."
                sectionTitle="Ideal for individuals who"
                image="/images/who-antiaging.png"
                imageAlt="Anti-Aging & Preventive Skin Programs"
                benefits={[
                    { text: "Want to maintain youthful, healthy-looking skin" },
                    { text: "Notice early signs of aging such as fine lines or dullness" },
                    { text: "Wish to improve skin firmness and elasticity" },
                    { text: "Want to prevent premature aging caused by environmental factors" },
                    { text: "Seek a personalized long-term skincare strategy" },
                    { text: "Desire proactive skin health management rather than corrective treatments alone" },
                ]}
            />

            {/* {FAQ section} */}
            <FaqSection
                title="FAQs"
                description=""
                faqs={[
                    {
                        question: "When should I start an Anti-Aging Program?",
                        answer:
                            "Preventive skincare can begin as early as your twenties and thirties. Starting early helps maintain skin quality and delay visible signs of aging.",
                    },
                    {
                        question: "Are these programs suitable for all skin types?",
                        answer:
                            "Yes. Each program is customized based on your skin type, age, concerns, and individual goals.",
                    },
                    {
                        question: "What treatments may be included?",
                        answer:
                            "Programs may include professional skincare treatments, collagen-stimulating procedures, skin rejuvenation therapies, and personalized home-care recommendations.",
                    },
                    {
                        question: "How soon will I see results?",
                        answer:
                            "Many individuals notice improvements in skin texture, hydration, and radiance within a few weeks, while long-term benefits develop gradually with continued care.",
                    },
                    {
                        question: "How often will I need treatments?",
                        answer:
                            "The frequency depends on your skin condition, age, and treatment plan. Your specialist will recommend a schedule tailored to your needs.",
                    },
                    {
                        question: "Can preventive treatments replace surgical procedures?",
                        answer:
                            "Preventive programs can significantly delay and reduce visible signs of aging, helping many individuals maintain youthful skin without invasive procedures for longer periods.",
                    },
                ]}
            />

        </main>
    );
}