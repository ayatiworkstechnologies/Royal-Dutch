import Link from "next/link";

const services = [
  {
    title: "Wound Care and Infection Prevention",
    description:
      "Professional post-surgical wound care support focused on dressing changes, healing monitoring, infection prevention, and safe recovery guidance.",
    href: "/care-services/post-surgical-care-programs/wound-care-infection-prevention",
  },
  {
    title: "Pain Management Protocols",
    description:
      "Personalized pain management support after surgery, including medication guidance, comfort care, monitoring, and recovery-focused pain relief planning.",
    href: "/care-services/post-surgical-care-programs/pain-management-protocols",
  },
  {
    title: "Rehabilitation and Mobility Restoration",
    description:
      "Structured rehabilitation care to restore movement, strength, balance, flexibility, and safe mobility after surgical procedures.",
    href: "/care-services/post-surgical-care-programs/rehabilitation-mobility-restoration",
  },
  {
    title: "Long-Term Recovery and Follow-Up Care",
    description:
      "Ongoing recovery monitoring and follow-up support to ensure healing progress, prevent complications, and guide patients through complete rehabilitation.",
    href: "/care-services/post-surgical-care-programs/long-term-recovery-follow-up-care",
  },
];

export default function PostSurgicalCareProgramsPage() {
  return (
    <main className="min-h-screen bg-white pt-[110px]">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-secondary text-[12px] font-semibold uppercase tracking-[4px] text-[#8b1d72]">
            Care Services
          </p>

          <h1 className="mt-5 font-primary text-[28px] font-medium uppercase leading-[1.25] tracking-[5px] text-black sm:text-[36px] md:text-[44px]">
            Post-Surgical Care Programs
          </h1>

          <p className="mt-6 font-secondary text-[15px] leading-[1.8] tracking-[1.2px] text-[#777]">
            Dedicated post-surgical care programs designed to support safe
            healing, pain control, wound management, mobility restoration, and
            long-term recovery after medical procedures.
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