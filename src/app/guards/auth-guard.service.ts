import { Injectable } from "@angular/core";
import { AppService } from "./../app.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService {
  constructor(public service: AppService, public router: Router) {}
  canActivate(): boolean {
    if (this.service.token_varifying()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
