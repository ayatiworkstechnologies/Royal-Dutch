import Link from "next/link";

const services = [
  {
    title: "Home Healthcare Division",
    description:
      "Comprehensive healthcare support delivered at home, including doctor consultations, skilled nursing, elderly care, and chronic condition monitoring.",
    href: "/care-services/home-healthcare-division",
  },
  {
    title: "Post-Surgical Care Programs",
    description:
      "Structured recovery care after surgery, including wound care, pain management, rehabilitation support, and long-term follow-up care.",
    href: "/care-services/post-surgical-care-programs",
  },
  {
    title: "Integrated Care Model",
    description:
      "A coordinated care approach connecting departments, treatment plans, recovery pathways, and patient support for improved outcomes.",
    href: "/care-services/integrated-care-model",
  },
];

export default function CareServicesPage() {
  return (
    <main className="min-h-screen bg-white pt-[110px]">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-secondary text-[12px] font-semibold uppercase tracking-[4px] text-[#8b1d72]">
            Royal Dutch Medical Centre
          </p>

          <h1 className="mt-5 font-primary text-[28px] font-medium uppercase leading-[1.25] tracking-[5px] text-black sm:text-[36px] md:text-[44px]">
            Care Services
          </h1>

          <p className="mt-6 font-secondary text-[15px] leading-[1.8] tracking-[1.2px] text-[#777]">
            Patient-focused care services designed to support recovery,
            long-term wellness, home-based medical needs, and coordinated care
            across every stage of treatment.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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