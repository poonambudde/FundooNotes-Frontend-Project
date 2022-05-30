import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridlistService {
  private info = new Subject<any>();
  public store = this.info.asObservable();
  
  constructor() { }
  nextDataUpdate(text:any){
    this.info.next(text);
  }

}
