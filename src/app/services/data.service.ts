import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import 'firebase/remote-config';
import { AngularFireRemoteConfig } from '@angular/fire/compat/remote-config';
import { from, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private db: AngularFireDatabase,
    private remoteConfig: AngularFireRemoteConfig
  ) {}
  getData() {
    return this.db.list('data');
  }
  isMaintenanceMode(): Observable<number> {
    return from(this.remoteConfig.fetchAndActivate()).pipe(
      switchMap(() => this.remoteConfig.getNumber('maintenance_number'))
    );
  }
}
