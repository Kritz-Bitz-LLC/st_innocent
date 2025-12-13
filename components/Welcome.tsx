import { useTheme, Box, Grid, Typography } from "@mui/material";

// Static content
const WELCOME_DATA = {
  churchSvg: "/img/welcome_church_icon.svg",
  welcomeText:
    "We are a community of Christians striving to become \"partakers of the divine nature\" (2 Peter 1:4), day-by-day growing in love for God and neighbor. Join us as we live ancient christianity in the modern world!",
};

interface UpcomingEventBoxProps {
  info: string;
  date: string;
}

function UpcomingEventBox(props: UpcomingEventBoxProps) {
  const theme = useTheme();
  return (
    <>
      <Typography
        variant="h5"
        component="p"
        sx={{
          textAlign: "center",
          color: "#fff",
        }}
      >
        <span style={{ whiteSpace: "nowrap" }}>Next {props.info}</span>
      </Typography>
      <Box
        sx={{
          textAlign: "center",
          backgroundColor: theme.palette.secondary.main,
          padding: "2.5%",
          color: "#fff",
        }}
      >
        <Typography
          variant="h6"
          component="p"
          sx={{
            textAlign: "center",
            color: "#fff",
          }}
        >
          {props.date}
        </Typography>
      </Box>
    </>
  );
}

export default function WelcomeSection() {
  const theme = useTheme();
  return (
    <section id="welcome">
      <Grid
        container
        style={{
          backgroundColor: theme.palette.primary.main,
          marginTop: "0",
        }}
      >
        <Grid size={{ xs: 0, sm: 2 }} />
        <Grid size={{ xs: 12, sm: 8 }}>
          <Box
            sx={{
              padding: "5%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <img style={{ width: "40%" }} src={WELCOME_DATA.churchSvg} alt="Church Icon" />
            <Typography
              variant="h1"
              component="h2"
              sx={{ color: theme.palette.secondary.main, textTransform: "uppercase" }}
            >
              Welcome
            </Typography>
            <Typography
              variant="h5"
              component="p"
              sx={{ width: "50%", textAlign: "center", color: "#fff" }}
            >
              {WELCOME_DATA.welcomeText}
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 0, sm: 2 }} />
      </Grid>
    </section>
  );
}
