
import Link from "next/link";

const services = [
  {
    title: "General Consultations",
    description:
      "Access professional GP consultations for everyday health concerns, symptom assessment, routine check-ups, and personalized medical guidance.",
    href: "/services/general-practitioner/general-consultations",
  },
  {
    title: "Medical Services",
    description:
      "Explore general medical care and clinical services provided according to your health needs, medical history, and doctor's recommendations.",
    href: "/services/general-practitioner/medical-services",
  },
  {
    title: "Documentation & Certificates",
    description:
      "Get assistance with medical documentation, health-related certificates, and clinical assessments based on applicable requirements.",
    href: "/services/general-practitioner/documentation-certificates",
  },
];

export default function GeneralPractitionerPage() {
  return (
    <main className="min-h-screen bg-white pt-[50px]">
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        {/* ==========================================
            PAGE HEADER
        ========================================== */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-secondary text-[11px] font-semibold uppercase tracking-[4px] text-[#8b1d72] sm:text-[12px]">
            Royal Dutch Medical Centre
          </p>

          <h1 className="mt-5 font-primary text-[28px] font-medium uppercase tracking-[5px] text-black sm:text-[36px] sm:tracking-[6px] md:text-[44px]">
            General Practitioner (GP)
          </h1>

          <p className="mx-auto mt-6 max-w-2xl font-secondary text-[14px] leading-[1.8] tracking-[0.8px] text-[#777] sm:text-[15px] sm:tracking-[1px]">
            Explore our general practitioner services, including medical
            consultations, clinical care, and medical documentation.
            Our GP services focus on understanding your health concerns
            and recommending appropriate care.
          </p>
        </div>

        {/* ==========================================
            SERVICE CARDS
        ========================================== */}
        <div className="mx-auto mt-12 grid max-w-[1200px] grid-cols-1 items-stretch gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <Link
              key={service.title}
              href={service.href}
              className="
                group relative flex h-full min-h-[355px] flex-col overflow-hidden
                rounded-[4px] border border-[#eadfd8] bg-[#fffdfb] p-6
                transition-all duration-500 ease-out
                hover:-translate-y-1 hover:border-[#8b1d72]/30
                hover:bg-white hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)]
                sm:min-h-[370px] sm:p-7
                lg:min-h-[390px] lg:p-9
              "
            >
              {/* Top Hover Line */}
              <span className="absolute left-0 top-0 h-[2px] w-0 bg-[#8b1d72] transition-all duration-500 ease-out group-hover:w-full" />

              {/* Service Number */}
              <span className="font-secondary text-[10px] font-semibold uppercase tracking-[2px] text-[#b49584] sm:text-[11px]">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Service Title */}
              <h2 className="mt-7 font-primary text-[17px] font-medium uppercase leading-[1.5] tracking-[2px] text-black transition-colors duration-300 group-hover:text-[#8b1d72] sm:text-[18px] lg:mt-8 lg:text-[20px]">
                {service.title}
              </h2>

              {/* Service Description */}
              <p className="mt-4 font-secondary text-[13px] leading-[1.9] tracking-[0.5px] text-[#777] sm:text-[13.5px]">
                {service.description}
              </p>

              {/* View Service Link */}
              <div className="mt-auto pt-7">
                <div className="inline-flex items-center gap-3">
                  <span className="relative font-secondary text-[10px] font-semibold uppercase tracking-[2.5px] text-[#8b1d72] after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-[#8b1d72] after:transition-all after:duration-300 group-hover:after:w-full">
                    View Service
                  </span>

                  <span
                    className="text-[17px] text-[#8b1d72] transition-transform duration-300 ease-out group-hover:translate-x-1.5"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
