import { Component, inject, TemplateRef, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit{
  userForm!: FormGroup;
  test: string = 'is-invalid';

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router){}
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
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', [Validators.required]]
    });
  }


  onSubmit(userData: any) {
    if(this.userForm.valid){
      this.http.post('http://localhost:3000/user/', userData).subscribe(response => {
        this.modalService.dismissAll();
      }), (error: any) => {
        console.log(error);
      }
    }else{
      console.log(this.userForm.controls);
    }
  }
}
