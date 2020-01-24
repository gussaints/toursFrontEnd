import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeBusComponent } from './make-bus.component';

describe('MakeBusComponent', () => {
  let component: MakeBusComponent;
  let fixture: ComponentFixture<MakeBusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeBusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
