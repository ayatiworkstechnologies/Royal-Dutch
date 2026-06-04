"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type SubMenuItem = {
  name: string;
  path: string;
  image: string;
};

type SubMenuCategory = {
  title: string;
  items: SubMenuItem[];
};

type NavLink = {
  name: string;
  path: string;
  type: "link" | "mega";
  menuKey?: "medical" | "care";
  categories?: SubMenuCategory[];
};

const submenuImage = "/images/treatment-bg-1.jpg";

const medicalSpecialities: SubMenuCategory[] = [
  {
    title: "Dermatology & Aesthetic Medicine",
    items: [
      {
        name: "Medical dermatology",
        path: "/services/medical-dermatology",
        image: submenuImage,
      },
      {
        name: "Cosmetic injectables",
        path: "/services/cosmetic-injectables",
        image: submenuImage,
      },
      {
        name: "Laser and device based treatments",
        path: "/services/laser-device-treatments",
        image: submenuImage,
      },
      {
        name: "Anti-aging and preventive skin programs",
        path: "/services/anti-aging-preventive-skin-programs",
        image: submenuImage,
      },
    ],
  },
  {
    title: "Dentistry Department",
    items: [
      {
        name: "Preventive and general dentistry",
        path: "/services/preventive-general-dentistry",
        image: submenuImage,
      },
      {
        name: "Cosmetic smile design and rehabilitation",
        path: "/services/cosmetic-smile-design",
        image: submenuImage,
      },
      {
        name: "Restorative dentistry",
        path: "/services/restorative-dentistry",
        image: submenuImage,
      },
      {
        name: "Pediatric dentistry",
        path: "/services/pediatric-dentistry",
        image: submenuImage,
      },
    ],
  },
  {
    title: "General Medicine (GP Services)",
    items: [
      {
        name: "Diagnosis and treatment of acute conditions",
        path: "/services/acute-condition-treatment",
        image: submenuImage,
      },
      {
        name: "Chronic disease management",
        path: "/services/chronic-disease-management",
        image: submenuImage,
      },
      {
        name: "Preventive health screenings and check-ups",
        path: "/services/preventive-health-screenings",
        image: submenuImage,
      },
      {
        name: "Family medicine and wellness care",
        path: "/services/family-medicine-wellness",
        image: submenuImage,
      },
    ],
  },
  {
    title: "Physiotherapy & Rehabilitation",
    items: [
      {
        name: "Musculoskeletal and pain management therapy",
        path: "/services/musculoskeletal-pain-management",
        image: submenuImage,
      },
      {
        name: "Post-injury and post-operative rehabilitation",
        path: "/services/post-injury-rehabilitation",
        image: submenuImage,
      },
      {
        name: "Neurological physiotherapy",
        path: "/services/neurological-physiotherapy",
        image: submenuImage,
      },
      {
        name: "Home-based physiotherapy programs",
        path: "/services/home-based-physiotherapy",
        image: submenuImage,
      },
    ],
  },
];

const careServices: SubMenuCategory[] = [
  {
    title: "Home Healthcare Division",
    items: [
      {
        name: "Doctor home consultations",
        path: "/services/doctor-home-consultations",
        image: submenuImage,
      },
      {
        name: "Skilled nursing care",
        path: "/services/skilled-nursing-care",
        image: submenuImage,
      },
      {
        name: "Elderly and assisted care services",
        path: "/services/elderly-assisted-care",
        image: submenuImage,
      },
      {
        name: "Chronic condition monitoring",
        path: "/services/chronic-condition-monitoring",
        image: submenuImage,
      },
    ],
  },
  {
    title: "Post-Surgical Care Programs",
    items: [
      {
        name: "Wound care and infection prevention",
        path: "/services/wound-care",
        image: submenuImage,
      },
      {
        name: "Pain management protocols",
        path: "/services/pain-management",
        image: submenuImage,
      },
      {
        name: "Rehabilitation and mobility restoration",
        path: "/services/rehabilitation-mobility",
        image: submenuImage,
      },
      {
        name: "Long-term recovery and follow-up care",
        path: "/services/long-term-recovery",
        image: submenuImage,
      },
    ],
  },
  {
    title: "Integrated Care Model",
    items: [
      {
        name: "Seamless coordination between departments",
        path: "/services/seamless-coordination",
        image: submenuImage,
      },
      {
        name: "Continuity of care from consultation to recovery",
        path: "/services/continuity-of-care",
        image: submenuImage,
      },
      {
        name: "Personalized treatment pathways",
        path: "/services/personalized-treatment-pathways",
        image: submenuImage,
      },
      {
        name: "Improved clinical outcomes and patient satisfaction",
        path: "/services/improved-clinical-outcomes",
        image: submenuImage,
      },
    ],
  },
];

const navLinks: NavLink[] = [
  {
    name: "About",
    path: "/about",
    type: "link",
  },
  {
    name: "Medical Specialities",
    path: "/services",
    type: "mega",
    menuKey: "medical",
    categories: medicalSpecialities,
  },
  {
    name: "Care Services",
    path: "/services",
    type: "mega",
    menuKey: "care",
    categories: careServices,
  },
  {
    name: "Our Works",
    path: "/our-works",
    type: "link",
  },
  {
    name: "Blog",
    path: "/blog",
    type: "link",
  },
  {
    name: "Contact",
    path: "/contact",
    type: "link",
  },
];

function ChevronIcon({ open = false }: { open?: boolean }) {
  return (
    <svg
      className={`h-[15px] w-[15px] transition-transform duration-300 ${
        open ? "rotate-180" : ""
      }`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DesktopMegaMenu({
  categories,
  activeIndex,
  setActiveIndex,
}: {
  categories: SubMenuCategory[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}) {
  const activeCategory = categories[activeIndex];

  return (
    <div className="absolute left-1/2 top-[calc(100%+12px)] z-[999] hidden w-[calc(100vw-32px)] max-w-[1400px] -translate-x-1/2 rounded-[14px] bg-white px-8 py-7 shadow-[0_16px_45px_rgba(0,0,0,0.12)] lg:block">
      <div className="grid min-h-[265px] grid-cols-[245px_1fr] gap-8">
        {/* Left Categories */}
        <div className="border-r border-black/10 pr-7">
          <div className="flex flex-col gap-[24px] pt-4">
            {categories.map((category, index) => {
              const isActive = activeIndex === index;

              return (
                <button
                  key={category.title}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  className={`text-left font-secondary text-[15px] leading-[1.25] transition-colors duration-200 xl:text-[16px] ${
                    isActive
                      ? "font-semibold text-black"
                      : "font-medium text-[#888888] hover:text-[#8b1d72]"
                  }`}
                >
                  {category.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Items */}
        <div className="grid grid-cols-4 gap-8">
          {activeCategory.items.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="group flex h-full flex-col"
            >
              <h4 className="min-h-[52px] font-secondary text-[15px] font-medium leading-[1.35] text-[#777777] transition-colors duration-300 group-hover:text-[#8b1d72] xl:text-[16px]">
                {item.name}
              </h4>

              <div className="mt-4 overflow-hidden rounded-[5px] bg-[#f5eef4]">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={310}
                  height={190}
                  className="h-[135px] w-full object-cover object-center transition-transform duration-700 group-hover:scale-105 xl:h-[145px]"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileAccordion({
  title,
  categories,
  closeMobileMenu,
}: {
  title: string;
  categories: SubMenuCategory[];
  closeMobileMenu: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between py-4 font-secondary text-[15px] font-semibold text-white"
      >
        {title}
        <ChevronIcon open={open} />
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-300 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 pb-4">
          {categories.map((category, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={category.title}
                className="mb-3 overflow-hidden rounded-[12px] bg-white/7"
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((prev) => (prev === index ? null : index))
                  }
                  className="flex w-full items-center justify-between px-4 py-3 text-left font-secondary text-[14px] font-semibold leading-5 text-white"
                >
                  {category.title}
                  <ChevronIcon open={isActive} />
                </button>

                <div
                  className={`grid overflow-hidden transition-all duration-300 ${
                    isActive
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0">
                    <ul className="space-y-3 px-4 pb-4">
                      {category.items.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.path}
                            onClick={closeMobileMenu}
                            className="block font-secondary text-[13px] leading-[1.5] text-white/75 transition hover:text-[#D6B981]"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"medical" | "care" | null>(null);
  const [medicalActive, setMedicalActive] = useState(0);
  const [careActive, setCareActive] = useState(0);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openDesktopMenu = (menu: "medical" | "care") => {
    clearCloseTimer();
    setOpenMenu(menu);

    if (menu === "medical") {
      setMedicalActive(0);
    } else {
      setCareActive(0);
    }
  };

  const closeDesktopMenu = () => {
    clearCloseTimer();

    closeTimer.current = setTimeout(() => {
      setOpenMenu(null);
    }, 260);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
      clearCloseTimer();
    };
  }, [mobileOpen]);

  const navLinkClass = (href: string) =>
    `font-secondary text-[15px] font-semibold transition-colors duration-300 xl:text-[16px] ${
      pathname === href
        ? "text-[#8b1d72]"
        : "text-[#111111] hover:text-[#8b1d72]"
    }`;

  return (
    <header className="relative z-[999] w-full bg-white">
      <div
        className="relative mx-auto w-full max-w-[1920px]"
        onMouseEnter={clearCloseTimer}
        onMouseLeave={closeDesktopMenu}
      >
        <nav className="w-full bg-white px-5 py-3 shadow-[0_6px_22px_rgba(0,0,0,0.04)] sm:px-8 lg:px-12 xl:px-5">
          <div className="grid items-center gap-4 lg:grid-cols-[280px_1fr_130px] xl:grid-cols-[330px_1fr_150px]">
            {/* Logo */}
            <div className="flex items-center justify-between">
              <Link href="/" onClick={closeMobileMenu} className="inline-flex">
                <Image
                  src="/icons/logo.svg"
                  alt="Royal Dutch Medical Centre"
                  width={230}
                  height={70}
                  priority
                  className="h-auto w-[155px] sm:w-[180px] lg:w-[210px] xl:w-[235px]"
                />
              </Link>

              {/* Mobile Button */}
              <button
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label="Toggle menu"
                className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#8b1d72] text-white transition hover:bg-[#D6B981] hover:text-[#200020] lg:hidden"
              >
                <span className="relative h-4 w-5">
                  <span
                    className={`absolute left-0 top-0 h-[2px] w-5 rounded-full bg-current transition ${
                      mobileOpen ? "translate-y-[7px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-[7px] h-[2px] w-5 rounded-full bg-current transition ${
                      mobileOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-[14px] h-[2px] w-5 rounded-full bg-current transition ${
                      mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
                    }`}
                  />
                </span>
              </button>
            </div>

            {/* Desktop Nav */}
            <div className="hidden items-center justify-center lg:flex">
              <div className="flex items-center justify-center gap-8 xl:gap-10 2xl:gap-12">
                {navLinks.map((link) => {
                  const isMega = link.type === "mega" && link.menuKey;
                  const isOpen = isMega && openMenu === link.menuKey;

                  if (isMega) {
                    return (
                      <button
                        key={link.name}
                        type="button"
                        onMouseEnter={() => openDesktopMenu(link.menuKey!)}
                        onFocus={() => openDesktopMenu(link.menuKey!)}
                        className={`flex items-center gap-1 font-secondary text-[15px] font-semibold transition-colors duration-300 xl:text-[16px] ${
                          isOpen
                            ? "text-black"
                            : "text-[#111111] hover:text-[#8b1d72]"
                        }`}
                      >
                        {link.name}
                        <ChevronIcon open={Boolean(isOpen)} />
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={link.name}
                      href={link.path}
                      className={navLinkClass(link.path)}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Assist Button */}
            <div className="hidden justify-end lg:flex">
              <Link
                href="/contact"
                className="rounded-full border border-black/10 bg-[#f7f7f7] px-7 py-3 font-secondary text-[15px] font-semibold text-[#111] transition duration-300 hover:bg-[#8b1d72] hover:text-white xl:text-[16px]"
              >
                Assist
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden ${
              mobileOpen
                ? "mt-4 max-h-[calc(100dvh-100px)] overflow-y-auto rounded-[14px] bg-[#35102f] px-4 py-4 opacity-100"
                : "max-h-0 overflow-hidden opacity-0"
            } transition-all duration-300`}
          >
            {navLinks.map((link) => {
              const isMega = link.type === "mega" && link.categories;

              if (isMega) {
                return (
                  <MobileAccordion
                    key={link.name}
                    title={link.name}
                    categories={link.categories!}
                    closeMobileMenu={closeMobileMenu}
                  />
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={closeMobileMenu}
                  className="block border-b border-white/10 py-4 font-secondary text-[15px] font-semibold text-white"
                >
                  {link.name}
                </Link>
              );
            })}

            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="mt-5 flex w-full items-center justify-center rounded-[10px] bg-[#D6B981] px-5 py-3 font-secondary text-[15px] font-bold text-[#200020]"
            >
              Assist
            </Link>
          </div>
        </nav>

        {/* Absolute Mega Menu - opens over banner/image */}
        {openMenu && (
          <DesktopMegaMenu
            categories={openMenu === "medical" ? medicalSpecialities : careServices}
            activeIndex={openMenu === "medical" ? medicalActive : careActive}
            setActiveIndex={
              openMenu === "medical" ? setMedicalActive : setCareActive
            }
          />
        )}
      </div>
    </header>
  );
}