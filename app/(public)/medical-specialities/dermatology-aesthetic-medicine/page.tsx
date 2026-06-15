import Link from "next/link";

const treatments = [
  {
    title: "Medical Dermatology",
    description:
      "Diagnosis and treatment of skin, hair, and nail conditions using evidence-based dermatological care.",
    href: "/medical-specialities/dermatology-aesthetic-medicine/medical-dermatology",
  },
  {
    title: "Cosmetic Injectables",
    description:
      "Personalized injectable treatments designed to enhance facial balance, rejuvenation, and natural-looking results.",
    href: "/medical-specialities/dermatology-aesthetic-medicine/cosmetic-injectables",
  },
  {
    title: "Laser and Device Based Treatments",
    description:
      "Advanced device-led skin treatments for pigmentation, rejuvenation, texture, and aesthetic improvement.",
    href: "/medical-specialities/dermatology-aesthetic-medicine/laser-device-based-treatments",
  },
  {
    title: "Anti-Aging and Preventive Skin Programs",
    description:
      "Preventive and corrective skin programs focused on long-term skin health, repair, and graceful aging.",
    href: "/medical-specialities/dermatology-aesthetic-medicine/anti-aging-preventive-skin-programs",
  },
];

export default function DermatologyAestheticMedicinePage() {
  return (
    <main className="min-h-screen bg-white pt-[110px]">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-secondary text-[12px] font-semibold uppercase tracking-[4px] text-[#8b1d72]">
            Medical Specialities
          </p>

          <h1 className="mt-5 font-primary text-[28px] font-medium uppercase tracking-[5px] text-black sm:text-[36px] md:text-[44px]">
            Dermatology & Aesthetic Medicine
          </h1>

          <p className="mt-6 font-secondary text-[15px] leading-[1.8] tracking-[1.2px] text-[#777]">
            Advanced dermatology and aesthetic medicine services designed to
            support skin health, natural beauty, and clinical confidence.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {treatments.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group border border-[#eadfd8] bg-[#fffdfb] p-7 transition duration-300 hover:border-[#8b1d72]/30 hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)]"
            >
              <h2 className="font-primary text-[20px] font-medium uppercase tracking-[3px] text-black transition group-hover:text-[#8b1d72]">
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