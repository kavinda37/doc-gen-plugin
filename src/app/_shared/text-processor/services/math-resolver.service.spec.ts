import { TestBed } from '@angular/core/testing';

import { MathResolverService } from './math-resolver.service';

describe('MathResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MathResolverService = TestBed.get(MathResolverService);
    expect(service).toBeTruthy();
  });
});
