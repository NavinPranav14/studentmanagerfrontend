import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiServiceService } from '../services/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
})
export class EditStaffComponent implements OnInit {

  myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: new FormControl(),
      name: new FormControl(),
      department: new FormControl(),
    });
  }

  editStaff() {
    this.apiService
      .updateStaff(localStorage.getItem('userId'), this.myForm.value)
      .subscribe((res) => console.log(res), (err) => console.log(err));
  }
  back() {
    this.router.navigate(['home']);
  }
  deleteUSerFromLocalStorage() {
    localStorage.removeItem('userId');
  }
}
