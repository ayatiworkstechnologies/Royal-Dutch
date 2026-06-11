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
  path: string;
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

/* ================= MEDICAL SPECIALITIES ================= */

const medicalSpecialities: SubMenuCategory[] = [
  {
    title: "Dermatology & Aesthetic Medicine",
    path: "/medical-specialities/dermatology-aesthetic-medicine",
    items: [
      {
        name: "Medical dermatology",
        path: "/medical-specialities/dermatology-aesthetic-medicine/medical-dermatology",
        image: "/images/da-1.png",
      },
      {
        name: "Cosmetic injectables",
        path: "/medical-specialities/dermatology-aesthetic-medicine/cosmetic-injectables",
        image: "/images/da-2.png",
      },
      {
        name: "Laser and device based treatments",
        path: "/medical-specialities/dermatology-aesthetic-medicine/laser-device-based-treatments",
        image: "/images/da-3.png",
      },
      {
        name: "Anti-aging and preventive skin programs",
        path: "/medical-specialities/dermatology-aesthetic-medicine/anti-aging-preventive-skin-programs",
        image: "/images/da-4.png",
      },
    ],
  },
  {
    title: "Dentistry Department",
    path: "/medical-specialities/dentistry-department",
    items: [
      {
        name: "Preventive and general dentistry",
        path: "/medical-specialities/dentistry-department/preventive-general-dentistry",
        image: "/images/dd-1.png",
      },
      {
        name: "Cosmetic smile design and rehabilitation",
        path: "/medical-specialities/dentistry-department/cosmetic-smile-design-rehabilitation",
        image: "/images/dd-2.png",
      },
      {
        name: "Restorative dentistry",
        path: "/medical-specialities/dentistry-department/restorative-dentistry",
        image: "/images/dd-3.png",
      },
      {
        name: "Pediatric dentistry",
        path: "/medical-specialities/dentistry-department/pediatric-dentistry",
        image: "/images/dd-4.png",
      },
    ],
  },
  {
    title: "General Medicine (GP Services)",
    path: "/medical-specialities/general-medicine",
    items: [
      {
        name: "Diagnosis and treatment of acute conditions",
        path: "/medical-specialities/general-medicine/diagnosis-treatment-acute-conditions",
        image: "/images/gm-1.png",
      },
      {
        name: "Chronic disease management",
        path: "/medical-specialities/general-medicine/chronic-disease-management",
        image: "/images/gm-2.png",
      },
      {
        name: "Preventive health screenings and check-ups",
        path: "/medical-specialities/general-medicine/preventive-health-screenings-checkups",
        image: "/images/gm-3.png",
      },
      {
        name: "Family medicine and wellness care",
        path: "/medical-specialities/general-medicine/family-medicine-wellness-care",
        image: "/images/gm-4.png",
      },
    ],
  },
  {
    title: "Physiotherapy & Rehabilitation",
    path: "/medical-specialities/physiotherapy-rehabilitation",
    items: [
      {
        name: "Musculoskeletal and pain management therapy",
        path: "/medical-specialities/physiotherapy-rehabilitation/musculoskeletal-pain-management",
        image: "/images/pr-1.png",
      },
      {
        name: "Post-injury and post-operative rehabilitation",
        path: "/medical-specialities/physiotherapy-rehabilitation/post-injury-post-operative-rehabilitation",
        image: "/images/pr-2.png",
      },
      {
        name: "Neurological physiotherapy",
        path: "/medical-specialities/physiotherapy-rehabilitation/neurological-physiotherapy",
        image: "/images/pr-3.png",
      },
      {
        name: "Home-based physiotherapy programs",
        path: "/medical-specialities/physiotherapy-rehabilitation/home-based-physiotherapy-programs",
        image: "/images/pr-4.png",
      },
    ],
  },
];

/* ================= CARE SERVICES ================= */

const careServices: SubMenuCategory[] = [
  {
    title: "Home Healthcare Division",
    path: "/care-services/home-healthcare-division",
    items: [
      {
        name: "Doctor home consultations",
        path: "/care-services/home-healthcare-division/doctor-home-consultations",
        image: "/images/hhd-1.png",
      },
      {
        name: "Skilled nursing care",
        path: "/care-services/home-healthcare-division/skilled-nursing-care",
        image: "/images/hhd-2.png",
      },
      {
        name: "Elderly and assisted care services",
        path: "/care-services/home-healthcare-division/elderly-assisted-care-services",
        image: "/images/hhd-3.png",
      },
      {
        name: "Chronic condition monitoring",
        path: "/care-services/home-healthcare-division/chronic-condition-monitoring",
        image: "/images/hhd-4.png",
      },
    ],
  },
  {
    title: "Post-Surgical Care Programs",
    path: "/care-services/post-surgical-care-programs",
    items: [
      {
        name: "Wound care and infection prevention",
        path: "/care-services/post-surgical-care-programs/wound-care-infection-prevention",
        image: "/images/pscp-1.png",
      },
      {
        name: "Pain management protocols",
        path: "/care-services/post-surgical-care-programs/pain-management-protocols",
        image: "/images/pscp-2.png",
      },
      {
        name: "Rehabilitation and mobility restoration",
        path: "/care-services/post-surgical-care-programs/rehabilitation-mobility-restoration",
        image: "/images/pscp-3.png",
      },
      {
        name: "Long-term recovery and follow-up care",
        path: "/care-services/post-surgical-care-programs/long-term-recovery-follow-up-care",
        image: "/images/pscp-4.png",
      },
    ],
  },
  {
    title: "Integrated Care Model",
    path: "/care-services/integrated-care-model",
    items: [
      {
        name: "Seamless coordination between departments",
        path: "/care-services/integrated-care-model/seamless-coordination-between-departments",
        image: submenuImage,
      },
      {
        name: "Continuity of care from consultation to recovery",
        path: "/care-services/integrated-care-model/continuity-of-care",
        image: submenuImage,
      },
      {
        name: "Personalized treatment pathways",
        path: "/care-services/integrated-care-model/personalized-treatment-pathways",
        image: submenuImage,
      },
      {
        name: "Improved clinical outcomes and patient satisfaction",
        path: "/care-services/integrated-care-model/improved-clinical-outcomes",
        image: submenuImage,
      },
    ],
  },
];

/* ================= TOP NAV ================= */

const navLinks: NavLink[] = [
  {
    name: "About",
    path: "/about",
    type: "link",
  },
  {
    name: "Medical Specialities",
    path: "/medical-specialities",
    type: "mega",
    menuKey: "medical",
    categories: medicalSpecialities,
  },
  {
    name: "Care Services",
    path: "/care-services",
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

function cleanPath(path?: string | null) {
  if (!path) return "/";
  return path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
}

function ChevronIcon({ open = false }: { open?: boolean }) {
  return (
    <svg
      className={`h-[14px] w-[14px] transition-transform duration-300 ${open ? "rotate-180" : ""
        }`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AssistSparkle() {
  return (
    <span className="assist-glow-icon" aria-hidden="true">
      ✦
    </span>
  );
}

/* ================= DESKTOP MEGA MENU ================= */

function DesktopMegaMenu({
  categories,
  activeIndex,
  setActiveIndex,
  currentPath,
  closeDesktopMenuNow,
}: {
  categories: SubMenuCategory[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  currentPath: string;
  closeDesktopMenuNow: () => void;
}) {
  const isExactActive = (path: string) => currentPath === cleanPath(path);

  const isParentActive = (path: string) => {
    const target = cleanPath(path);
    return currentPath === target || currentPath.startsWith(`${target}/`);
  };

  const activeCategory = categories[activeIndex] || categories[0];

  return (
    <div className="absolute left-1/2 top-[calc(100%+14px)] z-[9999] hidden w-[calc(100vw-28px)] max-w-[1320px] -translate-x-1/2 rounded-[14px] bg-white px-8 py-8 shadow-[0_18px_45px_rgba(0,0,0,0.15)] lg:block">
      <div className="grid min-h-[300px] grid-cols-[230px_1fr] gap-8">
        <div className="border-r border-black/10 pr-7">
          <div className="flex flex-col gap-[26px] pt-2">
            {categories.map((category, index) => {
              const isHovered = activeIndex === index;
              const isCurrentParent = isParentActive(category.path);

              return (
                <Link
                  key={category.title}
                  href={category.path}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={closeDesktopMenuNow}
                  className={`text-left font-secondary text-[15px] leading-[1.28] transition-colors duration-200 ${isCurrentParent
                      ? "font-semibold text-[#8b1d72]"
                      : isHovered
                        ? "font-semibold text-black"
                        : "font-normal text-[#8b8b8b] hover:text-[#8b1d72]"
                    }`}
                >
                  {category.title}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-8">
          {activeCategory.items.map((item) => {
            const itemActive = isExactActive(item.path);

            return (
              <Link
                key={item.name}
                href={item.path}
                onClick={closeDesktopMenuNow}
                className="group flex h-full flex-col"
              >
                <h4
                  className={`min-h-[58px] font-secondary text-[15px] leading-[1.35] transition-colors duration-300 ${itemActive
                      ? "font-semibold text-[#8b1d72]"
                      : "font-normal text-[#7d7d7d] group-hover:text-[#8b1d72]"
                    }`}
                >
                  {item.name}
                </h4>

                <div
                  className={`mt-4 overflow-hidden rounded-[5px] bg-[#f5eef4] transition duration-300 ${itemActive
                      ? "ring-2 ring-[#8b1d72] ring-offset-4 ring-offset-white"
                      : ""
                    }`}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={290}
                    height={190}
                    className={`h-[155px] xl:h-[210px] w-full object-cover object-center transition-transform duration-700 ${itemActive ? "scale-[1.03]" : "group-hover:scale-105"
                      }`}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ================= MOBILE MENU ================= */

function MobileAccordion({
  title,
  categories,
  closeMobileMenu,
  currentPath,
}: {
  title: string;
  categories: SubMenuCategory[];
  closeMobileMenu: () => void;
  currentPath: string;
}) {
  const isParentActive = (path: string) => {
    const target = cleanPath(path);
    return currentPath === target || currentPath.startsWith(`${target}/`);
  };

  const isExactActive = (path: string) => currentPath === cleanPath(path);

  const activeCategoryIndex = categories.findIndex((category) =>
    isParentActive(category.path)
  );

  const [open, setOpen] = useState(activeCategoryIndex >= 0);
  const [activeIndex, setActiveIndex] = useState<number | null>(
    activeCategoryIndex >= 0 ? activeCategoryIndex : null
  );

  useEffect(() => {
    if (activeCategoryIndex >= 0) {
      setOpen(true);
      setActiveIndex(activeCategoryIndex);
    }
  }, [activeCategoryIndex]);

  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between py-4 font-secondary text-[15px] font-semibold ${categories.some((category) => isParentActive(category.path))
            ? "text-[#D6B981]"
            : "text-white"
          }`}
      >
        {title}
        <ChevronIcon open={open} />
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className="min-h-0 pb-4">
          {categories.map((category, index) => {
            const isOpenCategory = activeIndex === index;
            const categoryActive = isParentActive(category.path);

            return (
              <div
                key={category.title}
                className={`mb-3 overflow-hidden rounded-[12px] ${categoryActive ? "bg-white/15" : "bg-white/7"
                  }`}
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((prev) => (prev === index ? null : index))
                  }
                  className={`flex w-full items-center justify-between px-4 py-3 text-left font-secondary text-[14px] font-semibold leading-5 ${categoryActive ? "text-[#D6B981]" : "text-white"
                    }`}
                >
                  {category.title}
                  <ChevronIcon open={isOpenCategory} />
                </button>

                <div
                  className={`grid overflow-hidden transition-all duration-300 ${isOpenCategory
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                  <div className="min-h-0">
                    <ul className="space-y-2 px-4 pb-4 pt-1">
                      {category.items.map((item) => {
                        const itemActive = isExactActive(item.path);

                        return (
                          <li key={item.name}>
                            <Link
                              href={item.path}
                              onClick={closeMobileMenu}
                              className={`block rounded-[8px] px-3 py-2 font-secondary text-[13px] leading-[1.5] transition ${itemActive
                                  ? "bg-[#8b1d72] font-semibold text-white"
                                  : "text-white/75 hover:bg-white/10 hover:text-[#D6B981]"
                                }`}
                            >
                              {item.name}
                            </Link>
                          </li>
                        );
                      })}
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
  const currentPath = cleanPath(pathname);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"medical" | "care" | null>(null);
  const [medicalActive, setMedicalActive] = useState(0);
  const [careActive, setCareActive] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isExactActive = (path: string) => currentPath === cleanPath(path);

  const isParentActive = (path: string) => {
    const target = cleanPath(path);
    return currentPath === target || currentPath.startsWith(`${target}/`);
  };

  const getActiveCategoryIndex = (categories: SubMenuCategory[]) => {
    const index = categories.findIndex((category) =>
      isParentActive(category.path)
    );

    return index >= 0 ? index : 0;
  };

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
      setMedicalActive(getActiveCategoryIndex(medicalSpecialities));
    } else {
      setCareActive(getActiveCategoryIndex(careServices));
    }
  };

  const closeDesktopMenu = () => {
    clearCloseTimer();

    closeTimer.current = setTimeout(() => {
      setOpenMenu(null);
    }, 260);
  };

  const closeDesktopMenuNow = () => {
    clearCloseTimer();
    setOpenMenu(null);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  useEffect(() => {
    setMedicalActive(getActiveCategoryIndex(medicalSpecialities));
    setCareActive(getActiveCategoryIndex(careServices));
  }, [currentPath]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
      clearCloseTimer();
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinkClass = (href: string) =>
    `font-secondary text-[15px] font-medium transition-colors duration-300 ${isExactActive(href)
      ? "text-[#8b1d72]"
      : "text-[#2f2f2f] hover:text-[#8b1d72]"
    }`;

  const isMegaActive = (link: NavLink) => {
    return link.type === "mega" && isParentActive(link.path);
  };

  return (
    <header className="fixed left-0 top-0 z-[99999] w-full bg-transparent px-2 pt-2 sm:px-3 lg:px-4">
      <div
        className="relative mx-auto max-w-[1440px]"
        onMouseEnter={clearCloseTimer}
        onMouseLeave={closeDesktopMenu}
      >
        <nav
          className={`rounded-[10px] bg-white px-4 py-2 transition-shadow duration-500 lg:rounded-[12px] lg:px-5 ${isScrolled
              ? "shadow-[0_8px_28px_rgba(0,0,0,0.10)]"
              : "shadow-none"
            }`}
        >
          <div className="grid items-center gap-4 lg:grid-cols-[230px_1fr_110px] xl:grid-cols-[260px_1fr_118px]">
            <div className="flex items-center justify-between">
              <Link href="/" onClick={closeMobileMenu} className="inline-flex">
                <Image
                  src="/icons/logo.svg"
                  alt="Royal Dutch Medical Centre"
                  width={190}
                  height={54}
                  priority
                  className="h-auto w-[140px] sm:w-[160px] lg:w-[170px] xl:w-[190px]"
                />
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label="Toggle menu"
                className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#8b1d72] text-white transition hover:bg-[#D6B981] hover:text-[#200020] lg:hidden"
              >
                <span className="relative h-4 w-5">
                  <span
                    className={`absolute left-0 top-0 h-[2px] w-5 rounded-full bg-current transition ${mobileOpen ? "translate-y-[7px] rotate-45" : ""
                      }`}
                  />
                  <span
                    className={`absolute left-0 top-[7px] h-[2px] w-5 rounded-full bg-current transition ${mobileOpen ? "opacity-0" : ""
                      }`}
                  />
                  <span
                    className={`absolute left-0 top-[14px] h-[2px] w-5 rounded-full bg-current transition ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
                      }`}
                  />
                </span>
              </button>
            </div>

            <div className="hidden items-center justify-center lg:flex">
              <div className="flex items-center justify-center gap-9 xl:gap-10">
                {navLinks.map((link) => {
                  const isMega = link.type === "mega" && link.menuKey;
                  const isOpen = isMega && openMenu === link.menuKey;
                  const activeMega = isMegaActive(link);

                  if (isMega) {
                    return (
                      <button
                        key={link.name}
                        type="button"
                        onMouseEnter={() => openDesktopMenu(link.menuKey!)}
                        onFocus={() => openDesktopMenu(link.menuKey!)}
                        className={`flex items-center gap-1 font-secondary text-[15px] transition-colors duration-300 ${activeMega
                            ? "font-semibold text-[#8b1d72]"
                            : isOpen
                              ? "font-semibold text-black"
                              : "font-medium text-[#2f2f2f] hover:text-[#8b1d72]"
                          }`}
                      >
                        {link.name}
                        <ChevronIcon open={Boolean(isOpen || activeMega)} />
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

            <div className="hidden justify-end lg:flex">
              <Link
                href="/contact"
                className="group inline-flex h-[40px] min-w-[105px] items-center justify-center gap-1.5 rounded-full border-2 border-[#d9d9d9] bg-[#f6f6f6] px-3 font-secondary text-[13px] font-semibold leading-none text-black transition duration-300 hover:border-[#8b1d72] hover:bg-white hover:text-[#8b1d72] xl:h-[46px] xl:min-w-[150px] xl:gap-2 xl:px-4 xl:text-[14px]"
              >
                <AssistSparkle />
                <span className="translate-y-[1px] whitespace-nowrap">Book Now</span>
              </Link>
            </div>
          </div>

          <div
            className={`lg:hidden ${mobileOpen
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
                    currentPath={currentPath}
                  />
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={closeMobileMenu}
                  className={`block border-b border-white/10 py-4 font-secondary text-[15px] font-semibold ${isExactActive(link.path) ? "text-[#D6B981]" : "text-white"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#D6B981] px-5 py-3 font-secondary text-[15px] font-bold text-[#200020]"
            >
              <AssistSparkle />
              Book Now
            </Link>
          </div>
        </nav>

        {openMenu && (
          <DesktopMegaMenu
            categories={
              openMenu === "medical" ? medicalSpecialities : careServices
            }
            activeIndex={openMenu === "medical" ? medicalActive : careActive}
            setActiveIndex={
              openMenu === "medical" ? setMedicalActive : setCareActive
            }
            currentPath={currentPath}
            closeDesktopMenuNow={closeDesktopMenuNow}
          />
        )}
      </div>
    </header>
  );
}