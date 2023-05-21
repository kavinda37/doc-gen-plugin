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

  modalRef!: BsModalRef;
  @ViewChild('modalTemplate', { static: true }) previewModal!: TemplateRef<any>;
  @ViewChild('addFieldTemplate', { static: true }) addFieldTemplate!: TemplateRef<any>;

  editorText:string = 'Hello #API:firstName:#! Today is #API:day:#. :math{3+5}: tomorrow is :math{#API:day:#+1}:';
 
  customParam: { value: string, type: string } = {value: '', type: 'VAR'};
  val:valueDef = {}

  val$ = new BehaviorSubject<valueDef>(this.val)
  encodedData$!:Observable<EncodeResult>;

  

  private editor_plugins = [
    'advlist autolink lists link image charmap print anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount pagebreak'
  ];
  private editor_toolbar_default = 'undo redo | bold italic underline | fontselect fontsizeselect | backcolor forecolor | \
    alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image link table | help';
  
    private editor_toolbar_custom = 'customPreviewButton | customFieldButton customNumericButton';


  editor_init = {
    base_url: '/tinymce', 
    suffix: '.min',
    height: 600,
    skin: "oxide-dark",
    content_css: "dark",
    menubar: 'file edit view insert format table',
     plugins: this.editor_plugins,
     toolbar1: this.editor_toolbar_default,
     toolbar2: this.editor_toolbar_custom,
     // TODO tinymce 5 Editor types issue, require an alternative solution
     setup:(editor:any) => { 
      editor.ui.registry.addButton('customNumericButton', {
        text: 'Calculation',
        onAction: (_:any) => {
          this.editorUpdateVariableText(editor, 'math');
        }
      });

      editor.ui.registry.addButton('customPreviewButton', {
        text: 'Evaluate',
        onAction: (_:any) => {
          this.openPreviewModal();
        }
      });

      editor.ui.registry.addButton('customFieldButton', {
        text: 'Add Field',
        onAction: (_:any) => {
          this.openAddFieldModal(editor);
        }
      });
     
     }
  }

  constructor(
    private modalService: BsModalService,
    private textProcessorService:TextProcessorService
  ) {}

  editorUpdateVariableText(editor:any, type:string, value?:string) {
    editor.insertContent(`:${type}{${value || ''}}:`);
  }

  openPreviewModal() {
    this.encodedData$ = of(this.textProcessorService.encode(this.editorText));
    this.val$.next(this.val)
    this.modalRef = this.modalService.show(this.previewModal);
  }

  openAddFieldModal(editor: any): void {
    const initialState = {
      data: (value: string, type: string): void => {
        editor.insertContent(`#${type || ''}:${value || ''}:#`);
      }
    };
    this.modalRef = this.modalService.show(this.addFieldTemplate, {
      initialState: initialState
    });
  }
  
  editorAddVar(type: string, value: string): void {
    this.modalRef.hide();
    (this.modalService.config.initialState as { data: (value: string, type: string) => void }).data(value, type);
  }

  refreshText(val:valueDef) {
    this.val$.next(val)
  }

}
