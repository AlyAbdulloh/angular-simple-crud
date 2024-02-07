import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  // registrationForm: FormGroup;

  constructor(private http: HttpClient){}
  users: any= [];
  body: any = {
    "username": "Achmad",
    "email": "aly@gmail.com",
    "password": "password",
  }

  // registrationForm: FormGroup;

  ngOnInit(){
      //call http
      this.http.get('http://localhost:3000/user/').subscribe(response => {
        this.users = response;
      }), (error: any) => {
        console.log(error);
      }
  }

  deleteUser(id: any){
    this.http.delete(`http://localhost:3000/user/${id}`).subscribe(response => {
        this.ngOnInit();
      }), (error: any) => {
        console.log(error);
      }
  }

  search(x: any){
    console.log(x.target.value);
  }
  // onSubmit(): void{
  //   if(this.registrationForm.valid){

  //   }
  // }
}
