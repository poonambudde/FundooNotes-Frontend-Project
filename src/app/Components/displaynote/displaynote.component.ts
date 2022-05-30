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
  searchString:any;
  gridlist: any;


  @Input() receivedNoteList:any;
  @Output()DisplayNoteEvent = new EventEmitter<string>();
  @Output()UpdateNoteEvent = new EventEmitter<string>();


  constructor(public dialog: MatDialog, private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(message =>{
      console.log(message)
      this.searchString=message
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
      this.UpdateNoteEvent.emit("Hello")
    });
  }

   DisplayNoteMessage(event:any){
     this.DisplayNoteEvent.emit("Hello")
    }

  UpdateNoteMessage(event:any) {
    this.UpdateNoteEvent.emit("Hello")
  }


}