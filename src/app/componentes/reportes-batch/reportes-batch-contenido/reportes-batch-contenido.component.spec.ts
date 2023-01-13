import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesBatchContenidoComponent } from './reportes-batch-contenido.component';

describe('ReportesBatchContenidoComponent', () => {
  let component: ReportesBatchContenidoComponent;
  let fixture: ComponentFixture<ReportesBatchContenidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesBatchContenidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesBatchContenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
