import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
})
export class SideBarComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}
  students(): void {
    this.router.navigate(['students'], { relativeTo: this.route });
  }
  staffs(): void {
    this.router.navigate(['staffs'], { relativeTo: this.route });
  }

  findStaff(): void {
    this.router.navigate(['findstaff'], { relativeTo: this.route });
  }

  findStudent(): void {
    this.router.navigate(['findstudent'], { relativeTo: this.route });
  }
  addStudent(): void {
    this.router.navigate(['addstudent'], { relativeTo: this.route });
  }
  checkAdmin(): string | null {
    return localStorage.getItem('adminUser');
  }
  checkStaff(): string | null {
    return localStorage.getItem('staffUser');
  }

  checkStudent(): string | null {
    return localStorage.getItem('studentUser');
  }

  addStaff(): void {
    this.router.navigate(['addstaff'], { relativeTo: this.route });
  }

  navProfile(): void {
    if (
      localStorage.getItem('staffUser') ||
      localStorage.getItem('studentUser')
    ) {
      this.router.navigate(['profile'], { relativeTo: this.route });
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
