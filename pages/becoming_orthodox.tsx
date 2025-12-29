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
  Divider,
} from "@mui/material";
import { Navbar, Footer } from "@/components";

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
  paddingTop: "64px",
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

const ContentSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: "60px 0",
}));

function ScrollSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={sectionRef}
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.8s ease-out ${delay}ms, transform 0.8s ease-out ${delay}ms`,
      }}
    >
      {children}
    </Box>
  );
}

export default function BecomingOrthodoxPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Head>
        <title>Becoming Orthodox | Saint Innocent Orthodox Church</title>
        <meta
          name="description"
          content="Learn about the process of becoming Orthodox at Saint Innocent Orthodox Church. Information for inquirers and catechumens."
        />
        <meta
          property="og:title"
          content="Becoming Orthodox | Saint Innocent Orthodox Church"
        />
        <meta
          property="og:description"
          content="Learn about the process of becoming Orthodox at Saint Innocent Orthodox Church. Information for inquirers and catechumens."
        />
        <link
          rel="canonical"
          href="https://saintinnocent.org/becoming_orthodox"
        />
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
                Becoming Orthodox
              </Typography>
            </StaggeredFadeIn>
          </Container>
        </HeroSection>

        {/* Main Content */}
        <ContentSection>
          <Container maxWidth="lg">
            {/* For Inquirers Section */}
            <ScrollSection delay={200}>
              <Box sx={{ mb: 6 }}>
                <Typography
                  variant="h3"
                  sx={{
                    color: theme.palette.secondary.main,
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    fontSize: { xs: "1.75rem", md: "2.5rem" },
                    mb: 3,
                  }}
                >
                  For Inquirers
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: 2,
                    fontSize: { xs: "1rem", md: "1.15rem" },
                    mb: 3,
                  }}
                >
                  Inquirers are people who are interested in Orthodoxy. They may
                  be brand new to the Church, they may have been around for
                  awhile but still have a lot of questions, or they may not be
                  ready to take the next step for any number of personal
                  reasons. An inquirer can be thought of as "dating" the Church
                  – asking questions, attending services as able, and spending
                  time around the Church.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: 2,
                    fontSize: { xs: "1rem", md: "1.15rem" },
                    mb: 3,
                  }}
                >
                  Inquirers at any stage are warmly invited to attend the
                  Orthodoxy 101 class, led by Fr. Paisios, on Sundays at 12:00
                  pm. If an inquirer would like additional time to speak with
                  the priest, one-on-one appointments can be scheduled as well.
                </Typography>
              </Box>
            </ScrollSection>

            {/* Becoming a Catechumen Section */}
            <ScrollSection delay={300}>
              <Box sx={{ mb: 6 }}>
                <Typography
                  variant="h3"
                  sx={{
                    color: theme.palette.secondary.main,
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    fontSize: { xs: "1.75rem", md: "2.5rem" },
                    mb: 3,
                  }}
                >
                  Becoming a Catechumen
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: 2,
                    fontSize: { xs: "1rem", md: "1.15rem" },
                    mb: 3,
                  }}
                >
                  For those who have have resolved their major objections and
                  questions regarding the Faith and desire to become "engaged"
                  to the Church, the next step is to become a catechumen. The
                  path is as follows:
                </Typography>

                <Box
                  component="ol"
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: 2,
                    fontSize: { xs: "1rem", md: "1.15rem" },
                    mb: 3,
                    pl: { xs: 3, md: 4 },
                    "& li": {
                      mb: 2,
                    },
                  }}
                >
                  <li>
                    Attend services, especially Saturday night Vespers and
                    Sunday morning Divine Liturgy. Attend Orthodoxy 101.
                  </li>
                  <li>
                    Read <em>The Orthodox Faith, Worship, and Life</em> by
                    Hieromonk Gregorios OR listen to{" "}
                    <em>An Orthodox Christian Catechism</em> by Fr. Paul
                    Trubenbach on YouTube, found{" "}
                    <a
                      href="https://www.youtube.com/playlist?list=PLtKtLDj8n9-_CHMUTejxZsSQzOwJzBNvq"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "inherit" }}
                    >
                      here
                    </a>
                    . Write down any thoughts or questions that arise from these
                    materials.
                  </li>
                  <li>
                    Meet with Fr. Paisios to get to know one another and discuss
                    the book/series, and let him know of your desire to become a
                    catechumen.
                  </li>
                  <li>
                    Cease attending services from your previous religious group.
                    (If you're ready to be a catechumen, this should feel
                    completely natural).
                  </li>
                </Box>

                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: 2,
                    fontSize: { xs: "1rem", md: "1.15rem" },
                    mb: 3,
                  }}
                >
                  Generally, it is best to remain at the inquirer stage for at
                  least a month or two.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: 2,
                    fontSize: { xs: "1rem", md: "1.15rem" },
                    mb: 3,
                    fontStyle: "italic",
                  }}
                >
                  Please note: Inquirers may attend the <em>Metanoia</em> class on
                  Tuesday evenings but should bear in mind that this class is
                  designed first and foremost for catechumens. Fundamentals of
                  the Faith questions such as "Why do you kiss icons?" are
                  better saved for the "Orthodoxy 101" class after Sunday
                  Liturgy.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: 2,
                    fontSize: { xs: "1rem", md: "1.15rem" },
                    mb: 3,
                    fontStyle: "italic",
                  }}
                >
                  Inquirers are asked to refrain from attending the class
                  "Acquiring the Mind of Christ" (during Liturgy), as this group
                  is specifically designed for catechumens. Of course, always
                  feel free to make an appointment with Fr. Paisios to discuss
                  anything of concern to you!
                </Typography>
              </Box>
            </ScrollSection>

            {/* For Catechumens Section */}
            <ScrollSection delay={400}>
              <Box sx={{ mb: 6 }}>
                <Typography
                  variant="h3"
                  sx={{
                    color: theme.palette.secondary.main,
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    fontSize: { xs: "1.75rem", md: "2.5rem" },
                    mb: 3,
                  }}
                >
                  For Catechumens
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: 2,
                    fontSize: { xs: "1rem", md: "1.15rem" },
                    mb: 3,
                  }}
                >
                  Once you have taken the necessary steps and been formally
                  enrolled as a catechumen – congratulations! This is a huge
                  step in a serious undertaking, and you are entering a unique
                  and grace-filled period of your life. To enable this precious
                  time to be used effectively, the following are the
                  expectations of catechumens at St. Innocent:
                </Typography>

                <Box
                  component="ul"
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: 2,
                    fontSize: { xs: "1rem", md: "1.15rem" },
                    mb: 3,
                    pl: { xs: 3, md: 4 },
                    "& li": {
                      mb: 2.5,
                    },
                  }}
                >
                  <li>
                    That one continually pursue holiness of life - little by
                    little looking to change one's everyday habits towards a
                    God-pleasing manner of living. This includes beginning to
                    keep a rule of prayer and fasting, as discussed in your
                    meetings with Fr. Paisios.
                  </li>
                  <li>
                    Understand that the catechumenate at St. Innocent will
                    typically last one full year.
                  </li>
                  <li>
                    Come to Saturday Vespers and Sunday Divine Liturgy, as well
                    as services for feast days, as often as you can.
                  </li>
                  <li>
                    That one continually read the Holy Scriptures - even if just
                    a little each day. You will be expected to read through the
                    entire New Testament before you are received into the
                    Church.
                  </li>
                  <li>
                    Attend all catechumen classes:{" "}
                    <em>Acquiring the Mind of Christ</em> (on Sundays during the
                    Divine Liturgy, after the dismissal of the catechumens) and{" "}
                    <em>Metanoia</em> (Tuesdays at 7:00 pm). Ask questions and
                    engage. (Note: These are in-person classes and a Zoom option
                    will not generally be offered. Orthodoxy is an inherently
                    incarnational faith: there's no real substitute for being
                    physically present. If you feel you have truly exceptional
                    circumstances, please do not hesitate to bring them up with
                    Fr. Paisios).
                  </li>
                  <li>
                    Understand that one will not be received into the Church if
                    he or she shows a lack of basic humility, repentance, or
                    willingness to learn.
                  </li>
                  <li>
                    During your time as a catechumen, cease from teaching others
                    or participating in online discussions, etc.
                  </li>
                  <li>
                    Meet with Fr. Paisios individually and get to know one
                    another. Begin to form relationships with other members of
                    the parish.
                  </li>
                  <li>
                    Begin to cultivate the eyes of a servant—we are here to be
                    servants of Christ, we begin by serving one another. This
                    can look like doing various tasks around the church, helping
                    with coffee hour or clean up, etc. This should be
                    self-motivated, so that after catechesis one has acquired
                    some <em>philotimo</em> as a passive virtue. (<em>Philotimo</em> can be
                    defined as diligence, reverent goodness; a humble internal
                    drive to sacrifice one's own comforts for the good of
                    others).
                  </li>
                </Box>

                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: 2,
                    fontSize: { xs: "1rem", md: "1.15rem" },
                    mb: 3,
                  }}
                >
                  When you are ready, Fr. Paisios will approach you to begin
                  making plans for reception into the Church. If you had
                  anything resembling a baptism in your past, please find proof
                  of this (i.e. a baptismal certificate).
                </Typography>
              </Box>
            </ScrollSection>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", my: 6 }} />

            {/* Readings Section */}
            <ScrollSection delay={500}>
              <Box sx={{ mb: 6 }}>
                <Typography
                  variant="h3"
                  sx={{
                    color: theme.palette.secondary.main,
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    fontSize: { xs: "1.75rem", md: "2.5rem" },
                    mb: 1,
                    fontStyle: "italic",
                  }}
                >
                  Readings for Acquiring the Mind of Christ
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: 2,
                    fontSize: { xs: "1rem", md: "1.15rem" },
                    mb: 4,
                  }}
                >
                  After the dismissal of the catechumens during the Divine
                  Liturgy, all those who have been formally enrolled as
                  catechumens will gather in the parish hall and take turns
                  reading aloud for the rest of the group. The texts scheduled
                  for reading will follow the cycle indicated below. A notebook
                  will be provided to each catechumen so that any questions or
                  thoughts on the content of these readings may be discussed
                  with Fr. Paisios at <em>Metanoia</em> class on Tuesday evenings.
                </Typography>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "repeat(2, 1fr)",
                      lg: "repeat(3, 1fr)",
                    },
                    gap: 3,
                  }}
                >
                  {/* Whiteford - The Orthodox Mind */}
                  <Box
                    sx={{
                      backgroundColor: "rgba(0,0,0,0.3)",
                      borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      padding: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.4)",
                        borderColor: theme.palette.secondary.main,
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: theme.palette.secondary.main,
                          fontWeight: 500,
                          fontSize: { xs: "1rem", md: "1.1rem" },
                          mb: 0.5,
                        }}
                      >
                        The Orthodox Mind
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255,255,255,0.6)",
                          fontSize: "0.9rem",
                        }}
                      >
                        Fr. John Whiteford
                      </Typography>
                    </Box>
                    <Box
                      component="ol"
                      sx={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "0.9rem",
                        lineHeight: 1.8,
                        pl: 2.5,
                        m: 0,
                        "& li": { mb: 0.5 },
                      }}
                    >
                      <li>pp. 1-13</li>
                      <li>pp. 14-21</li>
                    </Box>
                  </Box>

                  {/* St. Innocent - Indication */}
                  <Box
                    sx={{
                      backgroundColor: "rgba(0,0,0,0.3)",
                      borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      padding: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.4)",
                        borderColor: theme.palette.secondary.main,
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: theme.palette.secondary.main,
                          fontWeight: 500,
                          fontSize: { xs: "1rem", md: "1.1rem" },
                          mb: 0.5,
                        }}
                      >
                        Indication of the Way
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255,255,255,0.6)",
                          fontSize: "0.9rem",
                        }}
                      >
                        St. Innocent of Alaska
                      </Typography>
                    </Box>
                    <Box
                      component="ol"
                      start={3}
                      sx={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "0.9rem",
                        lineHeight: 1.8,
                        pl: 2.5,
                        m: 0,
                        "& li": { mb: 0.5 },
                      }}
                    >
                      <li>pp. 1-8</li>
                      <li>pp. 8-15</li>
                      <li>pp. 15-23</li>
                    </Box>
                  </Box>

                  {/* Everyday Saints */}
                  <Box
                    sx={{
                      backgroundColor: "rgba(0,0,0,0.3)",
                      borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      padding: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.4)",
                        borderColor: theme.palette.secondary.main,
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: theme.palette.secondary.main,
                          fontWeight: 500,
                          fontSize: { xs: "1rem", md: "1.1rem" },
                          mb: 0.5,
                        }}
                      >
                        Everyday Saints
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255,255,255,0.6)",
                          fontSize: "0.9rem",
                        }}
                      >
                        Archimandrite Tikhon
                      </Typography>
                    </Box>
                    <Box
                      component="ol"
                      start={6}
                      sx={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "0.9rem",
                        lineHeight: 1.8,
                        pl: 2.5,
                        m: 0,
                        "& li": { mb: 0.5 },
                      }}
                    >
                      <li>pp. 5-23</li>
                    </Box>
                  </Box>

                  {/* Abbot Sergius - Acquiring the Mind of Christ */}
                  <Box
                    sx={{
                      backgroundColor: "rgba(0,0,0,0.3)",
                      borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      padding: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.4)",
                        borderColor: theme.palette.secondary.main,
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: theme.palette.secondary.main,
                          fontWeight: 500,
                          fontSize: { xs: "1rem", md: "1.1rem" },
                          mb: 0.5,
                        }}
                      >
                        Acquiring the Mind of Christ
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255,255,255,0.6)",
                          fontSize: "0.9rem",
                        }}
                      >
                        Abbot Sergius
                      </Typography>
                    </Box>
                    <Box
                      component="ol"
                      start={7}
                      sx={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "0.9rem",
                        lineHeight: 1.8,
                        pl: 2.5,
                        m: 0,
                        "& li": { mb: 0.5 },
                      }}
                    >
                      <li>pp. xii-10</li>
                      <li>pp. 11-20</li>
                      <li>pp. 33-54</li>
                      <li>pp. 109-128</li>
                      <li>pp. 129-144</li>
                      <li>pp. 145-155</li>
                    </Box>
                  </Box>

                  {/* Elder Aimillianos */}
                  <Box
                    sx={{
                      backgroundColor: "rgba(0,0,0,0.3)",
                      borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      padding: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.4)",
                        borderColor: theme.palette.secondary.main,
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: theme.palette.secondary.main,
                          fontWeight: 500,
                          fontSize: { xs: "1rem", md: "1.1rem" },
                          mb: 0.5,
                        }}
                      >
                        On the State that Jesus Confers
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255,255,255,0.6)",
                          fontSize: "0.9rem",
                        }}
                      >
                        Elder Aimilianos of Simonopetra
                      </Typography>
                    </Box>
                    <Box
                      component="ol"
                      start={13}
                      sx={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "0.9rem",
                        lineHeight: 1.8,
                        pl: 2.5,
                        m: 0,
                        "& li": { mb: 0.5 },
                      }}
                    >
                      <li>Complete text</li>
                    </Box>
                  </Box>

                  {/* The Way of a Pilgrim */}
                  <Box
                    sx={{
                      backgroundColor: "rgba(0,0,0,0.3)",
                      borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      padding: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.4)",
                        borderColor: theme.palette.secondary.main,
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: theme.palette.secondary.main,
                          fontWeight: 500,
                          fontSize: { xs: "1rem", md: "1.1rem" },
                          mb: 0.5,
                        }}
                      >
                        The Way of a Pilgrim
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255,255,255,0.6)",
                          fontSize: "0.9rem",
                        }}
                      >
                        Anonymous
                      </Typography>
                    </Box>
                    <Box
                      component="ol"
                      start={14}
                      sx={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "0.9rem",
                        lineHeight: 1.8,
                        pl: 2.5,
                        m: 0,
                        "& li": { mb: 0.5 },
                      }}
                    >
                      <li>pp. 3-18</li>
                      <li>pp. 18-35</li>
                      <li>pp. 35-49</li>
                      <li>pp. 49-64</li>
                      <li>pp. 64-82</li>
                      <li>pp. 82-96</li>
                      <li>pp. 97-112</li>
                    </Box>
                  </Box>

                  {/* Hieromonk Seraphim - The Orthodox Worldview */}
                  <Box
                    sx={{
                      backgroundColor: "rgba(0,0,0,0.3)",
                      borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      padding: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.4)",
                        borderColor: theme.palette.secondary.main,
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: theme.palette.secondary.main,
                          fontWeight: 500,
                          fontSize: { xs: "1rem", md: "1.1rem" },
                          mb: 0.5,
                        }}
                      >
                        The Orthodox Worldview
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255,255,255,0.6)",
                          fontSize: "0.9rem",
                        }}
                      >
                        Hieromonk Seraphim Rose
                      </Typography>
                    </Box>
                    <Box
                      component="ol"
                      start={21}
                      sx={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "0.9rem",
                        lineHeight: 1.8,
                        pl: 2.5,
                        m: 0,
                        "& li": { mb: 0.5 },
                      }}
                    >
                      <li>Complete text</li>
                    </Box>
                  </Box>

                  {/* Archbishop Averky - The Struggle for Virtue */}
                  <Box
                    sx={{
                      backgroundColor: "rgba(0,0,0,0.3)",
                      borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      padding: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.4)",
                        borderColor: theme.palette.secondary.main,
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: theme.palette.secondary.main,
                          fontWeight: 500,
                          fontSize: { xs: "1rem", md: "1.1rem" },
                          mb: 0.5,
                        }}
                      >
                        The Struggle for Virtue
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255,255,255,0.6)",
                          fontSize: "0.9rem",
                        }}
                      >
                        Archbishop Averky
                      </Typography>
                    </Box>
                    <Box
                      component="ol"
                      start={22}
                      sx={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "0.9rem",
                        lineHeight: 1.8,
                        pl: 2.5,
                        m: 0,
                        "& li": { mb: 0.5 },
                      }}
                    >
                      <li>pp. 6-12</li>
                      <li>pp. 13-25</li>
                      <li>pp. 26-36</li>
                      <li>pp. 37-46</li>
                      <li>pp. 47-56</li>
                      <li>pp. 57-63</li>
                      <li>pp. 64-70</li>
                    </Box>
                  </Box>

                  {/* Not of This World - Simplicity */}
                  <Box
                    sx={{
                      backgroundColor: "rgba(0,0,0,0.3)",
                      borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      padding: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.4)",
                        borderColor: theme.palette.secondary.main,
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: theme.palette.secondary.main,
                          fontWeight: 500,
                          fontSize: { xs: "1rem", md: "1.1rem" },
                          mb: 0.5,
                        }}
                      >
                        Not of This World
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255,255,255,0.6)",
                          fontSize: "0.9rem",
                        }}
                      >
                        Hieromonk Damascene
                      </Typography>
                    </Box>
                    <Box
                      component="ol"
                      start={29}
                      sx={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "0.9rem",
                        lineHeight: 1.8,
                        pl: 2.5,
                        m: 0,
                        "& li": { mb: 0.5 },
                      }}
                    >
                      <li>Simplicity</li>
                    </Box>
                  </Box>

                  {/* Abba Dorotheos */}
                  <Box
                    sx={{
                      backgroundColor: "rgba(0,0,0,0.3)",
                      borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      padding: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.4)",
                        borderColor: theme.palette.secondary.main,
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: theme.palette.secondary.main,
                          fontWeight: 500,
                          fontSize: { xs: "1rem", md: "1.1rem" },
                          mb: 0.5,
                        }}
                      >
                        That We Should Not Judge
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255,255,255,0.6)",
                          fontSize: "0.9rem",
                        }}
                      >
                        Abba Dorotheos of Gaza
                      </Typography>
                    </Box>
                    <Box
                      component="ol"
                      start={30}
                      sx={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "0.9rem",
                        lineHeight: 1.8,
                        pl: 2.5,
                        m: 0,
                        "& li": { mb: 0.5 },
                      }}
                    >
                      <li>Complete text</li>
                    </Box>
                  </Box>

                  {/* St. Paisios - Passions and Virtues */}
                  <Box
                    sx={{
                      backgroundColor: "rgba(0,0,0,0.3)",
                      borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      padding: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.4)",
                        borderColor: theme.palette.secondary.main,
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: theme.palette.secondary.main,
                          fontWeight: 500,
                          fontSize: { xs: "1rem", md: "1.1rem" },
                          mb: 0.5,
                        }}
                      >
                        Passions and Virtues
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255,255,255,0.6)",
                          fontSize: "0.9rem",
                        }}
                      >
                        St. Paisios of Mount Athos
                      </Typography>
                    </Box>
                    <Box
                      component="ol"
                      start={31}
                      sx={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "0.9rem",
                        lineHeight: 1.8,
                        pl: 2.5,
                        m: 0,
                        "& li": { mb: 0.5 },
                      }}
                    >
                      <li>pp. 21-38</li>
                      <li>pp. 39-60</li>
                      <li>pp. 61-80</li>
                      <li>pp. 81-100</li>
                      <li>pp. 101-110</li>
                      <li>pp. 111-122</li>
                      <li>pp. 123-140</li>
                      <li>pp. 141-154</li>
                      <li>pp. 155-168</li>
                      <li>pp. 169-189</li>
                      <li>pp. 190-211</li>
                      <li>pp. 212-233</li>
                      <li>pp. 234-246</li>
                      <li>pp. 247-268</li>
                      <li>pp. 269-290</li>
                      <li>pp. 291-308</li>
                      <li>pp. 309-326</li>
                    </Box>
                  </Box>

                  {/* St. Gregory Palamas - Homilies */}
                  <Box
                    sx={{
                      backgroundColor: "rgba(0,0,0,0.3)",
                      borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      padding: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.4)",
                        borderColor: theme.palette.secondary.main,
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: theme.palette.secondary.main,
                          fontWeight: 500,
                          fontSize: { xs: "1rem", md: "1.1rem" },
                          mb: 0.5,
                        }}
                      >
                        Homilies
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255,255,255,0.6)",
                          fontSize: "0.9rem",
                        }}
                      >
                        St. Gregory Palamas
                      </Typography>
                    </Box>
                    <Box
                      component="ol"
                      start={48}
                      sx={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "0.9rem",
                        lineHeight: 1.8,
                        pl: 2.5,
                        m: 0,
                        "& li": { mb: 0.5 },
                      }}
                    >
                      <li>Homilies 2 & 3</li>
                      <li>Homilies 6 & 7</li>
                      <li>Homilies 8 & 13</li>
                      <li>Homily 48</li>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </ScrollSection>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", my: 6 }} />

            {/* Call to Action */}
            <ScrollSection delay={600}>
              <Box
                sx={{
                  backgroundColor: "rgba(0,0,0,0.2)",
                  borderRadius: "8px",
                  padding: { xs: 4, md: 6 },
                  textAlign: "center",
                  mt: 6,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    color: theme.palette.secondary.main,
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    mb: 2,
                  }}
                >
                  Feeling Drawn to Orthodoxy?
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "1.1rem",
                    lineHeight: 1.8,
                    mb: 3,
                    maxWidth: "700px",
                    mx: "auto",
                  }}
                >
                  Contact Fr. Paisios to learn more or schedule a meeting.
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
                    borderRadius: "4px",
                    transition: "background-color 0.3s ease",
                    "&:hover": {
                      backgroundColor: theme.palette.secondary.dark,
                    },
                  }}
                >
                  Contact
                </Box>
              </Box>
            </ScrollSection>
          </Container>
        </ContentSection>
      </Box>
      <Footer />
    </>
  );
}
