import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesBatchComponent } from './reportes-batch.component';

describe('ReportesBatchComponent', () => {
  let component: ReportesBatchComponent;
  let fixture: ComponentFixture<ReportesBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesBatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
