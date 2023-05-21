import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { StringResolverService } from './services/string-resolver.service';
import { MathResolverService } from './services/math-resolver.service';


@Injectable({
  providedIn: 'root'
})
export class TextProcessorService {

  constructor(
    private stringResolverService:StringResolverService,
    private mathResolverService:MathResolverService,
  ) { }

  public encode(text: string, values?: EncodeOptionalValues): EncodeResult {
    const valueObject: Record<string, any> = {};
    const dataObject: Array<metaData> = [];
    let formulaHash: string = text;
  
    const regex: RegExp = /\#[A-Z]+:.*?\:#/g;
    const fields: RegExpMatchArray | null = text.match(regex);
  
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
        const [type, key] = item.slice(1, -2).split(':').map((part) => part.trim());
        const hash = this.createHash();
        formulaHash = formulaHash.split(item).join(hash);
        dataObject.push({ hash, identifier: item, type, key, ...valueObject[key] });
      });
    } 
  
    return {
      formula: { hashed: formulaHash, readable: text },
      meta: dataObject
    };
  }


  public executor(result: Observable<EncodeResult>, values: Observable<valueDef>, config: ExecutorConfig = {}): Observable<string> {
    return result.pipe(
      switchMap((result) => values.pipe(
        switchMap((values) => {
          const hashedValues = this.bind(result, values);
          let formulaHash = result.formula.hashed;
  
          formulaHash = this.mathResolverService.resolve(formulaHash, hashedValues); // Level 1
          formulaHash = this.stringResolverService.resolve(formulaHash, hashedValues); // Level 0
  
          return of(formulaHash);
        }),
        catchError((error) => {
          console.warn('Expression Evaluator Service', error);
          return of(config.errorMessage || 'N/A');
        })
      ))
    );
  }

  public bind(result: EncodeResult, values: valueDef, key: string = 'key'): valueDef {
    const meta: Array<metaData> = result?.meta;
    if (!meta) { return {}; }
    key = key ? key : 'key';

    const metaObjectMap: valueDef = {};

    meta.forEach((item: { [key: string]: any }) => {
      metaObjectMap[item['hash']] = values && values[item[key]]  ? values[item[key]] : '';
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
  name?:string
}

export type valueDef =  Record<string, string | number | object | Array<object>>