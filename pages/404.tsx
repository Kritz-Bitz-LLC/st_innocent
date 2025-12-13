import Head from "next/head";
import Link from "next/link";
import { useTheme } from "@mui/material";
import { Box, Container, Typography, Button } from "@mui/material";
import { Navbar, Footer } from "@/components";

export default function NotFound() {
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>404 - Page Not Found | Saint Innocent Orthodox Church</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Navbar />
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          paddingTop: "64px",
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center", py: 8 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "6rem", sm: "8rem", md: "10rem" },
              fontWeight: 500,
              color: theme.palette.secondary.main,
              textTransform: "uppercase",
              letterSpacing: "8px",
              mb: 2,
              lineHeight: 1,
            }}
          >
            404
          </Typography>
          <Typography
            variant="h3"
            sx={{
              color: "#fff",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "4px",
              mb: 3,
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            }}
          >
            Page Not Found
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255,255,255,0.9)",
              fontSize: { xs: "1rem", md: "1.2rem" },
              lineHeight: 1.8,
              mb: 4,
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <Button
              component={Link}
              href="/"
              variant="contained"
              sx={{
                backgroundColor: theme.palette.secondary.main,
                color: "#fff",
                padding: "12px 32px",
                fontSize: "1.1rem",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: theme.palette.secondary.dark,
                },
              }}
            >
              Go Home
            </Button>
            <Button
              component={Link}
              href="/#calendar"
              variant="outlined"
              sx={{
                borderColor: theme.palette.secondary.main,
                color: theme.palette.secondary.main,
                padding: "12px 32px",
                fontSize: "1.1rem",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontWeight: 500,
                "&:hover": {
                  borderColor: theme.palette.secondary.dark,
                  color: theme.palette.secondary.dark,
                  backgroundColor: "rgba(156, 175, 136, 0.1)",
                },
              }}
            >
              View Calendar
            </Button>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

