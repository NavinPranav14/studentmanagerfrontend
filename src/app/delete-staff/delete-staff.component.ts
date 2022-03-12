import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-delete-staff',
  templateUrl: './delete-staff.component.html',
})
export class DeleteStaffComponent implements OnInit {
  constructor(private router: Router, private apiService: ApiServiceService) {}

  ngOnInit(): void {}
  deletestaff() {
    this.apiService.deleteStaff(localStorage.getItem('userId')).subscribe(
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
