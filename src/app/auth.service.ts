import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';

import { environment } from '../environments/environment';

@Injectable()
export class AuthService {

  private apiRoot = environment.apiRoot;

  constructor(private http: HttpClient) { }

  private setSession(authResult) {
    localStorage.setItem('token', authResult.token);
  }

  login(username: string, password: string) {
    return this.http.post(
      this.apiRoot.concat('login/'),
      { username, password }
    ).do(response => this.setSession(response)).shareReplay();
  }

  logout() {
    localStorage.removeItem('token');
  }
}
