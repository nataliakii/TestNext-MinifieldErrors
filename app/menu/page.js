
import React, { Suspense } from "react";
import { fetchRest, fetchMenu } from "@utils/actions";
import { unstable_noStore } from "next/cache";
import { menuTokati } from "@utils/initialMenus"
import Menu from "@app/components/Menu/Menu"
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { tokatialloTheme } from "@theme"
import Feed from "@app/components/Feed"


async function page ( )
{
    unstable_noStore();
    const restData = await fetchRest( "65df2ccff5b226c499cdd04a" );
    const menuData = await fetchMenu( "65df2ccff5b226c499cdd04a" );


    

  return (
      <Suspense fallback={ <div >Loading.....</div> }>
              {/* <ThemeProvider theme={theme}>
              <Menu menuData={ menuData }></Menu>
              </ThemeProvider> */}
          <Feed rest={ restData} menuData={menuData} />
    </Suspense>
  );
}

export default page;
