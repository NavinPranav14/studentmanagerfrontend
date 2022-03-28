import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { Router } from '@angular/router';
import {
  cancel,
  confirmation,
  del,
  deleteStudent,
  StudentDetails,
} from '../student-staff.model';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-student',
  templateUrl: './delete-student.component.html',
})
export class DeleteStudentComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  studentDetails!: StudentDetails;

  dataPass!: string;

  confirmation: string = confirmation;

  cancel: string = cancel;
  delete: string = del;

  constructor(
    private apiServiceService: ApiServiceService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  errMessage: string = '';

  ngOnInit(): void {
    this.findStudent();
    setTimeout(() => {
      this.dataPass = deleteStudent.replace(
        'name',
        this.studentDetails.data.name
      );
      this.dataPass = this.dataPass.replace(
        'departments',
        this.studentDetails.data.department
      );
    }, 200);
  }
  deleteStudent(): void {
    this.apiServiceService
      .deleteStudent(localStorage.getItem('userId')!)
      .subscribe(
        (res) => {
          this.openSuccessSnackBar(),
            this.router.navigate(['home/students']).then(() => {
              window.location.reload();
            });
        },
        (err: HttpErrorResponse) => {
          this.errMessage = err.error.message;
          this.openFailureSnackBar(this.errMessage);
        }
      );
  }

  findStudent(): void {
    this.apiServiceService
      .findStudent(localStorage.getItem('userId')!)
      .subscribe((res) => {
        this.studentDetails = res;
      });
  }

  deleteUSerFromLocalStorage(): void {
    localStorage.removeItem('userId');
  }

  openSuccessSnackBar(): void {
    {
      this._snackBar.open('Student deleted', '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  openFailureSnackBar(para: string): void {
    {
      this._snackBar.open(para, '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
}
