import { useTheme, useMediaQuery, Box, Typography } from "@mui/material";
import { Carousel } from "@/components";

// Static content
const PARISH_LIFE_DATA = {
  items: [
    {
      title: "Sacraments",
      image: "/img/parish_life_sacraments.webp",
      text: "The Holy Mysteries, such as Baptism, Confession, and the Eucharist utilize material means to convey divine grace and thus constitute the center of Orthodox spiritual life.",
    },
    {
      title: "Worship",
      image: "/img/parish_life_worship.webp",
      text: "Join us and experience the reverent beauty of Ancient Christian worship. Our weekend cycle of services starts with Vespers (evening prayer service) on Saturday night, followed by Matins (morning prayer service) on Sunday at 8:30 and culminating in the Divine Liturgy (Communion service) at 9:30.",
    },
    {
      title: "Adult Education",
      image: "/img/parish_life_adult_education.webp",
      text: "Studying the Holy Scriptures and delving into the depths of the Orthodox Christian Faith is a regular part of life at this parish. Fr. Paisios teaches two classes per week, plus the occasional series on various topics.",
    },
    {
      title: "Youth Education",
      image: "/img/parish_life_youth_education.webp",
      text: "Our church school is overflowing with kids who not only learn about Christ, the Gospel, and creation, but also interact, have fun, and build meaningful relationships with peers each week.",
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
          <Typography
            variant="h2"
            component="h3"
            sx={{ color: "#fff", textTransform: "uppercase" }}
          >
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
