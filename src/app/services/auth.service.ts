import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(dataUser: any){
    this.http.post('http://localhost:3000/auth/login', dataUser).subscribe((response: any) => {
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
    }, (error: any) => {
      if(error.status === 401){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid Credentials",
        });
      }
    });
  }
}
