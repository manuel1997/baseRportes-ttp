import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaOnlineComponent } from './vista-online.component';

describe('VistaOnlineComponent', () => {
  let component: VistaOnlineComponent;
  let fixture: ComponentFixture<VistaOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaOnlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
