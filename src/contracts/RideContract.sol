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
        uint256 date;
        uint256 time;
        uint256 noofpass;
        // uint256 availableSeats;
        bool booked;
        RideStatus status;
    }

    Ride[] public rides;
    Ride[] public storedride;
   
    mapping(address=>Ride) public currentRide;

    event NewRide(uint rideId);
    uint256 public totalRides=0;
    function createRide(string memory _startLocation, string memory _endLocation, uint256 _fare, uint256 _date, uint256 _time, uint256 _noofpass) public {
        uint rideId = rides.length + 1;
        Ride memory newRide = Ride({
            id: rideId,
            driver: msg.sender,
            startLocation: _startLocation,
            endLocation: _endLocation,
            fare: _fare,
            date: _date,
            time: _time,
            booked: false,
            status: RideStatus.Active, 
            noofpass: _noofpass
            // availableSeats: _noofpass
        });
        rides.push(newRide);
        currentRide[msg.sender]=newRide; 
        storedride.push(newRide);      
        emit NewRide(rideId);
        totalRides=rideId;
    }
    function decrementSeats(uint256 _rideId) public returns (uint256) {
        require(_rideId > 0 && _rideId <= rides.length, "Invalid ride ID");
        Ride storage ride = rides[_rideId-1];
        require(ride.noofpass > 0, "No available seats in ride");
        ride.noofpass--;
        return(rides[_rideId-1].noofpass);
    }
    function getDetails(uint256 _id)public view returns(string memory,string memory,uint256,uint256,uint256,uint256,address){
        return (rides[_id-1].startLocation,rides[_id-1].endLocation,rides[_id-1].fare,rides[_id-1].date,rides[_id-1].time,rides[_id-1].noofpass,rides[_id-1].driver);
    }
    

    function deleteRide(uint256 _rideId) public {
        delete rides[_rideId];
    }
    
}