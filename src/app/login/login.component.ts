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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  errMessage: any = '';

  hide: boolean = true;

  userSelect: any;

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
      app_user: new FormControl('', [Validators.required])
    });
  }

  checkUser() {
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

  adminLogin() {
    if (this.myForm.valid) {
      this.apiService.adminLogin(this.myForm.value).subscribe(
        (res) => {
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
  staffLogin() {
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
  studentLogin() {
    if (this.myForm.valid) {
      this.apiService.studentLogin(this.myForm.value).subscribe(
        (res) => {
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

  setUserName() {
    localStorage.setItem('username', this.myForm.value.username);
  }
  staffUser() {
    localStorage.setItem('user', 'staff');
  }

  adminUser() {
    localStorage.setItem('user', 'admin');
  }

  studentUser() {
    localStorage.setItem('user', 'student');
  }

  openSuccessSnackBar() {
    {
      this._snackBar.open('Login success', '', {
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
