import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/remote-config';
import { environment } from 'src/environments/environment';
import { AngularFireRemoteConfig } from '@angular/fire/compat/remote-config';

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
  public async getValueByKey(key: string): Promise<any> {
    return this.remoteConfig
      .getBoolean(key)
      .then((value) => {
        return value;
      })
      .catch((err) => {
        return err;
      });
  }
}
