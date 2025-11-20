import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideLogger } from '@cognizone/ng-core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../../environments/environment';

import { CoreState } from './store/core.state';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';

@NgModule({
  declarations: [PageNotFoundComponent],
  exports: [PageNotFoundComponent],
  imports: [
    CommonModule,
    // LoggerModule.forRoot('CZ-DOCS'),
    NgxsModule.forRoot([CoreState], { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
  ],
  providers: [provideHttpClient(withInterceptorsFromDi()), provideLogger('CZ-DOCS')],
})
export class CoreModule {}
