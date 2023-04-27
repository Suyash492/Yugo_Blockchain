import React, { useState } from 'react';
import { getMatchedRides } from '../Web3helpers';
import { Container, Row, Col, Card } from "react-bootstrap";

const RideList = () => {
  const [startLocation1, setStartLocation] = useState('');
  const [endLocation1, setEndLocation] = useState('');
  const [rides, setRides] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const availableRides = await getMatchedRides(startLocation1, endLocation1);
      console.log(availableRides);
      setRides(availableRides);
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Start Location:
          <input type="text" value={startLocation1} onChange={(e) => setStartLocation(e.target.value)} />
        </label>
        <label>
          End Location:
          <input type="text" value={endLocation1} onChange={(e) => setEndLocation(e.target.value)} />
        </label>
        <button type="submit">Search Rides</button>
      </form>
      {rides.length > 0 ? (
        <ul>
          {rides.map((ride) => (
            <li key={ride.id}>
              Ride : {ride[0]} to {ride[1]} for {ride[2]} wei
              <button>Book</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No rides found</p>
      )}
      {/* {rides.map((ride, index) => (
            <Card className="mt-3" key={index}>
              <Card.Body>
                <Card.Title>Ride {index + 1}</Card.Title>
                <Card.Text>Start Location: {ride[0]}</Card.Text>
                <Card.Text>End Location: {ride[1]}</Card.Text>
                <Card.Text>Fare: {ride[2]}</Card.Text>
              </Card.Body>
            </Card>
          ))} */}
    </div>
  );
};

export default RideList;
