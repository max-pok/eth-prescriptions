import { Inject, Injectable } from '@angular/core';
import { Web3Service } from './web3.service';
import * as medicine from '../../../build/contracts/MedicineContract.json';
import { environment } from 'src/environments/environment';
import { Contract } from 'web3-eth-contract';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  medicineContract: Contract;
  contractAddress: string;
  abi = [];
  account;

  constructor(private web3Service: Web3Service) { 
    this.abi = medicine.abi;
    this.contractAddress = environment.contract;
    this.medicineContract = new web3Service.web3.eth.Contract(this.abi, this.contractAddress);
    console.log(this.medicineContract);
    
  }

  addMedicine(id, medicine_name, brand_name, price) {
    this.medicineContract.methods.addDrug(id, medicine_name, brand_name, price)
    .send({
      from: '0xe092b1fa25DF5786D151246E492Eed3d15EA4dAA'
    }).then(value => {
      console.log("ok = ", value);
      this.medicineContract.methods.medicineCount().call().then(answer => {
        console.log(answer);
      });
    }).catch(err => {
      console.error(err);
    });
  }

  getMedicine() {
  }
}
