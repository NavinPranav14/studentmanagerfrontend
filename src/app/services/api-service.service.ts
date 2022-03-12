import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../student';
import { Staff } from '../staff';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  jwttoken: any = { Authorization: localStorage.getItem('jwttoken') };

  constructor(private http: HttpClient) {}

  public adminLogin(data: any) {
    console.log(data);
    return this.http.post('http://localhost:8080/admin/login', data, {
      observe: 'response',
    });
  }

  public staffLogin(data: any) {
    console.log(data);
    return this.http.post('http://localhost:8080/staff/login', data, {
      observe: 'response',
    });
  }

  public studentLogin(data: any) {
    console.log(data);
    return this.http.post('http://localhost:8080/student/login', data, {
      observe: 'response',
    });
  }

  public studentList(): Observable<Student[]> {
    return this.http.get<Student[]>('http://localhost:8080/student/all');
  }

  public staffList(): Observable<Staff[]> {
    return this.http.get<Staff[]>('http://localhost:8080/staff/all');
  }

  public findStaff(staffId: String): Observable<Staff> {
    return this.http.get<Staff>('http://localhost:8080/staff/' + staffId);
  }

  public findStaffByUsername(staffId: any): Observable<Staff> {
    return this.http.get<Staff>(
      'http://localhost:8080/staff/username/' + staffId
    );
  }

  public findStudent(studentId: String): Observable<Student> {
    return this.http.get<Student>('http://localhost:8080/student/' + studentId);
  }

  public findStudentByUsername(studentId: any): Observable<Student> {
    return this.http.get<Student>(
      'http://localhost:8080/student/username/' + studentId
    );
  }

  public findStudentByName( studentName: any): Observable<Student[]>{
    return this.http.get<Student[]>(
      'http://localhost:8080/student/name/' + studentName
    );
  }

  public findStaffByName( StaffName: any): Observable<Staff>{
    return this.http.get<Staff>(
      'http://localhost:8080/staff/name/' + StaffName
    );
  }

  public addStudent(data: any): Observable<Student> {
    return this.http.post<Student>(
      'http://localhost:8080/student/create',
      data,
      { headers: this.jwttoken }
    );
  }

  public addStaff(data: any): Observable<Staff> {
    return this.http.post<Staff>('http://localhost:8080/staff/create', data, {
      headers: this.jwttoken,
    });
  }

  public updateStudent(studentId: any, data: any): Observable<Student> {
    return this.http.put<Student>(
      'http://localhost:8080/student/edit/' + studentId,
      data,
      { headers: this.jwttoken }
    );
  }

  public updateStaff(staffId: any, data: any): Observable<Staff> {
    return this.http.put<Staff>(
      'http://localhost:8080/staff/edit/' + staffId,
      data,
      { headers: this.jwttoken }
    );
  }

  public deleteStudent(studentId: any): Observable<Student> {
    return this.http.delete<Student>(
      'http://localhost:8080/student/delete/' + studentId,
      { headers: this.jwttoken }
    );
  }
  public deleteStaff(staffId: any): Observable<Staff> {
    return this.http.delete<Staff>(
      'http://localhost:8080/staff/delete/' + staffId,
      { headers: this.jwttoken }
    );
  }
}
