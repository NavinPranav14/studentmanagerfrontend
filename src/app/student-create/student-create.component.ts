import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html'
})
export class StudentCreateComponent implements OnInit {
  myForm!: FormGroup;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  hide: boolean = true;


  constructor(
    private apiServiceServices: ApiServiceService,
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  errMessage = ''

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.min(3)]),
      name: new FormControl('', [Validators.required, Validators.min(3)]),
      department: new FormControl('', [Validators.required]),
      gender:new FormControl('', [Validators.required]),
      dob:new FormControl('', [Validators.required])
    });
  }

  addStudent() {
    if(this.myForm.valid){
      console.log(this.myForm.value);
      this.apiServiceServices.addStudent(this.myForm.value).subscribe(
        (res) => {this.openSuccessSnackBar(), this.router.navigate(['home/students']);},
        (err) => {this.errMessage = err.error.message;
        this.openFailureSnackBar(this.errMessage)}
      );
    }

  }

 

  openSuccessSnackBar() {
    {
      this._snackBar.open('Student added', '', {
        duration: 5000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  openFailureSnackBar(para: any) {
    {
      this._snackBar.open(para, '', {
        duration: 5000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
}
