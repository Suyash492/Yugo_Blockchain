import React, { useState } from 'react';
import { getMatchedRides } from '../Web3helpers';
import { Container, Row, Col, Card } from "react-bootstrap";
import Navbar from './Navbar';

const RideList = () => {
  const [startLocation1, setStartLocation] = useState('');
  const [endLocation1, setEndLocation] = useState('');
  const [date1, setDate] = useState('');
  const [rides, setRides] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const availableRides = await getMatchedRides(startLocation1, endLocation1, date1);
      console.log(availableRides);
      setRides(availableRides);
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div>
        <Navbar></Navbar>
      <div className="flex flex-col justify-center items-center py-10">
      <form onSubmit={handleSubmit} className="flex justify-center items-center gap-4">
        <div className="flex flex-col">
          <label className="text-lg mr-2">
            Start Location:
            <input type="text" value={startLocation1} onChange={(e) => setStartLocation(e.target.value)} className="mt-2 mx-4 px-4 py-2 border border-gray-400 rounded-md" />
          </label>
          <label className="text-lg mt-4">
            End Location:
            <input type="text" value={endLocation1} onChange={(e) => setEndLocation(e.target.value)} className="mt-2 px-4 mx-4 py-2 border border-gray-400 rounded-md" />
          </label>
          <label className="text-lg mt-4 ml-16">
            Date:
            <input type="text" value={date1} onChange={(e) => setDate(e.target.value)} className="mt-2 px-4 py-2 mx-4 border border-gray-400 rounded-md" />
          </label>
        </div>
        <button className='text-xl py-2 px-4 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-semibold transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110' type="submit">Search Rides</button>
      </form>
      {rides.length > 0 ? (
        <ul className="mt-8">
          {rides.map((ride) => (
            <li key={ride.id} className="border border-gray-400 p-4 rounded-md my-2 flex justify-between items-center mr-14">
              <div>
                <p className="text-lg font-bold">{ride[0]} to {ride[1]}</p>
                <p className="text-gray-500 mt-1">{ride[2]} wei</p>
              </div>
              <button className="text-lg py-2 px-4 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 mx-4">Book</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 text-lg font-medium text-center">No rides found</p>
      )}
    </div>
    </div>
  );
};

export default RideList;
