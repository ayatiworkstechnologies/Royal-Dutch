"use client";
import DynamicBanner from "@/components/services/DynamicBanner";
import IntroSection from "@/components/services/IntroSection";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";


export default function HomebasedPhysiotherapyProgramsPage() {
    return (
        <main className="min-h-screen w-full overflow-x-hidden bg-white">
            {/* Banner Section */}
            <DynamicBanner
                mobileImage="/images/home-based-physiotherapy-programs-mobile.png"
                desktopImage="/images/home-based-physiotherapy-programs-desktop.png"
            />
            {/* {Intro section} */}
            <IntroSection
                title="Home-Based Physiotherapy Programs"
                paragraphs={[
                    {
                        parts: [
                            {
                                text: "Receive professional rehabilitation care in the comfort of your own home with ",
                            },
                            {
                                text: "Home-Based Physiotherapy Programs",
                                bold: true,
                            },
                            {
                                text: ". These personalized services are designed for individuals who require physiotherapy support but may have difficulty visiting a clinic due to mobility limitations, recovery needs, or convenience.",
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
                                text: ", our home physiotherapy programs provide expert assessment, targeted treatment, and continuous recovery support, helping patients improve mobility, regain independence, and achieve better health outcomes from the comfort of their homes.",
                            },
                        ],
                    },
                ]}
            />
            {/* {Treatement offers} */}
            <TreatmentOffers
                eyebrow="Program Benefits"
                title="Why Choose Home-Based Physiotherapy Programs"
                description="Home physiotherapy combines professional rehabilitation with the convenience and comfort of receiving care in your own environment."
                sectionTitle="It Offers:"
                image="/images/why-home-based.png"
                imageAlt="Home-Based Physiotherapy"
                offers={[
                    {
                        label: "Convenient Home Care:",
                        description:
                            "Receive expert physiotherapy treatment without the need to travel.",
                    },
                    {
                        label: "Personalized Treatment:",
                        description:
                            "Programs are tailored to your condition, mobility level, and recovery goals.",
                    },
                    {
                        label: "Enhanced Comfort:",
                        description:
                            "Recover in a familiar environment that supports confidence and well-being.",
                    },
                    {
                        label: "Improved Mobility:",
                        description:
                            "Helps restore strength, balance, movement, and daily function.",
                    },
                    {
                        label: "Ongoing Progress Monitoring:",
                        description:
                            "Regular assessments ensure optimal recovery and long-term results.",
                    },
                ]}
            />

            {/* {Timeline Steps } */}
            <TimelineSteps
                eyebrow="Treatment Process"
                title="How Home-Based Physiotherapy Works"
                description="Our structured home physiotherapy program delivers professional rehabilitation directly to your doorstep."
                steps={[
                    {
                        title: "Initial Assessment",
                        description:
                            "A physiotherapist evaluates your condition, mobility, medical history, and rehabilitation needs.",
                    },
                    {
                        title: "Personalized Care Plan",
                        description:
                            "A customized treatment program is developed based on your health goals and recovery requirements.",
                    },
                    {
                        title: "Home Therapy Sessions",
                        description:
                            "Scheduled visits include therapeutic exercises, mobility training, pain management, and rehabilitation techniques.",
                    },
                    {
                        title: "Progress Monitoring",
                        description:
                            "Recovery is tracked regularly and treatment plans are adjusted to maximize outcomes.",
                    },
                ]}
            />
            {/* {Benefits Section} */}
            <BenefitRevealSection
                title="Who Can Benefit From Home-Based Physiotherapy Programs"
                subtitle="Home physiotherapy is suitable for individuals who require rehabilitation, mobility support, or ongoing physiotherapy care."
                sectionTitle="It's ideal for those who"
                image="/images/who-home-based.png"
                imageAlt="Home-Based Physiotherapy"
                benefits={[
                    { text: "Have difficulty traveling to a clinic" },
                    { text: "Are recovering from surgery or hospitalization" },
                    { text: "Need rehabilitation after injury or illness" },
                    { text: "Require neurological or orthopedic physiotherapy" },
                    { text: "Experience chronic pain or mobility challenges" },
                    { text: "Prefer treatment in a comfortable home environment" },
                ]}
            />

            {/* {FAQ section} */}
            <FaqSection
                title="FAQs"
                description=""
                faqs={[
                    {
                        question: "What conditions can be treated through home-based physiotherapy?",
                        answer:
                            "Home physiotherapy can help manage post-surgical recovery, musculoskeletal pain, neurological conditions, mobility limitations, arthritis, and injury rehabilitation.",
                    },
                    {
                        question: "Is home physiotherapy as effective as clinic-based treatment?",
                        answer:
                            "Yes. Home-based physiotherapy can be highly effective when delivered through a personalized treatment plan by qualified physiotherapists.",
                    },
                    {
                        question: "How often will the physiotherapist visit?",
                        answer:
                            "The frequency of visits depends on your condition, rehabilitation goals, and treatment requirements determined during the assessment.",
                    },
                    {
                        question: "Do I need special equipment at home?",
                        answer:
                            "Most sessions use simple exercises and available household space. If additional equipment is needed, your physiotherapist will provide recommendations.",
                    },
                    {
                        question: "Can elderly patients benefit from home physiotherapy?",
                        answer:
                            "Absolutely. Home physiotherapy is particularly beneficial for older adults who require mobility support, rehabilitation, or fall-prevention programs.",
                    },
                    {
                        question: "How is recovery progress monitored?",
                        answer:
                            "Your physiotherapist regularly evaluates strength, mobility, pain levels, and functional abilities to ensure continuous improvement and adjust treatment when necessary.",
                    },
                ]}
            />

        </main>
    );
}