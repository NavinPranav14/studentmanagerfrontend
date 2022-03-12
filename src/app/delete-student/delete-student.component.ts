import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-student',
  templateUrl: './delete-student.component.html'
})
export class DeleteStudentComponent implements OnInit {
  constructor(
    private apiServiceService: ApiServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  deleteStudent() {
    this.apiServiceService
      .deleteStudent(localStorage.getItem('userId'))
      .subscribe(
        (res) => console.log(res),
        (err) => console.log('invalid data')
      );
  }

  deleteUSerFromLocalStorage() {
    localStorage.removeItem('userId');
  }

  navigateToHome() {
    this.router.navigate(['home']);
  }
}
