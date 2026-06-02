"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { name: "ABOUT", href: "/about" },
  { name: "SERVICES", href: "/services", hasSubmenu: true },
  { name: "OUR WORKS", href: "/our-works" },
  { name: "BLOG", href: "/blog" },
  { name: "CONTACT", href: "/contact" },
];

const serviceLinks = [
  { name: "Hydrafacial", href: "/services/hydrafacial" },
  { name: "Chemical Peeling", href: "/services/chemical-peeling" },
  { name: "Scar Coverup", href: "/services/scar-coverup" },
  { name: "Lux Facial", href: "/services/lux-facial" },
  { name: "Mesotherapy", href: "/services/mesotherapy" },
  { name: "Laser Hair Removal", href: "/services/laser-hair-removal" },
  { name: "General Facial", href: "/services/general-facial" },
  {
    name: "Scalp Micropigmentation",
    href: "/services/scalp-micropigmentation",
  },
  { name: "Laser Rejuvenation", href: "/services/laser-rejuvenation" },
  { name: "BB Glow Facial", href: "/services/bb-glow-facial" },
  {
    name: "Dermapen (Microneedling)",
    href: "/services/dermapen-microneedling",
  },
  {
    name: "Cryolipolysis Fat Freezing",
    href: "/services/cryolipolysis-fat-freezing",
  },
  { name: "Acne Facial", href: "/services/acne-facial" },
  { name: "Skin Lightening", href: "/services/skin-lightening" },
];

export default function Header() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);

  const closeMenu = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="fixed left-0 top-0 z-50 flex w-full justify-center px-4 pt-[14px] md:pt-[22px] lg:pt-[30px]">
      {/* Mobile/tablet outside overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={closeMenu}
          className="fixed inset-0 z-0 bg-black/40 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* Header Glass Box */}
      <div className="relative z-20 flex h-[58px] w-full max-w-[850px] items-center justify-between rounded-[8px] border border-white/20 bg-[#200020]/60 px-5 shadow-[0_8px_28px_rgba(0,0,0,0.22)] backdrop-blur-md md:h-[64px] md:px-8 lg:h-[60px] lg:px-[56px]">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center" onClick={closeMenu}>
          <Image
            src="/icons/logo.svg"
            alt="Royal Dutch Medical Centre"
            width={155}
            height={42}
            priority
            className="h-auto w-[145px] object-contain md:w-[160px] lg:w-[155px]"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-[36px] lg:flex">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            if (item.hasSubmenu) {
              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setDesktopServicesOpen(true)}
                  onMouseLeave={() => setDesktopServicesOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1.5 whitespace-nowrap font-serif text-[14px] font-normal uppercase leading-none transition-all duration-300 ${
                      isActive
                        ? "rounded-[6px] border border-white/25 bg-white/15 px-[13px] py-[10px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] hover:text-[#D6B981]"
                        : "px-0 py-[10px] text-white hover:text-[#D6B981]"
                    }`}
                  >
                    {item.name}
                    <span
                      className={`text-[10px] transition-transform duration-300 ${
                        desktopServicesOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </Link>

                  {/* Invisible hover bridge */}
                  <div className="absolute left-1/2 top-full h-[30px] w-[760px] -translate-x-1/2" />

                  {/* Desktop Services Dropdown */}
                  <div
                    className={`absolute left-1/2 top-[43px] w-[760px] -translate-x-1/2 transition-all duration-300 ${
                      desktopServicesOpen
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-4 opacity-0"
                    }`}
                  >
                    <div className="mt-5 rounded-[8px] border border-white/20 bg-[#200020]/60 px-11 py-8 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl">
                      <div className="grid grid-cols-3 gap-x-16 gap-y-7">
                        {serviceLinks.map((service) => (
                          <Link
                            key={service.name}
                            href={service.href}
                            className="text-[17px] font-medium leading-[1.25] text-white/90 transition duration-300 hover:text-[#D6B981]"
                          >
                            {service.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`whitespace-nowrap font-serif text-[14px] font-normal uppercase leading-none transition-all duration-300 ${
                  isActive
                    ? "rounded-[6px] border border-white/25 bg-white/15 px-[13px] py-[10px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] hover:text-[#D6B981]"
                    : "px-0 py-[10px] text-white hover:text-[#D6B981]"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile + Tablet Hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-[26px] leading-none text-white transition hover:bg-white/10 hover:text-[#D6B981] lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? "×" : "☰"}
        </button>

        {/* Mobile + Tablet Menu */}
        <div
          className={`absolute left-1/2 top-[72px] z-30 w-[calc(100vw-32px)] max-w-[520px] -translate-x-1/2 overflow-hidden rounded-[14px] border border-white/20 bg-[#200020]/65 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-300 lg:hidden ${
            mobileOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-4 opacity-0"
          }`}
        >
          <div className="max-h-[calc(100dvh-120px)] overflow-y-auto px-5 py-5">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                if (item.hasSubmenu) {
                  return (
                    <div key={item.name}>
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen((prev) => !prev)}
                        className={`flex w-full items-center justify-between rounded-[8px] px-4 py-3 font-serif text-[15px] uppercase tracking-[0.5px] text-white transition ${
                          isActive
                            ? "border border-white/25 bg-white/15 hover:text-[#D6B981]"
                            : "hover:bg-white/10 hover:text-[#D6B981]"
                        }`}
                      >
                        <span>{item.name}</span>
                        <span
                          className={`text-[11px] transition-transform duration-300 ${
                            mobileServicesOpen ? "rotate-180" : ""
                          }`}
                        >
                          ▼
                        </span>
                      </button>

                      <div
                        className={`grid overflow-hidden transition-all duration-300 ${
                          mobileServicesOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="min-h-0">
                          <div className="mt-2 grid grid-cols-1 gap-1 rounded-[10px] border border-white/10 bg-white/10 p-3 md:grid-cols-2">
                            {serviceLinks.map((service) => (
                              <Link
                                key={service.name}
                                href={service.href}
                                onClick={closeMenu}
                                className="rounded-md px-3 py-2 text-[14px] leading-[1.3] text-white/90 transition hover:bg-white/10 hover:text-[#D6B981]"
                              >
                                {service.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeMenu}
                    className={`rounded-[8px] px-4 py-3 font-serif text-[15px] uppercase tracking-[0.5px] text-white transition ${
                      isActive
                        ? "border border-white/25 bg-white/15 hover:text-[#D6B981]"
                        : "hover:bg-white/10 hover:text-[#D6B981]"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}