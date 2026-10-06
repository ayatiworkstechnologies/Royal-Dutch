import Link from "next/link";

const treatments = [
  {
    title: "Fat Freezing Cryolipolysis",
    description:
      "A non-surgical body contouring treatment that uses controlled cooling technology to target stubborn localized fat cells, helping create a smoother and more defined body shape without surgery.",
    href: "/services/fat-freezing/fat-freezing-cryolipolysis",
  },
];

export default function FatFreezingPage() {
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
            Fat Freezing
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
            Discover non-surgical body contouring designed to target stubborn
            localized fat using controlled cooling technology for a more
            sculpted and defined appearance.
          </p>
        </div>

        {/* =====================================================
            TREATMENT CARD
        ====================================================== */}

        <div
          className="
            mx-auto
            mt-12
            flex
            max-w-[620px]
            justify-center

            sm:mt-14
          "
        >
          {treatments.map((item, index) => (
            <Link
              key={item.title}
              href={item.href}
              className="
                group
                relative
                flex
                min-h-[285px]
                w-full
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
                sm:p-8

                lg:p-10
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
                  text-[18px]
                  font-medium
                  uppercase
                  leading-[1.5]
                  tracking-[2px]
                  text-black

                  transition-colors
                  duration-300

                  group-hover:text-[#8b1d72]

                  sm:text-[20px]

                  lg:mt-8
                  lg:text-[22px]
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
                  max-w-[520px]
                  font-secondary
                  text-[13px]
                  leading-[1.9]
                  tracking-[0.5px]
                  text-[#777]

                  sm:text-[14px]
                "
              >
                {item.description}
              </p>

              {/* =================================================
                  BUTTON
              ================================================== */}

              <div className="mt-auto pt-8">
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

                      sm:text-[11px]
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

                      sm:text-[18px]
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