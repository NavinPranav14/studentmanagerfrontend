import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentListComponent } from './student-list/student-list.component';
import { AppRoutingModule } from './app-routing.module';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StaffCreateComponent } from './staff-create/staff-create.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { DeleteStaffComponent } from './delete-staff/delete-staff.component';
import { DeleteStudentComponent } from './delete-student/delete-student.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentListComponent,
    StaffListComponent,
    StudentCreateComponent,
    StaffCreateComponent,
    SideBarComponent,
    EditStudentComponent,
    EditStaffComponent,
    DeleteStaffComponent,
    DeleteStudentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
  ],
  providers: [EditStudentComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
