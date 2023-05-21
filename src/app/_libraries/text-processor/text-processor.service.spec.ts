import { TestBed } from '@angular/core/testing';

import { TextProcessorService } from './text-processor.service';

describe('TextProcessorService', () => {
  let service: TextProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
