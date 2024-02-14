import { Component, inject, TemplateRef, OnInit, Host, Input } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserService } from '../services/user.service';  

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit{
  userForm!: FormGroup;
  test: string = 'is-invalid';
  parent: DashboardComponent;
  user: any = {};

  @Input() mode!: 'insert' | 'update';
  @Input() id: any;
  @Input() userData: any;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, @Host() parent: DashboardComponent, private userService: UserService){
    this.parent = parent;
  }
  private modalService = inject(NgbModal);
	closeResult = '';

	open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);

    if(this.mode == 'update'){
      this.userForm = this.fb.group({
        username: [this.userData.username, [Validators.required]],
        email: [this.userData.email, Validators.compose([Validators.required, Validators.email])],
      });
    }
	}

  private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}

  ngOnInit(){
    if(this.mode === 'insert'){
      this.userForm = this.fb.group({
        username: ['', [Validators.required]],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', [Validators.compose([Validators.required, Validators.minLength(5)])]]
      });
    }else if(this.mode === 'update'){
      this.userForm = this.fb.group({
        username: ['', [Validators.compose([Validators.minLength(5)])]],
        email: ['', Validators.compose([Validators.required, Validators.email])],
      });
    }
  }

  addUser(userData: any): void{
    this.userService.addUser(userData).subscribe(() => {
      this.parent.getUsers();
    },
    (error: any) => {
      console.log(error);
    });
  }

  updateUser(userData: any, id: number): void{
    this.userService.updateUser(userData, id).subscribe(() => {
      this.parent.getUsers();
    }, (error: any) => {
      console.log(error);
    })
  }

  saveData(userData: any){
    if(this.mode === 'insert'){
      if(this.userForm.valid){
        this.modalService.dismissAll();
        this.addUser(userData);
      } else{
        console.log("is-invalid");
      }
    }else if(this.mode === 'update'){
      if(this.userForm.valid){
        this.modalService.dismissAll();
        this.updateUser(userData, this.id);
      }else{
        console.log("is-invalid");
      }
    }
  }
}
