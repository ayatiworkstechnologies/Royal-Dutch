import Link from "next/link";

const specialities = [
  {
    title: "Dermatology & Aesthetic Medicine",
    description:
      "Advanced dermatology and aesthetic treatments focused on skin health, confidence, and long-lasting results.",
    href: "/medical-specialities/dermatology-aesthetic-medicine",
  },
  {
    title: "Dentistry Department",
    description:
      "Comprehensive dental care including preventive, cosmetic, restorative, and pediatric dentistry.",
    href: "/medical-specialities/dentistry-department",
  },
  {
    title: "General Medicine (GP Services)",
    description:
      "Primary medical care for acute conditions, chronic disease management, screenings, and wellness.",
    href: "/medical-specialities/general-medicine",
  },
  {
    title: "Physiotherapy & Rehabilitation",
    description:
      "Rehabilitation and therapy programs for pain management, recovery, mobility, and wellness.",
    href: "/medical-specialities/physiotherapy-rehabilitation",
  },
];

export default function MedicalSpecialitiesPage() {
  return (
    <main className="min-h-screen bg-white pt-[110px]">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-secondary text-[12px] font-semibold uppercase tracking-[4px] text-[#8b1d72]">
            Royal Dutch Medical Centre
          </p>

          <h1 className="mt-5 font-primary text-[30px] font-medium uppercase tracking-[6px] text-black sm:text-[38px] md:text-[46px]">
            Medical Specialities
          </h1>

          <p className="mt-6 font-secondary text-[15px] leading-[1.8] tracking-[1.2px] text-[#777]">
            Explore our specialized departments designed to deliver advanced,
            patient-focused healthcare with clinical precision and trusted care.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {specialities.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group border border-[#eadfd8] bg-[#fffdfb] p-7 transition duration-300 hover:border-[#8b1d72]/30 hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)]"
            >
              <h2 className="font-primary text-[21px] font-medium uppercase tracking-[3px] text-black transition group-hover:text-[#8b1d72]">
                {item.title}
              </h2>

              <p className="mt-4 font-secondary text-[14px] leading-[1.8] tracking-[1px] text-[#777]">
                {item.description}
              </p>

              <span className="mt-6 inline-block font-secondary text-[12px] font-semibold uppercase tracking-[3px] text-[#b765a2]">
                View Details
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}