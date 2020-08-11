import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminModeRoutingModule } from "./admin-mode-routing.module";
import { AdminAppointComponent } from "./admin-appoint/admin-appoint.component";
import { AllPatientComponent } from "./all-patient/all-patient.component";
import { AdminAccountComponent } from "./admin-account/admin-account.component";
import { TalktoComponent } from "./talkto/talkto.component";
import { NgxSmartModalModule } from "ngx-smart-modal";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ScheduleModule } from "@syncfusion/ej2-angular-schedule";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { ModalModule } from "ngb-modal";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";
import { IntakegridComponent } from "./intakegrid/intakegrid.component";
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DesignFormComponent } from './design-form/design-form.component';
import { ConfigrationStepsComponent } from './configration-steps/configration-steps.component';
@NgModule({
  declarations: [
    AdminAppointComponent,
    AllPatientComponent,
    AdminAccountComponent,
    TalktoComponent,
    IntakegridComponent,
    DesignFormComponent,
    ConfigrationStepsComponent,
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    AdminModeRoutingModule,
    NgxSmartModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ScheduleModule,
    NgxSpinnerModule,
    NgbModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ModalModule,
    DateTimePickerModule,
  ],
})
export class AdminModeModule {}
