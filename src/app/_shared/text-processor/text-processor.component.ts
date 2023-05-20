import { Component, Input } from '@angular/core';

import { TextProcessorService, EncodeResult, valueDef } from './text-processor.service'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import * as DOMPurify from 'dompurify'

@Component({
  selector: 'app-text-processor',
  templateUrl: './text-processor.component.html',
  styleUrls: ['./text-processor.component.scss']
})
export class TextProcessorComponent {

  @Input() public metaData!: EncodeResult;
  @Input() public values!: valueDef;

  protected outputString!: string | SafeHtml;

  constructor(
    public resolverService:TextProcessorService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    if(this.metaData && this.values) this.outputString = this.runExecutor(this.metaData, this.values);
    console.log('this.metaData, this.values', this.metaData, this.values)
    const data = {
      firstName:'John',
      day:10,
      Bob:35
    }
    
    // this.outputString = this.runExecutor(this.metaData, this.values);
  }

  /**-------------------
  *     WARNING
  * -------------------
  * If Inline styles are present require to bypass angular inbuilt security since angular dom sanitizer removes inline styles
  * Clean up html before disabeling inbuilt angular sanitizer to prevent XSS
  * since angular is not letting to bypass inline styles only, its require to use more flexible dom sanitizer hence using famous nodejs DOMPurify lib
  * need to Add more safty by restricting allowed styles in future
  */
  runExecutor(metaData:EncodeResult, values:valueDef): string | SafeHtml{
    const htmlString:string = this.resolverService.executor(metaData, values)
    let outputString: string | SafeHtml = htmlString;
    
    const inlineStylePattern:RegExp = /<[^>]+style="[^"]+"[^>]*>/g;
    const hasInlineStyle:boolean = inlineStylePattern.test(htmlString);

    if (hasInlineStyle) {
      const cleanHtml:string = DOMPurify.sanitize(htmlString, { ALLOWED_ATTR: ['style'] });
      outputString = this.sanitizer.bypassSecurityTrustHtml(cleanHtml);
    }
    return outputString;
  }
}
