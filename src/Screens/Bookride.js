import React, { useState } from "react";
import {
  getMatchedRides,
  bookRide,
  getDetails,
  decrementSeats,
  storeRideDetails,
} from "../Web3helpers";
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap";
import Navbar from "./Navbar";
import { Navigate, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import ErrorMessage from "../ErrorMessage";
import TxList from "../TxList";

const RideList = () => {
  const [startLocation1, setStartLocation] = useState("");
  const [endLocation1, setEndLocation] = useState("");
  const [date1, setDate] = useState("");
  const [rides, setRides] = useState([]);
  const [currId, setCurrId] = useState();
  // const [currRide, setCurrRide] = useState();
  const [showModal, setShowModal] = useState(false);
  // const [seat, setSeat] = useState("");
  const [selectedRide, setSelectedRide] = useState(null);
  // const [ pay , setPay] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const availableRides = await getMatchedRides(
        startLocation1,
        endLocation1,
        date1
      );
      console.log(availableRides);
      setRides(availableRides);
    } catch (error) {
      console.log(error);
    }
  };
  // const handleSubmitseat = async (e) => {
  //   e.preventDefault();
  //   console.log(rides);
  //   console.log(currId);
  //   const data = new FormData(e.target);
  //   setError();
  //   await startPayment({
  //     setError,
  //     setTxs,
  //     ether: data.get("ether"),
  //     addr: data.get("addr"),
  //   });
  //   try {
  //     const seats = await decrementSeats(rides[currId][7]);

  //   }
  //   catch (error) {
  //     console.log(error);
  //   }
  // };
  function generateReceipt() {
    const details = storeRideDetails(
      selectedRide[0],
      selectedRide[1],
      selectedRide[3],
      selectedRide[4],
      selectedRide[2]
    );

    // console.log(currRide);
    const receiptWindow = window.open("", "Receipt");
    receiptWindow.document.write(
      "<html><head><title>Receipt</title></head><body>"
    );
    receiptWindow.document.write("<h1>YuGo </h1>");
    receiptWindow.document.write("<h1>Receipt</h1>");
    receiptWindow.document.write(`<p>Ride From: ${
      selectedRide && selectedRide[0]
    } to
    ${selectedRide && selectedRide[1]}</p>
    <ul><li>Date:${selectedRide && selectedRide[3]} </li>
    <li>Time:${selectedRide && selectedRide[4]} </li>
    <li>Amount Paid:${selectedRide && selectedRide[2]} ETH </li>
    </ul>`);
    receiptWindow.document.write("</body></html>");
    receiptWindow.document.close();
    receiptWindow.print();
  }
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: data.get("addr"),
    });
  };

  const startPayment = async ({ setError, setTxs, ether, addr }) => {
    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");

      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      ethers.utils.getAddress(addr);
      const tx = await signer.sendTransaction({
        to: addr,
        value: ethers.utils.parseEther(ether),
      });
      console.log({ ether, addr });
      console.log("tx", tx);
      setTxs([tx]);

      console.log(rides);
      console.log(currId);
      const receipt = generateReceipt();
      const blob = new Blob([receipt], { type: "text/plain;charset=utf-8" });
      try {
        const seats = await decrementSeats(rides[currId][7]);
      } catch (error) {
        console.log(error);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  return (
    <div>
      <Navbar></Navbar>
      <div className="flex flex-col justify-center items-center py-10">
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center gap-4"
        >
          <div className="flex flex-col">
            <label className="text-lg mr-2">
              Start Location:
              <input
                type="text"
                value={startLocation1}
                onChange={(e) => setStartLocation(e.target.value)}
                className="mt-2 mx-4 px-4 py-2 border border-gray-400 rounded-md"
              />
            </label>
            <label className="text-lg mt-4">
              End Location:
              <input
                type="text"
                value={endLocation1}
                onChange={(e) => setEndLocation(e.target.value)}
                className="mt-2 px-4 mx-4 py-2 border border-gray-400 rounded-md"
              />
            </label>
            <label className="text-lg mt-4 ml-16">
              Date:
              <input
                type="text"
                value={date1}
                onChange={(e) => setDate(e.target.value)}
                className="mt-2 px-4 py-2 mx-4 border border-gray-400 rounded-md"
              />
            </label>
          </div>
          <button
            className="text-xl py-2 px-4 rounded-md bg-blue-400 hover:bg-blue-800 text-white font-semibold transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            type="submit"
          >
            Search Rides
          </button>
        </form>
        {rides.length > 0 ? (
          <ul className="mt-8">
            {rides.map((ride) => (
              <li
                key={ride.id}
                className="border border-gray-400 p-4 rounded-md my-2 flex justify-between items-center mr-14"
              >
                <div>
                  <p className="text-lg font-bold">
                    {ride[0]} to {ride[1]}
                  </p>
                  <p className="text-gray-500 mt-1">{ride[2]} ETH</p>
                  <p className="text-gray-500 mt-1">{ride[5]}</p>
                </div>
                <button
                  className="text-lg py-2 px-4 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 mx-4"
                  onClick={() => {
                    setShowModal(true);
                    setSelectedRide(ride);
                    console.log(ride[7]);
                    setCurrId(ride[7]);
                  }}
                >
                  Book
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 text-lg font-medium text-center">No rides found</p>
        )}

        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          className="bg-gray-900 bg-opacity-50 fixed inset-0 flex items-center justify-center"
        >
          <Modal.Header
            closeButton
            className="bg-white rounded-t-lg p-4 text-center"
          >
            <Modal.Title className="font-bold text-lg ">Book Ride</Modal.Title>
          </Modal.Header>

          <Modal.Body className="bg-white rounded-b-lg p-4 flex flex-col items-center justify-center">
            <p className="text-gray-700 mt-1 text-lg">
              Selected Ride: {selectedRide && selectedRide[0]} to{" "}
              {selectedRide && selectedRide[1]}
            </p>
            <p className="text-gray-700 text-lg">
              Price: {selectedRide && selectedRide[2]} ETH
            </p>
            <p className="text-gray-700 text-lg">
              Date: {selectedRide && selectedRide[3]}
            </p>
            <p className="text-gray-700 mb-2 text-lg">
              Time: {selectedRide && selectedRide[4]}
            </p>
            <form className="m-4 w-full max-w-md" onSubmit={handleSubmit1}>
              <div className="credit-card w-full shadow-lg mx-auto rounded-xl bg-white">
                <main className="mt-4 p-4">
                  <h1 className="text-xl font-semibold  text-center">
                    Send ETH payment
                  </h1>
                  <div className="">
                    <div className="my-3">
                      <input
                        type="text"
                        name="addr"
                        className="input input-bordered block w-full focus:ring focus:outline-none px-4 py-2 rounded-lg"
                        value={selectedRide && selectedRide[6]}
                        disable
                      />
                    </div>
                    <div className="my-3">
                      <input
                        name="ether"
                        type="text"
                        className="input input-bordered block w-full focus:ring focus:outline-none px-4 py-2 rounded-lg"
                        value={selectedRide && selectedRide[2]}
                        disable
                      />
                    </div>
                  </div>
                </main>

                <footer className="p-4">
                  <button
                    type="submit"
                    className="btn btn-primary submit-button focus:ring focus:outline-none w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
                  >
                    Pay now
                  </button>
                  <ErrorMessage message={error} />
                </footer>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};
export default RideList;
