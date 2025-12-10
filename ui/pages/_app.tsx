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
  primaryMain: "#2a446a",
  primaryHover: "#385b8f",
  secondaryMain: "#e98520",
  secondaryHover: "#c36b13",
};

export default function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    palette: {
      primary: {
        main: colors.primaryMain,
      },
      secondary: {
        main: colors.secondaryMain,
      },
    },
    typography: {
      fontFamily: "Staatliches",
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
