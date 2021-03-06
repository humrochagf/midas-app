import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';

@Injectable()
export class ApiService {

  private apiRoot = environment.apiRoot;

  constructor(private http: HttpClient) { }

  getBoards() {
    return this.http.get(this.apiRoot.concat('board/')).map(response => {
      return response;
    });
  }
}
