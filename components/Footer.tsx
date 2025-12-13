import { Fragment } from "react";
import Link from "next/link";
import {
  useTheme,
  useMediaQuery,
  createSvgIcon,
  Box,
  Grid,
  Container,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

// Static content
const FOOTER_DATA = {
  address: "8526 Usher Road, Olmsted Falls, Ohio 44138",
  addressLink: "https://www.google.com/maps/place/8526+Usher+Rd,+Olmsted+Twp,+OH+44138",
  email: "priest.paisios@gmail.com",
  facebook: "https://www.facebook.com/StInnocentChurch",
  footerImg: "/img/footer_logo.svg",
};

const OhioFlagIcon = createSvgIcon(
  <Fragment>
    <svg viewBox="0 0 26 16">
      <defs>
        <clipPath id="d">
          <path d="M0 16V0l26 3-6 5 6 5z" />
        </clipPath>
        <g id="e" fill="#fff" transform="translate(3.944) scale(.625)">
          <g id="c">
            <g id="b">
              <path id="a" d="M1 0H0v.5z" transform="rotate(18 1 0)" />
              <use xlinkHref="#a" transform="scale(1 -1)" />
            </g>
            <use xlinkHref="#b" transform="rotate(72)" />
          </g>
          <use xlinkHref="#b" transform="rotate(-72)" />
          <use xlinkHref="#c" transform="rotate(144)" />
        </g>
      </defs>
      <g fill="#fff" stroke="#c1133d" clipPath="url(#d)">
        <path strokeWidth="4" d="M26 3 0 0v16l26-3" />
        <path strokeWidth="2" d="M0 8h26" />
      </g>
      <path fill="#001c5a" d="M0 0v16l16-8z" />
      <g transform="translate(4.944 8)">
        <circle r="3" fill="#fff" />
        <circle r="2" fill="#c1133d" />
        <use xlinkHref="#e" x="4" />
        <g id="f">
          <use xlinkHref="#e" />
          <use xlinkHref="#e" x="2" transform="rotate(-9.65)" />
          <use xlinkHref="#e" x="2" transform="rotate(9.65)" />
        </g>
        <g id="g">
          <use xlinkHref="#e" transform="rotate(63.435)" />
          <use xlinkHref="#e" transform="rotate(92.576)" />
          <use xlinkHref="#f" transform="rotate(121.717)" />
          <use xlinkHref="#e" transform="rotate(150.859)" />
        </g>
        <use xlinkHref="#e" transform="rotate(180)" />
        <use xlinkHref="#g" transform="scale(1 -1)" />
      </g>
    </svg>
  </Fragment>,
  "Ohio Flag"
);

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        bgcolor="#121212"
        color="white"
      >
        <Container maxWidth={false}>
          <Grid container spacing={2}>
            <Grid
              size={{ xs: 12, sm: 4 }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box style={{ textAlign: isMobile ? "center" : "left" }}>
                <Box
                  component="a"
                  href={FOOTER_DATA.addressLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "block",
                    fontSize: "1rem",
                    marginBottom: "0.5rem",
                    color: "inherit",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: theme.palette.secondary.main,
                      cursor: "pointer",
                    },
                  }}
                >
                  <LocationOnIcon style={{ fontSize: "1rem", verticalAlign: "middle" }} />{" "}
                  {FOOTER_DATA.address}
                </Box>
                <Box
                  component="a"
                  href={`mailto:${FOOTER_DATA.email}`}
                  sx={{
                    display: "block",
                    fontSize: "1rem",
                    color: "inherit",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: theme.palette.secondary.main,
                      cursor: "pointer",
                    },
                  }}
                >
                  <EmailIcon style={{ fontSize: "1rem", verticalAlign: "middle" }} />{" "}
                  {FOOTER_DATA.email}
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box textAlign="center">
                <Box
                  href="/#"
                  component={Link}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  <img
                    style={{ width: "60%" }}
                    src={FOOTER_DATA.footerImg}
                    alt="St. Innocent Logo"
                  />
                </Box>
              </Box>
              <Box
                textAlign="center"
                pt={{ xs: 5, sm: 5 }}
                pb={{ xs: 0, sm: 0 }}
              >
                St. Innocent Orthodox Church &reg; {new Date().getFullYear()}
              </Box>
            </Grid>
            <Grid
              size={{ xs: 12, sm: 4 }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <Box component={Link} href={FOOTER_DATA.facebook}>
                  <FacebookIcon
                    sx={{
                      fontSize: isMobile ? "3rem" : "4rem",
                      color: "#4267B2",
                      transition: "transform 0.2s ease, color 0.2s ease",
                      "&:hover": {
                        cursor: "pointer",
                        color: "#5b7ec2",
                        transform: "scale(1.15)",
                      },
                    }}
                  />
                </Box>
                <Box>
                  <OhioFlagIcon
                    style={{
                      fontSize: isMobile ? "3rem" : "4rem",
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
}
