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
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '' , component: LoginComponent },
  { path: 'student/create', component: StudentCreateComponent, canActivate:[AuthGuard] },
  { path: 'staff/create', component: StaffCreateComponent, canActivate:[AuthGuard] },
  { path: 'editstudent', component: EditStudentComponent, canActivate:[AuthGuard] },
  { path: 'editstaff', component: EditStaffComponent, canActivate:[AuthGuard] },
  { path: 'deletestudent', component: DeleteStudentComponent, canActivate:[AuthGuard] },
  { path: 'deletestaff', component: DeleteStaffComponent, canActivate:[AuthGuard] },
  {
    path: 'home',
    component: SideBarComponent, canActivate:[AuthGuard],
    children: [
      { path: 'students', component: StudentListComponent ,children:[
        {path: 'delete', component : DeleteStudentComponent}
      ]},
      { path: 'staffs', component: StaffListComponent, children:[
        {path: 'delete', component: DeleteStaffComponent }
      ]},
      { path: 'addstudent', component: StudentCreateComponent },
      { path: 'addstaff', component: StaffCreateComponent },
      { path: 'profile', component: ProfilePageComponent}

    ],
  },
  { path: 'navstudent', component: StudentListComponent },
  { path: 'navstaffs', redirectTo: 'home/staffs' },
]; 


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
