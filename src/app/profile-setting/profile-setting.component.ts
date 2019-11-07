import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '../../../node_modules/@angular/common/http';
import { Constants } from '../constants';
import { Observable } from '../../../node_modules/rxjs';
import {switchMap} from 'rxjs/operators';
import { Cookie } from '../../../node_modules/ng2-cookies';
import {  ProfileImage } from '../models/profileImage';


@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.scss']
})
export class ProfileSettingComponent implements OnInit {

  username:String;
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  imgData:ProfileImage;
  imgPath:String;

  myFiles:string [] = [];
  sMsg:string = '';
  constructor(private http: HttpClient) { 
    
    }

  ngOnInit() {
    this.username=sessionStorage.getItem('username');
    this.getImage();
  }

  fileEvent(){
   
}
  uploadAvatar() {

    const frmData = new FormData();
    
    for (var i = 0; i < this.myFiles.length; i++) { 
      frmData.append("file", this.myFiles[i]); // here the image will be set in formdata which can be
    }                                        // accessed from the front end using that key @RequestParam("file") MultipartFile image
                                             // note the key should be same else it will  throw "org.springframework.web.multipart.support.MissingServletRequestPartException", "message": "Required request part 'file' is not present",
    
    const httpOptions = {
  headers:  new HttpHeaders({
  'Authorization': 'Basic' + btoa(sessionStorage.getItem('username')+':'+sessionStorage.getItem('password'))
   } ),
   withCredentials: true
};
    this.http.post(Constants.HOME_URL+'photos/add', frmData,httpOptions).subscribe(
      data => {
        // SHOW A MESSAGE RECEIVED FROM THE WEB API.
        this.sMsg = data as string;
        console.log (this.sMsg);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);    // Show error, if any.
      }
    );

}
getFileDetails (event) {

  for (var i = 0; i < event.target.files.length; i++) { 
    this.myFiles.push(event.target.files[i]);
  }

  /*
  * below code is to get details of the uploaded file 
  */
  // for (var i = 0; i < event.target.files.length; i++) { 
  //   var name = event.target.files[i].name;
  //   var type = event.target.files[i].type;
  //   var size = event.target.files[i].size;
  //   var modifiedDate = event.target.files[i].lastModifiedDate;
    
  //   console.log ('Name: ' + name + "\n" + 
  //     'Type: ' + type + "\n" +
  //     'Last-Modified-Date: ' + modifiedDate + "\n" +
  //     'Size: ' + Math.round(size / 1024) + " KB");
  // }


}
downloadProfileImg():Observable<String>{	
  // const credentials :JSON=JSON.parse(Cookie.get("credentials"));
  
  // const username=credentials["username"];
  return this.http.get(Constants.HOME_URL+'photos/', { responseType: 'blob' }).pipe(
    switchMap(response => this.readImage(response))
  );
  
 }

 readImage(blob:Blob):Observable<String>{
   return Observable.create(obs => {
    const reader = new FileReader();

    reader.onerror = err => obs.error(err);
    reader.onabort = err => obs.error(err);
    reader.onload = () => obs.next(reader.result);
    reader.onloadend = () => obs.complete();

    return reader.readAsDataURL(blob);
 })
}

async getImage() {
  await this.downloadProfileImg()
    .subscribe(
      imgData =>{
       this.imgPath = imgData ;
        this.imgPath=imgData.split(",")[1];
       console.log(imgData.split(",")[1]);
       this.convertImage();
       const imgD=JSON.parse(atob(this.imgPath.valueOf())) as ProfileImage;
       this.imgPath=atob(imgD.image.data);
       console.log(this.imgPath);
      },
      err => console.log(err)
    );
    console.log(this.imgData);
    
}
convertImage(){
 //const img=this.imgData.image.id;
  console.log();
}
}
