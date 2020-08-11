import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configration-steps',
  templateUrl: './configration-steps.component.html',
  styleUrls: ['./configration-steps.component.css']
})
export class ConfigrationStepsComponent implements OnInit {
  public allConfigration: any;
  public term;
  public p;

  constructor(
    private router:Router,
    public service: AppService,
  ) { }
  x = {
    user_id: localStorage.getItem('user_id'),
    auth_token: localStorage.getItem("auth_token"),
  };
  ngOnInit(): void {
    this.service.ConfigurationsSteps(this.x).subscribe((res: any) => {
      console.log(res);
       this.allConfigration=res.data;
    });  
  }
  MedicalModal(id){
    this.router.navigate(['/AdminMode/DesignForm',id]); 
  }

}
