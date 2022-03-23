import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../services/api-service.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
})
export class EditStaffComponent implements OnInit {

  myForm!: FormGroup;

  staffEdit: any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiServiceService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  errMessage = ''

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: new FormControl(),
      name: new FormControl(),
      department: new FormControl(),
      dob: new FormControl(),
      gender: new FormControl(),
      phone: new FormControl(),
    });
    setTimeout(() =>{
    this.myForm = this.fb.group({
      username: new FormControl(this.staffEdit.data.username, [Validators.required,Validators.email]),
      name: new FormControl(this.staffEdit.data.name, [Validators.required, Validators.minLength(3)]),
      department: new FormControl(this.staffEdit.data.department, [Validators.required]),
      dob: new FormControl(this.staffEdit.data.dob, [Validators.required]),
      gender: new FormControl(this.staffEdit.data.gender, [Validators.required]),
      phone: new FormControl(this.staffEdit.data.phone, [Validators.required, Validators.minLength(10), Validators.maxLength(13)]),

    })},500);
    this.apiService.findStaff(localStorage.getItem('userId')!).subscribe( (res:any) => {this.staffEdit = res, localStorage.setItem('userId',res.data.id), console.log(res)})}
  

  editStaff() {
    if(this.myForm.valid){
    this.apiService
      .updateStaff(localStorage.getItem('userId'), this.myForm.value)
      .subscribe(
        (res) => {this.openSuccessSnackBar(), this.router.navigate(['home/staffs']);},
        (err) => {this.errMessage = err.error.message;
        this.openFailureSnackBar(this.errMessage)});
    }
  }

  deleteUSerFromLocalStorage() {
    localStorage.removeItem('userId');
  }

  openSuccessSnackBar() {
    {
      this._snackBar.open('Staff edited', '', {
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
