import Link from "next/link";

const treatments = [
  {
    title: "Musculoskeletal and Pain Management Therapy",
    description:
      "Specialized physiotherapy care for muscle, joint, back, neck, and posture-related pain, focused on improving movement, reducing discomfort, and restoring daily function.",
    href: "/medical-specialities/physiotherapy-rehabilitation/musculoskeletal-pain-management",
  },
  {
    title: "Post-Injury and Post-Operative Rehabilitation",
    description:
      "Structured recovery programs after injuries or surgeries, designed to rebuild strength, restore mobility, improve flexibility, and support safe return to normal activity.",
    href: "/medical-specialities/physiotherapy-rehabilitation/post-injury-post-operative-rehabilitation",
  },
  {
    title: "Neurological Physiotherapy",
    description:
      "Rehabilitation support for neurological conditions affecting balance, coordination, strength, and mobility, using personalized therapy plans to enhance independence.",
    href: "/medical-specialities/physiotherapy-rehabilitation/neurological-physiotherapy",
  },
  {
    title: "Home-Based Physiotherapy Programs",
    description:
      "Convenient physiotherapy care delivered at home for patients who need guided rehabilitation, mobility support, elderly care, or recovery assistance in a comfortable setting.",
    href: "/medical-specialities/physiotherapy-rehabilitation/home-based-physiotherapy-programs",
  },
];

export default function PhysiotherapyRehabilitationPage() {
  return (
    <main className="min-h-screen bg-white pt-[110px]">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-secondary text-[12px] font-semibold uppercase tracking-[4px] text-[#8b1d72]">
            Medical Specialities
          </p>

          <h1 className="mt-5 font-primary text-[28px] font-medium uppercase leading-[1.25] tracking-[5px] text-black sm:text-[36px] md:text-[44px]">
            Physiotherapy & Rehabilitation
          </h1>

          <p className="mt-6 font-secondary text-[15px] leading-[1.8] tracking-[1.2px] text-[#777]">
            Personalized rehabilitation and physiotherapy programs focused on
            pain relief, movement restoration, post-injury recovery, and
            long-term functional wellness.
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