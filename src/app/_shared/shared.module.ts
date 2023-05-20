import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextProcessorComponent } from './text-processor/text-processor.component';



@NgModule({
  declarations: [
    TextProcessorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TextProcessorComponent
  ]
})
export class SharedModule { }
