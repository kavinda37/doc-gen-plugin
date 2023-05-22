import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder} from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
// import { Editor, Plugin, EditorSettings } from 'tinymce'; 

import { TextProcessorService, EncodeResult, valueDef, MetaData } from '../../_libraries';

@Component({
  selector: 'app-document-designer',
  templateUrl: './document-designer.component.html',
  styleUrls: ['./document-designer.component.scss']
})

export class DocumentDesignerComponent {

  modalRef!: BsModalRef;
  @ViewChild('previewTemplate', { static: true }) previewModal!: TemplateRef<any>;
  @ViewChild('addFieldTemplate', { static: true }) addFieldTemplate!: TemplateRef<any>;

  // dummy text string for testing
  // 'Hello #API:firstName:#! Today is #API:day:#. :math{3+5}: tomorrow is :math{#API:day:#+1}:'
  editorText: string = '';

  val: valueDef = {}
  val$ = new BehaviorSubject<valueDef>(this.val)

  encodedData$!: Observable<EncodeResult>;

  addFieldForm: FormGroup;
  modalForm: FormGroup;

  private editorPlugins:string[] = [
    'advlist autolink lists link image charmap print anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount pagebreak'
  ];
  
  private editorToolbarDefault:string = 'undo redo | bold italic underline | fontselect fontsizeselect | backcolor forecolor | \
    alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image link table | help';

  private editorToolbarCustom:string = 'customPreviewButton | customFieldButton customNumericButton';


  // TODO tinymce 5 Editor types issue, require an alternative solution
  editor_init = {
    base_url: '/tinymce',
    suffix: '.min',
    height: 600,
    // skin: "oxide-dark",
    // content_css: "dark",
    menubar: 'file edit view insert format table',
    plugins: this.editorPlugins,
    toolbar1: this.editorToolbarDefault,
    toolbar2: this.editorToolbarCustom,
    setup: (editor: any) => {
      editor.ui.registry.addButton('customNumericButton', {
        text: 'Calculation',
        onAction: (_: any) => {
          this.editorUpdateVariableText(editor, 'math');
        }
      });

      editor.ui.registry.addButton('customPreviewButton', {
        text: 'Evaluate',
        onAction: (_: any) => {
          this.openPreviewModal();
        }
      });

      editor.ui.registry.addButton('customFieldButton', {
        text: 'Add Field',
        onAction: (_: any) => {
          this.openAddFieldModal(editor);
        }
      });

    }
  }

  constructor(
    private modalService: BsModalService,
    private textProcessorService: TextProcessorService,
    private formBuilder: FormBuilder
  ) {
    this.modalForm = this.formBuilder.group({});
    this.addFieldForm = this.formBuilder.group({
      type: ['VAR'],
      value: ['']
    });
  }


  editorUpdateVariableText(editor: any, type: string, value?: string): void {
    editor.insertContent(`:${type}{${value || ''}}:`);
  }

  openPreviewModal(): void {
    const encodedData = this.textProcessorService.encode(this.editorText)
    const formControlsConfig: { [key: string]: any } = {};
    encodedData.meta.forEach((meta: MetaData) => {
      formControlsConfig[meta.key!] = [''];
    });

    this.modalForm = this.formBuilder.group(formControlsConfig);
    this.encodedData$ = of(encodedData);
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

  editorAddVar(): void {
    const type = this.addFieldForm.get('type')?.value;
    const value = this.addFieldForm.get('value')?.value;

    this.modalRef.hide();
    (this.modalService.config.initialState as { data: (value: string, type: string) => void }).data(value, type);
  }

  refreshText(): void {
    this.val$.next(this.modalForm.value)
  }

}
