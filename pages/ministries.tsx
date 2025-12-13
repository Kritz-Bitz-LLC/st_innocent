import Head from "next/head";
import Link from "next/link";
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

// Ministry data
const MINISTRIES_DATA = [
  {
    title: "Singers",
    image: "/img/ministry_singers.webp",
    text: "Chanting the poetic hymns of the ancient Church is the task of our singers, who help us mingle our worship on earth with the angelic worship in paradise.",
  },
  {
    title: "Coffee Hour",
    image: "/img/ministry_coffee_hour.webp",
    text: "We'd be honored to have a chance to make your acquaintance as you join us after any Sunday Liturgy for a light meal and fellowship.",
  },
  {
    title: "Women's Group",
    image: "/img/ministry_womens_group.webp",
    text: "The women of Saint Innocent participate in monthly activities, including a large variety of social excursions around town, crafting, and opportunities to bake.",
  },
  {
    title: "Men's Group",
    image: "/img/ministry_mens_group.webp",
    text: "All of the Men of the parish are invited to gather regularly for breakfasts, work days, and social events—from grilling out to throwing axes, a good time is had by all.",
  },
  {
    title: "Produce Distribution",
    image: "/img/ministry_produce_distribution.webp",
    text: "Throughout the warmer parts of the year, we prepare bundles of delicious produce and other foods for community members to grab drive-thru style.",
  },
  {
    title: "Community Meal",
    image: "/img/ministry_community_meal.webp",
    text: "Every month, our parishioners prepare a full, free, sit-down dinner for members of our local community to enjoy together.",
  },
  {
    title: "Burial Ministry",
    image: "/img/ministry_burial_ministry.webp",
    text: "When our faithful depart this life, a team of parishioners quietly prepare the body for burial in a dignified, authentically Christian manner, washing and anointing the one who has fallen asleep.",
  },
  {
    title: "Saint Juliana Ministry",
    image: "/img/ministry_saint_juliana_ministry.webp",
    text: "Members of our parish family are always quick to reach out to those isolated or at home due to life's circumstances, bringing the love of Jesus Christ with them.",
  },
];

const FadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const SlideInLeft = keyframes`
  0% { opacity: 0; transform: translateX(-60px); }
  100% { opacity: 1; transform: translateX(0); }
`;

const SlideInRight = keyframes`
  0% { opacity: 0; transform: translateX(60px); }
  100% { opacity: 1; transform: translateX(0); }
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
  backgroundColor: theme.palette.primary.main,
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    opacity: 0.95,
  },
}));

// Scroll-triggered animation component
function MinistrySection({
  ministry,
  index,
}: {
  ministry: (typeof MINISTRIES_DATA)[0];
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
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const imageContent = (
    <Box
      sx={{
        flex: 1,
        minHeight: { xs: "250px", md: "350px" },
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
        src={ministry.image}
        alt={ministry.title}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
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
        padding: { xs: 4, md: 6 },
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
        variant="h4"
        component="h2"
        sx={{
          fontWeight: 500,
          color: "#fff",
          mb: 2,
          textTransform: "uppercase",
          letterSpacing: "2px",
          fontSize: { xs: "1.5rem", md: "2rem" },
        }}
      >
        {ministry.title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "rgba(255,255,255,0.9)",
          lineHeight: 1.8,
          fontSize: { xs: "1rem", md: "1.1rem" },
        }}
      >
        {ministry.text}
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
        minHeight: { xs: "auto", md: "350px" },
        backgroundColor:
          index % 2 === 0
            ? "rgba(0,0,0,0.1)"
            : "transparent",
        transition: "background-color 0.3s ease",
        "&:hover": {
          backgroundColor: "rgba(0,0,0,0.2)",
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

export default function MinistriesPage() {
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>Ministries & Outreach | Saint Innocent Orthodox Church</title>
        <meta name="description" content="Explore the ministries and outreach programs at Saint Innocent Orthodox Church. Get involved in worship, fellowship, and community service." />
        <meta property="og:title" content="Ministries & Outreach | Saint Innocent Orthodox Church" />
        <meta property="og:description" content="Explore the ministries and outreach programs at Saint Innocent Orthodox Church. Get involved in worship, fellowship, and community service." />
        <link rel="canonical" href="https://saintinnocent.org/ministries" />
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
                fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
                mb: 2,
              }}
            >
              Ministries & Outreach
            </Typography>
          </StaggeredFadeIn>
          <StaggeredFadeIn delay={300}>
            <Typography
              variant="h6"
              sx={{
                color: "rgba(255,255,255,0.8)",
                fontWeight: 300,
                maxWidth: "600px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Serving God and neighbor through worship, fellowship, and outreach
            </Typography>
          </StaggeredFadeIn>
        </Container>
      </HeroSection>

      {/* Ministries Sections */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.info.main} 50%, ${theme.palette.secondary.dark} 100%)`,
        }}
      >
        {MINISTRIES_DATA.map((ministry, index) => (
          <MinistrySection key={ministry.title} ministry={ministry} index={index} />
        ))}
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          py: { xs: 6, md: 8 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            sx={{
              color: "#fff",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "2px",
              mb: 2,
            }}
          >
            Get Involved
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255,255,255,0.9)",
              fontSize: "1.1rem",
              lineHeight: 1.8,
              mb: 3,
            }}
          >
            Interested in joining one of our ministries?
            Reach out to learn more about how you can serve and grow in your faith.
          </Typography>
          <Box
            component="a"
            href="mailto:priest.paisios@gmail.com"
            sx={{
              display: "inline-block",
              padding: "12px 32px",
              backgroundColor: theme.palette.secondary.main,
              color: "#fff",
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontWeight: 500,
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: theme.palette.secondary.dark,
              },
            }}
          >
            Contact Us
          </Box>
        </Container>
      </Box>

      </Box>
      <Footer />
    </>
  );
}
