import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { ProfileImage } from '../models/profileImage';
import { Observable } from '../../../node_modules/rxjs';
import { Constants } from '../constants';
import { switchMap } from '../../../node_modules/rxjs/operators';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  app:any;
  username:String;
  imgData:ProfileImage;
  imgPath:String;
  constructor(private loginService:AuthenticationService,private http: HttpClient) {
    this.app=loginService;
   }

  ngOnInit() {
    this.username=sessionStorage.getItem('username');
    this.getImage();
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
  
         const imgD=JSON.parse(atob(this.imgPath.valueOf())) as ProfileImage;
         this.imgPath="data:image/jpeg;base64,"+imgD.image.data;
         
         console.log(this.imgPath);
        },
        err => console.log(err)
      );
      
  }
  
}
