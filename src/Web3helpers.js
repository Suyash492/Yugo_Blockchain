import Web3 from "web3/dist/web3.min.js";
import Auth from "./build/contracts/Auth.json";
import RideContract from "./build/contracts/RideContract.json";
import RideManagementContract from "./build/contracts/RideManagementContract.json"

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
let ridemangement;

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
  const deployedNetwork1 = RideManagementContract.networks[networkId1];
  if (!deployedNetwork && !deployedNetwork1) {
    throw new Error(`Contract not deployed on network with id: ${networkId1}`);
  }
  rideContract = new web3.eth.Contract(
    RideContract.abi,
    deployedNetwork.address
  );
  ridemangement = new web3.eth.Contract(
    RideManagementContract.abi,
    deployedNetwork1.address
  )

  return rideContract,ridemangement;
};

export const createRide = async (
  startLocation,
  endLocation,
  fare,
  date,
  time,
  noofpass
) => {
  if (!rideContract) {
    await initContract();
  }
  const accounts = await web3.eth.getAccounts();
  const result = await rideContract.methods
    .createRide(startLocation, endLocation, fare, date, time, noofpass)
    .send({ from: accounts[0] });
  return result;
};
export const markComplete = async (rideId) => {
  if (!ridemangement) {
    await initContract();
  }
  const accounts = await web3.eth.getAccounts();
  const result = await ridemangement.methods
  .markRideAsComplete(rideId)
  .send({ from: accounts[0] });
  return result;
}

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
export const getTotalCredits = async () => {
  if (!rideContract) {
    await initContract();
  }
  const rideCount = await rideContract.methods.CarbonCredits().call();
  return rideCount;
};
export const getTotalBookedRides = async () => {
  if (!rideContract) {
    await initContract();
  }
  const rideCount = await rideContract.methods.numBookedRides().call();
  return rideCount;
};
export const getLength = async () => {
  if (!rideContract) {
    await initContract();
  }
  const rideCount = await rideContract.methods.getLength().call();
  return rideCount;
};
export const getStoredDetails = async (id) => {
  if (!rideContract) {
    await initContract();
  }
  const rideCount = await rideContract.methods.getStoredDetails(id).call();
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
    ride[7] = i;
    // ride[5]= ride[5]-1;
    rides.push(ride);
  }
  return rides;
};

// export const getDecrementedRides = async (rideId) => {
//   if (!rideContract) {
//     await initContract();
//   }
//   const totalRides = await rideContract.methods.numBookedRides().call();
//   const rides2 = [];
//   for (let i = 1; i <= totalRides; i++) {
//     const ride = await rideContract.methods.getDetails(i).call();
//     ride[7] =i;
//     if(i == rideId){

//       rides2.push(ride);
//     }
//   }
//   return rides2;
// };
export const getMatchedRides = async (startLocation1, endLocation1, date1) => {
  if (!rideContract) {
    await initContract();
  }
  const totalRides = await rideContract.methods.totalRides().call();
  const matchedRides = [];
  for (let i = 1; i <= totalRides; i++) {
    const ride = await rideContract.methods.getDetails(i).call();
    ride[7] = i;
    console.log(ride);
    if (
      ride[0] == startLocation1 &&
      ride[1] == endLocation1 &&
      ride[3] == date1
    ) {
      console.log("adw");
      matchedRides[i] = ride;
    }
  }
  return matchedRides;
};

export const decrementSeats = async (rideId) => {
  if (!rideContract) {
    await initContract();
  }
  const accounts = await web3.eth.getAccounts();
  const result = await rideContract.methods
    .decrementSeats(rideId)
    .send({ from: accounts[0] });
  return result;
};
export async function storeRideDetails(
  rideFrom,
  rideTo,
  rideDate,
  rideTime,
  amountPaid
) {
  if (!rideContract) {
    await initContract();
  }
  const accounts = await web3.eth.getAccounts();
  const result = await rideContract.methods
    .storeRideDetails(rideFrom, rideTo, rideDate, rideTime, amountPaid)
    .send({ from: accounts[0] });
  console.log(result);
  return result;
}
