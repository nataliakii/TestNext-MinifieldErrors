import React, { Suspense } from "react";
import { fetchRest, fetchMenu } from "@utils/actions";
import { unstable_noStore } from "next/cache";
import { menuTokati } from "@utils/initialMenus"
import Menu from "@app/components/Menu/Menu"

async function page() {
  unstable_noStore();
  const restData = await fetchRest("65df2ccff5b226c499cdd04a");
    const menuData = await fetchMenu("65df2ccff5b226c499cdd04a" );
    
    console.log( "This menu is not from DB", menuTokati.menu[ 0 ].langKey )
    

  return (
    <Suspense fallback={<div >Loading.....</div>}>
          <div>thisis for menu, finger crossed</div>
          <Menu menuData={menuData}></Menu>
    </Suspense>
  );
}

export default page;
