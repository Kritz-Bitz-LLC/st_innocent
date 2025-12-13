import { useTheme, useMediaQuery, Box, Typography } from "@mui/material";
import { Carousel } from "@/components";

// Static content
const PARISH_LIFE_DATA = {
  items: [
    {
      title: "Sacraments & Worship",
      image: "/img/parish_life_sacraments_worship.webp",
      text: "The holy mysteries, such as baptism, confession, and the eucharist utilize material means to convey divine grace, and thus constitute the center of orthodox spiritual life.",
    },
    {
      title: "Youth Education",
      image: "/img/parish_life_youth_education.webp",
      text: "Our Church School is overflowing with kids who not only learn about Christ, the Gospel, and creation, but also interact, have fun, and build meaningful relationships with peers each week.",
    },
    {
      title: "Adult Education",
      image: "/img/parish_life_adult_education.webp",
      text: "Studying the Holy Scriptures and delving into the knowledge of the Orthodox Christian Faith is a regular part of life at this parish. Fr. Paisios teaches two classes per week, plus the occasional series on various topics.",
    },
  ],
};

export interface PLItem {
  title: string;
  image: string;
  text: string;
}

export default function ParishLifeSection() {
  const theme = useTheme();

  return (
    <section id="parish-life">
      <Box
        style={{
          backgroundColor: theme.palette.secondary.main,
          marginTop: "0",
          padding: "5%",
        }}
      >
        <Box
          sx={{
            padding: "2.5%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2" component="h3" sx={{ color: "#fff", textTransform: "uppercase" }}>
            Parish Life
          </Typography>
        </Box>

        <Carousel
          items={PARISH_LIFE_DATA.items}
          desktopImageSide="right"
          mobileNavBtnColor="rgba(42, 68, 106, .2)"
          backgroundColor={theme.palette.primary.main}
          titleColor="secondary"
        />
      </Box>
    </section>
  );
}
