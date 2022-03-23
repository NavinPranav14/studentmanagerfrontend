import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-student',
  templateUrl: './delete-student.component.html',
})
export class DeleteStudentComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  studentDetails: any;

  constructor(
    private apiServiceService: ApiServiceService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  errMessage = '';

  ngOnInit(): void {
    this.findStudent();
  }
  deleteStudent() {
    this.apiServiceService
      .deleteStudent(localStorage.getItem('userId'))
      .subscribe(
        (res) => {        
          this.openSuccessSnackBar(), this.router.navigate(['home/students']).then(() => {
            window.location.reload();
          });
          
        },
        (err) => {
          this.errMessage = err.error.message;
          this.openFailureSnackBar(this.errMessage);
        }
      );
  }

  findStudent(){
    this.apiServiceService.findStudent(localStorage.getItem('userId')!).subscribe(
      res => {
        this.studentDetails = res
      }
    )

  }

  deleteUSerFromLocalStorage() {
    localStorage.removeItem('userId');
  }

  openSuccessSnackBar() {
    {
      this._snackBar.open('Student deleted', '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  openFailureSnackBar(para: any) {
    {
      this._snackBar.open(para, '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
}
