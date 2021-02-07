import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Web3Service } from './services/web3.service';
import { NavComponent } from './nav/nav.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ClientComponent } from './client/client.component';
import { MedicineListComponent } from './medicine-list/medicine-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PrescriptionRequestListComponent } from './doctor/prescription-request-list/prescription-request-list.component';
import { GivePrescriptionComponent } from './doctor/give-prescription/give-prescription.component';
import { MedicineService } from './services/medicine.service';
import { RequestService } from './services/request.service';
import { PrescriptionService } from './services/prescription.service';
import { RequestPerscriptionComponent } from './client/request-perscription/request-perscription.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DoctorComponent,
    ClientComponent,
    MedicineListComponent,
    PrescriptionRequestListComponent,
    GivePrescriptionComponent,
    RequestPerscriptionComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule
  ],
  providers: [
    Web3Service,
    MedicineService,
    RequestService,
    PrescriptionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
