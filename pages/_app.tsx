import { AppProps } from "next/app";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  responsiveFontSizes,
} from "@mui/material";
import "@/styles/calendar.scss";
import "@/styles/global.scss";
import "@/styles/fonts.scss";

// St. Innocent Theme Colors
const colors = {
  primaryMain: "#011936",
  primaryHover: "#0a3a5c",
  secondaryMain: "#9caf88",
  secondaryHover: "#7d9a6b",
  accent: "#465362",
};

export default function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    palette: {
      primary: {
        main: colors.primaryMain,
        dark: colors.primaryHover,
      },
      secondary: {
        main: colors.secondaryMain,
        dark: colors.secondaryHover,
      },
      info: {
        main: colors.accent,
      },
    },
    typography: {
      fontFamily: "'Oswald', sans-serif",
    },
  });

  return (
    <ThemeProvider theme={responsiveFontSizes(theme)}>
      <main>
        <Component {...pageProps} />
        <CssBaseline />
      </main>
    </ThemeProvider>
  );
}
