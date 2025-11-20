import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { YasguiComponent } from '@cognizone/ng-yasgui';

import { SharedModule } from '../../../../shared/shared.module';
import { NgYasguiDocRoutingModule } from './ng-yasgui-doc-routing.module';
import { NgYasguiDocComponent } from './ng-yasgui-doc.component';

@NgModule({
  declarations: [NgYasguiDocComponent],
  imports: [CommonModule, SharedModule, YasguiComponent, NgYasguiDocRoutingModule],
})
export class NgYasguiDocModule {}
