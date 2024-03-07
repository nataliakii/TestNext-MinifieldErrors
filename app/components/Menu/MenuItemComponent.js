import React from "react";
import { styled } from "@mui/material/styles";
import { Paper, Typography } from "@mui/material";

const StyledMenuItem = styled(Paper)(({ theme }) => ({
  // margin: theme.spacing(0, 0),
  // padding: theme.spacing(3),
  zIndex: 22,
  display: "flex",
  alignItems: "center",
  // boxShadow: theme.shadows[4],
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.02)",
    // boxShadow: theme.shadows[5],
  },
}));

const MenuImage = styled("img")(({ theme }) => ({
  maxWidth: "50%",
  // minWidth: "50%",
  height: "auto",
  borderRadius: "50%",
  float: "left",
  // border: `2px solid ${theme.palette.secondary.main}`,
}));

const MenuContent = styled("div")(({ theme }) => ({
  // marginLeft: theme.spacing(1),
  position: "relative",
}));

const MenuLink = styled(Typography)(({ theme }) => ({
  // paddingRight: theme.spacing(0),
  // fontSize: "22px",
  // background: theme.palette.secondary.main,
  // fontFamily: theme.typography.fontFamily,
  position: "relative",
  zIndex: 1,
  fontWeight: 700,
  // color: theme.palette.text.light,
  lineHeight: "24px",
  transition: "color 0.3s",
  "&:hover": {
    // color: theme.palette.primary.main,
  },
}));

const MenuPrice = styled("span")(({ theme }) => ({
  // background: theme.palette.secondary.main,
  position: "relative",
  fontSize: "22px",
  zIndex: 1,
  // padding: theme.spacing(0, 2),
  fontWeight: 600,
  // color: theme.palette.text.light,
  "&:hover": {
    // color: theme.palette.primary.main,
  },
}));

const MenuIngredients = styled("div")(({ theme }) => ({
  fontStyle: "italic",
  marginLeft: 2,
  fontSize: "16px",
  color: `rgba(0, 0, 0, 0.7)`,
  marginTop: 1,
}));

function MenuItemComponent({ item }) {
  return (
    <StyledMenuItem>
      <MenuImage src={item.image} alt={item.title} />
      <MenuContent>
        <MenuLink href="#">{item.title}</MenuLink>
        <MenuPrice>€{item.price}</MenuPrice>
        <MenuIngredients>{item.ingredients}</MenuIngredients>
      </MenuContent>
    </StyledMenuItem>
  );
}

export default MenuItemComponent;
