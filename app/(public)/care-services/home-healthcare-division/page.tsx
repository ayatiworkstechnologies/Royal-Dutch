import Link from "next/link";

const services = [
  {
    title: "Doctor Home Consultations",
    description:
      "Professional doctor consultations at home for patients who need convenient medical evaluation, diagnosis, treatment guidance, and follow-up care.",
    href: "/care-services/home-healthcare-division/doctor-home-consultations",
  },
  {
    title: "Skilled Nursing Care",
    description:
      "Qualified nursing support at home, including medication assistance, vital monitoring, wound care, injections, and post-treatment patient support.",
    href: "/care-services/home-healthcare-division/skilled-nursing-care",
  },
  {
    title: "Elderly and Assisted Care Services",
    description:
      "Compassionate support for elderly patients, including daily assistance, health monitoring, mobility support, medication reminders, and comfort-focused care.",
    href: "/care-services/home-healthcare-division/elderly-assisted-care-services",
  },
  {
    title: "Chronic Condition Monitoring",
    description:
      "Regular monitoring and care support for chronic health conditions such as diabetes, hypertension, respiratory concerns, and long-term wellness needs.",
    href: "/care-services/home-healthcare-division/chronic-condition-monitoring",
  },
];

export default function HomeHealthcareDivisionPage() {
  return (
    <main className="min-h-screen bg-white pt-[110px]">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-secondary text-[12px] font-semibold uppercase tracking-[4px] text-[#8b1d72]">
            Care Services
          </p>

          <h1 className="mt-5 font-primary text-[28px] font-medium uppercase leading-[1.25] tracking-[5px] text-black sm:text-[36px] md:text-[44px]">
            Home Healthcare Division
          </h1>

          <p className="mt-6 font-secondary text-[15px] leading-[1.8] tracking-[1.2px] text-[#777]">
            Personalized home healthcare services created to bring trusted
            medical care, nursing support, elderly assistance, and long-term
            condition monitoring directly to the comfort of your home.
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