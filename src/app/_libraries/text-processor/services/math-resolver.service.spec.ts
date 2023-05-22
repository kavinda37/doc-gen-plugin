import { TestBed } from '@angular/core/testing';

import { MathResolverService } from './math-resolver.service';

describe('MathResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('MathResolverService :: should be created', () => {
    const service: MathResolverService = TestBed.get(MathResolverService);
    expect(service).toBeTruthy();
  });
});

describe('MathResolverService :: evaluateMath', () => {
  let service: MathResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MathResolverService);
  });

  it('should evaluate a valid math expression', () => {
    const formula = '2 + 3 * 4';
    const expected = 14;
    const result = service.evaluateMath(formula);
    expect(result).toEqual(expected);
  });

  it('should return null when formula is empty', () => {
    const formula = '';
    const result = service.evaluateMath(formula);
    expect(result).toBeNull();
  });

});

describe('MathResolverService :: resolve', () => {
  let service: MathResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MathResolverService);
  });

  it('should resolve math expressions in the formula and replace them with evaluated results', () => {
    const formula = 'Addition: :math{2 + 3}:, Subtraction: :math{5 - 2}:';
    const data = {};
    const expected = 'Addition: 5, Subtraction: 3';
    const result = service.resolve(formula, data);
    expect(result).toEqual(expected);
  });

  it('should resolve math expressions with variables from the data object', () => {
    const formula = 'Multiplication: :math{a * b}:, Division: :math{c / d}:';
    const data = { a: 3, b: 4, c: 10, d: 2 };
    const expected = 'Multiplication: 12, Division: 5';
    const result = service.resolve(formula, data);
    expect(result).toEqual(expected);
  });

  it('should return the same formula when there are no math expressions', () => {
    const formula = 'Hello, world!';
    const result = service.resolve(formula);
    expect(result).toEqual(formula);
  });

});