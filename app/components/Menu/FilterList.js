import React, { useRef } from "react";
import { List, ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { scroller } from "react-scroll";

const FilterListContainer = styled(List)(({ theme }) => ({
  height: 50,
  paddingTop: 0,
  position: "sticky",
  top: 0,
  zIndex: 4,
  display: "flex",
  overflowX: "auto",
  overflowY: "hidden",
  justifyContent: "flex-start",
  alignItems: "center",
  margin: 0,
  width: "100%",
  // backgroundColor: theme.palette.primary.red,
  whiteSpace: "nowrap",
  // boxShadow: theme.shadows[4],
}));

const FilterItem = styled(ListItem)(({ theme, isactive }) => ({
  cursor: "pointer",
  whiteSpace: "nowrap",
  // padding: theme.spacing(0, 1),
  fontSize: isactive == "true" ? "1.4rem" : "1.1rem",
  color:
    isactive == "true" ? theme.palette.text.green : theme.palette.text.light,
  fontWeight: isactive == "true" ? 900 : 400,
  lineHeight: 0.8,
  // marginBottom: theme.spacing(0),
  transition: "color 0.3s, font-size 0.3s",
  textTransform: "uppercase",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    // height: isActive ? "2px" : 0,
    // background: theme.palette.primary.red,
    transition: "height 0.3s",
  },
  ...(isactive == "true" && {
    // paddingLeft: theme.spacing(2),
    // paddingRight: theme.spacing(2),
    "&::before": {
      content: '"["',
      position: "absolute",
      left: 0,
    },
    "&::after": {
      content: '"]"',
      position: "absolute",
      right: 0,
    },
  }),
}));
function FilterList({
  uniqueCategories,
  setActiveFilter,
  gridRef,
  setActiveFilterId,
  activeFilterId,
}) {
  const containerRef = useRef(null);
  const handleFilterClick = (category, id) => {
    setActiveFilter(category);
    setActiveFilterId(id);
    if (gridRef.current && containerRef.current) {
      const containerWidth = containerRef?.current?.clientWidth;
      const selectedFilter = containerRef?.current.querySelector(
        `[data-filter="${category}"]`
      );
      const filterWidth = selectedFilter.clientWidth;
      // Calculate the desired container scroll position to center the active filter
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
        behavior: "smooth",
        offset: 0,
      });
    }
  };

  const filterButtons = uniqueCategories.ids.map((category, index) => {
    const categoryId = Object.keys(category)[0];
    const categoryName = category[categoryId];

    return (
      <FilterItem
        key={index}
        isactive={(categoryId === activeFilterId).toString()}
        onClick={() => handleFilterClick(categoryName, categoryId)}
        data-filter={categoryName}
      >
        {categoryName}
      </FilterItem>
    );
  });

  return (
    <FilterListContainer ref={containerRef}>
      {filterButtons}
    </FilterListContainer>
  );
}

export default FilterList;
