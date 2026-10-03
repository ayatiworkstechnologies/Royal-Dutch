"use client";

import DynamicBanner from "@/components/services/DynamicBanner";
import TimelineSteps from "@/components/services/TimelineSteps";
import TreatmentOffers from "@/components/services/TreatmentOffers";
import BenefitRevealSection from "@/components/services/BenefitRevealSection";
import FaqSection from "@/components/services/FaqSection";
import ServiceMain from "@/components/services/ServiceMain";

export default function FacialTreatmentsPage() {
    return (
        <main className="min-h-screen w-full overflow-x-hidden bg-white">
            {/* =====================================================
          BANNER
      ====================================================== */}
            <DynamicBanner
                mobileImage="/images/facial-treatments-mobile-01.png"
                desktopImage="/images/facial-treatments-desktop-01.png"
            />

            {/* =====================================================
          ABOUT THE TREATMENT + PRICE GRID
      ====================================================== */}
            <ServiceMain
                title="Facial Treatments"
                description="Healthy, radiant skin begins with professional care tailored to its individual needs. Our Facial Treatments combine cleansing, exfoliation, hydration, nourishment, and targeted skincare to refresh and maintain your complexion. Each treatment begins with a skin assessment, allowing our specialists to select suitable products and techniques for your skin type, sensitivity, and concerns. Whether you need routine maintenance, intensive hydration, brightening care, or acne support, we provide a personalized facial experience with minimal downtime."
                priceListTitle="Facial Treatments & Prices"
                priceListItems={[
                    {
                        title: "Classic Facial",
                        price: 150,
                        currency: "AED",
                        buttonHref:
                            "/services/aesthetic-skin-care/facial-treatments/classic-facial",
                    },
                    {
                        title: "HydraFacial",
                        price: 250,
                        currency: "AED",
                        buttonHref:
                            "/services/aesthetic-skin-care/facial-treatments/hydrafacial",
                    },
                    {
                        title: "Vitamin C HydraFacial",
                        price: 250,
                        currency: "AED",
                        buttonHref:
                            "/services/aesthetic-skin-care/facial-treatments/vitamin-c-hydrafacial",
                    },
                    {
                        title: "Acne Control Facial",
                        price: 300,
                        currency: "AED",
                        buttonHref:
                            "/services/aesthetic-skin-care/facial-treatments/acne-control-facial",
                    },
                ]}
                rating={4.9}
                reviews={350} 
                price={150}
                currency="AED"
                priceLabel="Starting Price"
                buttonText="Book Now"
                buttonHref="/services/aesthetic-skin-care/facial-treatments"
            />

            {/* =====================================================
          WHY CHOOSE OUR FACIAL TREATMENTS
      ====================================================== */}
            <TreatmentOffers
                eyebrow="Treatment Benefits"
                title="Why Choose Our Facial Treatments"
                description="Unlike a basic home skincare routine, our professional facial treatments provide deeper cleansing and personalized care based on your skin’s condition."
                sectionTitle="It Offers:"
                image="/images/why-choose-facial-treatments.png"
                imageAlt="Facial Treatment Benefits"
                offers={[
                    {
                        label: "Personalized Skin Assessment:",
                        description:
                            "Identifies your skin type, hydration level, sensitivity, and primary concerns.",
                    },
                    {
                        label: "Deep Cleansing:",
                        description:
                            "Removes excess oil, makeup residue, accumulated dirt, and surface impurities.",
                    },
                    {
                        label: "Gentle Exfoliation:",
                        description:
                            "Eliminates dead surface cells to support smoother, softer, and brighter-looking skin.",
                    },
                    {
                        label: "Targeted Skincare:",
                        description:
                            "Treatment products are selected to address concerns such as dullness, dehydration, congestion, and acne-prone skin.",
                    },
                    {
                        label: "Hydration And Nourishment:",
                        description:
                            "Replenishes essential moisture and leaves the complexion feeling refreshed, balanced, and comfortable.",
                    },
                ]}
            />

            {/* =====================================================
          HOW OUR FACIAL TREATMENTS WORK
      ====================================================== */}
            <TimelineSteps
                eyebrow="Treatment Steps"
                title="How Our Facial Treatments Work"
                description="Our specialists customize every stage of your facial according to your skin type, condition, and desired results."
                steps={[
                    {
                        title: "Consultation And Skin Analysis",
                        description:
                            "Your skin type, sensitivity, current concerns, skincare routine, and treatment goals are carefully evaluated.",
                    },
                    {
                        title: "Cleansing And Exfoliation",
                        description:
                            "The skin is deeply cleansed before gentle exfoliation removes dead cells, excess oil, and surface buildup.",
                    },
                    {
                        title: "Targeted Facial Care",
                        description:
                            "Depending on the selected facial, treatment may include pore extraction, HydraFacial technology, Vitamin C infusion, acne-control products, or facial massage.",
                    },
                    {
                        title: "Mask, Hydration And Protection",
                        description:
                            "A customized mask and moisturizer are applied to nourish the skin, followed by sunscreen to protect the refreshed complexion.",
                    },
                ]}
            />

            {/* =====================================================
          WHO CAN BENEFIT
      ====================================================== */}
            <BenefitRevealSection
                title="Who Can Benefit From Our Facial Treatments"
                subtitle="Personalized facial care is suitable for anyone seeking cleaner, smoother, better-hydrated, and more radiant-looking skin."
                sectionTitle="It’s Ideal For Those Who:"
                image="/images/who-can-benefit-facial-treatments.png"
                imageAlt="Who Can Benefit From Facial Treatments"
                benefits={[
                    {
                        text: "Want regular professional skin maintenance",
                    },
                    {
                        text: "Experience dull, tired, or uneven-looking skin",
                    },
                    {
                        text: "Have dry, dehydrated, or rough-feeling skin",
                    },
                    {
                        text: "Experience excess oil, blackheads, or congested pores",
                    },
                    {
                        text: "Have mild breakouts or acne-prone skin",
                    },
                    {
                        text: "Want refreshed skin before an event or special occasion",
                    },
                ]}
            />

            {/* =====================================================
          FAQ
      ====================================================== */}
            <FaqSection
                title="FAQs"
                description=""
                faqs={[
                    {
                        question: "Which Facial Treatment Is Right For Me?",
                        answer:
                            "The best option depends on your skin type and concerns. A skin assessment helps determine whether you need a Classic Facial, HydraFacial, Vitamin C HydraFacial, or Acne Control Facial.",
                    },
                    {
                        question: "How Long Does A Facial Treatment Take?",
                        answer:
                            "Most facial treatments take approximately 45 to 60 minutes, depending on the selected service and customized treatment steps.",
                    },
                    {
                        question: "When Can I See The Results?",
                        answer:
                            "Your skin may feel cleaner, softer, smoother, and more hydrated immediately after treatment. Results vary depending on the facial and your skin condition.",
                    },
                    {
                        question: "Is There Any Downtime?",
                        answer:
                            "Most facial treatments involve little to no downtime. Mild temporary redness or sensitivity may occur after exfoliation or extraction.",
                    },
                    {
                        question: "How Often Should I Get A Facial?",
                        answer:
                            "For regular skin maintenance, a facial may be recommended every four to six weeks. Your specialist can suggest a suitable schedule based on your skin’s needs.",
                    },
                ]}
            />
        </main>
    );
}