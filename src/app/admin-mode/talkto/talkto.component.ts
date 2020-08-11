import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2,
  ChangeDetectorRef,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppService } from "../../app.service";
import { ConfirmedValidator } from "../../_nav";
import { ActivatedRoute } from "@angular/router";
import { ModalManager } from "ngb-modal";
import { DomSanitizer } from "@angular/platform-browser";

declare var MediaRecorder: any;
@Component({
  selector: "app-talkto",
  templateUrl: "./talkto.component.html",
  styleUrls: ["./talkto.component.css"],
})
export class TalktoComponent implements OnInit {
  constructor(
    public service: AppService,
    public fb: FormBuilder,
    public Active: ActivatedRoute,
    private modalService: ModalManager,
    private renderer: Renderer2,
    private cd: ChangeDetectorRef,
    private dom: DomSanitizer
  ) {}
  public ImageIsNotCaptured = true;
  public ImageIsCaptured = false;
  public messageData: any;
  public VideoFileIstrue=true;
  public Message: FormGroup;
  public patient_id: any;
  public user_id: any;
  public responceImgUrl: any =
    "http://demo.virtualdr.online/server/";
  public mediatypeImg: any = false;
  public mediatypeVideo: any = false;
  public videoWidth = 0;
  public videoHeight = 0;
  public captureImages;
  public mediaRecorder: any;
  chunks = [];
  public VideoFiles = [];
  public videoFileToSend: any;
  @ViewChild("scrollMe", { static: true })
  private myScrollContainer: ElementRef;
  @ViewChild("video", { static: true }) videoElement: any;
  @ViewChild("canvas", { static: true }) canvas: ElementRef;
  @ViewChild("myModal", { static: true }) myModal;
  @ViewChild("VideoModal", { static: true }) VideoModal;
  @ViewChild("videoRecorder", { static: true }) videoRecorder: any;
  private modalRef;

  constraints = {
    video: {
      facingMode: "environment",
      width: { ideal: 4096 },
      height: { ideal: 2160 },
    },
  };
  ngOnInit(): void {
    this.Active.params.subscribe((param: any) => {
      this.patient_id = param.id;
      this.user_id = param.user_id;
      console.log(this.patient_id);
      console.log(this.user_id);
    });
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
  public Data = ["a", "b", "c", "a", "b", "c"];
  onsubmit() {
    // if (this.Message.controls["message"].value == null) {
    //   this.Message.patchValue({
    //     message: "",
    //   });
    // }
    console.log(this.Message.value);
    if (
      (this.Message.controls["imageInput"].value != "" &&
        this.Message.controls["message"].value == "") ||
      this.Message.controls["message"].value == null
    ) {
      let c = {
        user_id: localStorage.getItem("user_id"),
        auth_token: localStorage.getItem("auth_token"),
        patient_id: this.patient_id,
        user_id_sender: localStorage.getItem("user_id"),
        user_id_receiver: this.user_id,
        message: this.Message.controls["message"].value,
        file_attached: this.fileData,
        message_type: "file",
        user_type: "doctor",
      };
      console.log(c);
      let form = this.getFormData(c);
      console.log(form);
      this.service.StartConversation(form).subscribe((res: any) => {
        console.log(res);
        console.log("caller");

        this.submitted = false;
        this.getConve();
      });
      this.Message.reset();
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
        user_type: "doctor",
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
        user_type: "doctor",
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
  uploadSelfie() {
    this.openModal();
    console.log("upload Selfie");
  }
  uploadVideo() {
    console.log("upload Video");
  }
  openModal() {
    this.modalRef = this.modalService.open(this.myModal, {
      size: "lg",
      modalClass: "mymodal",
      hideCloseButton: true,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: true,
      backdropClass: "modal-backdrop",
    });
    this.startCamera();
  }
  closeModal() {
    this.VideoFileIstrue=true
    this.VideoFiles=null;
    this.modalService.close(this.modalRef);
    console.log("this is closed");



    navigator.mediaDevices.getUserMedia({video:true,audio:true}).then((stream) => {
      let a=stream.getTracks();
       console.log(a)

        let x = stream.getTracks();
        x.forEach((track) => {
          track.stop();
          console.log("stoped");
        });
      })
      .catch(this.handleError);

  }
  startCamera() {
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      navigator.mediaDevices
        .getUserMedia(this.constraints)
        .then(this.attachVideo.bind(this))
        .catch(this.handleError);
    } else {
      alert("No camera found");
      console.log("No camera found");
    }
  }
  handleError(error) {
    alert("No camera found");

    console.log("Error: ", error);
  }
  attachVideo(stream) {
    this.renderer.setProperty(
      this.videoElement.nativeElement,
      "srcObject",
      stream
    );
    this.mediaRecorder = new MediaRecorder(stream);
    this.renderer.listen(this.videoElement.nativeElement, "play", (event) => {
      this.videoHeight = this.videoElement.nativeElement.videoHeight;
      this.videoWidth = this.videoElement.nativeElement.videoWidth;
    });
  }
  capture() {
    this.renderer.setProperty(
      this.canvas.nativeElement,
      "width",
      this.videoWidth
    );
    this.renderer.setProperty(
      this.canvas.nativeElement,
      "height",
      this.videoHeight
    );
    this.canvas.nativeElement
      .getContext("2d")
      .drawImage(this.videoElement.nativeElement, 0, 0);
    // this.captureImages.push(this.canvas.nativeElement.toDataURL("image/png"));
    this.captureImages = this.canvas.nativeElement.toDataURL("image/png");

    console.log(this.captureImages);
  }
  SendImage() {
    // Naming the image
    console.log('Sending Image progrma')
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
    const imageName = date + "." + text + ".png";
    const imageBlob = this.dataURItoBlob(this.captureImages);
    const imageFile = new File([imageBlob], imageName, { type: "image/png" });
    console.log(imageFile);

    let c = {
      user_id: localStorage.getItem("user_id"),
      auth_token: localStorage.getItem("auth_token"),
      patient_id: this.patient_id,
      user_id_sender: localStorage.getItem("user_id"),
      user_id_receiver: this.user_id,
      message: '',
      file_attached_0: imageFile,
      message_type: "file",
      user_type: "doctor",
    };
    let form = this.getFormData(c);
    console.log(form);
    this.service.StartConversation(form).subscribe((res: any) => {
      console.log(res);
      this.Message.reset();
      this.submitted = false;
      this.getConve();
      this.captureImages = null;
      this.closeModal();
    });
  }

  dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(",")[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: "image/png",
    });
  }
  NewCapture() {
    this.captureImages = null;
  }
  VideModal() {
    this.modalRef = this.modalService.open(this.VideoModal, {
      size: "lg",
      modalClass: "mymodal",
      hideCloseButton: true,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: true,
      backdropClass: "modal-backdrop",
    });
    this.VideoRecorder();
  }
  public VideoRecorder() {
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
  public recordedData = false;
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
    this.VideoFiles = [];
    this.mediaRecorder.start();
    console.log(this.mediaRecorder.state);
    console.log("recorder started");
    setTimeout(() => {
      this.stopRecording();
    }, 600000);
  }
  stopRecording() {
    this.VideoFileIstrue=false
    this.recordedData = true;
    this.mediaRecorder.stop();
    console.log(this.mediaRecorder.state);
    console.log("recorder stopped");
  }

  public sendVideo() {
    console.log(this.mediaRecorder.state)

    let c = {
      user_id: localStorage.getItem("user_id"),
      auth_token: localStorage.getItem("auth_token"),
      patient_id: this.patient_id,
      user_id_sender: localStorage.getItem("user_id"),
      user_id_receiver: this.user_id,
      message: this.Message.controls["message"].value,
      file_attached_0: this.videoFileToSend,
      message_type: "file",
      user_type: "doctor",
    };
    let x = this.getFormData(c);
    console.log(x);
    this.service.adminVideo(x).subscribe((res: any) => {
      console.log(res);
      this.VideoFiles=null;
      this.VideoFileIstrue=true;
      this.closeModal()
      this.Message.reset();
      this.submitted = false;
      this.getConve();
    });
  }
  public FileName=null
  addfile(event){

    this.FileName=event.target.files[0];
    console.log(this.FileName);
   }
   FileIshere(){
     if(this.FileName==null){
       return false;
     }
     else{
       return true;
     }
   }
   sendbrowsefile(){

    let c = {
      user_id: localStorage.getItem("user_id"),
      auth_token: localStorage.getItem("auth_token"),
      patient_id: this.patient_id,
      user_id_sender: localStorage.getItem("user_id"),
      user_id_receiver: this.user_id,
      message: '',
      file_attached_0: this.FileName,
      message_type: "file",
      user_type: "doctor",
    };
    let form = this.getFormData(c);
    console.log(form);
    this.service.adminVideo(form).subscribe((res: any) => {
      console.log(res);
      this.Message.reset();
      this.submitted = false;
      this.FileName=null;
      this.getConve();

    });

   }
}
