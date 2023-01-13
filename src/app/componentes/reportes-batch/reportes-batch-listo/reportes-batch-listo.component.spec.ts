import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesBatchListoComponent } from './reportes-batch-listo.component';

describe('ReportesBatchListoComponent', () => {
  let component: ReportesBatchListoComponent;
  let fixture: ComponentFixture<ReportesBatchListoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesBatchListoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesBatchListoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
