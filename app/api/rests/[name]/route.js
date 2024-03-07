import { Rest } from "@models/rest";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    console.log('params', params)

    const rest = await Rest.findById(params.name);

    // const rest = await Rest.findOne({
    //   $or: [{ pathName: params.name }, { _id: params.name }, { shortname: params.name }],
    // });
    // const rest = await Rest.findOne({ shortname: params.name });
    if (!rest) {
      return new Response("Rest Not Found", { status: 404 });
    }

    return new Response(JSON.stringify(rest), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
// export const PATCH = async (request, { params }) => {
//   const { Rest, tag } = await request.json();

//   try {
//     await connectToDB();

//     // Find the existing Rest by ID
//     const existingRest = await Rest.findById(params.id);

//     if (!existingRest) {
//       return new Response("Rest not found", { status: 404 });
//     }

//     // Update the Rest with new data
//     existingRest.Rest = Rest;
//     existingRest.tag = tag;

//     await existingRest.save();

//     return new Response("Successfully updated the Rests", { status: 200 });
//   } catch (error) {
//     return new Response("Error Updating Rest", { status: 500 });
//   }
// };

// export const DELETE = async (request, { params }) => {
//   try {
//     await connectToDB();

//     // Find the Rest by ID and remove it
//     await Rest.findByIdAndRemove(params.pathName);

//     return new Response("Rest deleted successfully", { status: 200 });
//   } catch (error) {
//     return new Response("Error deleting Rest", { status: 500 });
//   }
// };
