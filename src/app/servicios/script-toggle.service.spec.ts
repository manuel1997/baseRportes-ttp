import { TestBed } from '@angular/core/testing';

import { ScriptToggleService } from './script-toggle.service';

describe('ScriptToggleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScriptToggleService = TestBed.get(ScriptToggleService);
    expect(service).toBeTruthy();
  });
});
