import { Rest } from "@models/rest";
import { Menu } from "@models/menu";
import { generateCategories } from "@utils/functions";
import { menuTokati } from "@utils/initialMenus";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  try {
    await connectToDB();

    const menuData = menuTokati.menu.map((menuItem) => ({
      langKey: menuItem.langKey,
      items: menuItem.items.map((item) => ({
        menuNumber: item.menuNumber,
        image: item.image,
        title: item.title,
        price: item.price,
        category: item.category,
        subCategory: item?.subCategory,
        ingredients: item.ingredients,
      })),
    }));

    const data = {
      menu: menuData,
      restId: menuTokati.restId,
    };

    const doesRestExist = await Rest.findById(data.restId);

    if (!doesRestExist) {
      console.log("this rest doesn't exist");
      return new Response("this rest doesn't exist", {
        status: 400,
      });
    }

    const isMenuForRestexist = await Menu.findOne({ restId: data.restId });

    if (isMenuForRestexist) {
      return new Response("this menu already exist", {
        status: 300,
      });
    }
    const createdMenu = new Menu(data);

    doesRestExist.menu = createdMenu._id;
    await doesRestExist.save();
    await createdMenu.save();

    return new Response("SUCCESSSSSS", { status: 200 });
  } catch (error) {
    return new Response(`Internal Server Error: ${JSON.stringify(error)} `, {
      status: 500,
    });
  }
};

export const GET = async () => {
  try {
    await connectToDB();
    const menu = await Menu.findById("65d08cf6a4f11da6ca9efa1e").exec();
    if (!menu) {
      return new Response("menu wasn't found", { status: 404 });
    }

    const result = generateCategories(menu.menu);

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(`Internal Server Error: ${JSON.stringify(error)} `, {
      status: 500,
    });
  }
};
