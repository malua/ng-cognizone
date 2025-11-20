import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { notNil } from '@cognizone/model-utils';
import { ExternalDocView } from '../../shared/views/external-doc/external-doc.view';
import { environment } from '../../../environments/environment';

import { LibrariesListView } from './views/libraries-list/libraries-list.view';

const routes: Routes = [
  {
    path: '',
    component: LibrariesListView,
  },
  // ng9 and super fat yasgui are not friends
  environment.features.ngYasgui
    ? {
        path: 'ng-yasgui',
        loadChildren: async () => import('./features/ng-yasgui-doc/ng-yasgui-doc.module').then(m => m.NgYasguiDocModule),
      }
    : undefined,
  {
    path: 'ng-core',
    loadChildren: async () => import('./features/ng-core-doc/ng-core-doc.module').then(m => m.NgCoreDocModule),
  },
  { path: 'model-utils', component: ExternalDocView, data: { libName: 'model-utils' } },
].filter(notNil);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackagesDocRoutingModule {}
