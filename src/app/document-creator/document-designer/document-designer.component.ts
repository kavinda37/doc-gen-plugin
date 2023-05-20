import { Component } from '@angular/core';
// import { Editor } from 'tinymce';

@Component({
  selector: 'app-document-designer',
  templateUrl: './document-designer.component.html',
  styleUrls: ['./document-designer.component.scss']
})
export class DocumentDesignerComponent {

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
     
     }
  }

  editorUpdateVariableText(editor:any, type:any, value?:any) {
    editor.insertContent(`:${type}{${value || ''}}:`);
  }

}
