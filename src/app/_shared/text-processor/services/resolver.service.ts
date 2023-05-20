import { Injectable } from '@angular/core';

import { StringResolverService } from './string-resolver.service';
import { MathResolverService } from './math-resolver.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverService {

  constructor(
    private stringResolverService:StringResolverService,
    private mathResolverService:MathResolverService,
  ) { }

  public encode(formula: string, values?: EncodeOptionalValues): EncodeResult {
    const valueObject: Record<string, any> = {};
    const dataObject: Array<metaData> = [];
    let formulaHash: string = formula;

    const regex: RegExp = /\#[A-Z]+:.*?\:#/g;
    const fields: RegExpMatchArray | null = formula.match(regex);

    if (values?.data) {
      values.data.forEach((item: { [key: string]: any }) => {
        const key = values.key ?? 'name';
        if (item[key]) {
          valueObject[item[key]] = item;
        }
      });
    }

    if (fields) {
      fields.forEach((item) => {
        if (formulaHash.includes(item)) {
          const [type, key] = item.slice(1, -2).split(':').map((part) => part.trim());
          const hash = this.createHash();
          formulaHash = formulaHash.split(item).join(hash);
          dataObject.push({ hash, identifier: item, type, key, ...valueObject[key] });
        }
      });
    } 
    
    return {
      formula: { hashed: formulaHash, readable: formula },
      meta: dataObject
    };
  }

  public executor(result: EncodeResult, values: valueDef, config?: ExecutorConfig): string {
    const hashedValues = this.bind(result, values);

    let formulaHash:string = result.formula.hashed;
    let options = config ?? {};

    try {
      formulaHash = this.mathResolverService.resolve(formulaHash, hashedValues); // Level 1
      formulaHash = this.stringResolverService.resolve(formulaHash, hashedValues); // Level 0 
    } catch (e) {
      console.warn('Expression Evaluator Service', e, formulaHash, hashedValues, config);
      return options.errorMessage || 'N/A';
    }

    return formulaHash;
  }

  private bind(result: EncodeResult, values: valueDef, key: string = 'key'): valueDef {
    const meta: Array<metaData> = result?.meta;
    if (!meta) { return {}; }
    key = key ? key : 'key';

    const metaObjectMap: valueDef = {};

    meta.forEach((item: { [key: string]: any }) => {
      metaObjectMap[item['hash']] = values[item[key]];
    });

    return metaObjectMap;
  }

  private createHash(): string {
    return '_' + Math.random().toString(36).substring(2, 15);
  }

}

export interface EncodeOptionalValues {
  key?: string;
  data?: Array<object>; // an array of objects
  config?: ExecutorConfig; // ExecutorConfig obj
}

export interface EncodeResult {
  formula: { hashed: string; readable: string };
  meta: Array<metaData>;
}

export interface ExecutorConfig {
  defaultDateFormat?: string; // global Date Format default
  timezone?: string; //global default timezone
  disableHtml?: boolean; // executor will not prevent add any default html tags
  errorMessage?: string; // Error message display
  force?: boolean; // force data resolving when empty fields are present
  lineBreakSupport?: boolean; // Treat enter or '\n' as a <br>
  metaData?: any;
}

export interface metaData {
  hash: string;
  identifier:string; 
  type?:string;
  key?:string;
}

export type valueDef =  Record<string, string | number | object | Array<object>>

