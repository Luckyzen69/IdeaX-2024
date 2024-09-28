import React, { useState } from "react";
import Thumbnail from "../../assets/hum.jpg";
import { CiMail, CiLock } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { TbUser } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { signup } from "../../appwrite/session";
import { createItem } from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [gender, setgender] = useState("male");
  const [role, setrole] = useState("user");
  const [phone, setphone] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!!email && !!password) {
        console.log("in submit");
        const response = await signup(email, password);
        const createResponce = await createItem("signup", {
          firstName: `${firstname}`,
          lastName: `${lastname}`,
          email: `${email}`,
          gender: `${gender}`,
          role: `${role}`,
          phoneNumber: `${phone}`,
        });

        console.log(createResponce, response);
        console.log("done bro !!");
        navigate("/login");
      }
    } catch (err) {
      console.log("error occured during signup :", err);
    }
  }

  return (
    <>
      <div
        style={{ backgroundImage: `url(${Thumbnail})` }}
        className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center "
      >
        <div className="bg-purewhite border border-accent rounded-lg m-2 p-4">
          <h2 className="text-center font-bold text-xl">Signup</h2>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="m-2 p-2 flex flex-col space-y-5 "
          >
            <div className="flex sm:space-x-3">
              <div>
                <label htmlFor="firstname" className="font-bold">
                  First Name:
                </label>
                <div className="flex relative">
                  <FaUser className="absolute text-2xl block left-2 top-1/2 transform -translate-y-1/2" />
                  <input
                    value={firstname}
                    onChange={(e) => setfirstname(e.target.value)}
                    type="firstname"
                    name="firstname"
                    id="firstname"
                    className="border sm:w-96 p-2 pl-10"
                    placeholder="Enter you firstname..."
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="firstname" className="font-bold">
                  Last Name:
                </label>

                <div className="flex relative">
                  <TbUser className="absolute text-2xl block left-2 top-1/2 transform -translate-y-1/2" />
                  <input
                    value={lastname}
                    onChange={(e) => setlastname(e.target.value)}
                    type="lastname"
                    name="lastname"
                    id="lastname"
                    className="border sm:w-96 p-2 pl-10"
                    placeholder="Enter you lastname..."
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex sm:space-x-3">
              <div>
                <label htmlFor="email" className="font-bold">
                  Email:
                </label>
                <div className="flex relative">
                  <CiMail className="absolute text-2xl block left-2 top-1/2 transform -translate-y-1/2" />
                  <input
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    className="border sm:w-96 p-2 pl-10"
                    placeholder="Enter you email..."
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="gender" className="font-bold">
                  Gender:
                </label>
                <div className="flex relative">
                  <select
                    value={gender}
                    onChange={(e) => setgender(e.target.value)}
                    name=""
                    id=""
                    className="w-96 p-2 border"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex sm:space-x-3">
              <div>
                <label htmlFor="phone" className="font-bold">
                  Phone Number:
                </label>
                <div className="flex relative">
                  <FaPhoneAlt className="absolute text-2xl block left-2 top-1/2 transform -translate-y-1/2" />
                  <input
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                    type="number"
                    name="number"
                    id="number"
                    className="border sm:w-96 p-2 pl-10"
                    placeholder="Enter Your Phone Number..."
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="role" className="font-bold">
                  Role:
                </label>
                <div className="flex relative">
                  <select
                    value={role}
                    onChange={(e) => setrole(e.target.value)}
                    name=""
                    id=""
                    className="w-96 p-2 border"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <div>
                <label htmlFor="password" className="font-bold">
                  Password:
                </label>
                <div className="flex relative">
                  <CiLock className="absolute text-2xl block left-2 top-2 " />
                  <input
                    type="password"
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                    name="password"
                    id="password"
                    className="border sm:w-96 p-2 pl-10"
                    placeholder="Enter Your Password..."
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="font-bold">
                  Confirm Password:
                </label>
                <div className="flex relative">
                  <CiLock className="absolute text-2xl block left-2 top-2 " />
                  <input
                    type="password"
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                    name="password"
                    id="password"
                    className="border sm:w-96 p-2 pl-10"
                    placeholder="Enter Password Again..."
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-accent hover:bg-fourth text-white p-2 m-2"
            >
              Submit
            </button>
          </form>
          <div className="flex flex-col justify-center items-center ">
            <div className="flex space-x-4">
              <p>Already have an account?</p>
              <Link to="/login">
                <button className="w-2 underline underline-offset-2 font-bold text-accent">
                  Login
                </button>
              </Link>
            </div>
            <p>or </p>
            <div className="flex  text-xl space-x-4">
              <FcGoogle />
              <FaFacebook />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
