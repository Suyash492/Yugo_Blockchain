// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./RideContract.sol";
// import "./CarbonOffsetCredit.sol";

contract RideManagementContract is RideContract {
    mapping (address => uint[])  driverToRides;
    uint[] public completedRides;

    function markRideAsComplete(uint _rideId) public returns(bool){
        require(msg.sender == rides[_rideId - 1].driver, "Unauthorized access");

        rides[_rideId - 1].status = RideStatus.Completed;
        storedride.push(rides[_rideId - 1]);

        uint[] storage ridesByDriver = driverToRides[msg.sender];

        for (uint i = 0; i < ridesByDriver.length; i++) {
            if (ridesByDriver[i] == _rideId) {
                ridesByDriver[i] = ridesByDriver[ridesByDriver.length - 1];
                ridesByDriver.pop();
                break;
            }
        }

        completedRides.push(_rideId);
        return true;
    }
}
