import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'give-prescription',
  templateUrl: './give-prescription.component.html',
  styleUrls: ['./give-prescription.component.css']
})
export class GivePrescriptionComponent implements OnInit {

  form: FormGroup;
  
  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      client_id: new FormControl(),
      medicine_name: new FormControl(),
      medicine_id: new FormControl(),
    });
  }

}
