import { Component, Host, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  // registrationForm: FormGroup;

  constructor(private http: HttpClient){}
  users: any= [];
  test: any;
  body: any = {
    "username": "Achmad",
    "email": "aly@gmail.com",
    "password": "password",
  }
  dataUser: any = {};
  isEmpty: boolean = false;
  isNotEmpty: boolean = true;



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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:3000/user/${id}`).subscribe(response => {
          this.ngOnInit();
        }), (error: any) => {
          console.log(error);
        }
        Swal.fire({
          title: "Deleted!",
          text: "has been deleted.",
          icon: "success"
        });
      }
    });
  }

  search(x: any){
    // console.log(x.target.value);
    if(x.target.value == ''){
      this.ngOnInit();
    }else{
      this.http.get(`http://localhost:3000/user/search/${x.target.value}`).subscribe(response => {
        this.users = response;
        this.isEmpty = false;
        this.isNotEmpty = true;
      }, (error: any) => {
        if(error.status == 404){
          this.isEmpty = true;
          this.isNotEmpty = false;

        }
      })
    }
  }

  addUser(userData: any) {
    this.http.post('http://localhost:3000/user/', userData).subscribe(response => {
      Swal.fire({
        title: "Data was inserted",
        text: "You clicked the button!",
        icon: "success"
      });
      this.ngOnInit();
    }, 
    (error: any) => {
      console.log(error);
    }) 
  }

  updateUser(userData: any, id: any){
    this.http.put(`http://localhost:3000/user/${id}`, userData).subscribe(response => {
      Swal.fire({
        title: "Data was updated",
        text: "You clicked the button!",
        icon: "success"
      });
      this.ngOnInit();
    },
    (error: any) => {
      console.log(error);
    })
  }
}
