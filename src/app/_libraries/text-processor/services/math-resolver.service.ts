import { Injectable } from '@angular/core';
import * as math from 'mathjs'; // https://mathjs.org/docs/getting_started.html
import { StringResolverService } from './string-resolver.service'
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class MathResolverService {

  constructor(private stringResolverService:StringResolverService) { }
  
  evaluateMath(formula: string, data?: object): any {
    if (!formula) {
      return null;
    }
  
    const processedFormula:string = this.stringResolverService.resolve(formula, data);
  
    try {
      return math.evaluate(processedFormula);
    } catch (e) {
      console.error('Math Resolver ' + e)
      return processedFormula;
    }
  }
  
  resolve(formula: string, data?: object): string {
    const regex = /\:math{.*?\}:/g;
    const expressions = formula.match(regex) || [];
  
    for (const expression of expressions) {
      const resolvedExpression = this.stringResolverService.resolve(expression.slice(6, -2), data);
      const result = this.evaluateMath(resolvedExpression, data);
      formula = formula.replace(expression, result.toString());
    }
  
    return formula;
  }
}
