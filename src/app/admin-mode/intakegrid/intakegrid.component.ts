import { Component, OnInit } from "@angular/core";
import { AppService } from "./../../app.service";

@Component({
  selector: "app-intakegrid",
  templateUrl: "./intakegrid.component.html",
  styleUrls: ["./intakegrid.component.css"],
})
export class IntakegridComponent implements OnInit {
  constructor(public service: AppService) {}
  public intakdata: any;
  public getIntakeform = () => {
    let x = {
      user_id: localStorage.getItem("user_id"),
      auth_token: localStorage.getItem("user_id"),
    };
    this.service.InTakeFormData(x).subscribe((res: any) => {
      console.log(res);
      this.intakdata = res.data;
    });
  };
  ngOnInit(): void {
    this.getIntakeform();
  }
}
