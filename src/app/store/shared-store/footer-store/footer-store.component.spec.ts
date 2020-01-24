import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterStoreComponent } from './footer-store.component';

describe('FooterStoreComponent', () => {
  let component: FooterStoreComponent;
  let fixture: ComponentFixture<FooterStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
