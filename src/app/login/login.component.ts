import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    private apiService: ApiServiceService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  checkUser() {
    if (this.router.url == '/login/admin') {
      localStorage.setItem('adminUser', 'true');
      this.adminLogin();
    } else if (this.router.url == '/login/staff') {
      localStorage.setItem('staffUser', 'true');
      this.staffLogin();
    } else if (this.router.url == '/login/student') {
      localStorage.setItem('studentUser', 'true');
      this.studentLogin();
    }
  }

  adminLogin() {
    this.apiService.adminLogin(this.myForm.value).subscribe(
      (res) => {
        this.router.navigate(['home']);
        localStorage.setItem('jwttoken', res.headers.get('jwttoken') + '');
        console.log(res);
      },
      (err) => console.log('login failed')
    );
  }
  staffLogin() {
    this.apiService.staffLogin(this.myForm.value).subscribe(
      (res) => {
        this.router.navigate(['home']);
        localStorage.setItem('jwttoken', res.headers.get('jwttoken') + '');
      },
      (err) => console.log('login failed')
    );
  }
  studentLogin() {
    this.apiService.studentLogin(this.myForm.value).subscribe(
      (res) => {
        this.router.navigate(['home']);
        localStorage.setItem('jwttoken', res.headers.get('jwttoken') + '');
      },
      (err) => console.log('login failed')
    );
  }
  setUserName() {
    localStorage.setItem('username', this.myForm.value.username);
  }
  staffUser() {
    this.router.navigate(['login/staff']);
  }

  adminUser() {
    this.router.navigate(['login/admin']);
  }

  studentUser() {
    this.router.navigate(['login/student']);
  }
}
