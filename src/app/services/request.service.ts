import { MedicineService } from './medicine.service';
import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';
import * as client from '../../../build/contracts/ClientContract.json';
import { RequestData } from '../models/RequestData';
import { environment } from 'src/environments/environment';
import { Contract } from 'web3-eth-contract';
import { BehaviorSubject, Observable } from 'rxjs';

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
  
  constructor(private web3Service: Web3Service, private medicineService: MedicineService) { 
    this.abi = client.abi;
    this.contractAddress = environment.contract;
    this.requestContract = new this.web3Service.web3.eth.Contract(this.abi, this.contractAddress);
    this.userData = this.requestListBehavior.asObservable()
    this.getRequestsFromBlockChain();
  }

  getRequestsFromBlockChain() {
    this.requestContract.methods.requestCount().call().then(counter => {
      for (let i = 0; i < counter; i++) {
        this.requestContract.methods.getRequest(i).call().then((value) => {
          const req: RequestData = {
            request_number: Number(value[0]), client_id: value[1], medicine_id: value[2], medicine_name: value[3]
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

  acceptRequest(client_address, medicine_id ,index: number) {
    this.requestContract.methods.givePerscriptionWithIndex(client_address, medicine_id, index)
      .send({
        from: this.web3Service.currentAccount,
        gasLimit: 3000000,
        gasPrice: 1
      })
      .then(() => {
        // TODO: Remove request from request list.
      })
      .catch(err => {
        console.error(err);
      });
  }

  givePerscription(client_id, medicine_id) {
    this.requestContract.methods.givePerscriptionWithoutIndex(client_id, medicine_id)
      .send({
        from: this.web3Service.currentAccount,
        gasLimit: 3000000,
        gasPrice: 1
      })
      .then(() => {
        // TODO: if perscription exist in request list => remove it.
      })
      .catch(err => {
        console.error(err);
    });
  }

  requestPerscription(client_id, medicine_id) {
    this.requestContract.methods.requestPerscription(client_id, medicine_id).send({
      from: this.web3Service.currentAccount,
      gasLimit: 3000000,
      gasPrice: 1
    })
    .then(() => {
      const req: RequestData = {
        request_number: this.requestListBehavior.getValue.length, 
        client_id: client_id,
        medicine_id: medicine_id,
        medicine_name: this.medicineService.getMedicineName(medicine_id)
      }
      this.requestList.push(req);
      this.requestListBehavior.next(this.requestList);
    })
    .catch(err => {
      console.error(err);
    });
  }

}
