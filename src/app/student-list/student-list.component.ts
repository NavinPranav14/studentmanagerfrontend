import { Component, OnInit, ɵNG_ELEMENT_ID } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { Student } from '../student';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
})
export class StudentListComponent implements OnInit {
  myForm!: FormGroup;

  llist = [];

  public student: any;

  public studentUser: any;

  studentList1 = [];

  studentNameList = [];

  studentId: any;

  filteredOptions?: Observable<String[]>;

  summ = 0;

  p: number = 1;

  document: any;
  constructor(
    private apiServiceService: ApiServiceService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.studentList();
    this.myForm = this.fb.group({
      studentUnique: new FormControl(),
      
    });
    

    this.filteredOptions = this.myForm.get('studentUnique')?.valueChanges.pipe(
      startWith(''),
      map((res: any) => this._filter(res))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.studentNameList.filter((option: any) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  studentList(): void {
    this.apiServiceService.studentList().subscribe(
      (res: any) => {
        this.student = res;

        const studentNameList = res.data.map(
          (item: { name: any }) => item.name
        );
        this.studentNameList = studentNameList;
      },
      (err: any) => {
        alert(err.message);
      }
    );
  }

  findStudentByName(): void {
    this.apiServiceService
      .findStudentByName(this.myForm.value.studentUnique)
      .subscribe(
        (res: Student[]) => {
          this.studentUser = res;
          console.log(res);
        },
        (err: any) => {
          alert(err.message);
        }
      );
  }

  editStudent() {
    this.router.navigate(['editstudent']);
  }

  deleteStudent() {
    this.router.navigate(['delete'], { relativeTo: this.route });
  }

  save(event: Event): void {
    var userId = (<HTMLButtonElement>event.target).id;
    localStorage.setItem('userId', userId);
  }

  checkAdmin() {
    return localStorage.getItem('adminUser');
  }

  checkStaff() {
    return localStorage.getItem('staffUser');
  }

  checkStudent() {
    return localStorage.getItem('studentUser');
  }

  checkOwnId() {
    return localStorage.getItem('username') === this.studentUser.data.username;
  }
  searchFilter() {
    console.log(this.student.data);
  }
  displayFn(subject: any) {
    return subject ? subject.name : undefined;
  }
}
