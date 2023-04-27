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
  const [rideInfo, setRideInfo] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("njd");
      const result = await createRide(startLocation, endLocation, fare,date,time);
      console.log(result)
      const id = result.events.NewRide.returnValues.rideId;
      const data = await getDetails(id);
      setRideInfo(data);
      setStartLocation("");
      setEndLocation("");
      setFare("");
      setDate("");
      setTime("");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Navbar></Navbar>
      <Row>
        <Col>
          <h1>Create a Ride</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formStartLocation">
              <Form.Label>Start Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter start location"
                value={startLocation}
                onChange={(event) => setStartLocation(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formEndLocation">
              <Form.Label>End Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter end location"
                value={endLocation}
                onChange={(event) => setEndLocation(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFare">
              <Form.Label>Fare</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter fare"
                value={fare}
                onChange={(event) => setFare(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          {rideInfo && (
            <Card className="mt-3">
              <Card.Body>
                <Card.Title>Ride Information</Card.Title>
                <Card.Text>Start Location: {rideInfo[0]}</Card.Text>
                {/* <Card.Text>Start Location: {startLocation}</Card.Text> */}
                <Card.Text>End Location: {rideInfo[1]}</Card.Text>
                {/* <Card.Text>End Location: {endLocation}</Card.Text> */}
                <Card.Text>Fare: {rideInfo[2]}</Card.Text>
                <Card.Text>Date: {rideInfo[3]}</Card.Text>
                <Card.Text>Time: {rideInfo[4]}</Card.Text>
                {/* <Card.Text>Fare: {fare}</Card.Text> */}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Createride;
