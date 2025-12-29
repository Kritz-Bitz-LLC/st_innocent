import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import {
  useTheme,
  useMediaQuery,
  Box,
  Container,
  Typography,
  styled,
  keyframes,
} from "@mui/material";
import { Navbar, Footer } from "@/components";

// Local clergy data
const LOCAL_CLERGY_DATA = [
  {
    title: "Father Paisios",
    role: "Rector",
    image: "/img/clergy_fr_paisios.webp",
    text: "Before pursuing the priesthood, Fr. Paisios worked in mental health as a music therapist. A convert to Orthodoxy, Fr. Paisios has been serving as rector of St. Innocent since December 2025. He holds an M.Div from St. Tikhon's Orthodox Theological Seminary, graduating as valedictorian. He and his wife, Matushka Anna, have been blessed with three children.",
  },
  {
    title: "Deacon Michael",
    role: "Protodeacon",
    image: "/img/clergy_dcn_michael_timko.webp",
    text: "Protodeacon Michael Timko has been serving at the altar for over two decades, but his service extends to all of parish life.",
  },
  {
    title: "Deacon Joseph",
    role: "Protodeacon",
    image: "/img/clergy_dcn_joseph_carter.webp",
    text: "Protodeacon Joseph Carter has served God's altar for over twenty years, including many years in the Antiochian Archdiocese.",
  },
];

// Hierarch data (separate section)
const HIERARCH_DATA = [
  {
    title: "Archbishop Daniel",
    role: "Ruling Hierarch",
    image: "/img/clergy_archbishop_daniel.webp",
    text: "His Eminence, Archbishop Daniel, is the ruling hierarch of Chicago and the Midwest. He serves as our shepherd and archpastor.",
  },
];

const FadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const StaggeredFadeIn = styled(Box)<{ delay: number }>(({ delay }) => ({
  animation: `${FadeIn} 0.6s ease-out forwards`,
  animationDelay: `${delay}ms`,
  opacity: 0,
}));

const HeroSection = styled(Box)(({ theme }) => ({
  position: "relative",
  minHeight: "40vh",
  paddingTop: "64px", // Account for fixed navbar
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.secondary.main,
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
    opacity: 0.95,
  },
}));

// Scroll-triggered animation component for each clergy member
function ClergyMemberSection({
  member,
  index,
}: {
  member: (typeof LOCAL_CLERGY_DATA)[0];
  index: number;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const isImageLeft = index % 2 === 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const imageContent = (
    <Box
      sx={{
        flex: { xs: "none", md: "0 0 40%" },
        minHeight: { xs: "350px", md: "450px" },
        position: "relative",
        overflow: "hidden",
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateX(0)"
          : isImageLeft
            ? "translateX(-60px)"
            : "translateX(60px)",
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
      }}
    >
      <Box
        component="img"
        src={member.image}
        alt={member.title}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 20%",
        }}
      />
    </Box>
  );

  const textContent = (
    <Box
      className="text-content"
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: { xs: 4, md: 8 },
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateX(0) scale(1)"
          : isImageLeft
            ? "translateX(60px)"
            : "translateX(-60px)",
        transition: "opacity 0.8s ease-out 0.2s, transform 0.3s ease-out",
      }}
    >
      <Typography
        variant="overline"
        sx={{
          color: theme.palette.secondary.main,
          letterSpacing: "3px",
          fontSize: "0.9rem",
          mb: 1,
        }}
      >
        {member.role}
      </Typography>
      <Typography
        variant="h3"
        component="h2"
        sx={{
          fontWeight: 500,
          color: "#fff",
          mb: 3,
          textTransform: "uppercase",
          letterSpacing: "2px",
          fontSize: { xs: "1.75rem", md: "2.5rem" },
        }}
      >
        {member.title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "rgba(255,255,255,0.9)",
          lineHeight: 2,
          fontSize: { xs: "1rem", md: "1.15rem" },
          maxWidth: "600px",
        }}
      >
        {member.text}
      </Typography>
    </Box>
  );

  return (
    <Box
      ref={sectionRef}
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          md: isImageLeft ? "row" : "row-reverse",
        },
        minHeight: { xs: "auto", md: "450px" },
        backgroundColor:
          index % 2 === 0 ? "rgba(255,255,255,0.03)" : "transparent",
        transition: "background-color 0.3s ease",
        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.08)",
          "& .text-content": {
            transform: "translateX(0) scale(1.02)",
          },
        },
      }}
    >
      {imageContent}
      {textContent}
    </Box>
  );
}

export default function ClergyPage() {
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>Clergy | Saint Innocent Orthodox Church</title>
        <meta
          name="description"
          content="Meet the clergy of Saint Innocent Orthodox Church, including Fr. Paisios, Archbishop Daniel, and our deacons serving the parish community."
        />
        <meta
          property="og:title"
          content="Clergy | Saint Innocent Orthodox Church"
        />
        <meta
          property="og:description"
          content="Meet the clergy of Saint Innocent Orthodox Church, including Fr. Paisios, Archbishop Daniel, and our deacons serving the parish community."
        />
        <link rel="canonical" href="https://saintinnocent.org/clergy" />
      </Head>
      <Navbar />
      <Box sx={{ overflowX: "hidden" }}>
        {/* Hero Section */}
        <HeroSection>
          <Container
            sx={{ position: "relative", zIndex: 1, textAlign: "center", py: 8 }}
          >
            <StaggeredFadeIn delay={100}>
              <Typography
                variant="h1"
                sx={{
                  color: "#fff",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "4px",
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                  mb: 2,
                }}
              >
                Our Clergy
              </Typography>
            </StaggeredFadeIn>
          </Container>
        </HeroSection>

        {/* Local Clergy Members */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.info.main} 85%, ${theme.palette.primary.dark} 100%)`,
          }}
        >
          {LOCAL_CLERGY_DATA.map((member, index) => (
            <ClergyMemberSection
              key={member.title}
              member={member}
              index={index}
            />
          ))}

          {/* Divider for Hierarch Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              py: 6,
              px: 4,
            }}
          >
            <Box
              sx={{
                flex: 1,
                height: "2px",
                background: "rgba(255,255,255,0.2)",
                maxWidth: "200px",
              }}
            />
            <Typography
              variant="h5"
              sx={{
                color: "rgba(255,255,255,0.7)",
                px: 4,
                fontWeight: 300,
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              Diocesan Leadership
            </Typography>
            <Box
              sx={{
                flex: 1,
                height: "2px",
                background: "rgba(255,255,255,0.2)",
                maxWidth: "200px",
              }}
            />
          </Box>

          {/* Hierarch */}
          {HIERARCH_DATA.map((member, index) => (
            <ClergyMemberSection
              key={member.title}
              member={member}
              index={LOCAL_CLERGY_DATA.length + index}
            />
          ))}
        </Box>
      </Box>
      <Footer />
    </>
  );
}
