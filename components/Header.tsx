"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useBookingModal } from "@/context/BookingModalContext";
import { useAuth } from "@/hooks/useAuth";
import { User as UserIcon } from "lucide-react";

type SubMenuItem = {
  name: string;
  path: string;
  image?: string;
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
  menuKey?: "services";
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
  // {
  //   title: "Dentistry Department",
  //   path: "/medical-specialities/dentistry-department",
  //   items: [
  //     {
  //       name: "Preventive and general dentistry",
  //       path: "/medical-specialities/dentistry-department/preventive-general-dentistry",
  //       image: "/images/dd-1.png",
  //     },
  //     {
  //       name: "Cosmetic smile design and rehabilitation",
  //       path: "/medical-specialities/dentistry-department/cosmetic-smile-design-rehabilitation",
  //       image: "/images/dd-2.png",
  //     },
  //     {
  //       name: "Restorative dentistry",
  //       path: "/medical-specialities/dentistry-department/restorative-dentistry",
  //       image: "/images/dd-3.png",
  //     },
  //     {
  //       name: "Pediatric dentistry",
  //       path: "/medical-specialities/dentistry-department/pediatric-dentistry",
  //       image: "/images/dd-4.png",
  //     },
  //   ],
  // },
  // {
  //   title: "General Medicine (GP Services)",
  //   path: "/medical-specialities/general-medicine",
  //   items: [
  //     {
  //       name: "Diagnosis and treatment of acute conditions",
  //       path: "/medical-specialities/general-medicine/diagnosis-treatment-acute-conditions",
  //       image: "/images/gm-1.png",
  //     },
  //     {
  //       name: "Chronic disease management",
  //       path: "/medical-specialities/general-medicine/chronic-disease-management",
  //       image: "/images/gm-2.png",
  //     },
  //     {
  //       name: "Preventive health screenings and check-ups",
  //       path: "/medical-specialities/general-medicine/preventive-health-screenings-checkups",
  //       image: "/images/gm-3.png",
  //     },
  //     {
  //       name: "Family medicine and wellness care",
  //       path: "/medical-specialities/general-medicine/family-medicine-wellness-care",
  //       image: "/images/gm-4.png",
  //     },
  //   ],
  // },
  // {
  //   title: "Physiotherapy & Rehabilitation",
  //   path: "/medical-specialities/physiotherapy-rehabilitation",
  //   items: [
  //     {
  //       name: "Musculoskeletal and pain management therapy",
  //       path: "/medical-specialities/physiotherapy-rehabilitation/musculoskeletal-pain-management",
  //       image: "/images/pr-1.png",
  //     },
  //     {
  //       name: "Post-injury and post-operative rehabilitation",
  //       path: "/medical-specialities/physiotherapy-rehabilitation/post-injury-post-operative-rehabilitation",
  //       image: "/images/pr-2.png",
  //     },
  //     {
  //       name: "Neurological physiotherapy",
  //       path: "/medical-specialities/physiotherapy-rehabilitation/neurological-physiotherapy",
  //       image: "/images/pr-3.png",
  //     },
  //     {
  //       name: "Home-based physiotherapy programs",
  //       path: "/medical-specialities/physiotherapy-rehabilitation/home-based-physiotherapy-programs",
  //       image: "/images/pr-4.png",
  //     },
  //   ],
  // },
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

/* ================= SERVICES ================= */

const serviceCategories: SubMenuCategory[] = [
  {
    title: "Facials",
    path: "/services/facials",
    items: [
      {
        name: "Classic Facial",
        path: "/services/facials/classic-facial",
      },
      {
        name: "HydraFacial",
        path: "/services/facials/hydrafacial",
      },
      {
        name: "Vitamin C HydraFacial",
        path: "/services/facials/vitamin-c-hydrafacial",
      },
      {
        name: "Acne Control Facial",
        path: "/services/facials/acne-control-facial",
      },
      {
        name: "Peeling Pearl Facial",
        path: "/services/facials/peeling-pearl-facial",
      },
      {
        name: "Royal Dutch Facial",
        path: "/services/facials/royal-dutch-facial",
      },
    ],
  },
  {
    title: "Advanced Skin Treatments",
    path: "/services/advanced-skin-treatments",
    items: [
      {
        name: "Glowing Dermapen",
        path: "/services/advanced-skin-treatments/glowing-dermapen",
      },
      {
        name: "Exosome Dermapen",
        path: "/services/advanced-skin-treatments/exosome-dermapen",
      },
      {
        name: "Pink Drop",
        path: "/services/advanced-skin-treatments/pink-drop",
      },
      {
        name: "Chemical Peel Brightening Serum",
        path: "/services/advanced-skin-treatments/chemical-peel-brightening-serum",
      },
    ],
  },
  {
    title: "Body & Laser Treatments",
    path: "/services/body-laser-treatments",
    items: [
      {
        name: "Fat Freezing",
        path: "/services/body-laser-treatments/fat-freezing",
      },
      {
        name: "Men’s Laser Hair Removal",
        path: "/services/body-laser-treatments/men-s-laser-hair-removal",
      },
      {
        name: "Women’s Laser Hair Removal",
        path: "/services/body-laser-treatments/women-s-laser-hair-removal",
      },
    ],
  },
];

// Retain the existing hidden datasets without rendering them in navigation.
void medicalSpecialities;
void careServices;

/* ================= TOP NAV ================= */

const navLinks: NavLink[] = [

  {
    name: "Home",
    path: "/",
    type: "link",
  },
  
  {
    name: "About",
    path: "/about",
    type: "link",
  },
  {
    name: "Services",
    path: "/services",
    type: "mega",
    menuKey: "services",
    categories: serviceCategories,
  },
  {
    name: "Our Works",
    path: "/our-works",
    type: "link",
  },
  // {
  //   name: "Blog",
  //   path: "/blog",
  //   type: "link",
  // },
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
      className={`h-[14px] w-[14px] transition-transform duration-300 ${
        open ? "rotate-180" : ""
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

  const activeCategory = categories[activeIndex] || categories[0];

  return (
    <div className="absolute left-1/2 top-[calc(100%+10px)] z-[9999] hidden w-[620px] max-w-[calc(100vw-28px)] -translate-x-1/2 overflow-hidden rounded-[14px] border border-black/[0.06] bg-white px-5 py-4 shadow-[0_22px_55px_rgba(0,0,0,0.14)] lg:block xl:w-[650px]">
      <div className="grid min-h-[165px] grid-cols-[225px_1fr] gap-5 xl:grid-cols-[240px_1fr] xl:gap-6">
        <div className="border-r border-black/10 pr-5 xl:pr-6">
          <div className="flex flex-col gap-2.5">
            {categories.map((category, index) => {
              const isActiveCategory = activeIndex === index;

              return (
                <button
                  key={category.title}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className={`group relative w-full overflow-hidden rounded-[9px] px-3 py-2 text-left font-secondary text-[13px] font-semibold leading-[1.35] transition-all duration-300 ease-out before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:rounded-r-full before:bg-[#8b1d72] before:transition-all before:duration-300 after:absolute after:bottom-[5px] after:left-3 after:h-px after:rounded-full after:bg-[#8b1d72] after:transition-all after:duration-300 ${
                    isActiveCategory
                      ? "translate-x-1 bg-[#8b1d72]/[0.07] text-[#8b1d72] before:opacity-100 after:w-7"
                      : "text-[#2f2f2f] before:opacity-0 after:w-0 hover:translate-x-1 hover:bg-[#8b1d72]/[0.05] hover:text-[#8b1d72] hover:before:opacity-100 hover:after:w-7"
                  }`}
                >
                  {category.title}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-1 py-0.5">
          {activeCategory.items.map((item) => {
            const itemActive = isExactActive(item.path);

            return (
              <Link
                key={item.name}
                href={item.path}
                onClick={closeDesktopMenuNow}
                className={`group relative flex w-full items-center rounded-[8px] px-3 py-2 font-secondary text-[12.5px] leading-[1.4] transition-all duration-300 ease-out before:mr-0 before:h-[5px] before:w-[5px] before:scale-0 before:rounded-full before:bg-[#8b1d72] before:opacity-0 before:transition-all before:duration-300 ${
                  itemActive
                    ? "translate-x-1 bg-[#8b1d72]/[0.07] font-semibold text-[#8b1d72] before:mr-2 before:scale-100 before:opacity-100"
                    : "font-medium text-[#303030] hover:translate-x-1 hover:bg-[#8b1d72]/[0.05] hover:text-[#8b1d72] hover:before:mr-2 hover:before:scale-100 hover:before:opacity-100"
                }`}
              >
                {item.name}
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
        className={`group flex w-full items-center justify-between py-3.5 font-secondary text-[15px] font-semibold transition-colors duration-300 ${
          categories.some((category) => isParentActive(category.path))
            ? "text-[#D6B981]"
            : "text-white"
        }`}
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
            const isOpenCategory = activeIndex === index;
            const categoryActive = isParentActive(category.path);

            return (
              <div
                key={category.title}
                className={`mb-2 overflow-hidden rounded-[10px] border border-white/[0.06] transition-colors duration-300 ${
                  categoryActive ? "bg-white/15" : "bg-white/7"
                }`}
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((prev) => (prev === index ? null : index))
                  }
                  className={`group flex w-full items-center justify-between px-3.5 py-2.5 text-left font-secondary text-[14px] font-semibold leading-5 transition-all duration-300 ${
                    categoryActive ? "text-[#D6B981]" : "text-white"
                  }`}
                >
                  {category.title}
                  <ChevronIcon open={isOpenCategory} />
                </button>

                <div
                  className={`grid overflow-hidden transition-all duration-300 ${
                    isOpenCategory
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0">
                    <ul className="space-y-1.5 px-3.5 pb-3.5 pt-1">
                      {category.items.map((item) => {
                        const itemActive = isExactActive(item.path);

                        return (
                          <li key={item.name}>
                            <Link
                              href={item.path}
                              onClick={closeMobileMenu}
                              className={`group relative block rounded-[8px] px-3 py-2 font-secondary text-[13px] leading-[1.45] transition-all duration-300 ${
                                itemActive
                                  ? "bg-[#8b1d72] font-semibold text-white"
                                  : "text-white/75 hover:translate-x-1 hover:bg-white/[0.08] hover:text-[#D6B981]"
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

import { AuthModal, AuthView } from "@/components/ui/AuthModal";

function UserDropdown({ user, logout, openAuth }: { user: any, logout: () => void, openAuth: (view: AuthView) => void }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-[40px] w-[40px] items-center justify-center rounded-full border-2 border-[#d9d9d9] bg-[#f6f6f6] text-black transition hover:border-[#8b1d72] hover:bg-white hover:text-[#8b1d72] xl:h-[46px] xl:w-[46px]"
        aria-label="User menu"
      >
        <UserIcon className="h-4 w-4 xl:h-5 xl:w-5" />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-[99999] min-w-[200px] rounded-[12px] border border-gray-100 bg-white p-2 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
          {user ? (
            <>
              <div className="mb-1 border-b border-gray-100 px-3 py-2 pb-3 font-secondary text-[14px] font-bold text-gray-800">
                {user.full_name || user.first_name || "User"}
              </div>
              <Link
                href={user.role === 'customer' ? "/customer/dashboard" : "/admin/dashboard"}
                className="block rounded-[8px] px-3 py-2 font-secondary text-[14px] font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#8b1d72]"
                onClick={() => setOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
                className="mt-1 w-full rounded-[8px] px-3 py-2 text-left font-secondary text-[14px] font-medium text-red-600 transition-colors hover:bg-red-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setOpen(false);
                  openAuth('patient_login');
                }}
                className="block w-full text-left rounded-[8px] px-3 py-2 font-secondary text-[14px] font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#8b1d72]"
              >
                Patient Login
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  openAuth('staff_login');
                }}
                className="block w-full text-left rounded-[8px] px-3 py-2 font-secondary text-[14px] font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#8b1d72]"
              >
                Staff Login
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const currentPath = cleanPath(pathname);
  const { openModal } = useBookingModal();
  const { user, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"services" | null>(null);
  const [servicesActive, setServicesActive] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<AuthView>('patient_login');

  const openAuth = (view: AuthView) => {
    setAuthModalView(view);
    setAuthModalOpen(true);
  };

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

  const openDesktopMenu = (menu: "services") => {
    clearCloseTimer();
    setOpenMenu(menu);
    setServicesActive(getActiveCategoryIndex(serviceCategories));
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
    setServicesActive(getActiveCategoryIndex(serviceCategories));
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
    `group relative inline-flex font-secondary text-[15px] font-medium transition-colors duration-300 after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:rounded-full after:bg-[#8b1d72] after:transition-all after:duration-300 ${
      isExactActive(href)
        ? "text-[#8b1d72] after:w-full"
        : "text-[#2f2f2f] hover:text-[#8b1d72] hover:after:w-full"
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
          className={`rounded-[10px] bg-white px-4 py-2 transition-shadow duration-500 lg:rounded-[12px] lg:px-5 ${
            isScrolled
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
                        className={`group relative flex items-center gap-1.5 font-secondary text-[15px] transition-colors duration-300 after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:rounded-full after:bg-[#8b1d72] after:transition-all after:duration-300 ${
                          activeMega
                            ? "font-semibold text-[#8b1d72] after:w-full"
                            : isOpen
                            ? "font-semibold text-black after:w-full"
                            : "font-medium text-[#2f2f2f] hover:text-[#8b1d72] hover:after:w-full"
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
                      onMouseEnter={closeDesktopMenuNow}
                      onFocus={closeDesktopMenuNow}
                      className={navLinkClass(link.path)}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="hidden justify-end lg:flex lg:items-center lg:gap-3">
              <UserDropdown user={user} logout={logout} openAuth={openAuth} />

              <button
                onMouseEnter={closeDesktopMenuNow}
                onFocus={closeDesktopMenuNow}
                onClick={() => openModal()}
                className="group inline-flex h-[40px] min-w-[105px] items-center justify-center gap-1.5 rounded-full border-2 border-[#d9d9d9] bg-[#f6f6f6] px-3 font-secondary text-[13px] font-semibold leading-none text-black transition duration-300 hover:border-[#8b1d72] hover:bg-white hover:text-[#8b1d72] xl:h-[46px] xl:min-w-[150px] xl:gap-2 xl:px-4 xl:text-[14px]"
              >
                <AssistSparkle />
                <span className="translate-y-[1px] whitespace-nowrap">
                  Book Now
                </span>
              </button>
            </div>
          </div>

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
                    currentPath={currentPath}
                  />
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={closeMobileMenu}
                  className={`group relative block border-b border-white/10 py-3.5 font-secondary text-[15px] font-semibold transition-colors duration-300 after:absolute after:bottom-2 after:left-0 after:h-px after:rounded-full after:bg-[#D6B981] after:transition-all after:duration-300 ${
                    isExactActive(link.path)
                      ? "text-[#D6B981] after:w-10"
                      : "text-white hover:text-[#D6B981] hover:after:w-10"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {user ? (
              <>
                <Link
                  href={user.role === 'customer' ? "/customer/dashboard" : "/admin"}
                  onClick={closeMobileMenu}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-[10px] border border-gray-200 bg-white px-5 py-3 font-secondary text-[15px] font-bold text-black"
                >
                  <UserIcon className="h-5 w-5" />
                  {user.full_name || user.first_name || "Dashboard"}
                </Link>
                <button
                  onClick={() => {
                    closeMobileMenu();
                    logout();
                  }}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-[10px] border border-red-200 bg-red-50 px-5 py-3 font-secondary text-[15px] font-bold text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    closeMobileMenu();
                    openAuth('patient_login');
                  }}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-[10px] border border-gray-200 bg-white px-5 py-3 font-secondary text-[15px] font-bold text-black"
                >
                  <UserIcon className="h-5 w-5" />
                  Patient Login
                </button>
                <button
                  onClick={() => {
                    closeMobileMenu();
                    openAuth('staff_login');
                  }}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-[10px] border border-gray-200 bg-white px-5 py-3 font-secondary text-[15px] font-bold text-black"
                >
                  <UserIcon className="h-5 w-5" />
                  Staff Login
                </button>
              </>
            )}

            <button
              onClick={() => {
                closeMobileMenu();
                openModal();
              }}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#D6B981] px-5 py-3 font-secondary text-[15px] font-bold text-[#200020]"
            >
              <AssistSparkle />
              Book Now
            </button>
          </div>
        </nav>

        {openMenu && (
          <DesktopMegaMenu
            categories={serviceCategories}
            activeIndex={servicesActive}
            setActiveIndex={setServicesActive}
            currentPath={currentPath}
            closeDesktopMenuNow={closeDesktopMenuNow}
          />
        )}
      </div>
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        initialView={authModalView} 
      />
    </header>
  );
}
