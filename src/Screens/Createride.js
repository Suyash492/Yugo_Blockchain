import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { createRide, getDetails } from "../Web3helpers";
import Navbar from "./Navbar";

function Createride() {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [fare, setFare] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [noofpass, setPass] = useState("");
  const [rideInfo, setRideInfo] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await createRide(
        startLocation,
        endLocation,
        fare,
        date,
        time,
        noofpass
      );
      const id = result.events.NewRide.returnValues.rideId;
      const data = await getDetails(id);
      console.log(data);
      setRideInfo(data);
      setStartLocation("");
      setEndLocation("");
      setFare("");
      setDate("");
      setTime("");
      setPass("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-3xl font-bold mb-6">Create a Ride</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formStartLocation">
                <Form.Label className="block font-medium text-gray-700 mb-2">
                  Start Location
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter start location"
                  value={startLocation}
                  onChange={(event) => setStartLocation(event.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </Form.Group>
              <Form.Group controlId="formEndLocation">
                <Form.Label className="block font-medium text-gray-700 mb-2">
                  End Location
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter end location"
                  value={endLocation}
                  onChange={(event) => setEndLocation(event.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </Form.Group>
              <Form.Group controlId="formFare">
                <Form.Label className="block font-medium text-gray-700 mb-2">
                  Fare
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter fare"
                  value={fare}
                  onChange={(event) => setFare(event.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </Form.Group>
              <Form.Group controlId="formDate">
                <Form.Label className="block font-medium text-gray-700 mb-2">
                  Date
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </Form.Group>
              <Form.Group controlId="formTime">
                <Form.Label className="block font-medium text-gray-700 mb-2">
                  Time
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter time"
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </Form.Group>
              <Form.Group controlId="formpass">
                <Form.Label className="block font-medium text-gray-700 mb-2">
                  No of Seats
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter seats"
                  value={noofpass}
                  onChange={(event) => setPass(event.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
              >
                Submit
              </Button>
            </Form>
            {rideInfo && (
              <Card className="mt-3">
                <Card.Body className="bg-gray-100 rounded-lg p-4">
                  <Card.Title className="text-2xl font-bold mb-4">
                    Ride Information
                  </Card.Title>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold">Start Location:</p>
                      <p className="">{rideInfo[0]}</p>
                    </div>
                    <div>
                      <p className="font-semibold">End Location:</p>
                      <p className="">{rideInfo[1]}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Fare:</p>
                      <p className="">{rideInfo[2]}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Date:</p>
                      <p className="">{rideInfo[3]}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Time:</p>
                      <p className="">{rideInfo[4]}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Seats:</p>
                      <p className="">{rideInfo[5]}</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Createride;
