import { Rest } from "@models/rest";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    // Find all restaurants
    const restaurants = await Rest.find(
      {},
      { name: 1, pathName: 1, themeName: 1 }
    ).lean();

    if (!restaurants) {
      return new Response("Rest Not Found", { status: 404 });
    }

    return new Response(JSON.stringify(restaurants), { status: 200 });
  } catch (error) {
    return new Response(`Internal Server Error : ${JSON.stringify(error)}`, {
      status: 500,
    });
  }
};
