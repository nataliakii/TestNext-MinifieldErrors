"use client";
import React from "react";
import { menuTokati } from "@utils/initialMenus"
import Menu from "@app/components/Menu/Menu"
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { tokatialloTheme } from "@theme"
import Footer from "./Footer";
import Navbar from "./NavBar";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function Feed ( { children, ...props } )
{
    const theme=createTheme(tokatialloTheme)
    const { rest, menuData } = props;


  return (
    <ThemeProvider theme={theme}>
      <Suspense>
     {children}
          <Navbar rest={rest} />
 <Menu menuData={ menuData }></Menu>
          {children}
          <Footer rest={rest} />

      </Suspense>
    </ThemeProvider>
  );
}

export default Feed;
