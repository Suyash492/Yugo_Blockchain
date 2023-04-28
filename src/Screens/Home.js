import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import Navbar from "./Navbar";
 
export default function Home() {
  const email = localStorage.getItem("email");
  const account = localStorage.getItem("account");
 
  const navigate = useNavigate();
  function changetocreate() {
    navigate("/Createride");
  }
  function changetobook() {
    navigate("/Bookride");
  }
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar></Navbar>
      <div className="max-w-4xl mx-auto py-10 px-5">
        <h3 className="text-2xl font-bold mb-5">Your account: {account} </h3>
        <h3 className="text-2xl font-bold mb-5">Your email: {email} </h3>
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded-md mr-5 hover:bg-purple-700"
          onClick={() => {
            localStorage.removeItem("email");
            localStorage.removeItem("account");
            window.location.reload();
          }}
        >
          Log out
        </button>
        <div className="mt-10 flex flex-col gap-5">
          <button
            className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700"
            onClick={changetocreate}
          >
            Create Ride
          </button>
          <button
            className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700"
            onClick={changetobook}
          >
            Book Ride
          </button>
        </div>
      </div>
    </div>
  );
}
