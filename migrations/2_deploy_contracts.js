const Medicine = artifacts.require("MedicineContract");

module.exports = function(deployer) {
    deployer.deploy(Medicine);
};