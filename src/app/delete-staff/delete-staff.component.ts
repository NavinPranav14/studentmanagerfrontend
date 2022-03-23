import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-staff',
  templateUrl: './delete-staff.component.html',
})
export class DeleteStaffComponent implements OnInit {
  errMessage = '';

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  studentDetail : any;

  constructor(
    private router: Router,
    private apiService: ApiServiceService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
      this.findStaff()
  }
  deletestaff() {
    this.apiService.deleteStaff(localStorage.getItem('userId')).subscribe(
      (res) => {
        this.openSuccessSnackBar(), this.router.navigate(['home/staffs']).then(() => {
          window.location.reload();
        });
      },
      (err) => {
        (this.errMessage = err.error.message);
        this.openFailureSnackBar(this.errMessage);
      }
    );
  }

  findStaff(){
    this.apiService.findStaff(localStorage.getItem('userId')!).subscribe(
      res => this.studentDetail = res
    )
  }
  
  deleteUSerFromLocalStorage() {
    localStorage.removeItem('userId');
  }

  openSuccessSnackBar() {
    {
      this._snackBar.open('Staff deleted', '', {
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
        panelClass: ['blue-snackbar'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
}
