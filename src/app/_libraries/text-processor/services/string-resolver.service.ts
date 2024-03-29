import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringResolverService {

  constructor() { }

  resolve(formula: string, data: object= {}): string {
    if (data !== undefined && Object.keys(data).length === 0) {
      console.warn('String data resolver failure: Cannot bind values. Empty data object provided.');
    }
  
    let formulaHash: string = formula;
    let error: boolean = false;
  
    if (data) {
      Object.entries(data).some(([key, value]) => {
        let val = value;
  
        if (isNaN(val) && !val) {
          error = true;
          return true;
        } 
        formulaHash = formulaHash.split(key).join(val);
        return false;
      });
    }
    
  
    if (error) console.warn('String data resolver failure: Variables must have a value');
    return formulaHash;
  }
}

