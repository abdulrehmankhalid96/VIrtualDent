import {
  Component,
  OnInit,
  ViewChild,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Renderer2,
  SecurityContext,
  ElementRef,
} from "@angular/core";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { WizardComponent } from "ng2-archwizard";
import {
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
} from "@syncfusion/ej2-angular-schedule";
import { ModalManager } from "ngb-modal";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppService } from "./../../app.service";
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from "@angular/platform-browser";
import { Router } from "@angular/router";
import { IfStmt } from '@angular/compiler';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
declare var MediaRecorder: any;
@Component({
  templateUrl: "dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
  ],
})

export class DashboardComponent implements OnInit, AfterViewInit {
  public Intakefromfield: FormGroup;
  public ifYes = true;
  public chunks = [];
  public VideoFiles = [];
  public videoFileToSend: any;
  public mediaRecorder: any;
  public videoHeight: any;
  public videoWidth: any;
  public recordedData = false;
  public toVideoIsTrue = false;
  public VideoisAvaliable = true;
  public ReferanceImgeUrl: any;
  public went_see_ref_image = false;
  public step2=true;
  public step3=true
  dynamicFormField: any;
  private  notifier: NotifierService;
  constructor(
    private modalService: ModalManager,
    public fb: FormBuilder,
    public service: AppService,
    private cd: ChangeDetectorRef,
    private dom: DomSanitizer,
    private renderer: Renderer2,
    public router: Router,
    private spinner: NgxSpinnerService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService
  }
  ngAfterViewInit(): void {

    let navigate=localStorage.getItem("navigate_to");

    if(navigate=='Show_Step_2'){
      console.log('call 2')
      this.step2=true;
      this.step3=false;
      this.wizedOPen();

    }
    else if(navigate=='Show_Step_3'){
      console.log('call 3')
      this.step2=false;
      this.step3=true;
      this.wizedOPen();

    }





  }

  @ViewChild("InkateForm", { static: false }) InkateForm: any;
  @ViewChild("stepper", { static: true }) stepper: any;
  @ViewChild("videoRecorder", { static: true }) videoRecorder: any;
  @ViewChild("VideoRecoderModel", { static: false }) VideoRecoderModel: any;
  @ViewChild("referanceImageModal", { static: false }) referanceImageModal: any;
  @ViewChild('referanceImageModallast',{static:false})  referanceImageModallast:any;
  @ViewChild('myModal',{static:false}) myModal:ElementRef;
  @ViewChild('XRayModal',{static:false}) XRayModal:ElementRef;
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  public modalRef: any;
  public femaleSection = false;
  
  ngOnInit(): void {
    this.dynamicIntakeForm();
    let gender = localStorage.getItem("Gender");
    if (gender == "Female") {
      this.femaleSection = true;
      this.Intakefromfield = this.fb.group({
        Age: ["", Validators.required],
        Current_condition: ["", Validators.required],
        medication_for_current_condition: ["", Validators.required],
        Past_dental_treatment: ["", Validators.required],

        blood_pressure: ["", Validators.required],
        Stroke: ["", Validators.required],
        Heart_attack: ["", Validators.required],
        Angina: ["", Validators.required],
        Hepatitis: ["", Validators.required],
        Blood_disorder: ["", Validators.required],
        Liver_disease: ["", Validators.required],
        Asthma: ["", Validators.required],
        Inflammatory_disorder: ["", Validators.required],
        Tuberculosis: ["", Validators.required],
        Diabetes: ["", Validators.required],
        Smoking: ["", Validators.required],
        nursing: "",
        contraceptives: "",
        pregnant_trying_pregnant: "",
        pregnant_mouth: [{ value: "", disabled: this.ifpregnantYes }],



        should_know_about_teeth: ["", Validators.required],
        currently_taking_medication: ["", Validators.required],
        which_medication: [{ value: "", disabled: true }],
      });
    }
    else{
      this.femaleSection=false;
      this.Intakefromfield = this.fb.group({
        Age: ["", Validators.required],
        Current_condition: ["", Validators.required],
        medication_for_current_condition: ["", Validators.required],
        Past_dental_treatment: ["", Validators.required],

        blood_pressure: ["", Validators.required],
        Stroke: ["", Validators.required],
        Heart_attack: ["", Validators.required],
        Angina: ["", Validators.required],
        Hepatitis: ["", Validators.required],
        Blood_disorder: ["", Validators.required],
        Liver_disease: ["", Validators.required],
        Asthma: ["", Validators.required],
        Inflammatory_disorder: ["", Validators.required],
        Tuberculosis: ["", Validators.required],
        Diabetes: ["", Validators.required],
        Smoking: ["", Validators.required],

        should_know_about_teeth: ["", Validators.required],
        currently_taking_medication: ["", Validators.required],
        which_medication: [{ value: "", disabled: true }],
      });
    }

  }
  dynamicIntakeForm(){
    var obj={
      user_id: localStorage.getItem("user_id"),
      auth_token: localStorage.getItem("auth_token"),
      step_config_id: "1",
    };
    this.service.QuestionByStepID(obj).subscribe((res: any) => {
      console.log(res);
      this.dynamicFormField=res.data
    })
  }
  public wizedOPen(){
    let gender = localStorage.getItem("Gender");
    if(gender=='Female'){
this.femaleSection=true;
    }
    else{
      this.femaleSection=false
    }
    let x = localStorage.getItem("role_id");

      if (x == "1") {
        this.stepperModal();
      }

  }
  submi() {
    if(this.femaleSection==true){
      console.log('Female Request')
      let x = {
        user_id: localStorage.getItem("user_id"),
        auth_token: localStorage.getItem("auth_token"),
        patient_id: localStorage.getItem("patient_id"),
        age: this.Intakefromfield.controls["Age"].value,
        currently_taking_medication: this.Intakefromfield.controls["Current_condition"].value,
        past_dental_treatment: this.Intakefromfield.controls[
          "Past_dental_treatment"
        ].value,
        any_medication:  this.Intakefromfield.controls["currently_taking_medication"]
        .value,
        high_blood_pressure: this.Intakefromfield.controls["blood_pressure"]
          .value,
        heart_attack: this.Intakefromfield.controls["Heart_attack"].value,
        angina: this.Intakefromfield.controls["Angina"].value,
        diabetes: this.Intakefromfield.controls["Diabetes"].value,
        hepatitis: this.Intakefromfield.controls["Hepatitis"].value,
        blood_disorder: this.Intakefromfield.controls["Blood_disorder"].value,
        liver_disease: this.Intakefromfield.controls["Liver_disease"].value,
        asthma: this.Intakefromfield.controls["Asthma"].value,
        inflammatory_disorder: this.Intakefromfield.controls[
          "Inflammatory_disorder"
        ].value,
        stroke: this.Intakefromfield.controls["Stroke"].value,
        tuberculosis: this.Intakefromfield.controls["Tuberculosis"].value,
        smoking: this.Intakefromfield.controls["Smoking"].value,
        medical_history: this.Intakefromfield.controls[
          "medication_for_current_condition"
        ].value,

        pregnant: this.Intakefromfield.controls["pregnant_trying_pregnant"].value,
        pregnant_which_month: this.Intakefromfield.controls["pregnant_mouth"]
          .value,
        taking_contraceptives: this.Intakefromfield.controls["contraceptives"]
          .value,
        are_you_nursing: this.Intakefromfield.controls["nursing"].value,
        others_detail: this.Intakefromfield.controls["should_know_about_teeth"]
          .value,
          medication_detail:this.Intakefromfield.controls["which_medication"]
          .value,
          //which_medication
      };
      console.log(x);

      this.service.Intkform(x).subscribe((res) => {
        console.log(res);

        this.Intakefromfield.reset();
      });
    }

    else if(this.femaleSection==false){
      console.log('male Request')
      let x = {
        user_id: localStorage.getItem("user_id"),
        auth_token: localStorage.getItem("auth_token"),
        patient_id: localStorage.getItem("patient_id"),
        age: this.Intakefromfield.controls["Age"].value,
        currently_taking_medication: this.Intakefromfield.controls["Current_condition"].value,
        past_dental_treatment: this.Intakefromfield.controls[
          "Past_dental_treatment"
        ].value,
        any_medication:  this.Intakefromfield.controls["currently_taking_medication"]
        .value,
        high_blood_pressure: this.Intakefromfield.controls["blood_pressure"]
          .value,
        heart_attack: this.Intakefromfield.controls["Heart_attack"].value,
        angina: this.Intakefromfield.controls["Angina"].value,
        diabetes: this.Intakefromfield.controls["Diabetes"].value,
        hepatitis: this.Intakefromfield.controls["Hepatitis"].value,
        blood_disorder: this.Intakefromfield.controls["Blood_disorder"].value,
        liver_disease: this.Intakefromfield.controls["Liver_disease"].value,
        asthma: this.Intakefromfield.controls["Asthma"].value,
        inflammatory_disorder: this.Intakefromfield.controls[
          "Inflammatory_disorder"
        ].value,
        stroke: this.Intakefromfield.controls["Stroke"].value,
        tuberculosis: this.Intakefromfield.controls["Tuberculosis"].value,
        smoking: this.Intakefromfield.controls["Smoking"].value,
        medical_history: this.Intakefromfield.controls[
          "medication_for_current_condition"
        ].value,

        // pregnant: this.Intakefromfield.controls["pregnant_trying_pregnant"].value,
        // pregnant_which_month: this.Intakefromfield.controls["pregnant_mouth"]
        //   .value,
        // taking_contraceptives: this.Intakefromfield.controls["contraceptives"]
        //   .value,
        //are_you_nursing: this.Intakefromfield.controls["nursing"].value,
        others_detail: this.Intakefromfield.controls["should_know_about_teeth"]
          .value,
          medication_detail:this.Intakefromfield.controls["which_medication"]
          .value,
          //which_medication
      };
      console.log(x);

      this.service.Intkform(x).subscribe((res) => {
        console.log(res);

        this.Intakefromfield.reset();
      });
    }

  }

  IntakeModal() {
    console.log("open");
    this.modalRef = this.modalService.open(this.InkateForm, {
      size: "lg",
      modalClass: "InkateForm",
      hideCloseButton: true,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: true,
      backdropClass: "modal-backdrop",
    });
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((mediaStream) => {
        const stream = mediaStream;
        const tracks = stream.getTracks();

        tracks[0].stop;
      });
  }
  closeVideo() {
    this.modalService.close(this.VideoRecoderModel);
  }
  stepperModal() {
    console.log("open");
    this.modalRef = this.modalService.open(this.stepper, {
      size: "lg",
      modalClass: "stepper",
      hideCloseButton: true,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: false,
      backdropClass: "modal-backdrop",
    });
  }
  
  RefranceMOdal(a) {

    if (a == "image1") {
      this.ReferanceImgeUrl = "assets/img/img/Ref_img_1.jpeg";
    } else if (a == "image2") {
      this.ReferanceImgeUrl = "assets/img/img/Ref_img_2.jpeg";
    } else if (a == "front") {
      this.ReferanceImgeUrl = "assets/img/img/Ref_img_3.jpeg";
    } else if (a == "image3") {
      this.ReferanceImgeUrl = "assets/img/img/Ref_img_4.jpeg";
    }
    console.log("open");
    this.show_Img_Modal();
    
    // this.modalRef = this.modalService.open(this.referanceImageModal, {
    //   size: "lg",
    //   modalClass: "VideoRecoderModel",
    //   hideCloseButton: false,
    //   centered: false,
    //   backdrop: true,
    //   animation: true,
    //   keyboard: false,
    //   closeOnOutsideClick: false,
    //   backdropClass: "modal-backdrop",
    // });
  }
 public Xray_Img_1:any;
 public Xray_img_2:any;
  RefranceMOdal_2() {
    this.Xray_Img_1='assets/img/img/change_ref_image.jpeg';
    this.Xray_img_2='assets/img/img/change_ref_image_2.jpeg';
    this.ShowXrayModel();

    // this.modalRef = this.modalService.open(this.referanceImageModallast, {
    //   size: "lg",
    //   modalClass: "VideoRecoderModel",
    //   hideCloseButton: false,
    //   centered: false,
    //   backdrop: true,
    //   animation: true,
    //   keyboard: false,
    //   closeOnOutsideClick: false,
    //   backdropClass: "modal-backdrop",
    // });
  }
  VideoModel() {
    console.log("open");
    this.toVideoRecorder();
    this.modalRef = this.modalService.open(this.VideoRecoderModel, {
      size: "lg",
      modalClass: "VideoRecoderModel",
      hideCloseButton: false,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: false,
      backdropClass: "modal-backdrop",
    });
  }
  medicationVAl(event) {
    console.log(event.target.value);
    if (event.target.value == "Yes") {
      this.Intakefromfield.controls["which_medication"].enable();
    } else if (event.target.value == "No") {
      this.Intakefromfield.controls["which_medication"].disable();
    }
  }
  ifpregnantYes = true;
  pergnant_value(event) {
    console.log(event.target.value);
    if (event.target.value == "Yes") {
      this.Intakefromfield.controls["pregnant_mouth"].enable();
    } else if (event.target.value == "No") {
      this.Intakefromfield.controls["pregnant_mouth"].disable();
    }
  }
  public localUrl: any;
  public localUrl2: any;
  public XRayPicUrl: any;
  public PicName = "";
  public PicName2 = "";
  public XRaypic_name = null;
  public Image1_here = true;
  public Image2_here = true;
  public fileObj;
  public fileObj_2;
  public XRayObj;
  public Image1here: boolean = true;
  image1here = true;
  image2here = true;
  image3here = true;

  addfile(event) {
    // let fileObj = event.srcElement.files;

    this.PicName = event.target.files[0].name;
    this.fileObj = <File>event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
        this.Image1_here = false;
        this.Image1here = false;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    this.Validtion();
  }
  addfile2(event) {
    // let fileObj = event.srcElement.files;

    this.PicName2 = event.target.files[0].name;
    this.fileObj_2 = <File>event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl2 = event.target.result;
        this.Image2_here = false;
        this.image2here = false;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    this.Validtion();
  }
  addXray(event) {
    let fileObj = event.srcElement.files;

    this.PicName2 = event.target.files[0].name;
    this.XRayObj = <File>event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.XRayPicUrl = event.target.result;
        this.image3here = false;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  public VideoUrl: any;
  toVideoRecorder() {
    this.toVideoIsTrue = true;
    navigator.getUserMedia(
      { video: true, audio: true },
      (stream) => {
        console.log(stream);
        this.attachVideoForRecording(stream);
        this.mediaRecorder = new MediaRecorder(stream);

        this.mediaRecorder.onstop = (e) => {
          console.log("data available after MediaRecorder.stop() called.");
          const date = new Date().valueOf();
          let text = "";
          const possibleText =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          for (let i = 0; i < 5; i++) {
            text += possibleText.charAt(
              Math.floor(Math.random() * possibleText.length)
            );
          }
          // Replace extension according to your media type
          const VideoName = date + "." + text + ".mp4";
          var blob = new Blob(this.chunks, { type: "video/mp4" });
          this.videoFileToSend = new File([blob], VideoName, {
            type: "video/mp4",
          });
          this.chunks = [];
          var audioURL = URL.createObjectURL(blob);
          this.unsafeVideoUrl = URL.createObjectURL(blob);

          // audio.src = audioURL;
          this.VideoFiles.push(this.dom.bypassSecurityTrustUrl(audioURL));
          console.log(audioURL);
          console.log("recorder stopped");
          this.cd.detectChanges();
        };
        this.mediaRecorder.ondataavailable = (e) => {
          this.chunks.push(e.data);
        };
      },
      (error) => {
        console.log(`Some Error ${error}`);
      }
    );
  }
  attachVideoForRecording(stream) {
    this.renderer.setProperty(
      this.videoRecorder.nativeElement,
      "srcObject",
      stream
    );

    this.renderer.listen(this.videoRecorder.nativeElement, "play", (event) => {
      this.videoHeight = this.videoRecorder.nativeElement.videoHeight;
      this.videoWidth = this.videoRecorder.nativeElement.videoWidth;
    });
  }
  startRecording() {
    console.log("Record Start");
    this.VideoFiles = [];
    this.mediaRecorder.start();
    console.log(this.mediaRecorder.state);
    console.log("recorder started");
    setTimeout(() => {
      this.stopRecording();
    }, 150000);
  }
  public unsafeVideoUrl: any;
  stopRecording() {
    this.recordedData = true;
    this.mediaRecorder.stop();
    this.VideoUrl = this.VideoFiles;
    this.VideoisAvaliable = false;
    // this.VideoUrl = this.dom.bypassSecurityTrustResourceUrl(this.VideoUrl);

    console.log(this.VideoUrl);
    console.log(this.mediaRecorder.state);
    console.log("recorder stopped");
  }
  getSafeUrl(): SafeResourceUrl {
    return this.dom.bypassSecurityTrustResourceUrl(this.unsafeVideoUrl);
  }
  Finished() {
    this.modalService.close(this.stepper);
  localStorage.removeItem('First')
    this.router.navigate(["/Usermode/TalkToDentist"]);
  }
  UploadImage1() {
    let c = {
      user_id: localStorage.getItem("user_id"),
      auth_token: localStorage.getItem("auth_token"),
      patient_id: localStorage.getItem("patient_id"),
      user_id_sender: localStorage.getItem("user_id"),
      user_id_receiver: 50,
      message: "",
      file_attached: this.fileObj,
      message_type: "file",
      user_type: "user",
    };
    let x = this.getFormData(c);
    console.log(x);
    this.service.StartConversation(x).subscribe((res: any) => {
      console.log(res);
    });
  }
  UploadImage2() {
    let c = {
      user_id: localStorage.getItem("user_id"),
      auth_token: localStorage.getItem("auth_token"),
      patient_id: localStorage.getItem("patient_id"),
      user_id_sender: localStorage.getItem("user_id"),
      user_id_receiver: 50,
      message: "",
      file_attached: this.fileObj_2,
      message_type: "file",
      user_type: "user",
    };
    let x = this.getFormData(c);
    console.log(x);
    this.service.StartConversation(x).subscribe((res: any) => {
      console.log(res);
    });
  }
  XRay() {
    let c = {
      user_id: localStorage.getItem("user_id"),
      auth_token: localStorage.getItem("auth_token"),
      patient_id: localStorage.getItem("patient_id"),
      user_id_sender: localStorage.getItem("user_id"),
      user_id_receiver: 50,
      message: "",
      file_attached: this.XRayObj,
      message_type: "file",
      user_type: "user",
    };
    let x = this.getFormData(c);
    console.log(x);
    this.service.StartConversation(x).subscribe((res: any) => {
      console.log(res);
    });
    this.toVideoRecorder();
  }
  uploadVideo() {
    let c = {
      user_id: localStorage.getItem("user_id"),
      auth_token: localStorage.getItem("auth_token"),
      patient_id: localStorage.getItem("patient_id"),
      user_id_sender: localStorage.getItem("user_id"),
      user_id_receiver: 50,
      message: "",
      file_attached: this.videoFileToSend,
      message_type: "file",
      user_type: "user",
    };
    let x = this.getFormData(c);
    console.log(x);
    this.service.StartConversation(x).subscribe((res: any) => {
      console.log(res);
     
    });
  }
  public getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    return formData;
  }
  public RecordedVideoFileName: any = "";
  GetVideoFile() {
    this.RecordedVideoFileName = this.videoFileToSend.name;
    console.log(this.RecordedVideoFileName);
    this.Validtion();
    this.closeVideo();
  }
  public VideoInput(event) {
    let fileObj = event.srcElement.files;

    this.RecordedVideoFileName = event.target.files[0].name;
    this.videoFileToSend = <File>event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
    }
    this.Validtion();
  }
  public check = true;
  Validtion() {
    if (
      this.PicName !== "" &&
      this.PicName2 !== "" &&
      this.RecordedVideoFileName !== "" &&
      this.Image_3_name !== "" &&
      this.Image_4_name !== "" &&
      this.Image_5_name !== ""
    ) {
      this.check = false;
    } else {
      this.check = true;
    }
  }
  public submitMedia() {
 
    this.spinner.show();
    let a:{[k: string]: any} = {
      user_id: localStorage.getItem("user_id"),
      auth_token: localStorage.getItem("auth_token"),
      patient_id: localStorage.getItem("patient_id"),
      user_id_sender: localStorage.getItem("user_id"),
      user_id_receiver: 50,
      message: "",


      message_type: "file",
      user_type: "user",
    };
    let xyz={
      fil1: this.XRayObj,
      file2:this.fileObj,
      file3:this.Image_3_file,
      file4:this.Image_4_file,
      file5:this.Image_5_file

    }
    let increment=0;
    Object.keys(xyz).forEach((key,index)=>{
         console.log(xyz[key])
      if(xyz[key]==undefined || xyz[key]==''){
       
      }
      else{
        console.log(increment);
        a["file_attached_"+increment] =xyz[key];
        increment=increment+1;
      }
    })
    console.log(a);
    
    let x = this.getFormData(a);
    console.log(x);
 
  
    this.service.StartConversation(x).subscribe((res: any) => {
      console.log(res);
      if(res.status==true){
        this.spinner.hide();
        this.test1()
      }
      else{
        this.spinner.hide();
        alert('Some thing went wrong')
      }
    
    },error=>{
      this.spinner.hide();
      alert('Some Error')
      console.log(error)
    });
  }
  //videoFileToSend
  public submit_single_Media() {
    this.spinner.show();
    let a = {
      user_id: localStorage.getItem("user_id"),
      auth_token: localStorage.getItem("auth_token"),
      patient_id: localStorage.getItem("patient_id"),
      user_id_sender: localStorage.getItem("user_id"),
      user_id_receiver: 50,
      message: "",
      file_attached_0: this.videoFileToSend,
      
      message_type: "file",
      user_type: "user",
    };
    console.log(a);
    let y:any=false;
    let x = this.getFormData(a);
    console.log(x);
    
  
    this.service.StartConversation(x).subscribe((res: any) => {
      console.log(res);
      if(res.status==true){
        this.spinner.hide();
        this.wizard.model.navigationMode.goToStep(3);    
      }
      else{
        this.spinner.hide();
        alert('Some thing went wrong')
      }
    
    });
  }
  submitMedia_As_incomplete(){
    this.spinner.show();
    let a:{[k: string]: any} = {
      user_id: localStorage.getItem("user_id"),
      auth_token: localStorage.getItem("auth_token"),
      patient_id: localStorage.getItem("patient_id"),
      user_id_sender: localStorage.getItem("user_id"),
      user_id_receiver: 50,
      message: "",


      message_type: "file",
      user_type: "user",
    };
    let xyz={
      fil1: this.XRayObj,
      file2:this.fileObj,
      file3:this.Image_3_file,
      file4:this.Image_4_file,
      file5:this.Image_5_file

    }
    let increment=0;
    Object.keys(xyz).forEach((key,index)=>{
         console.log(xyz[key])
      if(xyz[key]==undefined || xyz[key]==''){
       
      }
      else{
        console.log(increment);
        a["file_attached_"+increment] =xyz[key];
        increment=increment+1;
      }
    })
    console.log(a);
    
    let x = this.getFormData(a);
    console.log(x);
    this.spinner.hide();
    this.wizard.model.navigationMode.goToStep(1);
    this.service.StartConversation(x).subscribe((res: any) => {
      console.log(res);
      if(res.status==true){
        this.spinner.hide();
       this.wizard.model.navigationMode.goToStep(1);
      }
      else{
        this.spinner.hide();
        alert('Some thing went wrong')
      }
    
    },error=>{
      this.spinner.hide();
      alert('Some Error')
      console.log(error)
    });



  }
  submit_single_Media_As_incomplete_User(){
    this.spinner.show();
    let a = {
      user_id: localStorage.getItem("user_id"),
      auth_token: localStorage.getItem("auth_token"),
      patient_id: localStorage.getItem("patient_id"),
      user_id_sender: localStorage.getItem("user_id"),
      user_id_receiver: 50,
      message: "",
      file_attached_0: this.videoFileToSend,
      
      message_type: "file",
      user_type: "user",
    };
    console.log(a);
    let y:any=false;
    let x = this.getFormData(a);
    console.log(x);
   
  
  
    this.service.StartConversation(x).subscribe((res: any) => {
      console.log(res);
      if(res.status==true){
        this.spinner.hide();
          this.wizard.model.navigationMode.goToStep(2);   
      }
      else{
        this.spinner.hide();
        alert('Some thing went wrong')
      }
    
    });
  }
  public Image_3_name;
  public Image_4_name;
  public Image_5_name;
  public Image_3_file: any = "";
  public Image_4_file: any = "";
  public Image_5_file: any = "";
  public Image3(event) {
    this.Image_3_name = event.target.files[0].name;
    this.Image_3_file = <File>event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
        this.Image1_here = false;
        this.Image1here = false;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    this.Validtion();
  }
  public Image4(event) {
    this.Image_4_name = event.target.files[0].name;
    this.Image_4_file = <File>event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
        this.Image1_here = false;
        this.Image1here = false;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    this.Validtion();
  }
  public Image5(event) {
    this.Image_5_name = event.target.files[0].name;
    this.Image_5_file = <File>event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
        this.Image1_here = false;
        this.Image1here = false;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    this.Validtion();
  }
  public toPerson (data){
    let jsonData = JSON.parse(data);

 
    return jsonData;
}
submitDynamicForm(value){
  var obj={
    user_id:localStorage.getItem('user_id'),
    auth_token:localStorage.getItem('auth_token'),
    user_responses:[]
  }
  console.log(value);
  var temp: any[] = [];
  var temp2: any[] = [];
  Object.keys(value).map(item => {
    temp.push({
      question_label:item,
      response_value:value[item]
    })
  })
  this.selectedChoice.forEach(function(selected_box) {
    temp2.push({
      question_label:selected_box.label,
      response_value:JSON.stringify(selected_box.value)
    })
  });
  console.log(temp2);
  obj.user_responses=[...temp, ...temp2];
  console.log(obj);
  this.service.SubmitMedicalForm(obj).subscribe(((res: any) => {
console.log(res);
    
  }))

}
selectedItem:any[] = [];
selectedChoice:any[] = [];
getCheckBox(event,label){
  if(event.target.checked){
this.selectedItem.push({label:label,
  value:event.target.value,
  i:event.target.name
})
  }else{
    this.selectedItem=this.selectedItem.filter(m=>m.i!=event.target.name)
  }
  var output = this.selectedItem.reduce(function(o, cur) {

    // Get the index of the key-value pair.
    var occurs = o.reduce(function(n, item, i) {
      return (item.label == cur.label) ? i : n;
    }, -1);
  
    // If the name is found,
    if (occurs >= 0) {
  
      // append the current value to its list of values.
      o[occurs].value = o[occurs].value.concat(cur.value);
  
      // Otherwise,
    } else {
  
      // add the current item to o (but make sure the value is an array).
      var obj = {
        label: cur.label,
        value: [cur.value]
      };
    
      o = o.concat([obj]);
    }
  
    return o;
  }, []);
  this.selectedChoice=[]
  this.selectedChoice=output;
  console.log( this.selectedChoice)

}

submitForm(form) {

  alert(JSON.stringify(form.value))


}

show_Img_Modal=()=>{
  console.log(this.myModal);
  this.myModal.nativeElement.style.display = "block"


}
hiddeBox(){
  this.myModal.nativeElement.style.display = "none"
}
ShowXrayModel=()=>{
  this.XRayModal.nativeElement.style.display = "block"
}
hiddeX_ray_Box(){
  this.XRayModal.nativeElement.style.display = "none"
}
test1(){
  console.log('test clicked')
  this.wizard.model.navigationMode.goToStep(2);

   // For From Start this.wizard.model.navigationMode.goToStep(2);
  //  For from step 3 this.wizard.model.navigationMode.goToStep(1)
}
test2(){
  console.log('test clicked')
  this.wizard.model.navigationMode.goToStep(1);

   // For From Start this.wizard.model.navigationMode.goToStep(2);
  //  For from step 3 this.wizard.model.navigationMode.goToStep(1)
}
}