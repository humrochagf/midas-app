import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/shareReplay';

import { environment } from '../environments/environment';

@Injectable()
export class AuthService {

  private apiRoot = environment.apiRoot;

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post(
      this.apiRoot.concat('login/'),
      { username, password }
    ).map(response => {
      console.log(response);

      return response;
    }).shareReplay();
  }
}
