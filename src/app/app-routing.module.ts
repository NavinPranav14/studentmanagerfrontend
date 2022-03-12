import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StaffCreateComponent } from './staff-create/staff-create.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { DeleteStudentComponent } from './delete-student/delete-student.component';
import { DeleteStaffComponent } from './delete-staff/delete-staff.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login/admin', component: LoginComponent },
  { path: 'login/student', component: LoginComponent },
  { path: 'login/staff', component: LoginComponent },
  { path: 'student/create', component: StudentCreateComponent },
  { path: 'staff/create', component: StaffCreateComponent },
  { path: 'editstudent', component: EditStudentComponent },
  { path: 'editstaff', component: EditStaffComponent },
  { path: 'deletestudent', component: DeleteStudentComponent },
  { path: 'deletestaff', component: DeleteStaffComponent },
  {
    path: 'home',
    component: SideBarComponent,
    children: [
      { path: 'students', component: StudentListComponent },
      { path: 'staffs', component: StaffListComponent },
      { path: 'addstudent', component: StudentCreateComponent },
      { path: 'addstaff', component: StaffCreateComponent },
    ],
  },
  { path: 'navstudent', redirectTo: 'home/students' },
  { path: 'navstaffs', redirectTo: 'home/staffs' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
