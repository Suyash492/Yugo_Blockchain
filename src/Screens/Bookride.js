// import React, { useState } from "react";
// import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
// import { bookRide, getDetails } from "../Web3helpers";
// import Navbar from "./Navbar";

// function Bookride() {
//   const [startLocation, setStartLocation] = useState("");
//   const [endLocation, setEndLocation] = useState("");
//   const [rides, setRides] = useState([]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const result = await bookRide(startLocation, endLocation);
//       const rideIds = await result.map((id) => id.toNumber());
//       const ridesData = await Promise.all(
//         rideIds.map(async (id) => {
//           const data = await getDetails(id);
//           return { id, data };
//         })
//       );
//       setRides(ridesData);
//       setStartLocation("");
//       setEndLocation("");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Container>
//       <Navbar />
//       <Row>
//         <Col>
//           <h1>Book a Ride</h1>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="formStartLocation">
//               <Form.Label>Start Location</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter start location"
//                 value={startLocation}
//                 onChange={(event) => setStartLocation(event.target.value)}
//               />
//             </Form.Group>
//             <Form.Group controlId="formEndLocation">
//               <Form.Label>End Location</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter end location"
//                 value={endLocation}
//                 onChange={(event) => setEndLocation(event.target.value)}
//               />
//             </Form.Group>
//             <Button variant="primary" type="submit">
//               Search
//             </Button>
//           </Form>
//           {rides.length > 0 && (
//             <div className="mt-3">
//               <h3>Search Results</h3>
//               {rides.map((ride) => (
//                 <Card className="mt-3" key={ride.id}>
//                   <Card.Body>
//                     <Card.Title>Ride Information</Card.Title>
//                     <Card.Text>Start Location: {ride.data[0]}</Card.Text>
//                     <Card.Text>End Location: {ride.data[1]}</Card.Text>
//                     <Card.Text>Fare: {ride.data[2]}</Card.Text>
//                     <Card.Text>Driver Address: {ride.data[3]}</Card.Text>
//                   </Card.Body>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default Bookride;
