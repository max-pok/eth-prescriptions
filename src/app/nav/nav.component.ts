import { Web3Service } from './../services/web3.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  account: any;
  constructor(private web3: Web3Service) {    
    this.web3.getAccounts().subscribe(account => {
      this.account = account;
    });
   }

  ngOnInit(): void {
  }

}
