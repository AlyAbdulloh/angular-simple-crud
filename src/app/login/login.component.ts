import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;

  constructor(private http:HttpClient, private router:Router, private fb: FormBuilder){}

  ngOnInit(){
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.http.post('http://localhost:3000/auth/login',this.loginForm.value).subscribe((response: any) => {
        console.log(response);
        localStorage.setItem('accessToken', response.accessToken);
        this.router.navigate(['dashboard']);
      }), (error: any) => {
        console.log(error.status);
      }
    }else{
      console.log('false');
    }
  }
}
