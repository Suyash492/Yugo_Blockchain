// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RideContract {
    enum RideStatus { Active, Completed, Canceled }

    struct Ride {
        uint id;
        address driver;
        string startLocation;
        string endLocation;
        uint256 fare;
        bool booked;
        RideStatus status;
    }

    Ride[] public rides;
    Ride[] public storedride;
    mapping(address=>Ride) public currentRide;

    event NewRide(uint rideId);
    uint256 public totalRides=0;
    function createRide(string memory _startLocation, string memory _endLocation, uint256 _fare) public {
        uint rideId = rides.length + 1;
        Ride memory newRide = Ride({
            id: rideId,
            driver: msg.sender,
            startLocation: _startLocation,
            endLocation: _endLocation,
            fare: _fare,
            booked: false,
            status: RideStatus.Active 
        });
        rides.push(newRide);
        currentRide[msg.sender]=newRide; 
        storedride.push(newRide);      
        emit NewRide(rideId);
        totalRides=rideId;
    }
    function getDetails(uint256 _id)public view returns(string memory,string memory,uint256){
        return (rides[_id-1].startLocation,rides[_id-1].endLocation,rides[_id-1].fare);
    }

    function deleteRide(uint256 _rideId) public {
        delete rides[_rideId];
    }
}
