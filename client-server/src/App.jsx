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
import { getCurrentUser } from "./appwrite/session";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const data = await getCurrentUser();
      if (data.$id) {
        console.log("User is logged in");
        setIsLoggedIn(true);
      } else {
        console.log("User is not logged in");
        setIsLoggedIn(false);
      }
    };
    checkUser();
  }, []);

  return (
    <>
      <div className={isLoggedIn ? 'sm:pl-52' : 'flex flex-col justify-between'}>
        {isLoggedIn ? <Sidebar /> : <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={<User />} />
          <Route path="/regional-crops" element={<Region />} />
          <Route path="/regional-crops/Tomato" element={<CropData />} />
          <Route path="/courses/player/:id" element={<Player />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
