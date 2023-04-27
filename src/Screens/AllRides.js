import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { getAllRides } from "../Web3helpers";
import Navbar from "./Navbar";

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
          <h1 className="text-5xl font-bold ">All Rides</h1>
          {rides.map((ride, index) => (
            <Card className="mt-3" key={index}>
              <Card.Body>
                <Card.Title>Ride {index + 1 }</Card.Title>
                <Card.Text>Start Location: {ride[0]}</Card.Text>
                <Card.Text>End Location: {ride[1]}</Card.Text>
                <Card.Text>Fare: {ride[2]}</Card.Text>
                <Card.Text>Date: {ride[3]}</Card.Text>
                <Card.Text>Time: {ride[4]}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default AllRides;
