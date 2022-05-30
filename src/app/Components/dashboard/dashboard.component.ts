import {ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { DataService } from 'src/app/Services/dataService/data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GridlistService } from 'src/app/Services/gridlistService/gridlist.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {

  filteredString: string = '';
  title: string = '';
  grid = false;
  formatGridList = false;

  mobileQuery: MediaQueryList;
  text = ''; 

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from(
    {length: 50},
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  );

  private _mobileQueryListener: () => void;
  search:any;
  c:boolean=false;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private dataService:DataService,private router:Router,private snackBar: MatSnackBar,private nextData: GridlistService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  SearchProp(el: HTMLElement, color: string) {
    el.style.backgroundColor = color;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  filter(filteredString:any)
  {
      this.nextData.dataPipe(filteredString.target.value);
  }

  searchString(event:any)
  {
      console.log("event",event.target.value)
      this.dataService.changeMessage(event.target.value)
  }

  Logout()
  {
    localStorage.removeItem('token');
    this.router.navigateByUrl("/login")
    console.log("Logout Successfully..!!!");
    this.snackBar.open('Logout Successfully..!!!','..', {
      duration: 3000,
      verticalPosition: 'bottom'
    })
  }
  

   FormatView() {
    if (this.formatGridList == false) {
      this.formatGridList = true
      return this.formatGridList
    }
    else {
      this.formatGridList = false
      return this.formatGridList
    }
  }

  formatListView() {
    this.grid = true
    this.nextData.nextDataUpdate(this.FormatView().valueOf())
    console.log("value= ", this.FormatView().valueOf())
  }

  formatGridView() {
    this.grid = false
    this.nextData.nextDataUpdate(this.FormatView().valueOf())
    console.log("value ", this.FormatView())
  }

}