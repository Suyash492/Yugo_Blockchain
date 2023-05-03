import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import StarRating from "./StarRating";
import {
  getTotalBookedRides,
  getTotalRides,
  getDecrementedRides,
  getAllRides,
  storeRideDetails,
  decrementSeats,
  getTotalCredits,
  getLength,
  getStoredDetails,
  markComplete
} from "../Web3helpers";
import Navbar from "./Navbar";

const Profile = () => {
  const [rides, setRides] = useState([]);
  const [rides2, setRides2] = useState([]);
  const [rides3, setRides3] = useState([]);
  const [rides4, setRides4] = useState([]);
  const [mark, setMark] = useState()

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const complete = await markComplete(mark);
      console.log("suyash", complete);
      setMark(complete);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    async function fetchRides3() {
      const len = await getLength();
      let stored = [];
      for (let i = 0; i < len; i++) {
        const r = await getStoredDetails(i);
        stored.push(r);
      }
      setRides3(stored);
      console.log(stored);
    }
    fetchRides3();
  }, []);
  useEffect(() => {
    async function fetchRides4() {
      const allRides = await getTotalCredits();
      setRides4(allRides);
      console.log(allRides);
    }
    fetchRides4();
  }, []);

  useEffect(() => {
    async function fetchRides() {
      const allRides = await getTotalRides();
      setRides(allRides);
    }
    fetchRides();
  }, []);
  useEffect(() => {
    async function fetchRides2() {
      const allRides = await getTotalBookedRides();
      setRides2(allRides);
    }
    fetchRides2();
  }, []);

  return (
    <div className="">
      <Navbar></Navbar>
      <div className="flex flex-col items-center">
        {/* <img src={image} alt="Profile" className="w-32 h-32 rounded-full" /> */}
        {/* <h2 className="mt-4 text-2xl font-bold">{address}</h2> */}
        <div className="flex justify-between w-full px-4 py-2 mt-4 bg-gray-100 rounded-lg">
          <div>
            <p className="text-lg font-medium text-gray-800">Booked Rides</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">{rides2}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-800">Created Rides</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">{rides}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-800">Total Credits</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">{rides4}</p>
          </div>
        </div>
      </div>
      <Row>
        <Col>
          <h1 className="text-3xl font-bold my-8">Booked Rides</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rides3.map((ride, index) => (
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105">
                <Card.Body>
                  <Card.Title className="text-xl font-bold">
                    Ride {index + 1}
                  </Card.Title>
                  <hr className="my-2" />
                  {/* <Card.Text>
                    <span className="font-bold">Ride ID:</span> {ride[7]}
                  </Card.Text> */}
                  <Card.Text>
                    <span className="font-bold">Start Location:</span> {ride[0]}
                  </Card.Text>
                  <Card.Text>
                    <span className="font-bold">End Location:</span> {ride[1]}
                  </Card.Text>
                  {/* <Card.Text>
                    <span className="font-bold">Fare:</span> {ride[2]}
                  </Card.Text> */}
                  <Card.Text>
                    <span className="font-bold">Date:</span> {ride[3]}
                  </Card.Text>
                  <Card.Text>
                    <span className="font-bold">Time:</span> {ride[4]}
                  </Card.Text>
                  {/* <Card.Text>
                    <span className="font-bold">No of seats:</span> {ride[5]}
                  </Card.Text> */}
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-lg font-medium text-gray-800">
                      Rate Driver:
                    </p>
                    <div className="flex items-center">
                      <StarRating />
                      {/* <button className="ml-2 bg-blue-500 text-white px-3 py-1 rounded-md" onClick={handleSubmit}>
                        Submit
                      </button> */}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
