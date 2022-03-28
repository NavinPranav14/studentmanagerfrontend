import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiServiceService } from '../services/api-service.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { editStaff, staffDetail } from '../student-staff.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
})
export class EditStaffComponent implements OnInit {
  myForm!: FormGroup;

  staffEdit: editStaff = this.data;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  staffDetail: string = staffDetail;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiServiceService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditStaffComponent>,
    public dialogue: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: editStaff
  ) {}

  errMessage: string = '';

  ngOnInit(): void {

    this.myForm = this.fb.group({
      username: new FormControl(),
      name: new FormControl(),
      department: new FormControl(),
      dob: new FormControl(),
      gender: new FormControl(),
      phone: new FormControl(),
    });
    setTimeout(() => {
      this.myForm = this.fb.group({
        username: new FormControl(this.staffEdit?.editData.username, [
          Validators.required,
          Validators.email,
        ]),
        name: new FormControl(this.staffEdit?.editData.name, [
          Validators.required,
          Validators.minLength(3),
        ]),
        department: new FormControl(this.staffEdit?.editData.department, [
          Validators.required,
        ]),
        dob: new FormControl(this.staffEdit?.editData.dob, [
          Validators.required,
        ]),
        gender: new FormControl(this.staffEdit?.editData.gender, [
          Validators.required,
        ]),
        phone: new FormControl(this.staffEdit?.editData.phone, [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(13),
        ]),
      });
    }, 500);
  }

  editStaff(): void {
    if (this.myForm.valid) {
      this.apiService
        .updateStaff(localStorage.getItem('userId')!, this.myForm.value)
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
      this._snackBar.open('Staff edited', '', {
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
