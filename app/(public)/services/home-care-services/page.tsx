import Link from "next/link";

const homeCareServices = [
  {
    title: "General Home Care",
    description:
      "Professional home care support designed to assist with everyday health, comfort, wellbeing, and routine care needs in the convenience of your home.",
    href: "/services/home-care-services/general-home-care",
  },
  {
    title: "Nursing & Clinical Care",
    description:
      "Professional nursing and clinical support delivered at home, providing convenient care, monitoring, and assistance based on individual healthcare needs.",
    href: "/services/home-care-services/nursing-clinical-care",
  },
  {
    title: "Elderly & Long-Term Care",
    description:
      "Compassionate home-based support for elderly individuals and people requiring ongoing care, focused on comfort, safety, independence, and quality of life.",
    href: "/services/home-care-services/elderly-long-term-care",
  },
  {
    title: "Physiotherapy Support",
    description:
      "Personalized physiotherapy support at home designed to assist mobility, movement, rehabilitation, strength, and recovery according to individual needs.",
    href: "/services/home-care-services/physiotherapy-support",
  },
];

export default function HomeCareServicesPage() {
  return (
    <main className="min-h-screen bg-white pt-[50px]">
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        {/* ================= HEADING ================= */}

        <div className="mx-auto max-w-3xl text-center">
          <p className="font-secondary text-[11px] font-semibold uppercase tracking-[4px] text-[#8b1d72] sm:text-[12px]">
            Royal Dutch Medical Centre
          </p>

          <h1 className="mt-5 font-primary text-[28px] font-medium uppercase tracking-[5px] text-black sm:text-[36px] sm:tracking-[6px] md:text-[44px]">
            Home Care Services
          </h1>

          <p className="mx-auto mt-6 max-w-2xl font-secondary text-[14px] leading-[1.8] tracking-[0.8px] text-[#777] sm:text-[15px] sm:tracking-[1px]">
            Explore professional home care services designed to provide
            convenient, compassionate, and personalized healthcare support in
            the comfort of your home.
          </p>
        </div>

        {/* ================= HOME CARE SERVICES ================= */}

        <div className="mx-auto mt-12 grid max-w-[1200px] grid-cols-1 items-stretch gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6">
          {homeCareServices.map((item, index) => (
            <Link
              key={item.title}
              href={item.href}
              className="
                group
                relative
                flex
                h-full
                min-h-[315px]
                flex-col
                overflow-hidden
                rounded-[4px]
                border
                border-[#eadfd8]
                bg-[#fffdfb]
                p-6
                transition-all
                duration-500
                ease-out
                hover:-translate-y-1
                hover:border-[#8b1d72]/30
                hover:bg-white
                hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)]
                sm:min-h-[300px]
                sm:p-7
                lg:min-h-[300px]
                lg:p-9
              "
            >
              {/* ================= TOP HOVER LINE ================= */}

              <span
                className="
                  absolute
                  left-0
                  top-0
                  h-[2px]
                  w-0
                  bg-[#8b1d72]
                  transition-all
                  duration-500
                  ease-out
                  group-hover:w-full
                "
              />

              {/* ================= NUMBER ================= */}

              <span className="font-secondary text-[10px] font-semibold uppercase tracking-[2px] text-[#b49584] sm:text-[11px]">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* ================= TITLE ================= */}

              <h2
                className="
                  mt-7
                  font-primary
                  text-[17px]
                  font-medium
                  uppercase
                  leading-[1.5]
                  tracking-[2px]
                  text-black
                  transition-colors
                  duration-300
                  group-hover:text-[#8b1d72]
                  sm:text-[18px]
                  lg:mt-8
                  lg:text-[20px]
                "
              >
                {item.title}
              </h2>

              {/* ================= DESCRIPTION ================= */}

              <p className="mt-4 font-secondary text-[13px] leading-[1.9] tracking-[0.5px] text-[#777] sm:text-[13.5px]">
                {item.description}
              </p>

              {/* ================= BUTTON ================= */}

              <div className="mt-auto pt-7">
                <div className="inline-flex items-center gap-3">
                  <span
                    className="
                      relative
                      font-secondary
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[2.5px]
                      text-[#8b1d72]

                      after:absolute
                      after:-bottom-1.5
                      after:left-0
                      after:h-px
                      after:w-0
                      after:bg-[#8b1d72]
                      after:transition-all
                      after:duration-300

                      group-hover:after:w-full
                    "
                  >
                    View Service
                  </span>

                  <span
                    className="
                      text-[17px]
                      text-[#8b1d72]
                      transition-transform
                      duration-300
                      ease-out
                      group-hover:translate-x-1.5
                    "
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