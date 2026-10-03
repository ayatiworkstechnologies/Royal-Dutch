"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { User as UserIcon } from "lucide-react";

import { useBookingModal } from "@/context/BookingModalContext";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal, AuthView } from "@/components/ui/AuthModal";

/* =========================================================
   TYPES
========================================================= */

type SubMenuItem = {
  name: string;
  path: string;
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

/* =========================================================
   SERVICES
========================================================= */

const serviceCategories: SubMenuCategory[] = [
  {
    title: "Aesthetic & Skin Care",
    path: "/services/aesthetic-skin-care",
    items: [
      {
        name: "Facial Treatments",
        path: "/services/aesthetic-skin-care/facial-treatments",
      },
      {
        name: "Advanced Skin Treatments",
        path: "/services/aesthetic-skin-care/advanced-skin-treatments",
      },
      {
        name: "Laser Hair Removal – Women",
        path: "/services/aesthetic-skin-care/women-s-laser-hair-removal",
      },
      {
        name: "Laser Hair Removal – Men",
        path: "/services/aesthetic-skin-care/men-s-laser-hair-removal",
      },
      {
        name: "Other Services",
        path: "/services/aesthetic-skin-care/other-services",
      },
    ],
  },

  {
    title: "Home Care Services",
    path: "/services/home-care-services",
    items: [
      {
        name: "General Home Care",
        path: "/services/home-care-services/general-home-care",
      },
      {
        name: "Nursing & Clinical Care",
        path: "/services/home-care-services/nursing-clinical-care",
      },
      {
        name: "Elderly & Long-Term Care",
        path: "/services/home-care-services/elderly-long-term-care",
      },
      {
        name: "Physiotherapy Support",
        path: "/services/home-care-services/physiotherapy-support",
      },
    ],
  },

  {
    title: "Dental Services",
    path: "/services/dental-services",
    items: [
      {
        name: "Consultation & Diagnostics",
        path: "/services/dental-services/consultation-diagnostics",
      },
      {
        name: "Preventive Dentistry",
        path: "/services/dental-services/preventive-dentistry",
      },
      {
        name: "Restorative Dentistry",
        path: "/services/dental-services/restorative-dentistry",
      },
      {
        name: "Extractions & Surgery",
        path: "/services/dental-services/extractions-surgery",
      },
      {
        name: "Pediatric Dentistry",
        path: "/services/dental-services/pediatric-dentistry",
      },
      {
        name: "Prosthodontics",
        path: "/services/dental-services/prosthodontics",
      },
      {
        name: "Cosmetic Dentistry",
        path: "/services/dental-services/cosmetic-dentistry",
      },
    ],
  },

  {
    title: "General Practitioner (GP)",
    path: "/services/general-practitioner",
    items: [
      {
        name: "General Consultations",
        path: "/services/general-practitioner/general-consultations",
      },
      {
        name: "Medical Services",
        path: "/services/general-practitioner/medical-services",
      },
      {
        name: "Documentation & Certificates",
        path: "/services/general-practitioner/documentation-certificates",
      },
    ],
  },
];

/* =========================================================
   TOP NAVIGATION
========================================================= */

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
  {
    name: "Contact",
    path: "/contact",
    type: "link",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function cleanPath(path?: string | null) {
  if (!path) return "/";

  return path !== "/" && path.endsWith("/")
    ? path.slice(0, -1)
    : path;
}

function isPathActive(currentPath: string, path: string) {
  if (!path || path === "#") {
    return false;
  }

  const cleanCurrent = cleanPath(currentPath);
  const cleanTarget = cleanPath(path);

  return (
    cleanCurrent === cleanTarget ||
    cleanCurrent.startsWith(`${cleanTarget}/`)
  );
}

/* =========================================================
   CHEVRON
========================================================= */

function ChevronIcon({
  open = false,
}: {
  open?: boolean;
}) {
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

/* =========================================================
   ARROW
========================================================= */

function ArrowIcon() {
  return (
    <svg
      className="h-[15px] w-[15px]"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12H19M13 6L19 12L13 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   BOOK ICON
========================================================= */

function AssistSparkle() {
  return (
    <span className="assist-glow-icon" aria-hidden="true">
      ✦
    </span>
  );
}

/* =========================================================
   DESKTOP MEGA MENU
========================================================= */

function DesktopMegaMenu({
  categories,
  activeIndex,
  setActiveIndex,
  closeDesktopMenuNow,
  currentPath,
}: {
  categories: SubMenuCategory[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  closeDesktopMenuNow: () => void;
  currentPath: string;
}) {
  const activeCategory =
    categories[activeIndex] || categories[0];

  return (
    <div
      className="
        absolute
        left-1/2
        top-[calc(100%+10px)]
        z-[9999]
        hidden
        w-[900px]
        max-w-[calc(100vw-32px)]
        -translate-x-1/2
        overflow-hidden
        rounded-[18px]
        border
        border-black/[0.06]
        bg-white
        shadow-[0_24px_70px_rgba(0,0,0,0.14)]
        lg:block
      "
    >
      <div className="grid min-h-[300px] grid-cols-[310px_1fr]">

        {/* LEFT */}
        <div
          className="
            border-r
            border-black/[0.07]
            bg-[#fbf9fa]
            p-5
          "
        >
          <p
            className="
              mb-3
              px-3
              font-secondary
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.15em]
              text-black/40
            "
          >
            Service Categories
          </p>

          <div className="flex flex-col gap-1.5">
            {categories.map((category, index) => {
              const selected =
                activeIndex === index;

              const categoryActive =
                isPathActive(
                  currentPath,
                  category.path
                );

              return (
                <button
                  key={category.title}
                  type="button"
                  onMouseEnter={() =>
                    setActiveIndex(index)
                  }
                  onFocus={() =>
                    setActiveIndex(index)
                  }
                  onClick={() =>
                    setActiveIndex(index)
                  }
                  className={`
                    group
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-[10px]
                    px-4
                    py-3
                    text-left
                    font-secondary
                    text-[13px]
                    font-semibold
                    leading-[1.35]
                    transition-all
                    duration-300

                    ${
                      selected
                        ? `
                          bg-[#8b1d72]
                          text-white
                          shadow-[0_8px_20px_rgba(139,29,114,0.16)]
                        `
                        : categoryActive
                        ? `
                          bg-[#8b1d72]/[0.08]
                          text-[#8b1d72]
                        `
                        : `
                          text-[#303030]
                          hover:bg-[#8b1d72]/[0.06]
                          hover:text-[#8b1d72]
                        `
                    }
                  `}
                >
                  <span>{category.title}</span>

                  <span
                    className={`
                      ml-4
                      shrink-0
                      transition-transform
                      duration-300

                      ${
                        selected
                          ? "text-white"
                          : `
                            text-[#8b1d72]
                            group-hover:translate-x-1
                          `
                      }
                    `}
                  >
                    <ArrowIcon />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT */}
        <div className="p-6">
          <div
            className="
              mb-4
              border-b
              border-black/[0.06]
              pb-4
            "
          >
            <p
              className="
                font-secondary
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.15em]
                text-[#8b1d72]
              "
            >
              Explore
            </p>

            <h4
              className="
                mt-1
                font-secondary
                text-[18px]
                font-semibold
                text-[#222222]
              "
            >
              {activeCategory.title}
            </h4>
          </div>

          {/* SUB SERVICES */}
          <div className="grid grid-cols-2 gap-2.5">
            {activeCategory.items.map((item) => {
              const active =
                isPathActive(
                  currentPath,
                  item.path
                );

              return (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={closeDesktopMenuNow}
                  className={`
                    group
                    flex
                    min-h-[50px]
                    items-center
                    justify-between
                    rounded-[10px]
                    border
                    px-4
                    py-3
                    font-secondary
                    text-[12.5px]
                    font-medium
                    leading-[1.4]
                    transition-all
                    duration-300

                    ${
                      active
                        ? `
                          border-[#8b1d72]/20
                          bg-[#8b1d72]/[0.07]
                          text-[#8b1d72]
                        `
                        : `
                          border-black/[0.06]
                          bg-white
                          text-[#333333]
                          hover:-translate-y-[1px]
                          hover:border-[#8b1d72]/20
                          hover:bg-[#8b1d72]/[0.04]
                          hover:text-[#8b1d72]
                          hover:shadow-[0_8px_18px_rgba(0,0,0,0.05)]
                        `
                    }
                  `}
                >
                  <span>{item.name}</span>

                  <span
                    className="
                      ml-3
                      shrink-0
                      text-[#8b1d72]
                      opacity-40
                      transition-all
                      duration-300
                      group-hover:translate-x-1
                      group-hover:opacity-100
                    "
                  >
                    <ArrowIcon />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE SERVICES
========================================================= */

function MobileAccordion({
  title,
  categories,
  currentPath,
  closeMobileMenu,
}: {
  title: string;
  categories: SubMenuCategory[];
  currentPath: string;
  closeMobileMenu: () => void;
}) {
  const serviceRouteActive =
    currentPath.startsWith("/services");

  const initialCategory =
    categories.findIndex((category) =>
      isPathActive(currentPath, category.path)
    );

  const [open, setOpen] =
    useState(serviceRouteActive);

  const [activeIndex, setActiveIndex] =
    useState<number | null>(
      initialCategory >= 0
        ? initialCategory
        : null
    );

  return (
    <div className="border-b border-white/10">

      {/* SERVICES */}
      <button
        type="button"
        onClick={() =>
          setOpen((prev) => !prev)
        }
        className={`
          group
          flex
          w-full
          items-center
          justify-between
          py-3.5
          font-secondary
          text-[15px]
          font-semibold
          transition-colors
          duration-300
          hover:text-[#D6B981]

          ${
            serviceRouteActive
              ? "text-[#D6B981]"
              : "text-white"
          }
        `}
      >
        {title}

        <ChevronIcon open={open} />
      </button>

      <div
        className={`
          grid
          overflow-hidden
          transition-all
          duration-300

          ${
            open
              ? `
                grid-rows-[1fr]
                opacity-100
              `
              : `
                grid-rows-[0fr]
                opacity-0
              `
          }
        `}
      >
        <div className="min-h-0 pb-4">
          {categories.map(
            (category, index) => {
              const isOpenCategory =
                activeIndex === index;

              const categoryActive =
                isPathActive(
                  currentPath,
                  category.path
                );

              return (
                <div
                  key={category.title}
                  className="
                    mb-2
                    overflow-hidden
                    rounded-[10px]
                    border
                    border-white/[0.06]
                    bg-white/[0.07]
                  "
                >
                  {/* CATEGORY */}
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex(
                        (prev) =>
                          prev === index
                            ? null
                            : index
                      )
                    }
                    className={`
                      group
                      flex
                      w-full
                      items-center
                      justify-between
                      px-3.5
                      py-3
                      text-left
                      font-secondary
                      text-[14px]
                      font-semibold
                      leading-5
                      transition-colors
                      duration-300
                      hover:text-[#D6B981]

                      ${
                        categoryActive
                          ? "text-[#D6B981]"
                          : "text-white"
                      }
                    `}
                  >
                    <span>
                      {category.title}
                    </span>

                    <ChevronIcon
                      open={isOpenCategory}
                    />
                  </button>

                  {/* CHILD SERVICES */}
                  <div
                    className={`
                      grid
                      overflow-hidden
                      transition-all
                      duration-300

                      ${
                        isOpenCategory
                          ? `
                            grid-rows-[1fr]
                            opacity-100
                          `
                          : `
                            grid-rows-[0fr]
                            opacity-0
                          `
                      }
                    `}
                  >
                    <div className="min-h-0">
                      <ul
                        className="
                          space-y-1.5
                          px-3.5
                          pb-3.5
                          pt-1
                        "
                      >
                        {category.items.map(
                          (item) => {
                            const active =
                              isPathActive(
                                currentPath,
                                item.path
                              );

                            return (
                              <li key={item.name}>
                                <Link
                                  href={item.path}
                                  onClick={
                                    closeMobileMenu
                                  }
                                  className={`
                                    group
                                    flex
                                    items-center
                                    justify-between
                                    rounded-[8px]
                                    px-3
                                    py-2.5
                                    font-secondary
                                    text-[13px]
                                    leading-[1.45]
                                    transition-all
                                    duration-300

                                    ${
                                      active
                                        ? `
                                          bg-white/[0.10]
                                          text-[#D6B981]
                                        `
                                        : `
                                          text-white/75
                                          hover:translate-x-1
                                          hover:bg-white/[0.08]
                                          hover:text-[#D6B981]
                                        `
                                    }
                                  `}
                                >
                                  <span>
                                    {item.name}
                                  </span>

                                  <span
                                    className="
                                      opacity-50
                                      transition-all
                                      group-hover:opacity-100
                                    "
                                  >
                                    <ArrowIcon />
                                  </span>
                                </Link>
                              </li>
                            );
                          }
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   USER DROPDOWN
========================================================= */

function UserDropdown({
  user,
  logout,
  openAuth,
}: {
  user: any;
  logout: () => void;
  openAuth: (view: AuthView) => void;
}) {
  const [open, setOpen] =
    useState(false);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div
      className="relative"
      ref={dropdownRef}
    >
      <button
        type="button"
        onClick={() =>
          setOpen((prev) => !prev)
        }
        className="
          group
          flex
          h-[40px]
          items-center
          justify-center
          gap-2
          rounded-full
          border-2
          border-[#d9d9d9]
          bg-[#f6f6f6]
          px-3.5
          font-secondary
          text-[13px]
          font-semibold
          text-black
          transition-all
          duration-300
          hover:border-[#8b1d72]
          hover:bg-white
          hover:text-[#8b1d72]
          xl:h-[46px]
          xl:px-4
          xl:text-[14px]
        "
        aria-label={
          user
            ? "Open account menu"
            : "Open login menu"
        }
      >
        <UserIcon
          className="
            h-4
            w-4
            shrink-0
            xl:h-5
            xl:w-5
          "
        />

        <span className="whitespace-nowrap">
          {user ? "Account" : "Login"}
        </span>
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            top-[calc(100%+8px)]
            z-[99999]
            min-w-[200px]
            rounded-[12px]
            border
            border-gray-100
            bg-white
            p-2
            shadow-[0_8px_24px_rgba(0,0,0,0.12)]
          "
        >
          {user ? (
            <>
              <div
                className="
                  mb-1
                  border-b
                  border-gray-100
                  px-3
                  py-2
                  pb-3
                  font-secondary
                  text-[14px]
                  font-bold
                  text-gray-800
                "
              >
                {user.full_name ||
                  user.first_name ||
                  "User"}
              </div>

              <Link
                href={
                  user.role === "customer"
                    ? "/customer/dashboard"
                    : "/admin/dashboard"
                }
                onClick={() =>
                  setOpen(false)
                }
                className="
                  block
                  rounded-[8px]
                  px-3
                  py-2
                  font-secondary
                  text-[14px]
                  font-medium
                  text-gray-600
                  transition-colors
                  hover:bg-gray-50
                  hover:text-[#8b1d72]
                "
              >
                Dashboard
              </Link>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
                className="
                  mt-1
                  w-full
                  rounded-[8px]
                  px-3
                  py-2
                  text-left
                  font-secondary
                  text-[14px]
                  font-medium
                  text-red-600
                  transition-colors
                  hover:bg-red-50
                "
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openAuth(
                    "patient_login"
                  );
                }}
                className="
                  block
                  w-full
                  rounded-[8px]
                  px-3
                  py-2
                  text-left
                  font-secondary
                  text-[14px]
                  font-medium
                  text-gray-600
                  transition-colors
                  hover:bg-gray-50
                  hover:text-[#8b1d72]
                "
              >
                Patient Login
              </button>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openAuth(
                    "staff_login"
                  );
                }}
                className="
                  block
                  w-full
                  rounded-[8px]
                  px-3
                  py-2
                  text-left
                  font-secondary
                  text-[14px]
                  font-medium
                  text-gray-600
                  transition-colors
                  hover:bg-gray-50
                  hover:text-[#8b1d72]
                "
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

/* =========================================================
   HEADER
========================================================= */

export default function Header() {
  const pathname = usePathname();

  const currentPath =
    cleanPath(pathname);

  const { openModal } =
    useBookingModal();

  const { user, logout } =
    useAuth();

  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  const [
    openMenu,
    setOpenMenu,
  ] = useState<"services" | null>(
    null
  );

  const [
    servicesActive,
    setServicesActive,
  ] = useState(0);

  const [
    isScrolled,
    setIsScrolled,
  ] = useState(false);

  const [
    authModalOpen,
    setAuthModalOpen,
  ] = useState(false);

  const [
    authModalView,
    setAuthModalView,
  ] = useState<AuthView>(
    "patient_login"
  );

  const closeTimer =
    useRef<
      ReturnType<typeof setTimeout> | null
    >(null);

  /* =========================================================
     AUTH
  ========================================================= */

  const openAuth = (
    view: AuthView
  ) => {
    setAuthModalView(view);
    setAuthModalOpen(true);
  };

  /* =========================================================
     ACTIVE LINK
  ========================================================= */

  const isExactActive = (
    path: string
  ) => {
    if (path === "#") {
      return false;
    }

    return (
      currentPath ===
      cleanPath(path)
    );
  };

  const servicesRouteActive =
    currentPath === "/services" ||
    currentPath.startsWith(
      "/services/"
    );

  /* =========================================================
     AUTO SELECT ACTIVE SERVICE CATEGORY
  ========================================================= */

  useEffect(() => {
    const activeIndex =
      serviceCategories.findIndex(
        (category) =>
          isPathActive(
            currentPath,
            category.path
          )
      );

    if (activeIndex >= 0) {
      setServicesActive(
        activeIndex
      );
    }
  }, [currentPath]);

  /* =========================================================
     TIMER
  ========================================================= */

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(
        closeTimer.current
      );

      closeTimer.current = null;
    }
  };

  /* =========================================================
     OPEN DESKTOP MENU
  ========================================================= */

  const openDesktopMenu = (
    menu: "services"
  ) => {
    clearCloseTimer();
    setOpenMenu(menu);
  };

  /* =========================================================
     CLOSE DESKTOP MENU
  ========================================================= */

  const closeDesktopMenu = () => {
    clearCloseTimer();

    closeTimer.current =
      setTimeout(() => {
        setOpenMenu(null);
      }, 260);
  };

  const closeDesktopMenuNow =
    () => {
      clearCloseTimer();
      setOpenMenu(null);
    };

  /* =========================================================
     MOBILE
  ========================================================= */

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  /* =========================================================
     ROUTE CHANGE
  ========================================================= */

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [currentPath]);

  /* =========================================================
     BODY SCROLL
  ========================================================= */

  useEffect(() => {
    document.body.style.overflow =
      mobileOpen
        ? "hidden"
        : "";

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [mobileOpen]);

  /* =========================================================
     TIMER CLEANUP
  ========================================================= */

  useEffect(() => {
    return () => {
      clearCloseTimer();
    };
  }, []);

  /* =========================================================
     SCROLL SHADOW
  ========================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(
        window.scrollY > 10
      );
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* =========================================================
     NAV LINK STYLE
  ========================================================= */

  const navLinkClass = (
    href: string
  ) => `
    group
    relative
    inline-flex
    font-secondary
    text-[15px]
    font-medium
    transition-colors
    duration-300

    after:absolute
    after:-bottom-2
    after:left-0
    after:h-[2px]
    after:rounded-full
    after:bg-[#8b1d72]
    after:transition-all
    after:duration-300

    ${
      isExactActive(href)
        ? `
          text-[#8b1d72]
          after:w-full
        `
        : `
          text-[#2f2f2f]
          hover:text-[#8b1d72]
          hover:after:w-full
        `
    }
  `;

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <>
      <header
        className="
          fixed
          left-0
          top-0
          z-[99999]
          w-full
          bg-transparent
          px-2
          pt-2
          sm:px-3
          lg:px-4
        "
      >
        <div
          className="
            relative
            mx-auto
            max-w-[1440px]
          "
          onMouseEnter={
            clearCloseTimer
          }
          onMouseLeave={
            closeDesktopMenu
          }
        >
          <nav
            className={`
              rounded-[10px]
              bg-white
              px-4
              py-2
              transition-shadow
              duration-500

              lg:rounded-[12px]
              lg:px-5

              ${
                isScrolled
                  ? `
                    shadow-[0_8px_28px_rgba(0,0,0,0.10)]
                  `
                  : "shadow-none"
              }
            `}
          >
            <div
              className="
                grid
                items-center
                gap-4
                lg:grid-cols-[230px_1fr_110px]
                xl:grid-cols-[260px_1fr_118px]
              "
            >
              {/* LOGO */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >
                <Link
                  href="/"
                  onClick={
                    closeMobileMenu
                  }
                  className="inline-flex"
                >
                  <Image
                    src="/icons/logo.svg"
                    alt="Royal Dutch Medical Centre"
                    width={225}
                    height={62}
                    priority
                    style={{
                      height: "auto",
                    }}
                    className="
                      w-[140px]
                      sm:w-[160px]
                      lg:w-[170px]
                      xl:w-[190px]
                    "
                  />
                </Link>

                {/* MOBILE HAMBURGER */}
                <button
                  type="button"
                  onClick={() =>
                    setMobileOpen(
                      (prev) => !prev
                    )
                  }
                  aria-label="Toggle menu"
                  aria-expanded={
                    mobileOpen
                  }
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-[8px]
                    bg-[#8b1d72]
                    text-white
                    transition
                    hover:bg-[#D6B981]
                    hover:text-[#200020]
                    lg:hidden
                  "
                >
                  <span
                    className="
                      relative
                      h-4
                      w-5
                    "
                  >
                    <span
                      className={`
                        absolute
                        left-0
                        top-0
                        h-[2px]
                        w-5
                        rounded-full
                        bg-current
                        transition

                        ${
                          mobileOpen
                            ? `
                              translate-y-[7px]
                              rotate-45
                            `
                            : ""
                        }
                      `}
                    />

                    <span
                      className={`
                        absolute
                        left-0
                        top-[7px]
                        h-[2px]
                        w-5
                        rounded-full
                        bg-current
                        transition

                        ${
                          mobileOpen
                            ? "opacity-0"
                            : ""
                        }
                      `}
                    />

                    <span
                      className={`
                        absolute
                        left-0
                        top-[14px]
                        h-[2px]
                        w-5
                        rounded-full
                        bg-current
                        transition

                        ${
                          mobileOpen
                            ? `
                              -translate-y-[7px]
                              -rotate-45
                            `
                            : ""
                        }
                      `}
                    />
                  </span>
                </button>
              </div>

              {/* DESKTOP NAVIGATION */}
              <div
                className="
                  hidden
                  items-center
                  justify-center
                  lg:flex
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-center
                    gap-9
                    xl:gap-10
                  "
                >
                  {navLinks.map(
                    (link) => {
                      const isMega =
                        link.type ===
                          "mega" &&
                        link.menuKey;

                      const isOpen =
                        isMega &&
                        openMenu ===
                          link.menuKey;

                      if (isMega) {
                        return (
                          <button
                            key={
                              link.name
                            }
                            type="button"
                            onMouseEnter={() =>
                              openDesktopMenu(
                                link.menuKey!
                              )
                            }
                            onFocus={() =>
                              openDesktopMenu(
                                link.menuKey!
                              )
                            }
                            onClick={() => {
                              if (
                                openMenu ===
                                link.menuKey
                              ) {
                                closeDesktopMenuNow();
                              } else {
                                openDesktopMenu(
                                  link.menuKey!
                                );
                              }
                            }}
                            aria-expanded={
                              Boolean(
                                isOpen
                              )
                            }
                            className={`
                              group
                              relative
                              flex
                              items-center
                              gap-1.5
                              font-secondary
                              text-[15px]
                              transition-colors
                              duration-300

                              after:absolute
                              after:-bottom-2
                              after:left-0
                              after:h-[2px]
                              after:rounded-full
                              after:bg-[#8b1d72]
                              after:transition-all
                              after:duration-300

                              ${
                                isOpen ||
                                servicesRouteActive
                                  ? `
                                    font-semibold
                                    text-[#8b1d72]
                                    after:w-full
                                  `
                                  : `
                                    font-medium
                                    text-[#2f2f2f]
                                    hover:text-[#8b1d72]
                                    hover:after:w-full
                                  `
                              }
                            `}
                          >
                            {link.name}

                            <ChevronIcon
                              open={Boolean(
                                isOpen
                              )}
                            />
                          </button>
                        );
                      }

                      return (
                        <Link
                          key={
                            link.name
                          }
                          href={
                            link.path
                          }
                          onMouseEnter={
                            closeDesktopMenuNow
                          }
                          onFocus={
                            closeDesktopMenuNow
                          }
                          className={navLinkClass(
                            link.path
                          )}
                        >
                          {link.name}
                        </Link>
                      );
                    }
                  )}
                </div>
              </div>

              {/* LOGIN */}
              <div
                className="
                  hidden
                  justify-end
                  lg:flex
                  lg:items-center
                  lg:gap-3
                "
              >
                <UserDropdown
                  user={user}
                  logout={logout}
                  openAuth={openAuth}
                />

                {/* BOOK NOW */}
                <button
                  type="button"
                  onMouseEnter={
                    closeDesktopMenuNow
                  }
                  onFocus={
                    closeDesktopMenuNow
                  }
                  onClick={() =>
                    openModal()
                  }
                  className="
                    hidden
                    h-[40px]
                    min-w-[105px]
                    items-center
                    justify-center
                    gap-1.5
                    rounded-full
                    border-2
                    border-[#d9d9d9]
                    bg-[#f6f6f6]
                    px-3
                    font-secondary
                    text-[13px]
                    font-semibold
                    leading-none
                    text-black
                  "
                >
                  <AssistSparkle />

                  <span>
                    Book Now
                  </span>
                </button>
              </div>
            </div>

            {/* MOBILE NAV */}
            <div
              className={`
                lg:hidden

                ${
                  mobileOpen
                    ? `
                      mt-4
                      max-h-[calc(100dvh-100px)]
                      overflow-y-auto
                      rounded-[14px]
                      bg-[#35102f]
                      px-4
                      py-4
                      opacity-100
                    `
                    : `
                      max-h-0
                      overflow-hidden
                      opacity-0
                    `
                }

                transition-all
                duration-300
              `}
            >
              {navLinks.map(
                (link) => {
                  const isMega =
                    link.type ===
                      "mega" &&
                    link.categories;

                  if (isMega) {
                    return (
                      <MobileAccordion
                        key={
                          link.name
                        }
                        title={
                          link.name
                        }
                        categories={
                          link.categories!
                        }
                        currentPath={
                          currentPath
                        }
                        closeMobileMenu={
                          closeMobileMenu
                        }
                      />
                    );
                  }

                  return (
                    <Link
                      key={link.name}
                      href={link.path}
                      onClick={
                        closeMobileMenu
                      }
                      className={`
                        group
                        relative
                        block
                        border-b
                        border-white/10
                        py-3.5
                        font-secondary
                        text-[15px]
                        font-semibold
                        transition-colors
                        duration-300

                        after:absolute
                        after:bottom-2
                        after:left-0
                        after:h-px
                        after:rounded-full
                        after:bg-[#D6B981]
                        after:transition-all
                        after:duration-300

                        ${
                          isExactActive(
                            link.path
                          )
                            ? `
                              text-[#D6B981]
                              after:w-10
                            `
                            : `
                              text-white
                              hover:text-[#D6B981]
                              hover:after:w-10
                            `
                        }
                      `}
                    >
                      {link.name}
                    </Link>
                  );
                }
              )}

              {/* MOBILE ACCOUNT */}
              {user ? (
                <>
                  <Link
                    href={
                      user.role ===
                      "customer"
                        ? "/customer/dashboard"
                        : "/admin/dashboard"
                    }
                    onClick={
                      closeMobileMenu
                    }
                    className="
                      mt-5
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-[10px]
                      border
                      border-gray-200
                      bg-white
                      px-5
                      py-3
                      font-secondary
                      text-[15px]
                      font-bold
                      text-black
                    "
                  >
                    <UserIcon className="h-5 w-5" />

                    {user.full_name ||
                      user.first_name ||
                      "Dashboard"}
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      closeMobileMenu();
                      logout();
                    }}
                    className="
                      mt-3
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-[10px]
                      border
                      border-red-200
                      bg-red-50
                      px-5
                      py-3
                      font-secondary
                      text-[15px]
                      font-bold
                      text-red-600
                    "
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      closeMobileMenu();

                      openAuth(
                        "patient_login"
                      );
                    }}
                    className="
                      mt-5
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-[10px]
                      border
                      border-gray-200
                      bg-white
                      px-5
                      py-3
                      font-secondary
                      text-[15px]
                      font-bold
                      text-black
                    "
                  >
                    <UserIcon className="h-5 w-5" />
                    Patient Login
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      closeMobileMenu();

                      openAuth(
                        "staff_login"
                      );
                    }}
                    className="
                      mt-3
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-[10px]
                      border
                      border-gray-200
                      bg-white
                      px-5
                      py-3
                      font-secondary
                      text-[15px]
                      font-bold
                      text-black
                    "
                  >
                    <UserIcon className="h-5 w-5" />
                    Staff Login
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  openModal();
                }}
                className="
                  mt-5
                  hidden
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-[10px]
                  bg-[#D6B981]
                  px-5
                  py-3
                  font-secondary
                  text-[15px]
                  font-bold
                  text-[#200020]
                "
              >
                <AssistSparkle />
                Book Now
              </button>
            </div>
          </nav>

          {/* DESKTOP MEGA MENU */}
          {openMenu ===
            "services" && (
            <DesktopMegaMenu
              categories={
                serviceCategories
              }
              activeIndex={
                servicesActive
              }
              setActiveIndex={
                setServicesActive
              }
              closeDesktopMenuNow={
                closeDesktopMenuNow
              }
              currentPath={
                currentPath
              }
            />
          )}
        </div>
      </header>

      {/* AUTH MODAL */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() =>
          setAuthModalOpen(false)
        }
        initialView={
          authModalView
        }
      />
    </>
  );
}
