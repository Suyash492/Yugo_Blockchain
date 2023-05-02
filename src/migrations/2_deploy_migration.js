const Auth = artifacts.require("Auth");
const RideContract = artifacts.require("RideContract");
const BookingContract = artifacts.require("BookingContract");
const RideManagementContract = artifacts.require("RideManagementContract")

 
module.exports = function (deployer) {
  deployer.deploy(Auth);
  deployer.deploy(RideContract);
  deployer.deploy(BookingContract)
  deployer.deploy(RideManagementContract)
};