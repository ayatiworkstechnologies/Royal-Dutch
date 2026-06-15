import Link from "next/link";

const services = [
  {
    title: "Seamless Coordination Between Departments",
    description:
      "A connected care approach where doctors, nurses, therapists, and support teams coordinate across departments to ensure smooth treatment planning and patient care.",
    href: "/care-services/integrated-care-model/seamless-coordination-between-departments",
  },
  {
    title: "Continuity of Care From Consultation to Recovery",
    description:
      "End-to-end care support from the first consultation through treatment, follow-up, recovery, and long-term health monitoring.",
    href: "/care-services/integrated-care-model/continuity-of-care",
  },
  {
    title: "Personalized Treatment Pathways",
    description:
      "Tailored care pathways designed around each patient’s condition, lifestyle, medical needs, recovery goals, and wellness expectations.",
    href: "/care-services/integrated-care-model/personalized-treatment-pathways",
  },
  {
    title: "Improved Clinical Outcomes and Patient Satisfaction",
    description:
      "A patient-centered system focused on better coordination, timely intervention, clear communication, and measurable improvements in care experience.",
    href: "/care-services/integrated-care-model/improved-clinical-outcomes",
  },
];

export default function IntegratedCareModelPage() {
  return (
    <main className="min-h-screen bg-white pt-[110px]">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-secondary text-[12px] font-semibold uppercase tracking-[4px] text-[#8b1d72]">
            Care Services
          </p>

          <h1 className="mt-5 font-primary text-[28px] font-medium uppercase leading-[1.25] tracking-[5px] text-black sm:text-[36px] md:text-[44px]">
            Integrated Care Model
          </h1>

          <p className="mt-6 font-secondary text-[15px] leading-[1.8] tracking-[1.2px] text-[#777]">
            A coordinated healthcare model designed to connect consultation,
            diagnosis, treatment, recovery, and follow-up care through one
            seamless patient-focused experience.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((item) => (
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
                Explore Service
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}