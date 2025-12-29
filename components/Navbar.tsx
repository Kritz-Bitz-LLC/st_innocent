import Link from "next/link";
import { useState } from "react";
import { useTheme } from "@mui/material";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// Static content
const NAV_DATA = {
  supportLink: "https://secure.myvanco.com/L-YRN8/home",
};

interface NavItem {
  title: string;
  link: string;
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWidth = 240;
  const navItems: NavItem[] = [
    { title: "Home", link: "/" },
    { title: "Clergy", link: "/clergy" },
    { title: "Calendar", link: "/#calendar" },
    { title: "Ministries", link: "/ministries" },
    { title: "Becoming Orthodox", link: "/becoming_orthodox" },
    { title: "Support", link: NAV_DATA.supportLink },
  ];

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        backgroundColor: "rgba(70,83,98,.7)",
        height: "100%",
        color: "#fff",
      }}
    >
      <Typography
        variant="h5"
        component={Link}
        href="/#"
        sx={{
          textDecoration: "none",
          color: "#fff",
          py: 2,
          "&:hover": {
            cursor: "pointer",
            opacity: 0.8,
          },
        }}
      >
        Orthodoxy in the Falls
      </Typography>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton
              component={Link}
              href={item.link}
              sx={{
                textAlign: "center",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <ListItemText primary={item.title} sx={{ color: "#fff" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <nav>
      <AppBar position="fixed" style={{ backgroundColor: "rgba(70,83,98,.7)" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            component={Link}
            href="/#"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              textDecoration: "none",
              color: "#fff",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            Orthodoxy in the Falls
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                component={Link}
                key={item.title}
                href={item.link}
                sx={{
                  fontSize: "1.25rem",
                  color: "#fff",
                  textTransform: "uppercase",
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.main,
                    cursor: "pointer",
                  },
                }}
              >
                {item.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "rgba(70,83,98,.7)",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </nav>
  );
}
