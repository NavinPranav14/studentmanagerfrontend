import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { Student } from '../student';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
})
export class StudentListComponent implements OnInit {
  myForm!: FormGroup;

  public studentUser: any;

  public studentId: any;

  public student: any;
  document: any;
  constructor(
    private apiServiceService: ApiServiceService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.studentList();
    this.myForm = this.fb.group({
      studentUnique: new FormControl(),
    });
  }
  studentList(): void {
    this.apiServiceService.studentList().subscribe(
      (res: Student[]) => {
        this.student = res;
        console.log(res);
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
    this.router.navigate(['deletestudent']);
  }

  save(event: Event):void {
    var userId = (<HTMLButtonElement>event.target).id;
    localStorage.setItem('userId', userId);
  }
  
  checkAdmin() {
    return localStorage.getItem('adminUser');
  }

  checkStaff() {
    return localStorage.getItem('staffUser');
  }

  checkOwnId() {
    return localStorage.getItem('username') === this.studentUser.data.username;
  }
}
