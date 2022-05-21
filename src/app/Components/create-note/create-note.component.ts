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
  desc:any;
  @Output() messageEvent = new EventEmitter<string>();
  
  constructor(private note:NoteService ,private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
  }
  Show() {
    console.log("insideShow");
    this.isShow = true;
  }
  close() {
    this.isShow = false;
    if ((this.title != null && this.title != "") || (this.desc != null && this.desc != "")) {
      console.log(this.title, this.desc)
      let data={
        "title": this.title,
        "description": this.desc,
        "bgColour": " ",
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