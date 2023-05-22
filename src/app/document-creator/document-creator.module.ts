import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DocumentDesignerComponent } from './document-designer/document-designer.component';

import { DocumentCreatorRoutingModule } from './document-creator-routing.module'

import {TextProcessorModule} from '../_libraries'


@NgModule({
  declarations: [
    DocumentDesignerComponent,
  ],
  imports: [
    CommonModule,
    DocumentCreatorRoutingModule,
    TextProcessorModule,
    EditorModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DocumentCreatorModule { }
