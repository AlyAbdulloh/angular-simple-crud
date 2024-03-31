import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  ssForm!: FormGroup;
  nik_employee: any;
  questions = [
    {
      id: 1,
      question: 'question1',
    },
    {
      id: 2,
      question: 'question2',
    },
  ];

  satisfactions = [
    {
      id: 1,
      satisfaction: 'very satisfied',
    },
    {
      id: 2,
      satisfaction: 'satisfied',
    },
  ];

  image = [
    {
      img: 'assets/image/verHapy.gif',
    },
    {
      img: 'assets/image/hapy.gif',
    },
    {
      img: 'assets/image/sad.gif',
    },
  ];

  response: string = '';
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    // this.createForm();
    // this.ssForm = this.fb.group({
    //   question_id: [''],
    //   satisfaction_id: [''],
    // });
    this.nik_employee = this.route.snapshot.queryParams['nik'];
    console.log(this.route.snapshot.params['id']);
    console.log(this.route.snapshot.params['event']);
  }

  createForm() {
    let arr: any = [];
    this.questions.forEach((_, index) => {
      arr.push(this.BuildFormDynamic(this.questions[index]));
    });

    this.ssForm = this.fb.group(arr);
  }

  BuildFormDynamic(product: any): FormGroup {
    return this.fb.group({
      question_id: [product.id],
      satisfaction_id: [''],
    });
  }

  change(id: any) {
    let myTag = this.el.nativeElement.querySelector('.response');
    console.log(myTag);
    if (!myTag.classList.contains('show')) {
      myTag.classList.add('show');
    }
    this.response = this.image[id - 1].img;
    setTimeout(() => {
      myTag.classList.remove('show');
    }, 1500);
  }

  saveData() {
    console.log(this.ssForm.value);
  }
}
