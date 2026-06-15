import Link from "next/link";

const treatments = [
  {
    title: "Diagnosis and Treatment of Acute Conditions",
    description:
      "Prompt medical consultation and treatment for sudden health concerns such as fever, infections, respiratory symptoms, stomach issues, allergies, and minor illnesses.",
    href: "/medical-specialities/general-medicine/diagnosis-treatment-acute-conditions",
  },
  {
    title: "Chronic Disease Management",
    description:
      "Ongoing care and monitoring for long-term health conditions such as diabetes, hypertension, asthma, thyroid disorders, and lifestyle-related concerns.",
    href: "/medical-specialities/general-medicine/chronic-disease-management",
  },
  {
    title: "Preventive Health Screenings and Check-ups",
    description:
      "Routine health assessments, preventive screenings, blood tests, and check-ups designed to identify risks early and support long-term wellness.",
    href: "/medical-specialities/general-medicine/preventive-health-screenings-checkups",
  },
  {
    title: "Family Medicine and Wellness Care",
    description:
      "Comprehensive primary care for individuals and families, focused on everyday health needs, wellness guidance, and continuity of care.",
    href: "/medical-specialities/general-medicine/family-medicine-wellness-care",
  },
];

export default function GeneralMedicinePage() {
  return (
    <main className="min-h-screen bg-white pt-[110px]">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-secondary text-[12px] font-semibold uppercase tracking-[4px] text-[#8b1d72]">
            Medical Specialities
          </p>

          <h1 className="mt-5 font-primary text-[28px] font-medium uppercase leading-[1.25] tracking-[5px] text-black sm:text-[36px] md:text-[44px]">
            General Medicine
          </h1>

          <p className="mt-6 font-secondary text-[15px] leading-[1.8] tracking-[1.2px] text-[#777]">
            Comprehensive general medical care focused on accurate diagnosis,
            preventive wellness, chronic condition support, and continuous
            health guidance for individuals and families.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {treatments.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group border border-[#eadfd8] bg-[#fffdfb] p-7 transition duration-300 hover:border-[#8b1d72]/30 hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)]"
            >
              <h2 className="font-primary text-[20px] font-medium uppercase leading-[1.4] tracking-[3px] text-black transition group-hover:text-[#8b1d72]">
                {item.title}
              </h2>

              <p className="mt-4 font-secondary text-[14px] leading-[1.8] tracking-[1px] text-[#777]">
                {item.description}
              </p>

              <span className="mt-6 inline-block font-secondary text-[12px] font-semibold uppercase tracking-[3px] text-[#b765a2]">
                Explore Treatment
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}