import { MedicineData } from './medicine.service';
import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';
import * as request from '../../../build/contracts/ClientContract.json';
import { environment } from 'src/environments/environment';
import { Contract } from 'web3-eth-contract';
import { BehaviorSubject, Observable } from 'rxjs';

export interface RequestData {
  client_id: string;
  client_name: string;
  medicine_id: string;
  medicine_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  requestContract: Contract;
  contractAddress: string;
  abi = [];
  requestList: RequestData[] = [];
  requestListBehavior = new BehaviorSubject<RequestData[]>([]);
  userData: Observable<RequestData[]>;
  
  constructor(private web3Service: Web3Service) { 
    this.abi = request.abi;
    this.contractAddress = environment.contract;
    this.requestContract = new this.web3Service.web3.eth.Contract(this.abi, this.contractAddress);
    this.userData = this.requestListBehavior.asObservable()
    this.setRequests();
  }

  setRequests() {
    this.requestContract.methods.requestCount().call().then(counter => {
      for (let i = 0; i < counter; i++) {
        this.requestContract.methods.getRequest(i).call().then((value) => {
          const req: RequestData = {
            client_id: value[0], client_name: value[1], medicine_id: value[2], medicine_name: value[3]
          };
          this.requestList.push(req);
          this.requestListBehavior.next(this.requestList);
        })
        .catch(err => {
          console.error(err);
          return;
        });
      }
    });
  }

}
