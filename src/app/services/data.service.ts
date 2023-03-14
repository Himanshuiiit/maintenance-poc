import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const URL = 'http://localhost:3000';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http.get(URL + '/posts');
  }
  getProfiles(): Observable<any> {
    return this.http.get(URL + '/profile');
  }
  getComments(): Observable<any> {
    return this.http.get(URL + '/comments');
  }
}
