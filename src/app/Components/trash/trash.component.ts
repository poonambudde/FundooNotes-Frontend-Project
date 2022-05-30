import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NoteService } from 'src/app/Services/noteService/note.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  noteList:any 
 @Output() UpdateNoteEvent = new EventEmitter<any>();

  constructor(private note:NoteService) { }

  ngOnInit(): void {
    
    this.getAllNotes();
  }
  getAllNotes(){
    this.note.getNoteService().subscribe((response:any)=>{
      console.log(response.data);
      this.noteList=response.data;
      this.noteList.reverse();
      this.noteList = this.noteList.filter((object:any)=>{
        return object.isTrash===true
      })
    }
  )}

  UpdateNoteMessage(event:any){
    this.UpdateNoteEvent.emit("Hello")
  }

   DisplayNoteMessage(event:any){
     this.getAllNotes();
   }
}
