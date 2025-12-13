import { useTheme, Box, Typography } from "@mui/material";
import { Carousel } from "@/components";

// Static content
const CLERGY_DATA = {
  items: [
    {
      title: "Father Paisios",
      image: "/img/clergy_father_paisios.webp",
      text: "Before pursuing the priesthood, Fr. Paisios worked in mental health as a music therapist. A convert to Orthodoxy, Fr. Paisios has been serving as rector of St. Innocent since December 2025. He holds an M.Div from St. Tikhon's Orthodox Theological Seminary, where he graduated as valedictorian. He and his wife, Matushka Anna, have been blessed with three children.",
    },
    {
      title: "Archbishop Daniel",
      image: "/img/clergy_archbishop_daniel.webp",
      text: "His Eminence, Archbishop Daniel, is the ruling hierarch of Chicago and the Midwest. He serves as our shepherd and archpastor.",
    },
    {
      title: "Deacon Michael",
      image: "/img/clergy_dcn_michael_timko.webp",
      text: "Protodeacon Michael Timko has been serving at the altar for over two decades, but his service extends to all of parish life.",
    },
    {
      title: "Deacon Joseph",
      image: "/img/clergy_dcn_joseph_carter.webp",
      text: "Protodeacon Joseph Carter has served God's altar for over twenty years, including many years in the Antiochian Archdiocese.",
    },
  ],
};

export interface ClergyItem {
  title: string;
  image: string;
  text: string;
}

export default function ClergySection() {
  const theme = useTheme();

  return (
    <section id="clergy">
      <Box
        style={{
          backgroundColor: theme.palette.primary.main,
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
            Clergy
          </Typography>
        </Box>

        <Carousel
          items={CLERGY_DATA.items}
          desktopImageSide="left"
          mobileNavBtnColor="rgba(233,133,32,.2)"
          backgroundColor={theme.palette.secondary.main}
          titleColor="primary"
        />
      </Box>
    </section>
  );
}

