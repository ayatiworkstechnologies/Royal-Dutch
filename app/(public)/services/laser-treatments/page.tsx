import Link from "next/link";

const treatments = [
  {
    title: "Fat Freezing",
    description:
      "A non-surgical body contouring treatment designed to target localized fat areas using controlled cooling technology for a more defined body shape.",
    href: "/services/laser-treatments/fat-freezing",
  },
  {
  title: "Men’s Laser Hair Removal",
  description:
    "Advanced laser hair removal treatment designed to support smoother-looking skin and long-term hair reduction for men.",
  href: "/services/laser-treatments/men-s-laser-hair-removal",
},
{
  title: "Women’s Laser Hair Removal",
  description:
    "Advanced laser hair removal treatment designed to support smoother-looking skin and long-term hair reduction for women.",
  href: "/services/laser-treatments/women-s-laser-hair-removal",
},
];

export default function BodyLaserTreatmentsPage() {
  return (
    <main className="min-h-screen bg-white pt-[50px]">
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        
        {/* ================= HEADING ================= */}

        <div className="mx-auto max-w-3xl text-center">
          <p className="font-secondary text-[11px] font-semibold uppercase tracking-[4px] text-[#8b1d72] sm:text-[12px]">
            Royal Dutch Medical Centre
          </p>

          <h1 className="mt-5 font-primary text-[27px] font-medium uppercase leading-[1.4] tracking-[4px] text-black sm:text-[35px] sm:tracking-[5px] md:text-[43px]">
            Body &amp; Laser Treatments
          </h1>

          <p className="mx-auto mt-6 max-w-2xl font-secondary text-[14px] leading-[1.8] tracking-[0.8px] text-[#777] sm:text-[15px] sm:tracking-[1px]">
            Explore advanced body contouring and laser treatments designed to
            enhance body confidence, improve skin appearance, and provide
            personalized aesthetic care.
          </p>
        </div>

        {/* ================= TREATMENTS ================= */}

        <div className="mx-auto mt-12 grid max-w-[900px] grid-cols-1 items-stretch gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6">
          {treatments.map((item, index) => (
            <Link
              key={item.title}
              href={item.href}
              className="
                group
                relative
                flex
                h-full
                min-h-[265px]
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

                sm:min-h-[265px]
                sm:p-7

                lg:min-h-[265px]
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
                    View Treatment
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