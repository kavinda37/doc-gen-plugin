import { TestBed } from '@angular/core/testing';
import { TextProcessorService, EncodeOptionalValues, EncodeResult, valueDef } from './text-processor.service';

describe('TextProcessorService', () => {
  let service: TextProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextProcessorService],
    });
    service = TestBed.inject(TextProcessorService);
  });

  it('should encode the text correctly', () => {
    const text = '#TYPE:Key1:#';
    const values: EncodeOptionalValues = {
      data: [
        { name: 'Key1', value: 'Value1' },
        { name: 'Key2', value: 'Value2' },
      ],
    };

    const result = service.encode(text, values);

    expect(result.formula.readable).toEqual(text);
    expect(result.meta.length).toEqual(1);

    const metaItem = result.meta[0];
    expect(metaItem.identifier).toEqual(text);
    expect(metaItem.type).toEqual('TYPE');
    expect(metaItem.key).toEqual('Key1');
    expect(metaItem.name).toEqual('Key1');

    const hashRegex = /^_[A-Za-z0-9]{10,}$/;
    expect(result.formula.hashed).toMatch(hashRegex);
    expect(metaItem.hash).toMatch(hashRegex);
  });

  it('should handle missing values correctly', () => {
    const text = 'NO PARAMS TEXT';

    const result = service.encode(text);

    expect(result.formula.readable).toEqual(text);
    expect(result.formula.hashed).toEqual(text);
    expect(result.meta.length).toEqual(0);
  });

  it('should bind values correctly', () => {
    const result: EncodeResult = {
      formula: { hashed: '_abc123', readable: '#TYPE:Key1:#' },
      meta: [
        { hash: '_abc123', identifier: '#TYPE:Key1:#', type: 'TYPE', key: 'Key1' },
        { hash: '_def456', identifier: '#TYPE:Key2:#', type: 'TYPE', key: 'Key2' },
      ],
    };

    const values: valueDef = {
      Key1: 'Value1',
      Key2: 'Value2',
    };

    const bindResult = service['bind'](result, values);

    expect(bindResult['_abc123']).toEqual('Value1');
    expect(bindResult['_def456']).toEqual('Value2');
  });

  it('should handle missing values correctly', () => {
    const result: EncodeResult = {
      formula: { hashed: '_abc123 _def456', readable: '#TYPE:Key1:# #TYPE:Key2:#' },
      meta: [
        { hash: '_abc123', identifier: '#TYPE:Key1:#', type: 'TYPE', key: 'Key1' },
        { hash: '_def456', identifier: '#TYPE:Key2:#', type: 'TYPE', key: 'Key2' },
      ],
    };

    const bindResult = service['bind'](result, {});

    expect(bindResult['_abc123']).toEqual('');
    expect(bindResult['_def456']).toEqual('');
  });

  it('should use default key if not provided', () => {
    const result: EncodeResult = {
      formula: { hashed: '_abc123 _def456', readable: '#TYPE:Key1:# #TYPE:Key2:#' },
      meta: [
        { hash: '_abc123', identifier: '#TYPE:Key1:#', type: 'TYPE', key: 'Key1' },
        { hash: '_def456', identifier: '#TYPE:Key2:#', type: 'TYPE', key: 'Key2' },
      ],
    };

    const values: valueDef = {
      Key1: 'Value1',
      Key2: 'Value2',
    };

    const bindResult = service['bind'](result, values);

    expect(bindResult['_abc123']).toEqual('Value1');
    expect(bindResult['_def456']).toEqual('Value2');
  });

  it('should create a hash with the correct format', () => {
    const hash = service['createHash']();

    expect(hash).toMatch(/^_[A-Za-z0-9]{10,}$/);
  });

});