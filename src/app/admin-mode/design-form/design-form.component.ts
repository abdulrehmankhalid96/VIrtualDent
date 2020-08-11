import { Component, OnInit } from '@angular/core';
// import { Console } from 'console';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-design-form',
  templateUrl: './design-form.component.html',
  styleUrls: ['./design-form.component.css']
})
export class DesignFormComponent implements OnInit {
  public dynamicFiles_data:FormGroup;
  isToggle=false;
  submitTrue=false;
  isTrue=true;
  public term;
  public p;
  ist
  isRequire
  step_config_idd
  title;
  typeData='undefined';
  textData='';
  arrayData;
  type;
  allDesignForm: any;
  question_id: any;
// type=[
//   {
//     "label":"Text",
//     "Name":"text"
//   },
//   {
//     "label":"Single Choice",
//     "Name":"radio"
//   },
//   {
//     "label":"Multi Choice",
//     "Name":"checkbox"
//   },
//   {
//     "label":"Numeric",
//     "Name":"number"
//   }
// ]
  // "Text","Single Choice","Multi Choice","Numeric"]

  constructor(private activatedroute:ActivatedRoute, public service: AppService,public fb:FormBuilder) { }
  selected_customer($event){
    this.textData=''; 
    this.dynamicFiles_data=this.fb.group({
      Title:'',
      Type:'',

    })
  }

  submit(){

    console.log(this.title);
    console.log(this.typeData);
    console.log(this.textData);
    this.arrayData = this.textData.split(',');
    console.log(this.arrayData);
    var obj={
      user_id: localStorage.getItem('user_id'),
      auth_token: localStorage.getItem("auth_token"),
        question_label: this.title,
        question_type: this.typeData,
        options: JSON.stringify(this.arrayData),
        step_config_id:1,
        isRequired:this.isRequire 
     
    }
    
    this.service.AddNewQuestion(obj).subscribe((res: any) => {
console.log(res);
this.getformData();
this.isToggle=false;  

    });  
  
  }
  x = {
    user_id: localStorage.getItem('user_id'),
    auth_token: localStorage.getItem("auth_token"),
   
  };
 
  ngOnInit(): void {
    this.step_config_idd=this.activatedroute.snapshot.params['id'];
    this.service.QuestionTypes(this.x).subscribe((res: any) => {
      console.log(res);
     this.type=res.data
     
   });
    this.getformData();
  }
  
  getformData=()=>{
   
   var xy = {
     user_id: localStorage.getItem('user_id'),
     auth_token: localStorage.getItem("auth_token"),
     step_config_id:1,
   };

   this.service.QuestionByStepID(xy).subscribe((res: any) => {
     this.allDesignForm=res.data
     console.log(res);
     
   });
  }


  EditForm(app){
    console.log(app);
    this.isTrue=false;
    this.isToggle=true;
    this.title=app.question_label;
    this.question_id=app.question_id;
    this.typeData=app.question_type;
    this.textData=app.options;
    if(app.isRequired=='1'){
      this.isRequire='1';
    }else if(app.isRequired=='0'){
      this.isRequire='0';
    }
  }
  UpdateForm(){
    var obj={
      user_id: localStorage.getItem('user_id'),
      auth_token: localStorage.getItem("auth_token"),
        question_label: this.title,
        question_type: this.typeData,
        options: this.textData,
        step_config_id: this.step_config_idd,
        isRequired:this.isRequire,
        question_id:this.question_id
    }
    console.log(obj);
    this.service.UpdateQuestion(obj).subscribe((res: any) => {
      console.log('naeem');
      console.log(res);
      this.getformData();
          });


  }
  DeleteForm(id){
    var obj = {
      user_id: localStorage.getItem('user_id'),
      auth_token: localStorage.getItem("auth_token"),
      question_id:id,
    };
    console.log(obj);
this.service.DelQuestion(obj).subscribe((res: any) => {
console.log(res);
this.getformData();
  
}); 
  }
  toggle_function(){

    this.isToggle=!this.isToggle;
    this.title=''
        this.typeData='';
        this.textData='';
        this.step_config_idd=''
        this.isRequire=''
        
  }
}
