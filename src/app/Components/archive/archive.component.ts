import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/Services/noteService/note.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  noteList:any

  constructor(private note:NoteService) { }

  ngOnInit(): void {
    this.getAllNotes();

  }
   getAllNotes(){
    this.note.getNoteService().subscribe((response:any)=>{
      console.log(response.data);
      this.noteList=response.data;
       this.noteList = this.noteList.filter((object:any)=>{
         return object.isArchive===true 
       })
    })
  }

  DisplayNoteMessage(event:any) {
    this.getAllNotes();
  }

}
