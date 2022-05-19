import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  base=environment.baseUrl;

  constructor(private httpservice:HttpService) { }

  registration(data:any){
    console.log("user registration ======");
    let header={
      headers:new HttpHeaders({
        'Content-Type': 'application/json-patch+json'
      })
    } 
     return this.httpservice.postService(this.base+'User/register', data, false, header)
   }

   userlogin(data:any){
     console.log(data)
    let header={
      headers:new HttpHeaders({
        'Content-Type': 'application/json'
      })
    } 
     return this.httpservice.postService(this.base+`User/login/${data.email}/${data.password}`, {}, false, header)
   }

    forgotPassword(data:any){
     let header={
       headers:new HttpHeaders({
         'Content-Type': 'application/json'
       })
     } 
     return this.httpservice.postService(this.base+`User/ForgotPassword/${data.email}`, {}, false, header)
    }

    resetPassword(data:any,token:any){
      let header={
        headers:new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token
        })
      } 
      return this.httpservice.putService(this.base+`User/ResetPassword?password=${data.password}&confirmpassword=${data.confirmpassword}`, {}, true, header)
     }
}
