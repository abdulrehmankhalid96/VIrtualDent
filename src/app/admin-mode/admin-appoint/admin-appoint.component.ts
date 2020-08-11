import { Component, OnInit } from "@angular/core";
import { AppService } from "./../../app.service";

@Component({
  selector: "app-admin-appoint",
  templateUrl: "./admin-appoint.component.html",
  styleUrls: ["./admin-appoint.component.css"],
})
export class AdminAppointComponent implements OnInit {
  public appointments: any;
  constructor(public service: AppService) {}
  public getAppointmants = () => {
    let x = {
      user_id: localStorage.getItem("user_id"),
      auth_token: localStorage.getItem("auth_token"),
      patient_id: 0,
    };
    this.service.getAppoiment(x).subscribe((res: any) => {
      console.log(res);
      this.appointments = res.data;
    });
  };
  ngOnInit(): void {
    this.getAppointmants();
  }
}
