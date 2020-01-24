import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsMeComponent } from './settings-me.component';

describe('SettingsMeComponent', () => {
  let component: SettingsMeComponent;
  let fixture: ComponentFixture<SettingsMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsMeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
