import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// vitest.config.ts doesn't set test.globals, so Testing Library's
// auto-cleanup (which relies on a global afterEach) never registers.
afterEach(() => {
  cleanup();
});

// jsdom doesn't implement matchMedia. MUI's useMediaQuery (and
// ThemedLayout's dark-mode check) call it unconditionally on mount.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
