import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesBatchFormComponent } from './reportes-batch-form.component';

describe('ReportesBatchFormComponent', () => {
  let component: ReportesBatchFormComponent;
  let fixture: ComponentFixture<ReportesBatchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesBatchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesBatchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
