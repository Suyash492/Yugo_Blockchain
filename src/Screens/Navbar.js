import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul className='flex'>
        <li>
          {/* <NavLink exact to="/">Home</NavLink> */}
          <NavLink exact="true" to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/create-ride">Create Ride</NavLink>
        </li>
        <li>
          <NavLink to="/all-rides">All Rides</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
