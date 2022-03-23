import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { Staff } from '../staff';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
})
export class StaffListComponent implements OnInit {
  public staff: any;

  myForm!: FormGroup;

  public staffuser: any;

  filteredOptions?: Observable<String[]>;

  staffList1 = [];

  staffNameList = [];

  p:number = 1;

  constructor(
    private apiService: ApiServiceService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.staffList();
    this.myForm = this.fb.group({
      staffUnique: new FormControl(),
    });
    this.filteredOptions = this.myForm.get('staffUnique')?.valueChanges.pipe(
      startWith(''),
      map((res: any) => this._filter(res))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.staffNameList.filter((option: any) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  public staffList(): void {
    this.apiService.staffList().subscribe(
      (res: any) => {
        this.staff = res;
        const staffNameList = res.data.map((item: { name: any; }) => item.name)
        this.staffNameList = staffNameList;
       
      },
      (err: any) => {
        alert(err.message);
      }
    );
  }

  findStaffByName() {
    this.apiService.findStaffByName(this.myForm.value.staffUnique).subscribe(
      (res) => {
        this.staffuser = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  save(event: Event): void {
    var userId = (<HTMLButtonElement>event.target).id;
    localStorage.setItem('userId', userId);
  }

  editStaff() {
    this.router.navigate(['editstaff']);
  }
  deleteStaff() {
    this.router.navigate(['delete'], {relativeTo:this.route});
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
    return localStorage.getItem('username') === this.staffuser.data.username;
  }
}
