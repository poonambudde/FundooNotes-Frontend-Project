import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-displaynote',
  templateUrl: './displaynote.component.html',
  styleUrls: ['./displaynote.component.scss']
})
export class DisplaynoteComponent implements OnInit {
  @Input() receivedNoteList:any;
  @Output() updateEvent = new EventEmitter<string>();
  @Output() archiveEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {


  }
  openDialog(note:any): void {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '500px',
      height: '300px',
      data:note ,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.updateEvent.emit("Hello")
     
    });
  }

  
   archiveMessage(event:any){
     this.archiveEvent.emit("Hello")
   }

   deleteMessage(event:any){
    this.deleteEvent.emit("Hello")
  }

}
