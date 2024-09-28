import "./App.css";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/menu/header";
import Sidebar from "./components/menu/sidebar";
import Home from "./components/home/home";
import Course from "./components/courses/course";
import Player from "./components/courses/player";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import User from "./components/user/user";
import Region from "./components/regional-crops/region";
import CropData from "./components/regional-crops/cropsData";
import { getCurrentUser, logout } from "./appwrite/session";
import Community from "./components/community/community";
import Market from "./components/market/market";

import Category from "./components/businessDiary/category/category";

import Crops from "./components/regional-crops/crops";

import Diary from "./components/businessDiary/diary";
import Parent from "./components/regional-crops/PARENT.JSX";
import Diseases from "./components/courses/diseases";
import ScrollToTop from "./components/scrolltoTop";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {

    const checkUser = async () => {
      const data = await getCurrentUser();
      if (data.$id) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    checkUser();
  }, []);

  return (
    <>
      <div
        className={isLoggedIn ? "sm:pl-52" : "flex flex-col justify-between"}
      >
        {isLoggedIn ? <Sidebar /> : <Header />}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={isLoggedIn ? <Course /> : <Home />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/login" element={isLoggedIn ? <Course /> : <Login />} />
          <Route
            path="/signup"
            element={isLoggedIn ? <Course /> : <Signup />}
          />
          <Route path="/user" element={isLoggedIn ? <User /> : <Home />} />
          <Route
            path="/community"
            element={isLoggedIn ? <Community /> : <Home />}
          />
          <Route path="/market" element={isLoggedIn ? <Market /> : <Home />} />
          <Route
            path="/courses/player/:id/diseases"
            element={isLoggedIn ? <Diseases /> : <Home />}
          />
          <Route
            path="/regional-crops"
            element={isLoggedIn ? <Parent /> : <Home />}
          />
          <Route
            path="/regional-crops/crops"
            element={isLoggedIn ? <Crops /> : <Home />}
          />
          <Route
            path="/business-diary"
            element={isLoggedIn ? <Diary /> : <Home />}
          />
          <Route
            path="/regional-crops/टमाटर"
            element={isLoggedIn ? <CropData /> : <Home />}
          />
          <Route
            path="/courses/player/:id"
            element={isLoggedIn ? <Player /> : <Home />}
          />
          <Route
            path="/business-diary/:id"
            element={isLoggedIn ? <Category /> : <Home />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
