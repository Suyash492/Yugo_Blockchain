import Web3 from "web3/dist/web3.min.js";

import Auth from "./build/contracts/Auth.json";
import RideContract from "./build/contracts/RideContract.json";

export const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
};

export const loadBlockchainData = async () => {
  const web3 = window.web3;
  // Load account
  const accounts = await web3.eth.getAccounts();

  // Network ID

  const networkId = await web3.eth.net.getId();

  // Network data

  if (networkId) {
    const auth = new web3.eth.Contract(
      Auth.abi,
      Auth.networks[networkId].address
    );
    return { auth, accounts: accounts[0] };
  }
};

let web3;
let rideContract;

const initWeb3 = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
    } catch (error) {
      throw new Error("User denied account access");
    }
  } else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
  } else {
    const provider = new Web3.providers.HttpProvider("http://localhost:7545");
    web3 = new Web3(provider);
  }
  return web3;
};

const initContract = async () => {
  if (!web3) {
    await initWeb3();
  }
  const networkId1 = await web3.eth.net.getId();
  const deployedNetwork = RideContract.networks[networkId1];
  if (!deployedNetwork) {
    throw new Error(`Contract not deployed on network with id: ${networkId1}`);
  }
  rideContract = new web3.eth.Contract(
    RideContract.abi,
    deployedNetwork.address
  );
  return rideContract;
};

export const createRide = async (startLocation, endLocation, fare) => {
  if (!rideContract) {
    await initContract();
  }
  const accounts = await web3.eth.getAccounts();
  const result = await rideContract.methods
    .createRide(startLocation, endLocation, fare)
    .send({ from: accounts[0] });
  return result;
};

export const deleteRide = async (rideId) => {
  if (!rideContract) {
    await initContract();
  }
  const accounts = await web3.eth.getAccounts();
  const result = await rideContract.methods
    .deleteRide(rideId)
    .send({ from: accounts[0] });
  return result;
};

export const getDetails = async (id) => {
  if (!rideContract) {
    await initContract();
  }
  const rideCount = await rideContract.methods.getDetails(id).call();
  return rideCount;
};
export const getTotalRides = async () => {
  if (!rideContract) {
    await initContract();
  }
  const rideCount = await rideContract.methods.totalRides().call();
  return rideCount;
};
export const getAllRides = async () => {
    if (!rideContract) {
      await initContract();
    }
    const totalRides = await rideContract.methods.totalRides().call();
    const rides = [];
    for (let i = 1; i <= totalRides; i++) {
      const ride = await rideContract.methods.getDetails(i).call();
      rides.push(ride);
    }
    return rides;
  };