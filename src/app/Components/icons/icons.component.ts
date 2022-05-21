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
  @Output() archiveEvent = new EventEmitter<string>();
  @Output() trashEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();

  isDisplaynoteComponent=false;
  isArchiveComponent=false;
  isTrashComponent=false;


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
  archive(note:any) {
    this.isArchive=false;
    this.note.archiveService(this.notedata.noteId).subscribe((response: any) => {
      console.log(response);
      this.archiveEvent.emit(response)
      if (response == true) {
        this.snackBar.open('Note Archieved successfully', '', {
          duration: 3000,
          verticalPosition: 'bottom'
        })
      }
      else {
        this.snackBar.open('Note Unarchived', '', {
          duration: 3000,
          verticalPosition: 'bottom'
        })
      }
    }
    )
  }

  Unarchive() {
    let data = {
      isArchived: false,
    }
    this.note.archiveService(data).subscribe((res:any)=>{
      console.log("unarchive a note",res);
      this.archiveEvent.emit(res)
    })
}

  // trash() {
  //   // this.isTrash = !note.isTrash;
  //   this.note.trashNote(this.notedata.noteId,this.data).subscribe((response: any) => {
  //     console.log(response);
  //     this.trashEvent.emit(response)
  //     if(response==true){
  //       this.snackBar.open('Note trashed successfully..', '', {
  //         duration: 3000,
  //         verticalPosition: 'bottom'
  //       })
  //     }
  //     else{
        
  //         this.snackBar.open('failed to trash', '', {
  //           duration: 2000,
  //           verticalPosition: 'bottom'
    
  //         });
  //       }
  //     })
      
  //   }

  trash(note:any) {
    this.isTrash = !note.isTrash;
    this.note.trashNoteService(this.notedata.noteId,this.data).subscribe((response: any) => {
      console.log(response);
      this.trashEvent.emit(response)
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


  delete(){
    this.note.deleteNoteService(this.notedata.noteId).subscribe((response:any)=>{
      console.log("Note deleted successfully!!!", response);
      this.deleteEvent.emit(response);
      this.snackBar.open('Note deleted successfully!!!', '', {
        duration: 3000,
        verticalPosition: 'bottom'
      })
    })
  } 
}