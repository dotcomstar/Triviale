import {
  CssBaseline,
  PaletteColorOptions,
  PaletteMode,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import React, { ReactNode, useEffect } from "react";

declare module "@mui/material/styles" {
  interface CustomPalette {
    almost: PaletteColorOptions;
    success: PaletteColorOptions;
    unclicked: PaletteColorOptions;
    failure: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    almost: true;
    success: true;
    unclicked: true;
    failure: true;
  }
}

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

interface Props {
  children: ReactNode;
}

const ThemedLayout = ({ children }: Props) => {
  const [mode, setMode] = React.useState<PaletteMode>("light");

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

  const { palette } = createTheme();
  const { augmentColor } = palette;
  const createColor = (mainColor: any) =>
    augmentColor({
      color: {
        main: mainColor,
        contrastText: mode === "dark" ? "white" : "black",
      },
    });

  // Update the theme only if the mode changes
  let theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode === "dark" ? "dark" : "light",
          almost: createColor(mode === "dark" ? "#B59F3B" : "#C9B458"),
          success: createColor(mode === "dark" ? "#538D4E" : "#6AAA64"),
          unclicked: createColor(mode === "dark" ? "#818384" : "#D3D6DA"),
          failure: createColor(mode === "dark" ? "#3A3A3C" : "#787C7E"),
        },
      }),
    [mode]
  );

  theme = responsiveFontSizes(theme);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};

export default ThemedLayout;
