import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  postService(url:string,payload:any, token:boolean=false, httpOptions:any){
    // console.log(url)
    return this.http.post(url, payload, token && httpOptions)
  }

  putService(url:string,payload:any, token:boolean=true, httpOptions:any){
    return this.http.put(url, payload, token && httpOptions)
  }

  getService(url:string, token:boolean=true,httpOptions:any){
    return this.http.get (url,token && httpOptions)
  }

  deleteService(url:any,token:boolean=true,httpOptions:any){
    return this.http.delete(url,token && httpOptions)
  }
  
  }
