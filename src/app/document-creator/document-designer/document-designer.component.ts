import { Component, TemplateRef, ViewChild  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
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

  encodedData!:EncodeResult;

  val:valueDef = {
      firstName:'John',
      aday:10,
      Bob:35
    }

  private editor_plugins = [
    'advlist autolink lists link image charmap print anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount pagebreak'
  ];
  private editor_toolbar = ' customFieldButton | customNumericButton customDateButton customBarcodeButton customAddImageButton customQrcodeButton customTableButton | undo redo | bold italic underline | fontselect fontsizeselect | backcolor forecolor | \
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

      editor.ui.registry.addButton('customFieldButton', {
        text: 'Add Field',
        onAction: (_:any) => {
          // this.showModalCont(editor);
          this.openPreviewModal(this.previewModal);
          // editor.insertContent('&nbsp;<strong>It\'s my button!</strong>&nbsp;');
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
    this.encodedData = this.textProcessorService.encode(this.editorText);
    this.modalRef = this.modalService.show(template);
  }

}
