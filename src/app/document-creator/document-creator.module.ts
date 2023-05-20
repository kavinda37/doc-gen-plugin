import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';

import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentDesignerComponent } from './document-designer/document-designer.component';

import { DocumentCreatorRoutingModule } from './document-creator-routing.module'

import {SharedModule} from '../_shared/shared.module'


@NgModule({
  declarations: [
    DocumentListComponent,
    DocumentDesignerComponent,
  ],
  imports: [
    CommonModule,
    DocumentCreatorRoutingModule,
    SharedModule,
    EditorModule
  ],
  bootstrap: [DocumentListComponent]
})
export class DocumentCreatorModule { }
