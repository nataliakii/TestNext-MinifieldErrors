"use client";
import { useState, useRef, useEffect } from "react";
import { styled } from "@mui/system";
import {
  AppBar,
  Button,
  Typography,
  Stack,
  Toolbar,
  Container,
  IconButton,
  Popover,
  MenuItem,
} from "@mui/material";
import Image from "next/image";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

const AppStyling = styled(AppBar)(({ theme }) => ({
//   backgroundColor: theme.palette.primary.main,
//   fontFamily: theme.typography.h1.fontFamily,
  zIndex: 996,
  position: "sticky",
  top: 0,
  minWidth: "100%",
}));

const Logo = styled(Typography)(({ theme }) => ({
  // marginBottom: "-5px",
  // marginTop: "-4px",
  marginLeft: "-16px",
//   fontWeight: theme.typography.h1?.fontWeight || 400,
  display: "flex",
//   fontFamily: theme.typography.h1.fontFamily,
//   color: theme.palette.text.red,
}));

const LogoImg = styled(Image)(({ theme }) => ({
  marginBottom: "-5px",
  marginTop: "-4px",
  marginLeft: "-16px",
  display: "flex",
}));

const AboutButton = styled(ScrollLink)(({ theme, lang }) => ({
  fontSize: lang === "en" ? "17px" : "13px",
  padding: 0,
//   color: theme.palette.text.light,
//   fontFamily: theme.typography.allVariants.fontFamily,
  fontWeight: 700,
  cursor: "pointer",
  display: "flex",
  "&:hover": {
    fontSize: "22px",
    fontWeight: 900,
  },
}));

const LanguageSwitcher = styled(IconButton)(({ theme }) => ({
//   color: theme.palette.text?.black || theme.palette.text?.light,
  display: "flex",
  alignItems: "center",
}));

const LanguagePopover = styled(Popover)(({ theme }) => ({
  width: "150px",
//   fontFamily: theme.typography.fontFamily,
}));

export default function NavBar() {
  const headerRef = useRef(0);


  const [scrolled, setScrolled] = useState("false");

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setScrolled((scrollPosition > 80).toString());
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AppStyling
      ref={headerRef}
      sx={{
        backgroundColor:"black",
        height: scrolled === "true" ?"59px" : "100%",
      }}
    >
      <Container>
        <Toolbar>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
              {/* <LogoImg
                src="/logo.png"
                width={50}
                height={50}
                alt={"Tokatiallo"}
                priority
              ></LogoImg>
         */}
                      <h2>Tokatiallo</h2>
          </Stack>

        </Toolbar>
      </Container>
    </AppStyling>
  );
}
