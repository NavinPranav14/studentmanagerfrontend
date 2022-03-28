import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {
  cancel,
  confirmation,
  del,
  deleteStaff,
  StaffDetails,
} from '../student-staff.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-staff',
  templateUrl: './delete-staff.component.html',
})
export class DeleteStaffComponent implements OnInit {
  errMessage: string = '';

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  staffDetail!: StaffDetails;
  dataPass!: string;
  confirmation: string = confirmation;
  cancel: string = cancel;
  delete: string = del;

  constructor(
    private router: Router,
    private apiService: ApiServiceService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.findStaff();

    setTimeout(() => {
      this.dataPass = deleteStaff.replace('name', this.staffDetail.data.name);
      this.dataPass = this.dataPass.replace(
        'departments',
        this.staffDetail.data.department
      );
    }, 200);
  }

  deletestaff(): void {
    this.apiService.deleteStaff(localStorage.getItem('userId')!).subscribe(
      (res) => {
        this.openSuccessSnackBar(),
          this.router.navigate(['home/staffs']).then(() => {
            window.location.reload();
          });
      },
      (err: HttpErrorResponse) => {
        this.errMessage = err.error.message;
        this.openFailureSnackBar(this.errMessage);
      }
    );
  }

  findStaff(): void {
    this.apiService
      .findStaff(localStorage.getItem('userId')!)
      .subscribe((res) => (this.staffDetail = res));
  }

  deleteUSerFromLocalStorage(): void {
    localStorage.removeItem('userId');
  }

  openSuccessSnackBar(): void {
    {
      this._snackBar.open('Staff deleted', '', {
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
