import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import {
  profileInfo,
  StaffDetails,
  StudentDetails,
} from '../student-staff.model';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent implements OnInit {
  profile: any;

  myForm!: FormGroup;

  errMessage: string = '';

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  profileInfo: string = profileInfo;

  constructor(
    private apiService: ApiServiceService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      name: new FormControl(),
      dob: new FormControl(),
      gender: new FormControl(),
    });
    setTimeout(() => {
      this.myForm = new FormGroup({
        name: new FormControl(this.profile.data.name, [Validators.required]),
        dob: new FormControl(this.profile.data.dob),
        gender: new FormControl(this.profile.data.gender),
      });
    }, 500);

    if (localStorage.getItem('staffUser')) {
      this.apiService
        .findStaffByUsername(localStorage.getItem('username')!)
        .subscribe((res: StaffDetails) => {
          (this.profile = res), localStorage.setItem('userId', res.data.id);
        });
    } else if (localStorage.getItem('studentUser')) {
      this.apiService
        .findStudentByUsername(localStorage.getItem('username')!)
        .subscribe((res: StudentDetails) => {
          (this.profile = res), localStorage.setItem('userId', res.data.id);
        });
    }
  }

  checkStaff(): string | null {
    return localStorage.getItem('staffUser');
  }
  checkStudent(): string | null {
    return localStorage.getItem('studentUser');
  }
  editProfile(): void {
    if (this.myForm.valid) {
      if (localStorage.getItem('studentUser')) {
        this.apiService
          .updateStudent(localStorage.getItem('userId')!, this.myForm.value)
          .subscribe(
            (res) => {
              this.openSuccessSnackBarStudent(),
                this.router.navigate(['home/students']);
            },
            (err: HttpErrorResponse) => {
              this.errMessage = err.error.message;
              this.openFailureSnackBar(this.errMessage);
            }
          );
      } else {
        this.apiService
          .updateStaff(localStorage.getItem('userId')!, this.myForm.value)
          .subscribe(
            (res) => {
              this.openSuccessSnackBarStaff(),
                this.router.navigate(['home/staffs']);
            },
            (err) => {
              this.errMessage = err.error.message;
              this.openFailureSnackBar(this.errMessage);
            }
          );
      }
    }
  }

  openSuccessSnackBarStudent(): void {
    {
      this._snackBar.open('Student edited', '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
  openSuccessSnackBarStaff(): void {
    {
      this._snackBar.open('Staff edited', '', {
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
