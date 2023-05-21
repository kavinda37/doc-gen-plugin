import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocumentDesignerComponent } from './document-designer/document-designer.component'


const routes: Routes = [
  { path: '', component: DocumentDesignerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentCreatorRoutingModule { }
