import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';

import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

import { environment } from '../environments/environment';

@Injectable()
export class AuthService {

  private apiRoot = environment.apiRoot;

  constructor(private http: HttpClient) { }

  private setSession(authResult) {
    const token = authResult.token;
    const payload = <JWTPayload> jwt.decode(token);
    const expiresAt = moment().add(payload.exp, 'second');

    localStorage.setItem('token', authResult.token);
    localStorage.setItem('user_id', JSON.stringify(payload.user_id));
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  login(username: string, password: string) {
    return this.http.post(
      this.apiRoot.concat('login/'),
      { username, password }
    ).do(response => this.setSession(response)).shareReplay();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('expires_at');
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);

    return moment(expiresAt);
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'JWT '.concat(token))
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['login']);

      return false;
    }
  }
}

interface JWTPayload {
  user_id: number;
  username: string;
  email: string;
  exp: number;
}
