import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteService } from 'src/app/Services/noteService/note.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  noteId:any
  title:any
  description:any
  bgColour:any

  constructor(private snackBar: MatSnackBar, private note:NoteService,public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    console.log(this.data);
    console.log(this.data.bgColour)
    this.title=this.data.title
    this.description=this.data.description
    this.bgColour=this.data.bgColour
    
 
  }

  onNoClick(): void {
    console.log(this.data);

    let data=
    { 
      title: this.title,
      description: this.description,
      bgColour: this.bgColour,
      "isArchive": false,
      "isReminder": false,
      "isPin": false,
      "isTrash": false
    }
    this.note.updateService(data,this.data.noteId).subscribe((res:any)=>
    {
      console.log("update response=",res);
      console.log(this.data.noteId);
      this.dialogRef.close(res);

      this.snackBar.open('Note updated successfully', '', {
        duration: 3000,
        verticalPosition: 'bottom'
      })
    },error=>{
      this.snackBar.open('Failed to update', '', {
      duration: 2000,
      verticalPosition: 'bottom'
      });
    }
    )  
  }
  
   UpdateNoteMessage(event:any){
     if(event.data !== (null || undefined)){
       console.log(event.data)
     this.bgColour = event.data.bgColour} 
 }
   
}
