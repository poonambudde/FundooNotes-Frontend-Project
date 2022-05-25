import {ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {

  mobileQuery: MediaQueryList;

   grid = false;
   formatGridList = false;
   filteredString: string = '';

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
  nextData: any;



  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  filter(event:any)
  {
      this.nextData.dataPipe("event",event.target.value);
      this.nextData.dataPipe("event",event);
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
    this.grid = false
    this.nextData.nextDataUpdate(this.FormatView().valueOf())
    console.log("value ", this.FormatView())
  }

  formatGridView() {
    this.grid = true
    this.nextData.nextDataUpdate(this.FormatView().valueOf())
    console.log("value ", this.FormatView())
  }

}