import { Component, OnInit } from "@angular/core";
import { NgxSmartModalService } from "ngx-smart-modal";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppService } from "./../../app.service";
import { INavData } from "@coreui/angular";

@Component({
  selector: "app-my-appointments",
  templateUrl: "./my-appointments.component.html",
  styleUrls: ["./my-appointments.component.css"],
})
export class MyAppointmentsComponent implements OnInit {
  public AppointmentForm: FormGroup;
  public submitted;
  public appointments: any;
  public PatientDetails: any;
  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    public fb: FormBuilder,
    public service: AppService
  ) {}

  public getAppointmants = () => {
    let x = {
      user_id: localStorage.getItem("user_id"),
      auth_token: localStorage.getItem("auth_token"),
      patient_id: localStorage.getItem("patient_id"),
    };
    this.service.getAppoiment(x).subscribe((res: any) => {
      console.log(res);
      this.appointments = res.data;
    });
  };
  public getPAtient = () => {
    let x = {
      user_id: localStorage.getItem("user_id"),
      auth_token: localStorage.getItem("auth_token"),
      patient_id: localStorage.getItem("patient_id"),
    };
    this.service.getPatientbyId(x).subscribe((res: any) => {
      this.PatientDetails = res.data;
      console.log(this.PatientDetails);
    });
  };
  ngOnInit(): void {
    this.AppointmentForm = this.fb.group({
      app_title: ["", Validators.required],
      app_date: ["", Validators.required],
      app_description: ["", Validators.required],
      app_time: ["", Validators.required],
    });
    this.getAppointmants();
  }
  get f() {
    return this.AppointmentForm.controls;
  }
  onsubmit() {
    this.submitted = true;
    if (this.AppointmentForm.invalid) {
      console.log("form Is inValed");
      return;
    } else {
      let x = {
        user_id: localStorage.getItem("user_id"),
        auth_token: localStorage.getItem("auth_token"),
        app_title: this.AppointmentForm.controls["app_title"].value,
        app_description: this.AppointmentForm.controls["app_description"].value,
        app_date: this.AppointmentForm.controls["app_date"].value,
        app_time: this.AppointmentForm.controls["app_time"].value,
        patient_id: localStorage.getItem("patient_id"),
      };
      this.service.Addappointment(x).subscribe((res: any) => {
        console.log(res);
        this.ngxSmartModalService.getModal("myModal").close();
        this.getAppointmants();
      });
    }
  }
}
