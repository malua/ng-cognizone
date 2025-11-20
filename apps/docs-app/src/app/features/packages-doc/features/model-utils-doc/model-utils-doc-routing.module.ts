import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExternalDocView } from '../../../../shared/views/external-doc/external-doc.view';

const routes: Routes = [{ path: '', component: ExternalDocView, data: { libName: 'model-utils' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModelUtilsDocRoutingModule {}
