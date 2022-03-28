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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  errMessage: string = '';

  hide: boolean = true;
  constructor(
    private apiService: ApiServiceService,
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      app_user: new FormControl('', [Validators.required]),
    });
  }

  checkUser(): void {
    if (localStorage.getItem('user') === 'admin') {
      localStorage.clear();
      localStorage.setItem('adminUser', 'true');
      this.adminLogin();
    } else if (localStorage.getItem('user') === 'staff') {
      localStorage.clear();
      localStorage.setItem('staffUser', 'true');
      this.staffLogin();
    } else if (localStorage.getItem('user') === 'student') {
      localStorage.clear();
      localStorage.setItem('studentUser', 'true');
      this.studentLogin();
    }
  }

  adminLogin(): void {
    if (this.myForm.valid) {
      this.apiService.adminLogin(this.myForm.value).subscribe(
        (res) => {
          console.log(res)
          this.openSuccessSnackBar();
          this.router.navigate(['home/students']);
          localStorage.setItem('jwttoken', res.headers.get('jwttoken') + '');
        },
        (err) => {
          localStorage.clear();
          this.errMessage = err.error.message;
          this.openFailureSnackBar(this.errMessage);
        }
      );
    }
  }
  staffLogin(): void {
    if (this.myForm.valid) {
      this.apiService.staffLogin(this.myForm.value).subscribe(
        (res) => {
          this.openSuccessSnackBar();
          this.router.navigate(['home/staffs']);
          localStorage.setItem('jwttoken', res.headers.get('jwttoken') + '');
        },
        (err) => {
          localStorage.clear();
          this.errMessage = err.error.message;
          this.openFailureSnackBar(this.errMessage);
        }
      );
    }
  }
  studentLogin(): void {
    if (this.myForm.valid) {
      this.apiService.studentLogin(this.myForm.value).subscribe(
        (res) => {
          this.openSuccessSnackBar();
          this.router.navigate(['home/students']);
          localStorage.setItem('jwttoken', res.headers.get('jwttoken') + '');
        },
        (err: HttpErrorResponse) => {
          localStorage.clear();
          this.errMessage = err.error.message;
          this.openFailureSnackBar(this.errMessage);
        }
      );
    }
  }

  setUserName(): void {
    localStorage.setItem('username', this.myForm.value.username);
  }
  staffUser(): void {
    localStorage.setItem('user', 'staff');
  }

  adminUser(): void {
    localStorage.setItem('user', 'admin');
  }

  studentUser(): void {
    localStorage.setItem('user', 'student');
  }

  openSuccessSnackBar(): void {
    {
      this._snackBar.open('Login success', '', {
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
