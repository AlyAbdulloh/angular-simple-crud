import { Component, Host, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2'
import { Observable } from 'rxjs';
import { User } from '../user.interfaces';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  // registrationForm: FormGroup;

  constructor(private http: HttpClient, private userService:UserService){}
  users: User[] = [];
  isEmpty: boolean = false;

  getUsers(): void{
    this.userService.getUsers().subscribe((response) => {
      this.users = response;
    },
    (error: any) => {
      console.log(error);
    });
  }

  ngOnInit(){
      this.getUsers();
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
        this.userService.deleteUser(id).subscribe(() => {
          this.getUsers();
        });
        Swal.fire({
          title: "Deleted!",
          text: "has been deleted.",
          icon: "success"
        });
      }
    });
  }

  search(x: any){
    if(x.target.value == ''){
      this.ngOnInit();
    }else{
      this.userService.search(x.target.value).subscribe(response => {
        this.users = response;
        this.isEmpty = false;
      }, (error: any) => {
        if(error.status == 404){
          this.isEmpty = true;
        }
      })
    }
  }
}
