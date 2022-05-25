import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/Services/noteService/note.service';

@Component({
  selector: 'app-get-all-notes',
  templateUrl: './get-all-notes.component.html',
  styleUrls: ['./get-all-notes.component.scss']
})
export class GetAllNotesComponent implements OnInit {
  noteList:any;
   gridList:any
  
  constructor(private note:NoteService) { }

  ngOnInit(): void {
    this.getAllNotes();
  }

  getAllNotes(){
    this.note.getNoteService().subscribe((response:any)=>{
      console.log(response);
      this.noteList=response.data;
          this.noteList=this.noteList.filter((Object:any)=>{
            return Object.isArchive===false && Object.isTrash===false
          })
    })
  }
  
  receiveMessage(event:any) {
    this.getAllNotes();
  }

  archiveMessage(event:any) {
     this.getAllNotes();
   }

   trashMessage(event:any){
    this.getAllNotes();
  }

   deleteMessage(event: any) {
    this.getAllNotes();
  }

}
