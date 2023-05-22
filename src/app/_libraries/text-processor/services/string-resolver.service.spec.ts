import { TestBed } from '@angular/core/testing';

import { StringResolverService } from './string-resolver.service';

describe('StringResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StringResolverService = TestBed.get(StringResolverService);
    expect(service).toBeTruthy();
  });
});

describe('StringResolverService :: resolve', () => {
  let service: StringResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringResolverService);
  });

  it('should replace variables in the formula with corresponding values from the data object', () => {
    const formula = 'Hello _abc123! Today is _def456.';
    const data = { _abc123: 'John', _def456: 'Monday' };
    const expected = 'Hello John! Today is Monday.';
    const result = service.resolve(formula, data);
    expect(result).toEqual(expected);
  });

  it('should log a warning when an empty data object is provided', () => {
    const formula = 'Hello _abc123! Today is _def456.';
    const data = {};
    spyOn(console, 'warn');
    service.resolve(formula, data);
    expect(console.warn).toHaveBeenCalledWith('String data resolver failure: Cannot bind values. Empty data object provided.');
  });

  it('should log a warning when a variable has no value', () => {
    const formula = 'Hello _abc123! Today is _def456.';
    const data = { name: 'John', day: undefined };
    spyOn(console, 'warn');
    service.resolve(formula, data);
    expect(console.warn).toHaveBeenCalledWith('String data resolver failure: Variables must have a value');
  });


});
