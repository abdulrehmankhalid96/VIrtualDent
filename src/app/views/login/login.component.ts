import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppService } from "./../../app.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-dashboard",
  templateUrl: "login.component.html",
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted: any;
  constructor(
    public fb: FormBuilder,
    public router: Router,
    public service: AppService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
    let b=this.service.token_varifying();
    console.log(b)
    if(b==true){
      this.spinner.show();
    let i= localStorage.getItem('role_id');
    if(i=='1'){
    this.router.navigate(["/Usermode/TalkToDentist"]).then(() => {

      this.spinner.hide();
    });
    }
    else if(i=='2'){
      this.router.navigate(["/AdminMode/AllPatients"]).then(() => {

        this.spinner.hide();
      });
    }
    }
    else{
      this.spinner.hide();
    }




  }
  get f() {
    return this.loginForm.controls;
  }
  onsubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      console.log("form Is inValed");
      return;
    } else {
      let x = {
        user_email: this.loginForm.controls["email"].value,
        password: this.loginForm.controls["password"].value,
      };
      this.spinner.show();
      this.service.login(x).subscribe((res: any) => {
        console.log(res);
        if (res.status == true) {
          localStorage.setItem("auth_token", res.data.auth_token),
            localStorage.setItem("patient_id", res.data.patient_id),
            localStorage.setItem("role_id", res.data.role_id),
            localStorage.setItem("user_id", res.data.user_id);
            localStorage.setItem("navigate_to",res.data.navigate_to)
            if(res.data.role_id=='2'){
              this.router.navigate(["/AdminMode/AllPatients"]).then(() => {
                this.reset();
                this.submitted = false;
                this.spinner.hide();
              });
            }
            else if(res.data.role_id=='1'){
              let x=localStorage.getItem('navigate_to')
              if(x=='Show_dashboard'){
                this.router.navigate(["/Usermode/TalkToDentist"]).then(() => {
                  this.reset();
                  this.submitted = false;
                  this.spinner.hide();
                });

              }
             else {
              this.router.navigate(["/dashboard"]).then(() => {
                this.reset();
                this.submitted = false;
                this.spinner.hide();
              });
             }


            }

        } else {
          alert("Wrong Email Password");
          this.spinner.hide();
          this.reset();
          this.submitted = false;
        }
      },err =>{
        this.spinner.hide()
        alert("some thing went erong")
        console.log(err)
      });
    }
  }
  public reset = () => {
    this.loginForm.reset();
  };
  toRegistration() {
    this.router.navigate(["/register"]);
  }
}
