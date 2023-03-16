import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  data: Observable<any>[] = [];
  constructor(private db: AngularFireDatabase) {}
  getData() {
    return this.db.list('data');
  }
}
