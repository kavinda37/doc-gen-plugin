import { Component, Input, Output, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { TextProcessorService, EncodeResult, valueDef } from './text-processor.service'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import * as DOMPurify from 'dompurify'

@Component({
  selector: 'app-text-processor',
  templateUrl: './text-processor.component.html',
  styleUrls: ['./text-processor.component.scss']
})
export class TextProcessorComponent {

  @Input() public encodeResult$!: Observable<EncodeResult>;
  @Input() public values$!: Observable<valueDef>;

  protected outputString$!: Observable<string | SafeHtml>;

  constructor(
    public resolverService:TextProcessorService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnChanges(change: SimpleChanges) {
    if(this.encodeResult$ && this.values$) this.outputString$ = this.runExecutor(this.encodeResult$, this.values$);
  }

  /**------------------
  *     WARNING
  * -------------------
  * If Inline styles are present require to bypass angular inbuilt security since angular dom sanitizer removes inline styles
  * Clean up html before disabeling inbuilt angular sanitizer to prevent XSS
  * since angular is not letting to bypass inline styles only, its require to use more flexible dom sanitizer hence using DOMPurify lib
  * need to Add more safty by restricting allowed styles in future
  */
  runExecutor(encodeResult$: Observable<EncodeResult>, values$: Observable<valueDef>): Observable<string | SafeHtml> {
    return this.resolverService.executor(encodeResult$, values$).pipe(
      switchMap((htmlString) => {
        const inlineStylePattern: RegExp = /<[^>]+style="[^"]+"[^>]*>/g;
        const hasInlineStyle: boolean = inlineStylePattern.test(htmlString);
    
        if (hasInlineStyle) {
          const cleanHtml: string = DOMPurify.sanitize(htmlString, { ALLOWED_ATTR: ['style'] });
          return of(this.sanitizer.bypassSecurityTrustHtml(cleanHtml));
        }
    
        return of(htmlString);
      })
    );
  }
}
