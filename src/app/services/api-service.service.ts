import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  login,
  loginInput,
  StaffDetails,
  StaffDetailsJson,
  Student,
  StudentDetails,
  StudentDetailsJson,
} from '../student-staff.model';
import { Staff } from '../student-staff.model';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  jwttoken: HttpHeaders = new HttpHeaders({
    Authorization: localStorage.getItem('jwttoken') + '',
  });

  constructor(private http: HttpClient) {}

  public adminLogin(data: loginInput): Observable<HttpResponse<login>> {
    return this.http.post<login>('http://localhost:8080/admin/login', data, {
      observe: 'response',
    });
  }

  public staffLogin(data: loginInput): Observable<HttpResponse<login>> {
    return this.http.post<login>('http://localhost:8080/staff/login', data, {
      observe: 'response',
    });
  }

  public studentLogin(data: loginInput): Observable<HttpResponse<login>> {
    return this.http.post<login>('http://localhost:8080/student/login', data, {
      observe: 'response',
    });
  }

  public studentList(): Observable<StudentDetailsJson> {
    return this.http.get<StudentDetailsJson>(
      'http://localhost:8080/student/all'
    );
  }

  public staffList(): Observable<StaffDetailsJson> {
    return this.http.get<StaffDetailsJson>('http://localhost:8080/staff/all');
  }

  public findStaff(staffId: String): Observable<StaffDetails> {
    return this.http.get<StaffDetails>(
      'http://localhost:8080/staff/' + staffId
    );
  }

  public findStaffByUsername(staffId: String): Observable<StaffDetails> {
    return this.http.get<StaffDetails>(
      'http://localhost:8080/staff/username/' + staffId
    );
  }

  public findStudent(studentId: String): Observable<StudentDetails> {
    return this.http.get<StudentDetails>(
      'http://localhost:8080/student/' + studentId
    );
  }

  public findStudentByUsername(studentId: String): Observable<StudentDetails> {
    return this.http.get<StudentDetails>(
      'http://localhost:8080/student/username/' + studentId
    );
  }

  public findStudentByName(
    studentName: Student
  ): Observable<StudentDetailsJson> {
    return this.http.get<StudentDetailsJson>(
      'http://localhost:8080/student/name/' + studentName
    );
  }

  public findStaffByName(StaffName: string): Observable<StaffDetailsJson> {
    return this.http.get<StaffDetailsJson>(
      'http://localhost:8080/staff/name/' + StaffName
    );
  }

  public addStudent(data: Student): Observable<Student> {
    return this.http.post<Student>(
      'http://localhost:8080/student/create',
      data,
      { headers: this.jwttoken }
    );
  }

  public addStaff(data: Staff): Observable<Staff> {
    return this.http.post<Staff>('http://localhost:8080/staff/create', data, {
      headers: this.jwttoken,
    });
  }

  public updateStudent(
    studentId: String,
    data: Student
  ): Observable<StudentDetails> {
    return this.http.put<StudentDetails>(
      'http://localhost:8080/student/edit/' + studentId,
      data,
      { headers: this.jwttoken }
    );
  }

  public updateStaff(staffId: String, data: Staff): Observable<StaffDetails> {
    return this.http.put<StaffDetails>(
      'http://localhost:8080/staff/edit/' + staffId,
      data,
      { headers: this.jwttoken }
    );
  }

  public deleteStudent(studentId: String): Observable<Student> {
    return this.http.delete<Student>(
      'http://localhost:8080/student/delete/' + studentId,
      { headers: this.jwttoken }
    );
  }
  public deleteStaff(staffId: String): Observable<Staff> {
    return this.http.delete<Staff>(
      'http://localhost:8080/staff/delete/' + staffId,
      { headers: this.jwttoken }
    );
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('jwttoken');
  }
}
