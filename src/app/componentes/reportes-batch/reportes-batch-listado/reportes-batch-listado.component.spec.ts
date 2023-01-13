import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesBatchListadoComponent } from './reportes-batch-listado.component';

describe('ReportesBatchListadoComponent', () => {
  let component: ReportesBatchListadoComponent;
  let fixture: ComponentFixture<ReportesBatchListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesBatchListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesBatchListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
