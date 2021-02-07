import { ClientComponent } from './client/client.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DoctorComponent } from './doctor/doctor.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  { path: 'doctor', component: DoctorComponent, canActivate: [AuthGuardService] },
  { path: 'client', component: ClientComponent },
  { path: '*', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
