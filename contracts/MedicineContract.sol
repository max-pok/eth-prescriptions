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
    mapping(string => Medicine) public medicines;
    
    modifier isDoctor() {
        require(msg.sender == owner, "caller is not a doctor");
        _;
    }
    
    constructor() public {
        owner = msg.sender;
    }
    
    function addDrug(string memory _id, string memory _medicine, string memory _brandName, uint _price) public {
        medicines[_id] = Medicine(_id, _medicine, _brandName, _price);
        medicineCount++;
    }
    
    function removeDrug(string memory _id) public isDoctor {
        delete(medicines[_id]);
        medicineCount--;
    }
    
}