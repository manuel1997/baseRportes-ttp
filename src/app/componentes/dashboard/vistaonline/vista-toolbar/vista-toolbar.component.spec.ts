import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaToolbarComponent } from './vista-toolbar.component';

describe('VistaToolbarComponent', () => {
  let component: VistaToolbarComponent;
  let fixture: ComponentFixture<VistaToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
