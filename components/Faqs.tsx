import { useState } from "react";
import {
  useTheme,
  useMediaQuery,
  Box,
  Typography,
  Modal,
  Grid,
} from "@mui/material";
import DOMPurify from "isomorphic-dompurify";
import { Parallax } from "react-parallax";

// Static content
const FAQS_DATA = {
  backgroundImage: "/img/faqs_section_background.webp",
  faqs: [
    {
      question: "New to Orthodoxy?",
      answer:
        'Please know that you are welcome at St. Innocent! If this is your first time at an Orthodox Church, we invite you to "come and see" ancient Christian worship at any of our scheduled services (scroll down to see the up-to-date calendar of events). Fr. Paisios would be delighted to meet you and find out what brings you to St. Innocent. On Sundays after Divine Liturgy, you are warmly invited to a fellowship hour with the parish community, followed by a question-and-answer class for newcomers at 12:00 pm with Fr. Paisios.',
    },
    {
      question: "Already Orthodox and looking for a parish home?",
      answer:
        "Welcome! We hope you decide to join our community at St. Innocent. Please join us for a service (scroll down to see the up-to-date calendar of events) or reach out to Fr. Paisios – he would love to meet with you!",
    },
    {
      question: "Contact our priest",
      answer:
        'Fr. Paisios can be reached at <a href="mailto:priest.paisios@gmail.com">priest.paisios@gmail.com</a>. He would love to sit down with you over a cup of coffee and discuss whatever is on your heart!',
    },
    {
      question: "Getting here",
      answer:
        'We are at <a href="https://www.google.com/maps/place/8526+Usher+Rd,+Olmsted+Twp,+OH+44138/@41.3681136,-81.9101245,17z/data=!3m1!4b1!4m6!3m5!1s0x8830945875b0ec95:0x361451cdc5fe1dc1!8m2!3d41.3681136!4d-81.9101245!16s%2Fg%2F11c2cr_c82?entry=ttu">8526 Usher Road, Olmsted Township, Ohio 44138</a>, directly across the street from the Vitamix building! Look for our sign as you come around the curve. </br></br>Our parish is fully handicapped accessible, with accessible parking stalls near the north entrance.',
    },
    {
      question: "Are children welcome?",
      answer:
        "Absolutely! Here at St. Innocent, we have many children and young families who join us for worship and fellowship. For us, children are a joy and a blessing (even if they make a little noise here and there!) For parents of small children, you'll find changing tables, high chairs, children's books, and most everything you'd need. Should you require anything else, simply ask one of the many other young families you are bound to encounter, they'd love nothing more than to help you out!",
    },
    {
      question: "Our parish",
      answer:
        'St. Innocent Orthodox Church is a parish of the Orthodox Church in America (OCA), under the leadership of His Eminence, Archbishop Daniel. We are in full communion with all canonical Orthodox Churches throughout the world, including Russian Orthodox, Greek Orthodox, Antiochian Orthodox, Serbian Orthodox, and many others. Our community began as a small mission in the 1980s and today we are a vibrant, thriving parish, full of both "cradles" and converts alike.',
    },
  ],
};

export interface FAQ {
  question: string;
  answer: string;
}

function FaqBox(props: FAQ) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          backgroundColor: isHover
            ? theme.palette.primary.dark
            : theme.palette.primary.main,
          padding: "2.5%",
          margin: isMobile ? "2.5%" : "1.5%",
          color: "#fff",
          width: isMobile ? "80%" : "60%",
          cursor: "pointer",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleOpen}
      >
        <Typography
          variant="h5"
          component="p"
          sx={{
            textAlign: "center",
            color: "#fff",
          }}
        >
          {props.question}
        </Typography>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? "80%" : "60%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="p"
            sx={{ fontFamily: "'Oswald', sans-serif", fontWeight: 500 }}
          >
            {props.question}
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              fontSize: "1.2rem",
              height: isMobile ? 300 : 200,
              overflowY: "scroll",
              fontFamily: "Oswald, sans-serif",
              "& a": {
                color: theme.palette.secondary.main,
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              },
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(props.answer),
              }}
            ></div>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default function FaqSection() {
  const theme = useTheme();
  return (
    <section id="faqs">
      <Parallax
        bgImage={FAQS_DATA.backgroundImage}
        bgImageAlt="FAQ Section Parallax"
        strength={500}
      >
        <Grid
          container
          style={{
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
              {FAQS_DATA.faqs.map((faq, idx) => (
                <FaqBox key={idx} question={faq.question} answer={faq.answer} />
              ))}
            </Box>
          </Grid>
          <Grid size={{ xs: 0, sm: 2 }} />
        </Grid>
      </Parallax>
    </section>
  );
}
