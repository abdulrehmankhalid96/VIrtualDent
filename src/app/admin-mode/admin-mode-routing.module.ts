import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminAppointComponent } from "./admin-appoint/admin-appoint.component";
import { AllPatientComponent } from "./all-patient/all-patient.component";
import { TalktoComponent } from "./talkto/talkto.component";
import { AdminAccountComponent } from "./admin-account/admin-account.component";
import { IntakegridComponent } from "./intakegrid/intakegrid.component";
import { DesignFormComponent } from './design-form/design-form.component';
import { ConfigrationStepsComponent } from './configration-steps/configration-steps.component';

const routes: Routes = [
  {
    path: "adminAppointment",
    component: AdminAppointComponent,
  },
  {
    path: "AllPatients",
    component: AllPatientComponent,
  },
  {
    path: "Talkto",
    component: TalktoComponent,
  },
  {
    path: "AdminAcc",
    component: AdminAccountComponent,
  },
  {
    path: "InTakeData",
    component: IntakegridComponent,
  },
  {
    path: "StepsConfigration",
    component:ConfigrationStepsComponent,
  },
  {
    path: "DesignForm/:id",
    component:DesignFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class AdminModeRoutingModule {}
