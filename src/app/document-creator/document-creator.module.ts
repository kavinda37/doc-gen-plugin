import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentDesignerComponent } from './document-designer/document-designer.component';

import { DocumentCreatorRoutingModule } from './document-creator-routing.module'

import {TextProcessorModule} from '../_libraries'


@NgModule({
  declarations: [
    DocumentListComponent,
    DocumentDesignerComponent,
  ],
  imports: [
    CommonModule,
    DocumentCreatorRoutingModule,
    TextProcessorModule,
    EditorModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  bootstrap: [DocumentListComponent]
})
export class DocumentCreatorModule { }
