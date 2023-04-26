// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./RideManagementContract.sol";
import "./RideContract.sol";

contract CarbonOffsetCredit {
    RideManagementContract public rideManagementContract;
    RideContract public ridecontract;

    mapping(uint => bool) public rideToOffsetCreditIssued;

    uint constant CREDIT_AMOUNT = 20;

    event OffsetCreditIssued(uint indexed rideId, uint creditAmount);

    constructor(address _rideManagementContractAddress) {
        rideManagementContract = RideManagementContract(_rideManagementContractAddress);
    }

    function issueOffsetCredit(uint _rideId) public  {
        require(rideManagementContract.markRideAsComplete(_rideId), "Ride is not complete");
        // require(ridecontract.deleteRide(_rideId), "Ride is not complete");
        require(!rideToOffsetCreditIssued[_rideId], "Offset credit already issued for this ride");
        
        rideToOffsetCreditIssued[_rideId] = true;

        uint creditAmount = CREDIT_AMOUNT;

        emit OffsetCreditIssued(_rideId, creditAmount);
    }
}
