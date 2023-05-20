import { Component, OnInit } from '@angular/core';

import { ResolverService } from './services/resolver.service'

@Component({
  selector: 'app-text-processor',
  templateUrl: './text-processor.component.html',
  styleUrls: ['./text-processor.component.scss']
})
export class TextProcessorComponent {
  constructor(public resolverService:ResolverService) {}

  ngOnInit() {
    // console.log(this.resolverService.encode('this is a test formula #API:VARIABLE:# and this is how to type a notation :math{ 3 * 3 }: '))

    const formula = 'Hello #API:firstName:#! Today is #API:day:#. :math{3+5}: tomorrow is :math{#API:day:#+1}:';

    const values = {
      key: 'name',
      data: [
        { name: 'firstName', age: 25 },
        { name: 'day', age: 30 },
        // { name: 'Bob', age: 35 }
      ]
    };

    const data = {
      firstName:'John',
      day:10,
      Bob:35
    }

    // console.log(this.resolverService.encode(formula, values))

    let encodedRes = this.resolverService.encode(formula, values);
    // let hashedValues = this.resolverService.bind(encodedRes, data);
    // console.log('hashedValues', hashedValues)
    console.log(this.resolverService.executor(encodedRes, data))

  }
}
