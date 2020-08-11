import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { AppService } from "./../../app.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-talk-to-dentist",
  templateUrl: "./talk-to-dentist.component.html",
  styleUrls: ["./talk-to-dentist.component.css"],
})
export class TalkToDentistComponent implements OnInit {
  constructor(public service: AppService, public fb: FormBuilder) {}
  public messageData: any;
  public Message: FormGroup;
  public patient_id: any;
  public user_id: any;
  public responceImgUrl: any =
    "http://demo.virtualdr.online/server/";
  public mediatypeImg: any = false;
  public mediatypeVideo: any = false;
  @ViewChild("scrollMe") private myScrollContainer: ElementRef;
  ngOnInit(): void {
    this.patient_id = localStorage.getItem("patient_id");
    this.user_id = localStorage.getItem("user_id");
    console.log(this.patient_id);
    console.log(this.user_id);

    this.getConve();
    this.scrollToBottom();
    this.Message = this.fb.group({
      message: ["", Validators.required],
      imageInput: "",
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
  public getConve = () => {
    let x = {
      user_id: this.user_id,
      auth_token: localStorage.getItem("auth_token"),
      patient_id: this.patient_id,
    };
    this.service.GetPatientConversation(x).subscribe((res: any) => {
      this.messageData = res.data;
      console.log(this.messageData);
    });
  };

  get f() {
    return this.Message.controls;
  }
  public fileData;
  fileProgress = (event) => {
    this.fileData = <File>event.target.files[0];
    console.log(event);
  };
  public submitted;
  onsubmit() {
    if (
      (this.Message.controls["imageInput"].value != "" &&
        this.Message.controls["message"].value == "") ||
      this.Message.controls["message"].value == null
    ) {
      const formdata = new FormData();
      console.log("url");
      let c = {
        user_id: localStorage.getItem("user_id"),
        auth_token: localStorage.getItem("auth_token"),
        patient_id: this.patient_id,
        user_id_sender: localStorage.getItem("user_id"),
        user_id_receiver: this.user_id,
        message: this.Message.controls["message"].value,
        file_attached: this.fileData,
        message_type: "file",
        user_type: "patient",
      };
      console.log(c);
      let form = this.getFormData(c);
      console.log(form);
      this.service.StartConversation(form).subscribe((res: any) => {
        console.log(res);

        this.Message.reset();
        this.submitted = false;
        this.getConve();
      });
    } else if (
      this.Message.controls["imageInput"].value == "" &&
      this.Message.controls["message"].value != ""
    ) {
      let c = {
        user_id: localStorage.getItem("user_id"),
        auth_token: localStorage.getItem("auth_token"),
        patient_id: this.patient_id,
        user_id_sender: localStorage.getItem("user_id"),
        user_id_receiver: this.user_id,
        message: this.Message.controls["message"].value,
        file_attached: this.Message.controls["imageInput"].value,
        message_type: "Image",
        user_type: "patient",
      };
      let form = this.getFormData(c);
      console.log(form);
      this.service.StartConversation(form).subscribe((res: any) => {
        console.log(res);
        this.Message.reset();
        this.submitted = false;
        this.getConve();
      });
    } else {
      this.submitted = true;
      if (this.Message.invalid) {
        console.log("form Is inValed");
        return;
      }
      let x = {
        user_id: localStorage.getItem("user_id"),
        auth_token: localStorage.getItem("auth_token"),
        patient_id: this.patient_id,
        user_id_sender: localStorage.getItem("user_id"),
        user_id_receiver: this.user_id,
        message: this.Message.controls["message"].value,
        file_attached: this.Message.controls["imageInput"].value,
        message_type: "text",
        user_type: "patient",
      };
      let a = this.getFormData(x);

      this.service.StartConversation(a).subscribe((res: any) => {
        console.log(res);
        this.Message.reset();
        this.submitted = false;
        this.getConve();
      });
    }
  }
  public getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    return formData;
  }
  public zoomclick: any = false;
  public passedSrc: any;
  public imageModel: any = true;
  singleclick(img, type) {
    if (type == "mp4") {
      this.zoomclick = true;
      this.imageModel = false;
      this.mediatypeImg = false;
      this.mediatypeVideo = true;
      this.passedSrc = `${this.responceImgUrl + img}`;
    } else {
      this.passedSrc = `${this.responceImgUrl + img}`;
      this.zoomclick = true;
      this.imageModel = false;
      this.mediatypeImg = true;
      this.mediatypeVideo = false;
    }
    console.log(img);
  }
  public closeImg() {
    this.zoomclick = false;
    this.imageModel = true;
    this.mediatypeImg = false;
    this.mediatypeVideo = false;
  }
}
