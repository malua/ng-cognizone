import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { PackagesDocRoutingModule } from './packages-doc-routing.module';
import { LibrariesListView } from './views/libraries-list/libraries-list.view';

@NgModule({
  imports: [SharedModule, PackagesDocRoutingModule],
  declarations: [LibrariesListView],
})
export class PackagesDocModule {}
