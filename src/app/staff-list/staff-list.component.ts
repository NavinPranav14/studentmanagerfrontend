import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { Staff } from '../staff';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
})
export class StaffListComponent implements OnInit {
  public staff: any;

  myForm!: FormGroup;

  public staffuser: any;

  constructor(
    private apiService: ApiServiceService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.staffList();
    this.myForm = this.fb.group({
      staffUnique: new FormControl(),
    });
    if (this.router.url === '/home/staff/profile') {
      this.apiService
        .findStaffByUsername(localStorage.getItem('username'))
        .subscribe((res) => {
          this.staffuser = res;
        });
    }
  }
  public staffList(): void {
    this.apiService.staffList().subscribe(
      (res: Staff[]) => {
        this.staff = res;
      },
      (err: any) => {
        alert(err.message);
      }
    );
  }

  findStaffByName() {
    this.apiService.findStaffByName(this.myForm.value.staffUnique).subscribe(
      (res) => {
        this.staffuser = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  save(event: Event): void {
    var userId = (<HTMLButtonElement>event.target).id;
    localStorage.setItem('userId', userId);
  }

  editStaff() {
    this.router.navigate(['editstaff']);
  }
  deleteStaff() {
    this.router.navigate(['deletestaff']);
  }
  checkAdmin() {
    return localStorage.getItem('adminUser');
  }
  checkStaff() {
    return localStorage.getItem('staffUser');
  }
  checkOwnId() {
    return localStorage.getItem('username') === this.staffuser.data.username;
  }
}
