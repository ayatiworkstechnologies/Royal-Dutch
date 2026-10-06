import Link from "next/link";

const services = [
  {
    title: "Aesthetic & Skin Care",
    description:
      "Discover professional aesthetic and skin care treatments designed to cleanse, hydrate, rejuvenate, improve skin texture, enhance radiance, and support healthier-looking skin with personalized treatment options.",
    href: "/services/aesthetic-skin-care",
  },
  {
    title: "Home Care Services",
    description:
      "Access professional healthcare services from the comfort of your home, including medical assessments, doctor visits, nursing support, and personalized care based on your individual health needs.",
    href: "/services/home-care-services",
  },
  {
    title: "Dental Services",
    description:
      "Maintain a healthy and confident smile with comprehensive dental care, including preventive treatments, routine checkups, restorative procedures, and personalized solutions for your oral health needs.",
    href: "/services/dental-services",
  },
  {
    title: "General Practitioner (GP)",
    description:
      "Receive comprehensive primary healthcare from experienced general practitioners for routine consultations, health assessments, diagnosis, preventive care, and ongoing management of common health concerns.",
    href: "/services/general-practitioner",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white pt-[50px]">
      <section
        className="
          mx-auto
          max-w-7xl
          px-4
          py-14

          sm:px-6
          sm:py-16

          lg:px-8
          lg:py-20
        "
      >
        {/* =====================================================
            HEADING
        ====================================================== */}

        <div className="mx-auto max-w-3xl text-center">
          <p
            className="
              font-secondary
              text-[11px]
              font-semibold
              uppercase
              tracking-[4px]
              text-[#8b1d72]

              sm:text-[12px]
            "
          >
            Royal Dutch Medical Centre
          </p>

          <h1
            className="
              mt-5
              font-primary
              text-[27px]
              font-medium
              uppercase
              leading-[1.4]
              tracking-[4px]
              text-black

              sm:text-[35px]
              sm:tracking-[5px]

              md:text-[43px]
            "
          >
            Our Services
          </h1>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              font-secondary
              text-[14px]
              leading-[1.8]
              tracking-[0.8px]
              text-[#777]

              sm:text-[15px]
              sm:tracking-[1px]
            "
          >
            Explore our range of aesthetic and wellness treatments designed to
            support healthier-looking skin, body confidence, and personalized
            care at Royal Dutch Medical Centre.
          </p>
        </div>

        {/* =====================================================
            SERVICES GRID
        ====================================================== */}

        <div
          className="
            mx-auto
            mt-12
            grid
            max-w-[950px]
            grid-cols-1
            items-stretch
            gap-5

            sm:mt-14
            sm:grid-cols-2
            sm:gap-6

            lg:mt-16
          "
        >
          {services.map((item, index) => (
            <Link
              key={item.title}
              href={item.href}
              className="
                group
                relative
                flex
                h-full
                min-h-[280px]
                flex-col
                overflow-hidden

                rounded-[6px]

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

                lg:min-h-[310px]
                lg:p-9
              "
            >
              {/* =================================================
                  TOP HOVER LINE
              ================================================== */}

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

              {/* =================================================
                  NUMBER
              ================================================== */}

              <span
                className="
                  font-secondary
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[2px]
                  text-[#b49584]

                  sm:text-[11px]
                "
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* =================================================
                  TITLE
              ================================================== */}

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

              {/* =================================================
                  DESCRIPTION
              ================================================== */}

              <p
                className="
                  mt-4

                  font-secondary
                  text-[13px]
                  leading-[1.9]
                  tracking-[0.5px]
                  text-[#777]

                  sm:text-[13.5px]
                "
              >
                {item.description}
              </p>

              {/* =================================================
                  VIEW SERVICE
              ================================================== */}

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
                    View Services
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