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
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
import { MatButtonModule } from '@angular/material/button';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatTableModule} from '@angular/material/table';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { AuthGuard } from './auth.guard';
import {MatTooltipModule} from '@angular/material/tooltip';

  
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
    ProfilePageComponent,
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
    MatSnackBarModule,
    MatButtonModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    MatTableModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    
  ],

  providers: [EditStudentComponent, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
