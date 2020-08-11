import { AppService } from './../../app.service';
import { Component, OnInit, AfterContentInit } from "@angular/core";
import { navItems, navItemsforAdmin, navItemsforuser } from "../../_nav";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html",
  styleUrls: ["./default-layout.component.css"],
})
export class DefaultLayoutComponent implements OnInit,AfterContentInit {
  constructor(public router: Router,public service:AppService) {}
  public Notifyer=null
  public ShowNotifyer=false;
  public ShowNotifyerData;
  public notifyerNUmber=true;
  ngAfterContentInit(): void {
    let x={
      user_id:localStorage.getItem('user_id'),
      auth_token:localStorage.getItem('auth_token')
    }
    let user_type=localStorage.getItem('role_id');
    if(user_type=='2'){
      this.ShowNotifyer=true;
      setInterval(()=>{
    
        this.service.Noftication(x).subscribe((res:any)=>{
          console.log(res);
          this.Notifyer=res.data.notification_count;
          this.ShowNotifyerData=res.data.notification_data
        })
        },60000);
    }
  
  }
  notifycheck(){
    let x={
  
      user_id: '50', 
     auth_token: "admin"
    
  }
   this.service.UpdateNotificationData(x).subscribe((res:any)=>{
    console.log(res);
    if(res.data.length!=0){
      this.ShowNotifyerData=res.data
    }
    else{
    
    }
   })
   this.Notifyer=null;
  }
  //120000
  public sidebarMinimized = false;
  public navItems;
  ngOnInit(): void {
    let a = localStorage.getItem("role_id");
    if (a == "2") {
      this.navItems = navItemsforAdmin;
    } else if (a == "1") {
      this.navItems = navItemsforuser;
    }
 
  } 
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  logout() {
    // localStorage.removeItem("auth_token");
    // localStorage.removeItem("patient_id");
    // localStorage.removeItem("role_id");
    // localStorage.removeItem("user_id");
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
  
}
