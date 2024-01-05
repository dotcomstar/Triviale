import {
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import React, { ReactNode, useEffect } from "react";
import useHighContrastStore from "../stores/highContrastStore";
import CrimsonWoff2 from "/src/fonts/crimson-text-v19-latin-regular.woff2";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

interface Props {
  children: ReactNode;
}

const ThemedLayout = ({ children }: Props) => {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const highContrast = useHighContrastStore((s) => s.highContrast);

  const setModeAndStore = (mode: "light" | "dark") => {
    setMode(mode);
    localStorage.setItem("theme", mode);
  };

  useEffect(() => {
    // First check if the user has already set a theme preference.
    // If not, check if the user already has a specified theme from
    // their browser.
    // Defaults to light mode.
    const existingPreference = localStorage.getItem("theme");
    if (existingPreference) {
      existingPreference === "light" ? setMode("light") : setMode("dark");
    } else {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setModeAndStore("dark");
      } else {
        setModeAndStore("light");
      }
    }
  }, []);

  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        if (mode === "light") {
          setMode("dark");
          localStorage.setItem("theme", "dark");
        } else {
          setMode("light");
          localStorage.setItem("theme", "light");
        }
      },
    }),
    [mode]
  );

  // Update the theme only if the mode changes
  let theme = React.useMemo(
    () =>
      createTheme({
        typography: {
          h3: {
            fontFamily: "Crimson, Roboto, Arial, sans-serif",
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: `
              @font-face {
                font-family: 'Crimson';
                font-style: normal;
                font-display: swap;
                font-weight: 400;
                src: local('Crimson'), local('Arvo-Regular'), url(${CrimsonWoff2}) format('woff2');
                unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
              }
            `,
          },
        },
        palette: {
          mode: mode === "dark" ? "dark" : "light",
          ...(mode === "light"
            ? {
                // palette values for light mode
                primary: {
                  main: "#D3D6DA",
                  light: "#878A8C",
                  dark: "#D3D6DA",
                },
                secondary: { main: "#9C27B0" },

                error: { main: "#787C7E", dark: "#FFF" },
                info: { main: "#FF0000" },
                ...(highContrast
                  ? {
                      warning: { main: "#85C0F9", contrastText: "#FFFFFF" },
                      success: { main: "#F5793A", contrastText: "#FFFFFF" },
                    }
                  : {
                      warning: { main: "#C9B458", contrastText: "#FFFFFF" },
                      success: { main: "#6AAA64", contrastText: "#FFFFFF" },
                    }),
              }
            : {
                // palette values for dark mode
                primary: {
                  main: "#818384",
                  light: "#565758",
                  dark: "#3A3A3C",
                },
                secondary: { main: "#CE93D8", contrastText: "#FFF" },
                error: { main: "#3A3A3C", dark: "#121213" },
                info: { main: "#FF0000" },
                ...(highContrast
                  ? {
                      warning: { main: "#85C0F9", contrastText: "#FFFFFF" },
                      success: { main: "#F5793A", contrastText: "#FFFFFF" },
                    }
                  : {
                      warning: { main: "#B59F3B", contrastText: "#FFFFFF" },
                      success: { main: "#538D4E", contrastText: "#FFFFFF" },
                    }),
              }),
        },
      }),
    [mode, highContrast]
  );

  theme = responsiveFontSizes(theme);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};

export default ThemedLayout;
