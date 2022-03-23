import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
})
export class SideBarComponent implements OnInit {
  public profile: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {}
  students() {
    this.router.navigate(['students'], { relativeTo: this.route });
  }
  staffs() {
    this.router.navigate(['staffs'], { relativeTo: this.route });
  }

  findStaff() {
    this.router.navigate(['findstaff'], { relativeTo: this.route });
  }

  findStudent() {
    this.router.navigate(['findstudent'], { relativeTo: this.route });
  }
  addStudent() {
    this.router.navigate(['addstudent'], { relativeTo: this.route });
  }
  checkAdmin() {
    return localStorage.getItem('adminUser');
  }
  checkStaff() {
    return localStorage.getItem('staffUser');
  }

  checkStudent(){
    return localStorage.getItem('studentUser')
  }

  addStaff() {
    this.router.navigate(['addstaff'], { relativeTo: this.route });
  }

  navProfile(){

      if(localStorage.getItem('staffUser') || localStorage.getItem('studentUser')){
        this.router.navigate(['profile'], { relativeTo: this.route })
      }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

}
