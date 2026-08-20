import { fireEvent, render, screen } from "@testing-library/react";
import { useTheme } from "@mui/material";
import { useContext } from "react";
import { beforeEach, describe, expect, it } from "vitest";
import ThemedLayout, {
  ColorModeContext,
} from "../../src/components/ThemedLayout";
import useHighContrastStore from "../../src/stores/highContrastStore";

// A probe that reads the theme ThemedLayout actually built, via the same
// useTheme()/useContext() hooks a real descendant would use -- there's no
// other way to observe the local `mode`/`theme` state from outside.
const ThemeProbe = () => {
  const theme = useTheme();
  const { toggleColorMode } = useContext(ColorModeContext);
  return (
    <div>
      <span data-testid="mode">{theme.palette.mode}</span>
      <span data-testid="success">{theme.palette.success.main}</span>
      <button onClick={toggleColorMode}>toggle</button>
    </div>
  );
};

// tests/setup.ts installs a permanent, writable-but-not-configurable
// matchMedia polyfill (matches: false always). Redefining only `value` (and
// leaving `writable`/`configurable` unspecified, so they keep their current
// values) is allowed on a writable property even when it isn't configurable
// -- the same trick setup.ts itself used to install it in the first place.
const setMatchMediaMatches = (matches: boolean) => {
  Object.defineProperty(window, "matchMedia", {
    value: (query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
};

const renderThemed = () =>
  render(
    <ThemedLayout>
      <ThemeProbe />
    </ThemedLayout>
  );

describe("ThemedLayout", () => {
  beforeEach(() => {
    localStorage.clear();
    useHighContrastStore.setState(
      useHighContrastStore.getInitialState(),
      true
    );
    setMatchMediaMatches(false);
  });

  it('honors a stored "dark" theme preference on mount', () => {
    localStorage.setItem("theme", "dark");
    renderThemed();
    expect(screen.getByTestId("mode")).toHaveTextContent("dark");
  });

  it('honors a stored "light" theme preference on mount', () => {
    localStorage.setItem("theme", "light");
    renderThemed();
    expect(screen.getByTestId("mode")).toHaveTextContent("light");
  });

  it("falls back to the OS dark preference and persists it when nothing is stored", () => {
    setMatchMediaMatches(true);
    renderThemed();
    expect(screen.getByTestId("mode")).toHaveTextContent("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("falls back to light and persists it when nothing is stored and the OS has no dark preference", () => {
    setMatchMediaMatches(false);
    renderThemed();
    expect(screen.getByTestId("mode")).toHaveTextContent("light");
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("toggleColorMode flips the mode and persists the new value", () => {
    localStorage.setItem("theme", "light");
    renderThemed();
    expect(screen.getByTestId("mode")).toHaveTextContent("light");

    fireEvent.click(screen.getByRole("button", { name: "toggle" }));

    expect(screen.getByTestId("mode")).toHaveTextContent("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("swaps in the colorblind-safe success color when highContrast is on", () => {
    useHighContrastStore.setState({ highContrast: true });
    localStorage.setItem("theme", "light");
    renderThemed();
    expect(screen.getByTestId("success")).toHaveTextContent("#F5793A");
  });

  it("uses the default green success color when highContrast is off", () => {
    useHighContrastStore.setState({ highContrast: false });
    localStorage.setItem("theme", "light");
    renderThemed();
    expect(screen.getByTestId("success")).toHaveTextContent("#6AAA64");
  });
});
