import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsMeComponent } from './bookings-me.component';

describe('BookingsMeComponent', () => {
  let component: BookingsMeComponent;
  let fixture: ComponentFixture<BookingsMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingsMeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingsMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
