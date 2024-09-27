import axios from "axios";

const base_url = "http://localhost:3000/";

const headers = {
  "Content-Type":"application/json",
};

export const createItem = async (extraApi, item) => {
  try {
    const response = await axios.post(`${base_url}${extraApi}`, item, headers);
    return response.data;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
};

export const getItems = async (extraApi ) => {
  try {
    const response = await axios.get(`${base_url}${extraApi}`, headers);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const updateItem = async (extraApi, updatedItem) => {
  try {
    const response = await axios.put(
      `${base_url}${extraApi}`,
      updatedItem,
      headers
    );
    return response.data;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

export const deleteItem = async (extraApi) => {
  try {
    const response = await axios.delete(`${base_url}${extraApi}`, headers);
    return response.data;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};
