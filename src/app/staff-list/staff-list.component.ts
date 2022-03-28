import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { Staff } from '../student-staff.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { StaffDetailsJson } from '../student-staff.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { EditStaffComponent } from '../edit-staff/edit-staff.component';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
})
export class StaffListComponent implements OnInit {
  staff!: StaffDetailsJson;

  myForm!: FormGroup;

  staffuser!: StaffDetailsJson;

  filteredOptions?: Observable<String[]>;

  staffList1: string[] = [];

  staffNameList: string[] = [];

  p: number = 1;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  errMessage: string = '';

  constructor(
    private apiService: ApiServiceService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.staffList();
    this.myForm = this.fb.group({
      staffUnique: new FormControl(),
    });
    this.filteredOptions = this.myForm.get('staffUnique')?.valueChanges.pipe(
      startWith(''),
      map((res: string) => this._filter(res))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.staffNameList.filter((option: string) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  public staffList(): void {
    this.apiService.staffList().subscribe(
      (res) => {
        this.staff = res;
        const staffNameList = res.data.map(
          (item: { name: string }) => item.name
        );
        this.staffNameList = staffNameList;
      },
      (err: HttpErrorResponse) => {
        this.errMessage = err.error.message;
        this.openFailureSnackBar(this.errMessage);
      }
    );
  }

  findStaffByName(): void {
    this.apiService.findStaffByName(this.myForm.value.staffUnique).subscribe(
      (res) => {
        this.staffuser = res;
      },
      (err: HttpErrorResponse) => {
        this.errMessage = err.error.message;
        this.openFailureSnackBar(this.errMessage);
      }
    );
  }

  save(event: Event): void {
    var userId = (<HTMLButtonElement>event.target).id;
    localStorage.setItem('userId', userId);
  }

  editStaff(data: Staff): void {
    const dialogRef = this.dialog.open(EditStaffComponent, {
      width: '550px',
      data: { editData: data },
    });
  }

  deleteStaff(): void {
    this.router.navigate(['delete'], { relativeTo: this.route });
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
