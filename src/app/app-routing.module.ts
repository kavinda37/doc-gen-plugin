import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// routes not defined yet, currently using base route for testing purposes.
const routes: Routes = [
  { path: '', loadChildren: () => import('./document-creator/document-creator.module').then(m => m.DocumentCreatorModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
