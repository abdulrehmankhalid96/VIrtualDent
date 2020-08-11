import { Component, OnInit, ViewChild } from "@angular/core";
import { AppService } from "./../../app.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgxSmartModalService } from "ngx-smart-modal";
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ModalManager } from "ngb-modal";

@Component({
  selector: "app-all-patient",
  templateUrl: "./all-patient.component.html",
  styleUrls: ["./all-patient.component.css"],
})
export class AllPatientComponent implements OnInit {
  @ViewChild('MediaclFrom',{static:false}) MediaclFrom:any;
  @ViewChild("InkateForm", { static: false }) InkateForm: any;
  @ViewChild("MedicalResponce",{static:false}) MedicalResponce:any;
  value: Date;
  public Intakefromfield: FormGroup;
  public p;
  public term;
  form_questions_labels: any;
  form_responses_data: any;
  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    public fb: FormBuilder,
    public service: AppService,
    public roter: Router,
    private spinner: NgxSpinnerService,

    private modalService: ModalManager
  ) {
    this.value = new Date();
  }
  public Allpatients: any;
  public AppointmentForm: FormGroup;
  public submitted;
  public Patient_id: any;
  public modalRef:any
  @ViewChild("myModal") myModal;
  public allPatients = () => {
    this.spinner.show();
    let x = {
      user_id: localStorage.getItem('user_id'),
      auth_token: localStorage.getItem("auth_token"),
    };
    this.service.getAllPatients(x).subscribe((res: any) => {
      console.log(res);
      this.Allpatients = res.data;
      this.spinner.hide();
    });
  };
  ngOnInit(): void {
  
   
    this.allPatients();
    this.AppointmentForm = this.fb.group({
      app_title: ["", Validators.required],
      app_date: ["", Validators.required],
      app_description: ["", Validators.required],
      app_time: [new Date(), Validators.required],
    });
    this.Intakefromfield = this.fb.group({
      Age: [{ value: "", disabled: true }],
      Current_condition: [{ value: "", disabled: true }],
      medication_for_current_condition: [{ value: "", disabled: true }],
      Past_dental_treatment: [{ value: "", disabled: true }],

      blood_pressure: [{ value: "", disabled: true }],
      Stroke: [{ value: "", disabled: true }],
      Heart_attack: [{ value: "", disabled: true }],
      Angina: [{ value: "", disabled: true }],
      Hepatitis: [{ value: "", disabled: true }],
      Blood_disorder: [{ value: "", disabled: true }],
      Liver_disease: [{ value: "", disabled: true }],
      Asthma: [{ value: "", disabled: true }],
      Inflammatory_disorder: [{ value: "", disabled: true }],
      Tuberculosis: [{ value: "", disabled: true }],
      Diabetes: [{ value: "", disabled: true }],
      Smoking: [{ value: "", disabled: true }],
      nursing:[{ value: "", disabled: true }],
      contraceptives:[{ value: "", disabled: true }],
      pregnant_trying_pregnant: [{ value: "", disabled: true }],
      pregnant_mouth: [{ value: "", disabled: true }],
      should_know_about_teeth:[{ value: "", disabled: true }],
      currently_taking_medication:[{ value: "", disabled: true }],
      which_medication: [{ value: "", disabled: true }],
    });
  }
  public dataFound=false;
  getMedicalRecordByid=(id)=>{
    this.modalRef = this.modalService.open(this.MedicalResponce, {
      size: "lg",
      modalClass: "MedicalResponce",
      hideCloseButton: false,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: true,
      backdropClass: "modal-backdrop",
    });
    let x = {
      user_id: localStorage.getItem('user_id'),
      auth_token: localStorage.getItem("auth_token"),
      patient_id:id
    };
   
    this.service.GetMedicalFormResponses(x).subscribe((res:any)=>{
      console.log(res);
      if(res.message=="No Record Found"){
        this.form_questions_labels=[];
        this.form_responses_data=[];
        this.dataFound=false;
      }
      else{
        this.form_questions_labels=res.questions_labels;
        this.form_responses_data=res.responses_data;
        this.dataFound=true;
      }
      

    })
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
        patient_id: this.Patient_id,
      };
      this.service.Addappointment(x).subscribe((res: any) => {
        console.log(res);
        this.ngxSmartModalService.getModal("Modeltwo").close();
      });
    }
  }
  patientObj(app) {
    console.log(app);
    this.roter.navigate([
      "/AdminMode/Talkto",
      { id: app.patient_id, user_id: app.patient_user_id },
    ]);
  }
  openModel() {
    console.log();
    // this.Patient_id = app.patient_id;
    this.ngxSmartModalService.getModal("Modeltwo").open();
  }
  public aa;

  public anyMedication;
public angina;
 public are_you_nursing;
 public asthma; 
public blood_disorder;
public  diabetes;
public  heart_attack; 
public  hepatitis
public  high_blood_pressure
public inflammatory_disorder
public intake_from_id
public liver_disease
public medical_history
public medication_detail
public others_detail
public past_dental_treatment
public patient_id
public pregnant
public pregnant_which_month
public smoking
public stroke
public taking_contraceptives
public tuberculosis
public femaleSection=false;
mychech(app){
  console.log(app)
}
  MedicalModal(data) {
    
    console.log(data.intake_form_data[0])
    if(data.intake_form_data[0].are_you_nursing!=''){
      this.femaleSection=true
    }
    this.Intakefromfield.patchValue({
      Age:data.intake_form_data[0].age,
      Current_condition:data.intake_form_data[0].currently_taking_medication,
      medication_for_current_condition:data.intake_form_data[0].medical_history,
      Past_dental_treatment:data.intake_form_data[0].past_dental_treatment,
      pregnant_mouth:data.intake_form_data[0].pregnant_which_month,
      should_know_about_teeth:data.intake_form_data[0].others_detail,
      which_medication:data.intake_form_data[0].medication_detail
    })
    console.log(data.intake_form_data[0].medication_detail)
    this.diabetes=data.intake_form_data[0].diabetes
    this.angina=data.intake_form_data[0].angina
    this.are_you_nursing=data.intake_form_data[0].are_you_nursing
    this.asthma=data.intake_form_data[0].asthma 
    this.blood_disorder=data.intake_form_data[0].blood_disorder
    this.heart_attack=data.intake_form_data[0].heart_attack;
    this.pregnant=data.intake_form_data[0].pregnant
    this.hepatitis=data.intake_form_data[0].hepatitis
    this.high_blood_pressure=data.intake_form_data[0].high_blood_pressure
    this.anyMedication=data.intake_form_data[0].any_medication

this.inflammatory_disorder=data.intake_form_data[0].inflammatory_disorder

 this.liver_disease=data.intake_form_data[0].liver_disease
this.medical_history=data.intake_form_data[0].medical_history
this.medication_detail=data.intake_form_data[0].medication_detail
this.others_detail=data.intake_form_data[0].others_detail
this.past_dental_treatment=data.intake_form_data[0].past_dental_treatment

 this.pregnant=data.intake_form_data[0].pregnant

 this.smoking=data.intake_form_data[0].smoking
this.stroke=data.intake_form_data[0].stroke
 this.taking_contraceptives=data.intake_form_data[0].taking_contraceptives
 this.tuberculosis=data.intake_form_data[0].tuberculosis
    console.log(this.diabetes);
    this.modalRef = this.modalService.open(this.MediaclFrom, {
      size: "lg",
      modalClass: "InkateForm",
      hideCloseButton: false,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: true,
      backdropClass: "modal-backdrop",
    });
   
  }
  chackdis(app){
    if(app.intake_form_data==undefined){
      return true;
    }
    else if(app.intake_form_data.length==0){
      return true
    }
    else {
      return false;
    }
     }
     userFilter
     chackfile(app){
       //patient_media_files
       if(app.patient_media_files==undefined){
        return true;
      }
      else if(app.patient_media_files.length==0){
        return true
      }
      else {
        return false;
      }
       
     }
     chackfile2(app){
      //patient_media_files
      if(app.patient_media_files==undefined){
       return false;
     }
     else if(app.patient_media_files.length==0){
       return false;
     }
     else {
       return true;
     }
      
    }
    sendReminder(app){
  console.log(app)
  let c ={
    patient_id:app.patient_id,
    user_id:localStorage.getItem('user_id'),
    auth_token:localStorage.getItem('auth_token')
  }
      this.service.sendReminder(c).subscribe((res:any)=>{
        console.log(res)
      })
    }
    
}
