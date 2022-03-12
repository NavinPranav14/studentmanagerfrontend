import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-create',
  templateUrl: './staff-create.component.html'
})
export class StaffCreateComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    private apiService: ApiServiceService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: new FormControl(),
      password: new FormControl(),
      name: new FormControl(),
      department: new FormControl(),
      phone: new FormControl(),
    });
  }
  addStaff() {
    console.log(this.myForm.value);
    this.apiService.addStaff(this.myForm.value).subscribe(
      (res) => console.log(res),
      (err) => console.log('Invalid data')
    );
  }
  navStaffs() {
    this.router.navigate(['navstaffs']);
  }
}
