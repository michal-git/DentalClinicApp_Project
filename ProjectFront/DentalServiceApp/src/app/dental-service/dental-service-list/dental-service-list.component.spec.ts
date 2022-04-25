import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentalServiceListComponent } from './dental-service-list.component';

describe('DentalServiceListComponent', () => {
  let component: DentalServiceListComponent;
  let fixture: ComponentFixture<DentalServiceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DentalServiceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DentalServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
