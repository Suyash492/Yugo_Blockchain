const Auth = artifacts.require("Auth");
const RideContract = artifacts.require("RideContract")
 
module.exports = function (deployer) {
  deployer.deploy(Auth);
  deployer.deploy(RideContract);
};