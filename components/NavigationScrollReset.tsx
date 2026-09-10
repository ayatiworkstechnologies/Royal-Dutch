"use client";

import { useEffect } from "react";

export default function NavigationScrollReset() {
  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const scrollTopInstant = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };

    const handleClick = (event: MouseEvent) => {
      const link = event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>("a[href]")
        : null;

      if (
        !link || event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
        link.hasAttribute("download") || (link.target && link.target !== "_self")
      ) return;

      const url = new URL(link.href);
      if (url.origin !== window.location.origin) return;

      const currentPath = window.location.pathname + window.location.search;
      if (currentPath !== url.pathname + url.search) scrollTopInstant();
    };

    window.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", scrollTopInstant);

    return () => {
      window.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", scrollTopInstant);
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  return null;
}
