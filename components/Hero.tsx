import {
  useTheme,
  useMediaQuery,
  Container,
  Box,
  styled,
  keyframes,
} from "@mui/material";

// Static content
const HERO_DATA = {
  backgroundImage: "/img/hero_background.webp",
  cursiveImage: "/img/hero_cursive_logo.svg",
};

const HeroLayoutRoot = styled("section")(({ theme }) => ({
  color: theme.palette.common.white,
  position: "relative",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor: "rgba(0,0,0,.5)",
  height: "100vh",
}));

const FadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1;}
`;

const Background = styled(Box)({
  animation: `${FadeIn}`,
  animationDuration: "4s",
  animationFillMode: "forwards",
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  zIndex: -2,
});

export default function HeroSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <HeroLayoutRoot id="hero">
      <Container
        sx={{
          mt: 3,
          mb: 14,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Preload background image */}
        <img
          src={HERO_DATA.backgroundImage}
          style={{ display: "none" }}
          alt=""
        />
        <img
          style={{ width: "65%" }}
          src={HERO_DATA.cursiveImage}
          alt="St. Innocent Orthodox Church"
        />
        <Background
          sx={{
            backgroundImage: `url(${HERO_DATA.backgroundImage})`,
            backgroundPosition: "center",
            backgroundColor: "#000",
          } as any}
        />
      </Container>
    </HeroLayoutRoot>
  );
}
