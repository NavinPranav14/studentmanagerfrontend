import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {
  editStudent,
  studentDetail,
} from '../student-staff.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
})
export class EditStudentComponent implements OnInit {
  myForm!: FormGroup;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  studentEdit: editStudent = this.data;

  studentDetail: string = studentDetail;

  constructor(
    private apiService: ApiServiceService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditStudentComponent>,
    public dialogue: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: editStudent
  ) {}

  errMessage = '';

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: new FormControl(),
      name: new FormControl(),
      department: new FormControl(),
      gender: new FormControl('', [Validators.required]),
      dob: new FormControl(),
    });
    setTimeout(() => {
      this.myForm = this.fb.group({
        username: new FormControl(this.studentEdit?.editData.username, [
          Validators.required,
          Validators.email,
        ]),
        name: new FormControl(this.studentEdit?.editData.name, [
          Validators.required,
          Validators.minLength(3),
        ]),
        department: new FormControl(this.studentEdit?.editData.department, [
          Validators.required,
        ]),
        gender: new FormControl(this.studentEdit?.editData.gender, [
          Validators.required,
        ]),
        dob: new FormControl(this.studentEdit?.editData.dob, [
          Validators.required,
        ]),
      });
    }, 500);
  }

  editStudent(): void {
    if (this.myForm.valid) {
      this.apiService
        .updateStudent(localStorage.getItem('userId')!, this.myForm.value)
        .subscribe(
          (res) => {
            this.openSuccessSnackBar(),
              window.location.reload(),
              this.dialogue.closeAll();
          },
          (err: HttpErrorResponse) => {
            this.errMessage = err.error.message;
            this.openFailureSnackBar(this.errMessage);
          }
        );
    }
  }

  deleteUSerFromLocalStorage(): void {
    localStorage.removeItem('userId');
  }

  openSuccessSnackBar(): void {
    {
      this._snackBar.open('Student edited', '', {
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
