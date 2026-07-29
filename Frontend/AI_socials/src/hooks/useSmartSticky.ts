import { useEffect, useRef } from "react";

export const useSmartSticky = () => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let lastScrollY = window.scrollY;
    let offset = 0;
    let ticking = false;

    const update = () => {
      ticking = false;

      const viewportHeight = window.innerHeight;
      const elementHeight = element.offsetHeight;

      // 1. If sidebar fits entirely inside viewport, simple CSS sticky top is enough
      if (elementHeight <= viewportHeight) {
        element.style.position = "sticky";
        element.style.top = "1rem";
        element.style.bottom = "";
        element.style.transform = "";
        return;
      }

      // 2. For sidebars taller than the viewport:
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Calculate max translation allowed so the element bottom hits viewport bottom
      const maxOffset = elementHeight - viewportHeight + 16; // 16px bottom margin

      // Accumulate scroll direction into offset
      offset = Math.max(0, Math.min(maxOffset, offset + scrollDelta));

      element.style.position = "sticky";
      element.style.top = `-${offset}px`;
      element.style.bottom = "";
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return ref;
};