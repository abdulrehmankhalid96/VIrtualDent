import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserModeRoutingModule } from "./user-mode-routing.module";
import { TalkToDentistComponent } from "./talk-to-dentist/talk-to-dentist.component";
import { MyAppointmentsComponent } from "./my-appointments/my-appointments.component";
import { MyAccountComponent } from "./my-account/my-account.component";
import { NgxSmartModalModule } from "ngx-smart-modal";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    TalkToDentistComponent,
    MyAppointmentsComponent,
    MyAccountComponent,
  ],
  imports: [
    CommonModule,
    UserModeRoutingModule,
    NgxSmartModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class UserModeModule {}
