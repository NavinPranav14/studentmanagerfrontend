import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html'
})
export class StudentCreateComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    private apiServiceServices: ApiServiceService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: new FormControl(),
      password: new FormControl(),
      name: new FormControl(),
      department: new FormControl(),
    });
  }

  addStudent() {
    console.log(this.myForm.value);
    this.apiServiceServices.addStudent(this.myForm.value).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  navStudents() {
    this.router.navigate(['navstudent']);
  }
}
