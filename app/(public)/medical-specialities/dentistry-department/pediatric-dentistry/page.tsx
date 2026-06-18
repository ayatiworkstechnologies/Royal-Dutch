"use client";
import DynamicBanner from "@/components/services/DynamicBanner";
import IntroSection from "@/components/services/IntroSection";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";


export default function PediatricDentistryPage() {
    return (
        <main className="min-h-screen w-full overflow-x-hidden bg-white">
            {/* Banner Section */}
            <DynamicBanner
                mobileImage="/images/pediatric-dentistry-mobile.png"
                desktopImage="/images/pediatric-dentistry-desktop-1.png"
            />
            {/* {Intro section} */}
            <IntroSection
                title="Pediatric dentistry"
                paragraphs={[
                    {
                        parts: [
                            {
                                text: "Healthy smiles begin early, and ",
                            },
                            {
                                text: "Pediatric Dentistry",
                                bold: true,
                            },
                            {
                                text: " focuses on providing specialized dental care for infants, children, and adolescents in a safe, comfortable, and child-friendly environment.",
                            },
                        ],
                    },
                    {
                        parts: [
                            {
                                text: "Our approach emphasizes preventive care, early diagnosis, and age-appropriate treatments that support healthy oral development while helping children build positive dental habits for life. From routine check-ups to restorative care, we are committed to protecting your child's smile at every stage of growth.",
                            },
                        ],
                    },
                ]}
            />
            {/* {Treatement offers} */}
            <TreatmentOffers
                eyebrow="Treatment Benefits"
                title="Why Choose Pediatric Dentistry"
                description="Early dental care plays a vital role in maintaining healthy teeth, gums, and proper oral development."
                sectionTitle="It Offers:"
                image="/images/why-pediatric-dentistry.png"
                imageAlt="Pediatric Dentistry"
                offers={[
                    {
                        label: "Preventive Oral Care:",
                        description:
                            "Helps protect children's teeth from cavities and common dental diseases.",
                    },
                    {
                        label: "Early Detection:",
                        description:
                            "Identifies potential dental concerns before they become more serious.",
                    },
                    {
                        label: "Growth Monitoring:",
                        description:
                            "Tracks tooth eruption, jaw development, and bite alignment.",
                    },
                    {
                        label: "Child-Friendly Care:",
                        description:
                            "Provides a comfortable and positive dental experience for young patients.",
                    },
                    {
                        label: "Oral Health Education:",
                        description:
                            "Encourages healthy brushing, flossing, and dietary habits from an early age.",
                    },
                ]}
            />

            {/* {Timeline Steps } */}
            <TimelineSteps
                eyebrow="Treatment Steps"
                title="How Pediatric Dentistry Works"
                description="Comprehensive dental care designed to support healthy oral development throughout childhood."
                steps={[
                    {
                        title: "Child Dental Assessment",
                        description:
                            "A thorough examination evaluates your child's teeth, gums, oral development, and overall dental health.",
                    },
                    {
                        title: "Preventive Care Planning",
                        description:
                            "Personalized recommendations are provided based on age, oral health needs, and risk factors.",
                    },
                    {
                        title: "Gentle Dental Treatment",
                        description:
                            "Preventive and restorative procedures are performed using child-friendly techniques focused on comfort and safety.",
                    },
                    {
                        title: "Ongoing Monitoring",
                        description:
                            "Regular dental visits help track oral development and reinforce healthy dental habits as your child grows.",
                    },
                ]}
            />
            {/* {Benefits Section} */}
            <BenefitRevealSection
                title="Who Can Benefit From Pediatric Dentistry"
                subtitle="Pediatric dentistry supports healthy oral development from infancy through adolescence."
                sectionTitle="Ideal for:"
                image="/images/who-pediatric-dentistry.png"
                imageAlt="Pediatric Dentistry"
                benefits={[
                    { text: "Infants and toddlers beginning their oral health journey" },
                    { text: "Children requiring routine dental examinations and preventive care" },
                    { text: "Young patients with cavities or dental concerns" },
                    { text: "Children undergoing tooth eruption and jaw development" },
                    { text: "Parents seeking guidance on oral hygiene and nutrition" },
                    { text: "Adolescents requiring ongoing dental care and monitoring" },
                ]}
            />

            {/* {FAQ section} */}
            <FaqSection
                title="FAQs"
                description="Find answers to common questions about pediatric dental care and oral health for children."
                faqs={[
                    {
                        question: "When should my child first visit a dentist?",
                        answer:
                            "It is recommended that children have their first dental visit by their first birthday or within six months of their first tooth erupting.",
                    },
                    {
                        question: "How often should children have dental check-ups?",
                        answer:
                            "Most children should visit the dentist every six months for routine examinations and professional cleanings.",
                    },
                    {
                        question: "Why are baby teeth important?",
                        answer:
                            "Baby teeth help with chewing, speech development, and maintaining space for permanent teeth. Keeping them healthy is essential for proper oral development.",
                    },
                    {
                        question: "How can I help prevent cavities in my child?",
                        answer:
                            "Regular brushing, flossing, a balanced diet, limiting sugary snacks, and routine dental visits can significantly reduce the risk of cavities.",
                    },
                    {
                        question: "Are pediatric dental treatments safe?",
                        answer:
                            "Yes. Pediatric dental treatments are specifically designed to be safe, effective, and appropriate for children's developing teeth and oral structures.",
                    },
                    {
                        question: "What if my child is afraid of the dentist?",
                        answer:
                            "Our child-friendly approach focuses on creating a comfortable and positive experience through gentle care, clear communication, and a welcoming environment that helps children feel at ease.",
                    },
                ]}
            />

        </main>
    );
}