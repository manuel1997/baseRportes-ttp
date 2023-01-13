import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesOficinasComponent } from './reportes-oficinas.component';

describe('ReportesOficinasComponent', () => {
  let component: ReportesOficinasComponent;
  let fixture: ComponentFixture<ReportesOficinasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesOficinasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesOficinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
