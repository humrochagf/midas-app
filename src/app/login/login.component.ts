import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loginErrors: LoginErrors;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const val = this.form.value;

    if (val.username && val.password) {
      this.authService.login(val.username, val.password).subscribe(
        success => {
          this.router.navigate(['boards']);
        },
        error => {
          this.loginErrors = <LoginErrors> error.error;
        }
      );
    }
  }
}

interface LoginErrors {
  global: string[];
  username: string[];
  password: string[];
}
