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

export const signin = (email, password, rememberMe) => {
  const response = account.createEmailSession(email, password);
  response.then(
    function (response) {
      console.log("Account is logged in", response);
      if (!rememberMe) {
        window.onbeforeunload = function () {
          account.deleteSession("current").then(
            function () {
              console.log("Session deleted on window close");
            },
            function (error) {
              console.log("Error deleting session:", error);
            }
          );
        };
      }
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