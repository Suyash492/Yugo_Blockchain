import React, { useState } from 'react';
import { getMatchedRides } from '../Web3helpers';
import { Container, Row, Col, Card } from "react-bootstrap";

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
    <div >
      <form onSubmit={handleSubmit} >
        <div>
        <label >
          Start Location:
          <input type="text" value={startLocation1} onChange={(e) => setStartLocation(e.target.value)} />
        </label>
        <label >
          End Location:
          <input type="text" value={endLocation1} onChange={(e) => setEndLocation(e.target.value)} />
        </label >
        <label >
          Date:
          <input type="text" value={date1} onChange={(e) => setDate(e.target.value)} />
        </label >
        <button className='text-xl' type="submit">Search Rides</button>
        </div>
      </form>
      {rides.length > 0 ? (
        <ul>
          {rides.map((ride) => (
            <li key={ride.id}>
              Ride : {ride[0]} to {ride[1]} for {ride[2]} wei time {ride[4]}
              <button>Book</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No rides found</p>
      )}
    </div>
  );
};

export default RideList;
