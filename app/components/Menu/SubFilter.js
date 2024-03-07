import React, { useRef } from "react";
import { List, ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { scroller } from "react-scroll";

const FilterListContainer = styled(List)(({ theme }) => ({
  position: "relative",
  top: 0,
  zIndex: 13,
  display: "flex",
  overflowX: "auto",
  overflowY: "hidden",
  justifyContent: "flex-start",
  alignItems: "center",
  margin: 0,
  // boxShadow: theme.shadows[4],
  width: "100%",
  // backgroundColor: theme.palette.secondary.complement,
  whiteSpace: "nowrap",
}));

const FilterItem = styled(ListItem)(({ theme, isactive }) => ({
  cursor: "pointer",
  whiteSpace: "nowrap",
  // padding: theme.spacing(0, 2),
  fontSize: isactive == "true" ? "1.5rem" : "1.2rem",
  // color: theme.palette.text.light,
  fontWeight: isactive == "true" ? 900 : 400,
  lineHeight: 2,
  // margin: theme.spacing(1, 0, 1, 0),
  transition: "color 0.3s, font-size 0.3s",
  textTransform: "uppercase",
  ...(isactive == "true" && {
    // paddingLeft: theme.spacing(2.5),
    // paddingRight: theme.spacing(2.5),
    // "&::before": {
    //   content: '"["',
    //   position: "absolute",
    //   left: 0,
    // },
    // "&::after": {
    //   content: '"]"',
    //   position: "absolute",
    //   right: 0,
    // },
  }),
}));

export default function SubFilter({
  activeFilterId,
  setActiveSubFilter,
  subCategories,
  subCategoriesId,
  setFilteredMenuItems,
  lang,
  isVisible,
  filterMenuItemsId,
  setActiveSubFilterId,
  activeSubFilterId,
  menu,
}) {
  // console.log("subFilter is VIsible!?", isVisible);
  const containerRef = useRef(null);
  const len = subCategories?.length || 1;
  const handleSubItemClick = (subCategoryName, subCategoryId) => {
    setActiveSubFilterId(subCategoryId);
    setActiveSubFilter(subCategoryName);
    const filteredItems = filterMenuItemsId(
      menu,
      activeFilterId,
      lang,
      subCategoryName
    );
    setFilteredMenuItems(filteredItems);
    if (containerRef.current) {
      const containerWidth = containerRef?.current?.clientWidth;
      const selectedFilter = containerRef?.current.querySelector(
        `[data-filter="${subCategoryName}"]`
      );
      const filterWidth = selectedFilter.clientWidth;
      let containerScrollLeft =
        selectedFilter.offsetLeft - containerWidth / 2 + filterWidth / 2;

      // Ensure the active filter is not at the start or end of the container
      if (containerScrollLeft <= 0) {
        containerScrollLeft = 1; // A small offset to keep the active filter visible
      } else if (
        containerScrollLeft + containerWidth >=
        containerRef.current.scrollWidth
      ) {
        containerScrollLeft =
          containerRef.current.scrollWidth - containerWidth - 1;
      }

      containerRef.current.scrollTo({
        left: containerScrollLeft,
        behavior: "smooth",
      });
      scroller.scrollTo("menu-list", {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: 0,
      });
    }
  };
  const subs = subCategoriesId?.map(function (item, i) {
    const subCategoryId = Object.keys(item)[0];
    const subCategoryName = item[subCategoryId];

    if (len > 1) {
      return (
        <FilterItem
          isactive={(subCategoryId === activeSubFilterId).toString()}
          key={i}
          onClick={() => handleSubItemClick(subCategoryName, subCategoryId)}
        >
          {subCategoryName}
        </FilterItem>
      );
    } else {
      return null;
    }
  });
  return !isVisible ? (
    <FilterListContainer
      sx={{
        paddingTop: isVisible ? "0.35rem" : 0,
        paddingBottom: isVisible ? "0.35rem" : 0,
      }}
    >
      {subs}
    </FilterListContainer>
  ) : null;
}
