import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { FilterPipe } from 'src/app/Pipes/filter.pipe';
import { DataService } from 'src/app/Services/dataService/data.service';

import { DisplaynoteComponent } from './displaynote.component';

fdescribe('DisplaynoteComponent', () => {
  let component: DisplaynoteComponent;
  let fixture: ComponentFixture<DisplaynoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaynoteComponent,FilterPipe ],
      imports: [MatDialogModule],
      providers: [DataService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaynoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
