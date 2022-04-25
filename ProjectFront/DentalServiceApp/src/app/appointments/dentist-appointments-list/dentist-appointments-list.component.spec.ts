import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistAppointmentsListComponent } from './dentist-appointments-list.component';

describe('DentistAppointmentsListComponent', () => {
  let component: DentistAppointmentsListComponent;
  let fixture: ComponentFixture<DentistAppointmentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DentistAppointmentsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DentistAppointmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
