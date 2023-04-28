import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <ul className="flex mx-3 px-4 py-3">
        <li>
          <NavLink exact to="/Home" className="text-white hover:text-gray-200 px-4">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/Createride" className="text-white hover:text-gray-200 px-4">
            Create Ride
          </NavLink>
        </li>
        <li>
          <NavLink to="/Allrides" className="text-white hover:text-gray-200 px-4">
            All Rides
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
