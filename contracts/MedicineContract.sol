// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MedicineContract {
    
    struct Medicine {
        string _id;
        string _drugName;
        string _brandName;
        uint _price;
    }
    
    address owner;
    
    uint public medicineCount = 0;
    Medicine[] public medicines;
    
    address[] private permitted = [address(0xe092b1fa25DF5786D151246E492Eed3d15EA4dAA)];

    function onlyPermittedDoctor(address sender) public pure returns(bool){
        if (sender != address(0xe092b1fa25DF5786D151246E492Eed3d15EA4dAA))
                return false;
        return true;
    }

    modifier isDoctor(){
        require(onlyPermittedDoctor(msg.sender), 'caller is not a doctor');
        _;
    }
    
    constructor() public {
    }
    
    function addDrug(string memory _id, string memory _medicine, string memory _brandName, uint _price) public {
        medicines.push(Medicine(_id, _medicine, _brandName, _price));
        medicineCount++;
    }
    
    function removeDrug(uint index) public isDoctor {
        if (index >= medicines.length) return;

        for (uint i = index; i < medicines.length-1; i++){
            medicines[i] = medicines[i+1];
        }
        medicines.pop();
        medicineCount--;
    }

    function getMedicine(uint index) public view returns(string memory, string memory, string memory, uint) {
        return (medicines[index]._id, medicines[index]._drugName, medicines[index]._brandName, medicines[index]._price);
    }
}