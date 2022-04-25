import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAppointmentListComponent } from './my-appointment-list.component';

describe('MyAppointmentListComponent', () => {
  let component: MyAppointmentListComponent;
  let fixture: ComponentFixture<MyAppointmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAppointmentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAppointmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
