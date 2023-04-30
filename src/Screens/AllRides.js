import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { getAllRides } from "../Web3helpers";
import Navbar from "./Navbar";
// import startPayment from "./Bookride";


function AllRides() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    async function fetchRides() {
      const allRides = await getAllRides();
      setRides(allRides);
    }
    fetchRides();
  }, []);

  return (
    <Container>
      <Navbar></Navbar>
      <Row>
        <Col>
          <h1 className="text-5xl font-bold my-8">All Rides</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rides.map((ride, index) => (
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105">
                <Card.Body>
                  <Card.Title className="text-xl font-bold">
                    Ride {index + 1 }
                  </Card.Title>
                  <hr className="my-2"/>
                  <Card.Text>
                    <span className="font-bold">Ride ID:</span> {ride[7]}
                  </Card.Text>
                  <Card.Text>
                    <span className="font-bold">Start Location:</span> {ride[0]}
                  </Card.Text>
                  <Card.Text>
                    <span className="font-bold">End Location:</span> {ride[1]}
                  </Card.Text>
                  <Card.Text>
                    <span className="font-bold">Fare:</span> {ride[2]}
                  </Card.Text>
                  <Card.Text>
                    <span className="font-bold">Date:</span> {ride[3]}
                  </Card.Text>
                  <Card.Text>
                    <span className="font-bold">Time:</span> {ride[4]}
                  </Card.Text>
                  <Card.Text>
                    <span className="font-bold">No of seats:</span> {ride[5]}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AllRides;
