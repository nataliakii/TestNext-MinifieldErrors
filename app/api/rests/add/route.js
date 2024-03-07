import { Rest } from "@models/rest";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const currentYear = new Date().getFullYear();


    const tokatialloData = {
    name: "TO KATI ALLO",
    slogan: "TO KATI ALLO SLOGAN",
    logoSrc: "/logo.png",
    tel: "+3010001000",
    email: "tokaliallo@tokaliallo.com",
    schedule: "Mon-Sat: 11AM - 23PM",
    address: "Παρναβέλη 1Β, Nea Kallikratia 63080, Halchidiki, Greece",
    coords: {
      mainSpot: { latitude: 40.310434866939566, longitude: 23.06235701312798 },
      beachSpot1: { latitude: 40.3100075, longitude: 23.0628176 },
    },
    radiuses: { mainSpot: 12, beachSpot1: 12 },
    datesBeachSpot: {
      start: new Date(currentYear, 3 - 1, 1),
      end: new Date(currentYear, 10 - 1, 30),
    },
    chat_id: "-4011132632",
    backendEndpoints: { waiter: "/button2607", bill: "/button2607" },
    pathName: "tokaliallo",
    themeName: "tokaliallo",
    app: {
      menu: true,
      about: true,
      buttonWaiter: false,
      buttonBill: false,
      buttonSisha: false,
      numberOfTables: { inside: 15, outside: 5 },
      languages: { eng: true, el: true },
    },
  };
  //   const rest = (await request.json());
  const rest = tokatialloData;
  try {
    await connectToDB();
    const { name, pathName } = rest;

    // Check if a restaurant with the same name or pathName already exists
    const existingRest = await Rest.findOne({
      $or: [{ name }, { pathName }],
    });

    if (existingRest) {
      return new Response("This restaurant already exists", { status: 409 });
    }

    const newRest = new Rest(rest);

    await newRest.save();
    return new Response(JSON.stringify(newRest), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new rest", { status: 500 });
  }
};
