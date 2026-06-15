import Link from "next/link";

const treatments = [
  {
    title: "Preventive and General Dentistry",
    description:
      "Comprehensive dental check-ups, oral hygiene guidance, scaling, polishing, fillings, and routine care to maintain long-term oral health.",
    href: "/medical-specialities/dentistry-department/preventive-general-dentistry",
  },
  {
    title: "Cosmetic Smile Design and Rehabilitation",
    description:
      "Personalized smile enhancement solutions focused on improving tooth shape, alignment, color, and overall smile harmony.",
    href: "/medical-specialities/dentistry-department/cosmetic-smile-design-rehabilitation",
  },
  {
    title: "Restorative Dentistry",
    description:
      "Advanced restorative treatments including crowns, bridges, implants, and tooth reconstruction to restore function and aesthetics.",
    href: "/medical-specialities/dentistry-department/restorative-dentistry",
  },
  {
    title: "Pediatric Dentistry",
    description:
      "Gentle dental care for children, including preventive treatments, oral health education, cavity care, and child-friendly dental visits.",
    href: "/medical-specialities/dentistry-department/pediatric-dentistry",
  },
];

export default function DentistryDepartmentPage() {
  return (
    <main className="min-h-screen bg-white pt-[110px]">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-secondary text-[12px] font-semibold uppercase tracking-[4px] text-[#8b1d72]">
            Medical Specialities
          </p>

          <h1 className="mt-5 font-primary text-[28px] font-medium uppercase leading-[1.25] tracking-[5px] text-black sm:text-[36px] md:text-[44px]">
            Dentistry Department
          </h1>

          <p className="mt-6 font-secondary text-[15px] leading-[1.8] tracking-[1.2px] text-[#777]">
            Complete dental care designed to support oral health, restore
            confident smiles, and deliver comfortable treatment experiences for
            every age group.
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