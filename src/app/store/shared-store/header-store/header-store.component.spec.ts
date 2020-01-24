import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderStoreComponent } from './header-store.component';

describe('HeaderStoreComponent', () => {
  let component: HeaderStoreComponent;
  let fixture: ComponentFixture<HeaderStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
