import { Component, TemplateRef, ViewChild  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BehaviorSubject, Observable, of } from 'rxjs';
// import { Editor } from 'tinymce';

import {TextProcessorService, EncodeResult, valueDef} from '../../_libraries';

@Component({
  selector: 'app-document-designer',
  templateUrl: './document-designer.component.html',
  styleUrls: ['./document-designer.component.scss']
})
export class DocumentDesignerComponent {

  modalRef?: BsModalRef;
  @ViewChild('modalTemplate', { static: true }) previewModal!: TemplateRef<any>;

  editorText:string = 'Hello #API:firstName:#! Today is #API:day:#. :math{3+5}: tomorrow is :math{#API:day:#+1}:';

  public encodedData$!:Observable<EncodeResult>;

  val:valueDef = {}
  val$ = new BehaviorSubject<valueDef>(this.val)

  private editor_plugins = [
    'advlist autolink lists link image charmap print anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount pagebreak'
  ];
  private editor_toolbar = 'customNumericButton | customPreviewButton | undo redo | bold italic underline | fontselect fontsizeselect | backcolor forecolor | \
    alignleft aligncenter alignright alignjustify | \
    bullist numlist outdent indent | removeformat | image link table | help';


  editor_init = {
    base_url: '/tinymce', 
    suffix: '.min',
    height: 500,
    menubar: 'file edit view insert format table',
     plugins: this.editor_plugins,
     toolbar: this.editor_toolbar,
     setup:(editor:any) => { 
      editor.ui.registry.addButton('customNumericButton', {
        text: 'Calculation',
        onAction: (_:any) => {
          this.editorUpdateVariableText(editor, 'math');
        }
      });

      editor.ui.registry.addButton('customPreviewButton', {
        text: 'Preview',
        onAction: (_:any) => {
          this.openPreviewModal(this.previewModal);
        }
      });
     
     }
  }

  constructor(
    private modalService: BsModalService,
    private textProcessorService:TextProcessorService
  ) {}

  editorUpdateVariableText(editor:any, type:any, value?:any) {
    editor.insertContent(`:${type}{${value || ''}}:`);
  }

  openPreviewModal(template: TemplateRef<any>) {
    this.encodedData$ = of(this.textProcessorService.encode(this.editorText));
    this.val$.next(this.val)
    this.modalRef = this.modalService.show(template);
  }

  refreshText(val:valueDef) {
    this.val$.next(val)
  }

}
