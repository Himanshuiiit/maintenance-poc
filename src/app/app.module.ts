import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Provider, ErrorHandler, isDevMode} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';

import { AngularFireModule } from '@angular/fire/compat';
import {
  AngularFireRemoteConfigModule,
  DEFAULTS,
  SETTINGS,
  AngularFireRemoteConfig,
} from '@angular/fire/compat/remote-config';


@NgModule({
  declarations: [AppComponent, MaintenanceComponent, DashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment),
    AngularFireRemoteConfigModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideRemoteConfig(() => getRemoteConfig()),
  ],
  providers: [
    { provide: DEFAULTS, useValue: { enableAwesome: true } },
    {
      provide: SETTINGS,
      useFactory: () =>
        isDevMode() ? { minimumFetchIntervalMillis: 10_000 } : {},
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private remoteConfig: AngularFireRemoteConfig) {
    this.remoteConfig.fetchAndActivate();
  }
}
