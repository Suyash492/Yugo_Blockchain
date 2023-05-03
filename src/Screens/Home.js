import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import Navbar from "./Navbar";
import { FaCloud ,FaIdBadge,FaDatabase} from "react-icons/fa";

 
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
      className="bg-blue-400 ml-8 text-white px-4 py-2 rounded-md mr-5 hover:bg-blue-800"
      onClick={() => {
        localStorage.removeItem("email");
        localStorage.removeItem("account");
        window.location.reload();
      }}
    >
      Log out
    </button>
    <div className="mt-10 flex justify-center gap-5">
  <button
    className="bg-blue-400 hover:bg-blue-500 active:bg-blue-600 text-white px-6 py-3 rounded-md transition-colors duration-150"
    onClick={changetocreate}
  >
    
    <span className="flex items-center justify-center">
      <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.75 13.5H13.5V18.75H10.5V13.5H5.25V10.5H10.5V5.25H13.5V10.5H18.75V13.5Z" fill="currentColor"/>
      </svg>
      Create Ride
    </span>
  </button>
  <button
    className="bg-blue-400 hover:bg-blue-500 active:bg-blue-600 text-white px-6 py-3 rounded-md transition-colors duration-150"
    onClick={changetobook}
  >
    <span className="flex items-center justify-center">
      <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.125 10.125H8.625V11.625H7.125V10.125ZM7.125 13.125H8.625V14.625H7.125V13.125ZM7.125 16.125H8.625V17.625H7.125V16.125ZM10.125 10.125H11.625V11.625H10.125V10.125ZM10.125 13.125H11.625V14.625H10.125V13.125ZM10.125 16.125H11.625V17.625H10.125V16.125ZM13.125 10.125H14.625V11.625H13.125V10.125ZM13.125 13.125H14.625V14.625H13.125V13.125ZM13.125 16.125H14.625V17.625H13.125V16.125ZM19.875 7.125H4.125C3.4875 7.125 3 7.6125 3 8.25V15.75C3 16.3875 3.4875 16.875 4.125 16.875H19.875C20.5125 16.875 21 16.3875 21 15.75V8.25C21 7.6125 20.5125 7.125 19.875 7.125ZM4.125 8.625H19.875V15.375H4.125V8.625Z" fill="currentColor"/>
    
      </svg>
      Book Ride
    </span>
  </button>
</div>


    {/* Three Cards in a Row */}
    <div className="flex flex-row mt-10 gap-5">
      <div className="w-1/3 bg-white rounded-md shadow-md transition duration-500 ease-in-out transform hover:scale-105">
        {/* <img className="w-full h-32 object-cover rounded-t-md" src="card-1-image.jpg" alt="Card 1" /> */}
        <FaDatabase className="text-5xl ml-5 mt-5 text-blue-300" />
        <div className="p-5">
          <h3 className="text-lg font-bold mb-2 text-left">Your pick of rides at low prices</h3>
          <p className="text-gray-600 text-left">No matter where you’re going, by bus or carpool, find the perfect ride from our wide range of destinations and routes at low prices.</p>
        </div>
      </div>
      <div className="w-1/3 bg-white rounded-md shadow-md transition duration-500 ease-in-out transform hover:scale-105">
        {/* <img className="w-full h-32 object-cover rounded-t-md" src="card-2-image.jpg" alt="Card 2" /> */}
        <FaIdBadge className="text-5xl ml-5 mt-5 text-blue-300" />
        <div className="p-5">
          <h3 className="text-lg font-bold mb-2 text-left">Trust who you travel with</h3>
          <p className="text-gray-600 text-left">We take the time to get to know each of our members. We check reviews, profiles and IDs, so you know who you’re travelling with and can book your ride at ease on our secure platform.</p>
        </div>
      </div>
      <div className="w-1/3 bg-white rounded-md shadow-md transition duration-500 ease-in-out transform hover:scale-105">
        {/* <img className="w-full h-32 object-cover rounded-t-md" src="card-3-image.jpg" alt="Card 3" /> */}
        {/* <FontAwesomeIcon icon="fa-light fa-cloud-bolt" /> */}
        <FaCloud className="text-5xl ml-5 mt-5 text-blue-300" />

        <i class="fa-light fa-cloud-bolt"></i>
        <div className="p-5">
          <h3 className="text-lg font-bold mb-2 text-left">Scroll, click, tap and go!</h3>
          <p className="text-gray-600 text-left">Booking a ride has never been easier! Thanks to our simple app powered by great technology, you can book a ride close to you in just minutes..</p>
        </div>
      </div>
    </div>
  </div>
<div className="bg-blue-400 mb-5 h-80 flex">
        <div className="mt-16 ">
        <h3 className="text-white font-bold mr-6 text-3xl ">We help you keep you safe from scams</h3>
        <p className="text-white mt-4 font-semibold text-bold text-left text-xl w-1/2 ml-52">At Yugo, we're working hard to make our platform as secure as it can be. But when scams do happen, we want you to know exactly how to avoid and report them. Follow our tips to help us keep you safe.</p>
        </div>
        <img className=" mr-28 object-cover rounded-t-md " src="https://cdn.blablacar.com/kairos/assets/images/scamDetective-653544b71d88f51797db..svg" alt="Card 2" />

</div>
</div>

  );
}
