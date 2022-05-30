import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NoteService } from 'src/app/Services/noteService/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {
  isShow=false;
  title:any;
  description:any;
  @Output() messageEvent = new EventEmitter<string>();
  
  constructor(private note:NoteService ,private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
  }
  Show() {

    this.isShow = true;
  }
  close() {
    this.isShow = false;
    if ((this.title != null && this.title != "") || (this.description != null && this.description != "")) {
      console.log(this.title, this.description)
      let data={
        "title": this.title,
        "description": this.description,
        "bgColour": "White",
        "isArchive": false,
        "isReminder": false,
        "isPin": false,
        "isTrash": false        
      }
      this.note.addNoteService(data).subscribe((res: any) => {
        console.log(res);
        this.messageEvent.emit("Hello")
        this.snackBar.open('Note Added Successfully', '', {
          duration: 3000,
          verticalPosition: 'bottom'
        })
      }, error=>this.snackBar.open('Both Title and Description should not be empty', '', {
        duration: 2000,
        verticalPosition: 'bottom'
      })
      )
    }
  }
}