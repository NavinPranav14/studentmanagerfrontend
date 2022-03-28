import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { staffDetail } from '../student-staff.model';

@Component({
  selector: 'app-staff-create',
  templateUrl: './staff-create.component.html',
})
export class StaffCreateComponent implements OnInit {
  myForm!: FormGroup;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  errorMessage: string = '';

  hide: boolean = true;

  loading: boolean = true;

  staffDetail: string = staffDetail;

  constructor(
    private apiService: ApiServiceService,
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  errMessage: string = '';

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.min(3)]),
      name: new FormControl('', [Validators.required, Validators.min(3)]),
      department: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
      ]),
      gender: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
    });
  }
  addStaff(): void {
    if (this.myForm.valid) {
      this.apiService.addStaff(this.myForm.value).subscribe(
        (res) => {
          this.openSuccessSnackBar(), this.router.navigate(['home/staffs']);
        },
        (err: HttpErrorResponse) => {
          this.errMessage = err.error.message;
          this.openFailureSnackBar(this.errMessage);
        }
      );
    }
  }

  navStaffs(): void {
    this.router.navigate(['navstaffs']);
  }

  openSuccessSnackBar(): void {
    {
      this._snackBar.open('Staff added', '', {
        duration: 5000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  openFailureSnackBar(para: string): void {
    {
      this._snackBar.open(para, '', {
        duration: 5000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
}
