import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppService } from "../../app.service";
import { ConfirmedValidator } from "../../_nav";

@Component({
  selector: "app-admin-account",
  templateUrl: "./admin-account.component.html",
  styleUrls: ["./admin-account.component.css"],
})
export class AdminAccountComponent implements OnInit {
  public registrationForm: FormGroup;
  public submitted: any;
  public Gender = ["Male", "Female"];
  public PatientDetails: any;
  public dataisready: any = false;

  get f() {
    return this.registrationForm.controls;
  }
  constructor(public fb: FormBuilder, public service: AppService) {}
  public getPAtient = () => {
    let x = {
      user_id: localStorage.getItem("user_id"),
      auth_token: localStorage.getItem("auth_token"),
      patient_id: localStorage.getItem("patient_id"),
    };
    this.service.getPatientbyId(x).subscribe((res: any) => {
      this.PatientDetails = res.data;
      console.log(this.PatientDetails);
      this.registrationForm.patchValue({
        firstName: this.PatientDetails[0].first_name,
        lastName: this.PatientDetails[0].last_name,
        DoB: this.PatientDetails[0].date_of_birth,
        gender: this.PatientDetails[0].gender,
        phone: this.PatientDetails[0].mobile_number,
        email: "abdul@gmail.com",
      });
    });
  };
  ngOnInit() {
    this.registrationForm = this.fb.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        DoB: ["", Validators.required],
        gender: ["", Validators.required],

        phone: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],

        password: "",
        confirmPassword: "",
      },
      {
        validator: ConfirmedValidator("password", "confirmPassword"),
      }
    );
    this.getPAtient();
  }

  onsubmit() {
    this.registrationForm.controls["email"];
    let formdata = this.registrationForm.controls["password"].value;
    console.log(formdata);
    this.submitted = true;
    if (this.registrationForm.invalid) {
      console.log("form Is inValed");
      return;
    } else {
      console.log(this.registrationForm.value);
      // let x = {
      //   first_name: this.registrationForm.controls["firstName"].value,
      //   last_name: this.registrationForm.controls["lastName"].value,
      //   gender: this.registrationForm.controls["gender"].value,
      //   date_of_birth: this.registrationForm.controls["DoB"].value,
      //   mobile_number: this.registrationForm.controls["phone"].value,
      //   user_email: this.registrationForm.controls["email"].value,
      //   password: this.registrationForm.controls["confirmPassword"].value,
      // };
      // this.service.Registion(x).subscribe((res: any) => {
      //   console.log(res);
      // });
    }
  }
  onReset() {
    this.submitted = false;
    this.registrationForm.reset();
  }
}
