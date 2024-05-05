import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  password!: string;
  show: boolean = false;
  isValid: boolean = true;
  array: any[] = [1, 2, 3, 4];

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private authServices: AuthService
  ) {
    console.log('this is cons');
    const array2 = this.array;
    this.array.push(6);
    array2.push(6);
    console.log(array2);
    console.log(this.array);
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.password = 'password';
    console.log('this is oninit');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authServices.login(this.loginForm.value);
    } else {
      console.log('false');
    }
  }

  showHide() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
}
