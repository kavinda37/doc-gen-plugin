import { TestBed } from '@angular/core/testing';

import { StringResolverService } from './string-resolver.service';

describe('StringResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StringResolverService = TestBed.get(StringResolverService);
    expect(service).toBeTruthy();
  });
});
