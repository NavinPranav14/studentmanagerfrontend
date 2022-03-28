import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Student, StudentDetailsJson } from '../student-staff.model';
import { EditStudentComponent } from '../edit-student/edit-student.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
})
export class StudentListComponent implements OnInit {
  myForm!: FormGroup;

  llist: string[] = [];

  student!: StudentDetailsJson;

  studentUser!: StudentDetailsJson;

  studentList1: string[] = [];

  studentNameList: string[] = [];

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  filteredOptions?: Observable<String[]>;

  p: number = 1;

  errMessage: string = '';

  constructor(
    private apiServiceService: ApiServiceService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.studentList();
    this.myForm = this.fb.group({
      studentUnique: new FormControl(),
    });

    this.filteredOptions = this.myForm.get('studentUnique')?.valueChanges.pipe(
      startWith(''),
      map((res: string) => this._filter(res))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.studentNameList.filter((option: string) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  studentList(): void {
    this.apiServiceService.studentList().subscribe(
      (res: StudentDetailsJson) => {
        this.student = res;

        const studentNameList = res.data.map(
          (item: { name: string }) => item.name
        );
        this.studentNameList = studentNameList;
      },
      (err: HttpErrorResponse) => {
        this.errMessage = err.error.message;
        this.openFailureSnackBar(this.errMessage);
      }
    );
  }

  findStudentByName(): void {
    this.apiServiceService
      .findStudentByName(this.myForm.value.studentUnique)
      .subscribe(
        (res) => {
          this.studentUser = res;
        },
        (err: HttpErrorResponse) => {
          this.errMessage = err.error.message;
          this.openFailureSnackBar(this.errMessage);
        }
      );
  }

  editStudent(data: Student): void {
    const dialogRef = this.dialog.open(EditStudentComponent, {
      width: '550px',
      data: { editData: data },
    });
  }

  deleteStudent(): void {
    this.router.navigate(['delete'], { relativeTo: this.route });
  }

  save(event: Event): void {
    var userId = (<HTMLButtonElement>event.target).id;
    localStorage.setItem('userId', userId);
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
