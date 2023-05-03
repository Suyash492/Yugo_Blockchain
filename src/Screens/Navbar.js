import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);
  return (
    <nav className="bg-blue-400 flex items-center justify-between flex-wrap px-6 py-4">
    <div className="flex items-center flex-shrink-0 mr-6">
      {/* <img src="yugo-logo.png" alt="Yugo Logo" className="h-8 w-8 mr-2" /> */}
      <NavLink exact to="/Home" className="text-xl font-bold tracking-tight text-white">YuGo</NavLink>
    </div>
    <div  className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <ul className="flex ml-auto">
        <li>
          <NavLink exact to="/Allrides" className="text-white font-semibold hover:text-gray-200 px-4">
            All ride
          </NavLink>
        </li>
        <li>
          <NavLink to="/Createride" className="text-white font-semibold hover:text-gray-200 px-4">
            Publish a Ride
          </NavLink>
        </li>
        <li className="relative">
          <button className="text-white hover:text-gray-200 font-semibold px-4" onClick={() => setShowProfile(!showProfile)}>
            Profile
          </button>
          {showProfile && (
            <ul className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-10">
              {/* <li>
                <NavLink to="/Yourrides" className="block px-4 font-semibold py-2 text-gray-800 hover:bg-gray-200">
                  Your Rides
                </NavLink>
              </li> */}
              <li>
                <NavLink to="/Payments" className="block px-4 font-semibold py-2 text-gray-800 hover:bg-gray-200">
                  Payments
                </NavLink>
              </li>
              <li>
              <NavLink to="/Profile" className="block px-4 py-2 font-semibold text-gray-800 hover:bg-gray-200">
                  Profile
                </NavLink>
                {/* <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200" >
                  Logout
                </button> */}
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  </nav>
  


  );
};

export default Navbar;