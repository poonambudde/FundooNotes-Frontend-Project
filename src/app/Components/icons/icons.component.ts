import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteService } from 'src/app/Services/noteService/note.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {
  noteId: any;
  @Input() notedata:any;
  @Output() archiveEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();

  constructor(private note: NoteService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  archive(){
    this.note.archiveService(this.notedata.noteId).subscribe((response:any)=>{
      console.log(response);
      this.archiveEvent.emit(response)
      if (response.data.isArchive == true) {
        this.snackBar.open('Note Archieved successfully', '', {
          duration: 3000,
          verticalPosition: 'bottom'
        })
      }
      else {
        this.snackBar.open('Failed to archieve note or Id does not exists', '', {
          duration: 2000,
          verticalPosition: 'bottom'
        })
      }
    }
    )
  }

  delete(){
    this.note.deleteNote(this.notedata.noteId).subscribe((response:any)=>{
      console.log(response);
      this.deleteEvent.emit(response);
      this.snackBar.open('Note deleted successfully!!!', '', {
        duration: 3000,
        verticalPosition: 'bottom'
      })
    })
  } 
}