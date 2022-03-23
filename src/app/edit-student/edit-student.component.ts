import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html'
})
export class EditStudentComponent implements OnInit {
  myForm!: FormGroup;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private router: Router,
    private apiService: ApiServiceService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

   errMessage = ''
   studentEdit :any;

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: new FormControl(),
      name: new FormControl(),
      department: new FormControl(),
      gender: new FormControl('',[Validators.required]),
      dob: new FormControl(),
    });
    setTimeout(() => {this.myForm = this.fb.group({
      username: new FormControl(this.studentEdit.data.username,  [Validators.required,Validators.email]),
      name: new FormControl(this.studentEdit.data.name , [Validators.required, Validators.minLength(3)]),
      department: new FormControl(this.studentEdit.data.department, [Validators.required]),
      gender: new FormControl(this.studentEdit.data.gender, [Validators.required]),
      dob: new FormControl(this.studentEdit.data.dob, [Validators.required]),
    })},500);
    this.apiService.findStudent(localStorage.getItem('userId')!).subscribe( (res:any) => {this.studentEdit = res, localStorage.setItem('userId',res.data.id)})
  }

  editStudent() {
    if(this.myForm.valid){
      this.apiService
      .updateStudent(localStorage.getItem('userId'), this.myForm.value)
      .subscribe(
        (res) => {this.openSuccessSnackBar(), this.router.navigate(['home/students']);},
        (err) => {this.errMessage = err.error.message;
        this.openFailureSnackBar(this.errMessage)}
      );
    }

  }

  deleteUSerFromLocalStorage() {
    localStorage.removeItem('userId');
  }

  openSuccessSnackBar() {
    {
      this._snackBar.open('Student edited', '', {
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
