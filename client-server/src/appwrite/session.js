import { Account } from "appwrite";
import { client } from "./appwrite";

const account = new Account(client);

export const signup = (email, password) => {
  const response = account.create("unique()", email, password);
  response.then(
    function (response) {
      console.log("Account created", response);
      return response;
    },
    function (error) {
      console.log("Error occurred during account creation", error);
    }
  );
};

export const signin = (email, password) => {
  const response = account.createEmailPasswordSession(email, password);
  response.then(
    function (response) {
      console.log("Account is logged in", response);
      return response;
    },
    function (error) {
      console.log("Error occurred during login", error);
    }
  );
};


export const signout = async () => {
    try {
        const response = await account.deleteSession('current');
        console.log('Logout successful:', response);
        return response;
    } catch (error) {
        console.log('Logout error:', error);
        throw error;
    }
};


export const getCurrentUser = async () => {
  try {
    const response = await account.get();
    console.log('Current user details:', response);
    return response;
  } catch (error) {
    console.log('Error fetching current user details:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await account.deleteSession('current');
    console.log('Logout successful:', response);
    return response;
  } catch (error) {
    console.log('Logout error:', error);
    throw error;
  }
};