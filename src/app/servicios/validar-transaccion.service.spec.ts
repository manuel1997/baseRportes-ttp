import { TestBed } from '@angular/core/testing';

import { ValidarTransaccionService } from './validar-transaccion.service';

describe('ValidarTransaccionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidarTransaccionService = TestBed.get(ValidarTransaccionService);
    expect(service).toBeTruthy();
  });
});
