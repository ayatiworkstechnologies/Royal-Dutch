import Image from "next/image";
import Link from "next/link";

const socialIcons = [
  {
    name: "WhatsApp",
    icon: "/icons/whatsapp.svg",
    href: "https://wa.me/971509479001",
  },
  {
    name: "Instagram",
    icon: "/icons/instagram.svg",
    href: "https://www.instagram.com/royal_dutch_medical_centre",
  },
  {
    name: "X",
    icon: "/icons/x.svg",
    href: "https://x.com/royal_dutch_ae",
  },
  {
    name: "Facebook",
    icon: "/icons/facebook.svg",
    href: "https://www.facebook.com/royaldutchmedicalcentre",
  },
  {
    name: "LinkedIn",
    icon: "/icons/linkedin.svg",
    href: "https://www.linkedin.com/company/royal-dutch-medical-centre",
  },
  {
    name: "YouTube",
    icon: "/icons/youtube.svg",
    href: "https://www.youtube.com/@RoyalDutchMedicalCentre",
  },
];

const exploreLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Medical Specialities",
    href: "/medical-specialities",
  },
  {
    name: "Our Works",
    href: "/our-works",
  },
  // {
  //   name: "Blog",
  //   href: "/blog",
  // },
  {
    name: "Contact",
    href: "/contact",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[url('/images/footer-bg.jpg')] bg-cover bg-center text-white">
      {/* Purple Overlay */}
      <div className="absolute inset-0 bg-[#571248]/55" />

      {/* Extra soft dark overlay for readability */}
      {/* <div className="absolute inset-0 bg-black/10" /> */}

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-12">
        <div className="grid gap-12 md:grid-cols-3 md:gap-16">
          {/* About */}
          <div>
            <h3 className="mb-5 font-serif text-[17px] uppercase tracking-[6px] text-white">
              About
            </h3>

            <p className="max-w-[270px] text-[13px] leading-[1.65] tracking-[1.4px] text-white/90">
              We are dedicated to enhancing our clients’ natural beauty through
              advanced techniques, personalized care, and the latest in beauty
              technology.
            </p>

            <div className="mt-9 flex items-center gap-6">
              {socialIcons.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-label={item.name}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  className="flex h-5 w-5 items-center justify-center transition duration-300 hover:opacity-70"
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={16}
                    height={16}
                    className="h-4 w-4 object-contain brightness-0 invert"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="md:mx-auto">
            <h3 className="mb-6 font-serif text-[17px] uppercase tracking-[6px] text-white">
              Explore
            </h3>

            <ul className="space-y-4">
              {exploreLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="font-serif text-[14px] uppercase tracking-[3px] text-white transition duration-300 hover:text-white/70"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 font-serif text-[17px] uppercase tracking-[6px] text-white">
              Where To Find Us
            </h3>

            <div className="space-y-6 text-[13px] leading-[1.55] tracking-[1.4px] text-white/90">
              <div className="flex items-start gap-3">
                <Image
                  src="/icons/location.svg"
                  alt="Location"
                  width={18}
                  height={18}
                  className="mt-1 h-[18px] w-[18px] shrink-0 brightness-0 invert"
                />

                <p>
                  Royal Dutch Clinic LLC
                  <br />
                  Al Naeem Tower - 504
                  <br />
                  Bin Daher St – Al Nakheel
                  <br />
                  Ras Al Khaimah – UAE
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Image
                  src="/icons/phone.svg"
                  alt="Phone"
                  width={17}
                  height={17}
                  className="h-[17px] w-[17px] shrink-0 brightness-0 invert"
                />

                <Link
                  href="tel:+971509479001"
                  className="transition duration-300 hover:text-white/70"
                >
                  +971 50 947 9001
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <Image
                  src="/icons/mail.svg"
                  alt="Email"
                  width={17}
                  height={17}
                  className="h-[17px] w-[17px] shrink-0 brightness-0 invert"
                />

                <Link
                  href="mailto:info@royaldutchclinic.ae"
                  className="transition duration-300 hover:text-white/70"
                >
                  info@royaldutchclinic.ae
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-10 border-t border-white/15 px-4 pt-6 text-center font-secondary text-[11px] leading-6 text-white/75 sm:mt-14 sm:pt-7 sm:text-[10px] md:text-[14px]">
          <p>
            Copyright ©2026 Royal Dutch Medical Centre - All rights reserved
            <span className="mx-2 hidden sm:inline">|</span>
            <span className="block sm:inline">
              Designed &amp; Developed by{" "}
              <a
                href="https://www.ayatiworks.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white transition-colors duration-300 hover:text-[#D6B981]"
              >
                Ayatiworks
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}