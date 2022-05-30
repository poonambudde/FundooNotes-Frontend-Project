import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashComponent } from './trash.component';

fdescribe('TrashComponent', () => {
  let component: TrashComponent;
  let fixture: ComponentFixture<TrashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrashComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
