import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService } from 'src/app/Services/dataService/data.service';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-displaynote',
  templateUrl: './displaynote.component.html',
  styleUrls: ['./displaynote.component.scss']
})
export class DisplaynoteComponent implements OnInit {
  filteredString = '';
  Searchtitle:string = '';
   gridList: any;

  @Input() receivedNoteList:any;
  @Output() updateEvent = new EventEmitter<string>();
  @Output() archiveEvent = new EventEmitter<string>();
  @Output() trashEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();

  constructor(public dialog: MatDialog, private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(message =>{
      console.log(message)
      this.Searchtitle=message
    } )
  }
  openDialog(note:any): void {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '450px',
      height:'auto',
      data:note ,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.updateEvent.emit("Hello")
    });
  }

   archiveMessage(event:any){
     this.archiveEvent.emit("Hello")
   }

   trashMessage(event:any){
    this.trashEvent.emit("Hello")
  }

   deleteMessage(event:any){
    this.deleteEvent.emit("Hello")
  }

  receiveMessage(event:any){
    this.updateEvent.emit("Hello")
  }

}