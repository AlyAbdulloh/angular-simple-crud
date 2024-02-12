import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

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
        localStorage.setItem('accessToken', response.accessToken);
        Swal.fire({
          title: "Login Berhasil",
          text: "klik button ini",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK"
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['dashboard']);
          }
        });
      },(error: any) => {
        if(error.status === 401){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Credentials",
          });
        }
      }) 
    }else{
      console.log('false');
    }
  }
}
