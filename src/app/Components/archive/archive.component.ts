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
  }

   GetAllNotes(){
    this.note.getNote().subscribe((response:any)=>{
      console.log(response);
      this.noteList=response.data;
       this.noteList = this.noteList.filter((object:any)=>{
         return object.isArchive===true && object.isTrash===false
       })
    })
  }

}
