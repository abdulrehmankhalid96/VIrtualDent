import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { ConfirmedValidator } from "../../_nav";
import { AppService } from "./../../app.service";
import { Router } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: "app-dashboard",
  templateUrl: "register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  public registrationForm: FormGroup;
  public submitted: any;
  public Gender = ["Male", "Female"];

  get f() {
    return this.registrationForm.controls;
  }
  constructor(
    public fb: FormBuilder,
    public service: AppService,
    public router: Router,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        DoB: ["", Validators.required],
        gender: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        phone: ["", Validators.required],
        password: ["", Validators.required],
        confirmPassword: ["", Validators.required],
      },
      {
        validator: ConfirmedValidator("password", "confirmPassword"),
      }
    );
  }

  onsubmit() {
    this.spinner.show();
    let formdata = this.registrationForm.controls["password"].value;
    console.log(formdata);
    this.submitted = true;
    if (this.registrationForm.invalid) {
      console.log("form Is inValed");
      return;
    } else {
      let x = {
        first_name: this.registrationForm.controls["firstName"].value,
        last_name: this.registrationForm.controls["lastName"].value,
        gender: this.registrationForm.controls["gender"].value,
        date_of_birth: this.registrationForm.controls["DoB"].value,
        mobile_number: this.registrationForm.controls["phone"].value,
        user_email: this.registrationForm.controls["email"].value,
        password: this.registrationForm.controls["confirmPassword"].value,
      };
      console.log(x);
      this.service.Registion(x).subscribe((res: any) => {
        console.log(res);
        this.spinner.hide();
        if (res.status == true) {
          // this.router.navigate(["login"]);
          localStorage.setItem("auth_token", res.data.auth_token),
            localStorage.setItem("patient_id", res.data.patient_id),
            localStorage.setItem("role_id", res.data.role_id),
            localStorage.setItem("user_id", res.data.user_id);
          localStorage.setItem("Gender", res.data.gender);
          localStorage.setItem("firstTime", "1");
          localStorage.setItem("navigate_to",res.data.navigate_to)
          this.router.navigate(["/dashboard"]).then(()=>{
            this.spinner.hide();
          });
         
        } else if (res.message == "Email Address Already Exist") {
          alert("Email already exist try with another Email");
          this.spinner.hide();
          this.registrationForm.patchValue({
            email: "",
          });
        }
      });
    }
  }
  onReset() {
    this.submitted = false;
    this.registrationForm.reset();
  }
  tologin() {
    this.router.navigate(["/login"]);
  }
}
