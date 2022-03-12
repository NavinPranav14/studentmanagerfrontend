import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html'
})
export class EditStudentComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    private router: Router,
    private apiService: ApiServiceService,
    private fb: FormBuilder
  ) {}

  // studentId:String  = '62186b040a8cfb19fd274623';

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: new FormControl(),
      name: new FormControl(),
      department: new FormControl(),
    });
  }

  editStudent() {
    this.apiService
      .updateStudent(localStorage.getItem('userId'), this.myForm.value)
      .subscribe((res) => console.log(res), 
      (err) => console.log(err));
  }

  back() {
    this.router.navigate(['home']);
  }
  deleteUSerFromLocalStorage() {
    localStorage.removeItem('userId');
  }
}
