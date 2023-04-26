// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./RideContract.sol";

contract BookingContract is RideContract {
    mapping (address => uint[]) public userToRides;

    function bookRide(uint _rideId) public payable {
        require(msg.value >= rides[_rideId - 1].fare, "Insufficient funds");

        rides[_rideId - 1].booked = true;
        userToRides[msg.sender].push(_rideId);
        payable(rides[_rideId - 1].driver).transfer(msg.value);
    }

    function getRidesByUser(address _user) public view returns (uint[] memory) {
        return userToRides[_user];
    }
    function getDriverAddress(uint256 _rideId)public view returns (address){
        return rides[_rideId - 1].driver;
    }
}
