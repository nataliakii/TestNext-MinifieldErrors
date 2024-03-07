"use client";
import React, { useState, useEffect, useRef } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Element, Link } from "react-scroll";
// import { useMainContext } from "@app/components/MainContextProvider";
import MenuItemComponent from "./MenuItemComponent";
import {
  menuItems,
  getUniqueCategories,
  getSubcategories,
  filterMenuItemsId,
  getLangMenu,
} from "@utils/functions";
// import { useTranslation } from "react-i18next";
import FilterList from "./FilterList";
import SubFilter from "./SubFilter";

const SectionTitle = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  // color: theme.palette.text.light,
  // fontFamily: theme.typography.h1.fontFamily,
  fontSize: 65,
  // marginBottom: theme.spacing(0.1),
  // marginTop: theme.spacing(0.1),
}));

const Section = styled("section")(({ theme }) => ({
  // backgroundColor: theme.palette.secondary.background,
  // padding: theme.spacing(1, 0),
  textAlign: "center",
}));

const FilterListContainer = styled("div")(({ showCallWaiterButton }) => ({
  overflowY: "auto",
  maxHeight: "100vh",
  position: "sticky",
  zIndex: 1000,
  top: 0,
}));

function Menu({ menuRef, headerRef, menuData }) {
  const gridRef = useRef(null);
  // const { lang, showInitialHeader } = useMainContext();
  // const { t, i18n } = useTranslation();
  const menu = getLangMenu(menuData.menuUpd, "en");

  // const headerOffset = headerRef?.clientHeight;
  const [activeFilter, setActiveFilter] = useState("*");
  const [activeFilterId, setActiveFilterId] = useState("*");
  const [activeSubFilter, setActiveSubFilter] = useState(null);
  const [activeSubFilterId, setActiveSubFilterId] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [subCategoriesId, setSubCategoriesId] = useState(null);
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const [isSticky, setIsSticky] = useState(true);

  useEffect(() => {
    if (activeFilter === "*") {
      setFilteredMenuItems(getLangMenu(menuData.menuUpd, "en"));
    } else {
      const filteredItemsId = filterMenuItemsId(
        menuData.menuUpd,
        activeFilterId,
        "en"
      );
      const subcategoriesResult = getSubcategories(
        menuData.menuUpd,
        menuData.categories,
        activeFilterId,
        "en"
      );
      console.log("subcategoriesResult", subcategoriesResult);
      const subCategories = subcategoriesResult.name;
      const subCategoriesIds = subcategoriesResult.ids;
      setFilteredMenuItems(filteredItemsId);
      setSubCategoriesId(subCategoriesIds);
      setSubCategories(subCategories);
    }
  }, [
    activeFilter,
    "en",
    activeFilterId,
    menuData.categories,
    menuData.menuUpd,
  ]);

  const [subCatLen, setSubCatLen] = useState(subCategories?.length || 0);
  const uniqueCategories = getUniqueCategories(
    menuData.menuUpd,
    "en",
    menuData.categories
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight * 0.75;
      if (scrollY > viewportHeight) {
        setIsSticky(false);
      } else {
        setIsSticky(true);
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Section id="menu">
        <Link to="menu-items" offset={-130} smooth>
          <SectionTitle variant="h3">Menu</SectionTitle>
        </Link>
        <Element name="menu-list">
          <FilterListContainer>
            <FilterList
              uniqueCategories={uniqueCategories}
              setActiveFilter={setActiveFilter}
              setActiveFilterId={setActiveFilterId}
              gridRef={gridRef}
              showCallWaiterButton={false}
              activeFilterId={activeFilterId}
            />
            <SubFilter
              menu={menuData.menuUpd}
              activeSubFilterId={activeSubFilterId}
              setActiveSubFilterId={setActiveSubFilterId}
              filterMenuItemsId={filterMenuItemsId}
              isVisible={subCatLen > 1}
              activeFilterId={activeFilterId}
              subCategories={subCategories}
              setActiveSubFilter={setActiveSubFilter}
              subCategoriesId={subCategoriesId}
              setFilteredMenuItems={setFilteredMenuItems}
              lang={'en'}
            />
          </FilterListContainer>
          <Element name="menu-items">
            <Container>
              <Grid container spacing={2} ref={gridRef}>
                {filteredMenuItems.map((menuItem, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <MenuItemComponent item={menuItem} />
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Element>
        </Element>
      </Section>
    </>
  );
}
export default Menu;
