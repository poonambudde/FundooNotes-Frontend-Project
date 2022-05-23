import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  base=environment.baseUrl;
  token:any;
  noteId: any;

  constructor(private httpservice:HttpService) {
    this.token=localStorage.getItem('token')
   }

  addNoteService(data:any)
  {
    let header ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json-patch+json',
        'Authorization': 'Bearer '+this.token

      })
    }

    return this.httpservice.postService(this.base+'Note/AddNote', data, true, header);
  }

  getNoteService() {

    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json-patch+json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpservice.getService(this.base + 'Note/GetAllNotes', true, header)
  }

   updateService(data:any,noteId:any)
   {
     console.log("token",this.token);
 
     let header ={
       headers: new HttpHeaders({
         'Content-Type': 'application/json-patch+json', 
         'Authorization':'Bearer '+this.token   
       })
     }
     return this.httpservice.putService(this.base+`Note/Update/${noteId}`, data,true,header)
   }
   archiveService(noteId:any)
   {
     console.log("token",this.token);
 
     let header ={
       headers: new HttpHeaders({
         'Content-Type': 'application/json-patch+json', 
         'Authorization':'Bearer '+this.token   
       })
     }
     return this.httpservice.putService(this.base+`Note/ArchiveNote/${noteId}`, {},true,header)
   }

   deleteNoteService(noteId:any){
    console.log("token",this.token);

    let header ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json-patch+json',
        'Authorization':'Bearer '+this.token  
      })
    }
    return this.httpservice.deleteService(this.base+`Note/Delete/${noteId}`,true,header)
   }

   trashNoteService( noteId: any, data:any) {

    console.log("token", this.token)

    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json-patch+json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpservice.putService(this.base + `Note/IsTrash/${noteId}`,data, true, header)
  }

  changeColorService(noteId: any, newcolor:any){
    console.log("token",this.token,noteId);
  
   let header ={
     headers: new HttpHeaders({
      'Content-Type': 'application/json-patch+json',
      'Authorization': 'Bearer ' + this.token
     })
   }
   return this.httpservice.putService(this.base + `Note/ChangeColorNote/${noteId}?color=?${newcolor}`,{},true,header)
  }
}