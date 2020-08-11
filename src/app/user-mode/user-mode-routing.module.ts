import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TalkToDentistComponent } from "./talk-to-dentist/talk-to-dentist.component";
import { MyAccountComponent } from "./my-account/my-account.component";
import { MyAppointmentsComponent } from "./my-appointments/my-appointments.component";

const routes: Routes = [
  {
    path: "TalkToDentist",
    component: TalkToDentistComponent,
  },
  {
    path: "MyAppointments",
    component: MyAppointmentsComponent,
  },
  {
    path: "MyAccount",
    component: MyAccountComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class UserModeRoutingModule {}
