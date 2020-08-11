import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "./../environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class AppService {
  public baseurl = environment.baseUrl;
  constructor(public http: HttpClient) {}
  public Registion = (obj): Observable<any> => {
    return this.http.post<any[]>(
      this.baseurl + "Admin/RegisterNewPatient",
      obj
    );
  };
  public login = (obj): Observable<any> => {
    return this.http.post(this.baseurl + "Admin/LoginUser", obj);
  };
  public Addappointment = (obj): Observable<any[]> => {
    return this.http.post<any[]>(this.baseurl + "Admin/MakeAnAppointment", obj);
  };
  public getAppoiment = (obj) => {
    return this.http.post<any[]>(
      this.baseurl + "Admin/GetAppointmentsByUserID",
      obj
    );
  };
  public getPatientbyId = (obj): Observable<any> => {
    return this.http.post<any[]>(this.baseurl + "Admin/GetPatientByID", obj);
  };
  getAllPatients = (obj): Observable<any[]> => {
    return this.http.post<any[]>(this.baseurl + "Admin/GetAllPatients", obj);
  };
  GetPatientConversation = (obj): Observable<any[]> => {
    return this.http.post<any[]>(
      this.baseurl + "Admin/GetPatientConversation",
      obj
    );
  };
  StartConversation = (obj): Observable<any> => {
    return this.http.post<any[]>(this.baseurl + "Admin/StartConversation", obj);
  };
  MediaUpload = (obj): Observable<any> => {
    return this.http.post<any[]>(
      "http://macho-cart.com/virtual_dentist_demo/server/uploads/",
      obj
    );
  };
  Intkform = (obj): Observable<any> => {
    return this.http.post<any[]>(
      this.baseurl + "Admin/SubmitPatientIntakeForm",
      obj
    );
  };
  public InTakeFormData = (obj): Observable<any> => {
    return this.http.post<any[]>(this.baseurl + "Admin/GetAllIntakeForms", obj);
  };
  token_varifying() {
    return !!localStorage.getItem("auth_token");
  }
  public Noftication=(obj):Observable<any>=>{
    return this.http.post<any[]>(this.baseurl+'Admin/GetNotifications',obj)

  }
  public UpdateNotificationData=(obj) : Observable<any[]>=>{
    return this.http.post<any[]>(this.baseurl+'Admin/UpdateNotificationData',obj)
  }
  public adminVideo=(obj):Observable<any[]>=>{
    return this.http.post<any[]>(this.baseurl+"Admin/StartConversationAdmin",obj)
  }
  public sendReminder=(obj):Observable<any[]>=>{
    return this.http.post<any[]>(this.baseurl+'Admin/SendReminderToPatient',obj)
  }
  public ConfigurationsSteps=(obj):Observable<any[]>=>{
    return this.http.post<any[]>(this.baseurl+'Admin/GetConfigurationsSteps',obj)
  }
  public QuestionTypes=(obj):Observable<any[]>=>{
    return this.http.post<any[]>(this.baseurl+'Admin/GetQuestionTypes',obj)
  }
  public AddNewQuestion=(obj):Observable<any[]>=>{
    return this.http.post<any[]>(this.baseurl+'Admin/AddNewQuestion',obj)
  }
  public QuestionByStepID=(obj):Observable<any[]>=>{
    return this.http.post<any[]>(this.baseurl+'Admin/GetQuestionByStepID',obj)
  }
  public UpdateQuestion=(obj):Observable<any[]>=>{
    return this.http.post<any[]>(this.baseurl+'Admin/UpdateQuestion',obj)
  }
  public DelQuestion=(obj):Observable<any[]>=>{
    return this.http.post<any[]>(this.baseurl+'Admin/DelQuestionByID',obj)
  }
  public SubmitMedicalForm=(obj):Observable<any[]>=>{
    return this.http.post<any[]>(this.baseurl+'Admin/SubmitMedicalFormResponses',obj)
  }
  public GetMedicalFormResponses=(obj):Observable<any[]>=>{
    return this.http.post<any[]>(this.baseurl+'Admin/GetMedicalFormResponses',obj)
  }
}

