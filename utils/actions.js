export const API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_LOCAL_API_BASE_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchRest = async (id) => {
  try {
    const apiUrl = `${API_URL}/api/rests/${id}`;
    const data = await fetch(apiUrl);
    if (!data.ok) {
      throw new Error(`Failed to fetch restaurant with ID ${id}`);
    }
    const restData = await data.json();
    return restData;
  } catch (error) {
    console.error(`Error fetching restaurant with ID ${id}:`, error);
    throw error;
  }
};

export const fetchMenu = async (restId) => {
  try {
    const apiUrl = `${API_URL}/api/menu/${restId}`;
    const data = await fetch(apiUrl);
    if (!data.ok) {
      throw new Error(`Failed to fetch menu of the rest with ID ${restId}`);
    }
    const menuData = await data.json();
    return menuData;
  } catch (error) {
    console.error(`Error fetching menu from rest ID ${id}:`, error);
    throw error;
  }
};
