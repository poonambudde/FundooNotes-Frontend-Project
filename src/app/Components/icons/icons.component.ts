import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from 'src/app/Services/noteService/note.service';
import { ArchiveComponent } from '../archive/archive.component';
import { GetAllNotesComponent } from '../get-all-notes/get-all-notes.component';
import { TrashComponent } from '../trash/trash.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {
  noteId: any;
  data:any;
  isArchive:any;
  isTrash:any;

  @Input() notedata:any;
  @Output() UpdateNoteEvent = new EventEmitter<any>();
  @Output() DisplayNoteEvent = new EventEmitter<any>();
  
  isDisplaynoteComponent=false;
  isArchiveComponent=false;
  isTrashComponent=false;

  colorArray = [{Colorcode:"white", name:"White"},{Colorcode:"rgb(238, 188, 188)", name:"Red"},{Colorcode:"#fbbc04", name:"Orange"},{Colorcode:"#fff475", name:"Yellow"},{Colorcode:"rgb(175, 215, 175)", name:"Green"},{Colorcode:"aqua", name:"aqua"},
  {Colorcode:"#cbf0f8", name:"Blue"},{Colorcode:"teal", name:"teal"},{Colorcode:"#d7aefb", name:"Purple"},{Colorcode:"#fdcfe8", name:"Pink"},{Colorcode:"#e6c9a8", name:"Brown"},{Colorcode:"#e8eaed", name:"Gray"}];

  
  constructor(private note: NoteService,private snackBar: MatSnackBar,private route: ActivatedRoute,public dialog: MatDialog) { }

  ngOnInit(): void {
 
    let Comp = this.route.snapshot.component;

    if(Comp == GetAllNotesComponent)
    {
      this.isDisplaynoteComponent=true;
    }

    if(Comp == TrashComponent)
    {
      this.isTrashComponent=true;
    }

    if(Comp == ArchiveComponent)
    {
      this.isArchiveComponent=true;
    }
  }

archive() {
       this.note.archiveService(this.notedata.noteId).subscribe((response: any) => {
         console.log(response);
         this.UpdateNoteEvent.emit(response)
         this.snackBar.open('Note Archived successfully..', '', {
          duration: 3000,
          verticalPosition: 'bottom'
        })
     }, error=>this.snackBar.open('failed to archive', '', {
      duration: 2000,
      verticalPosition: 'bottom'
    })

  ) 
}
         
Unarchive() {
  this.note.archiveService(this.notedata.noteId).subscribe((res:any)=>{
    console.log("unarchive a note",res);
    this.UpdateNoteEvent.emit(res)
    this.snackBar.open('Note Unarchived', '', {
      duration: 3000,
      verticalPosition: 'bottom'
    })
  })
}

  trash() {
    this.note.trashNoteService(this.notedata.noteId,this.data).subscribe((response: any) => {
      console.log(response);
      this.UpdateNoteEvent.emit(response)
      this.snackBar.open('Note trashed successfully..', '', {
          duration: 3000,
          verticalPosition: 'bottom'
        })
     }, error=>this.snackBar.open('failed to trash', '', {
      duration: 2000,
      verticalPosition: 'bottom'
    })
  ) 
}

    deleteForeverNotes(){
    this.note.deleteNoteService(this.notedata.noteId).subscribe((response:any)=>{
      console.log("Note deleted successfully!!!", response);
      this.UpdateNoteEvent.emit(response);
      this.snackBar.open('Note deleted successfully!!!', '', {
        duration: 3000,
        verticalPosition: 'bottom'
      })
    })
  } 

  restoreNotes()
  {
    this.note.trashNoteService(this.notedata.noteId,this.data).subscribe((response:any)=>{
    console.log("note restored",response);
    this.UpdateNoteEvent.emit(response);
    this.snackBar.open('Note restored successfully!!!', '', {
      duration: 3000,
      verticalPosition: 'bottom'
    })
    })
  }

changeColor(color:any){
    console.log(color);

    this.note.changeColorService(this.notedata.noteId,color).subscribe((response: any) => {
      console.log(response);
      
      this.UpdateNoteEvent.emit(response)
      this.snackBar.open('Note Background Color Changed Successfully!!!', '', {
          duration: 3000,
          verticalPosition: 'bottom'
        })
     }, error=>this.snackBar.open('Note Background Color is not changed', '', {
      duration: 2000,
      verticalPosition: 'bottom'
    })
    )
  }
}