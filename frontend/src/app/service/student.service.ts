import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import Student from '../model/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  apiUrl = 'http://localhost:8080/';
  constructor(private http: HttpClient, private route: Router) {}

  getAllStudents() {
    return this.http.get<Student[]>(this.apiUrl + 'api/student');
  }

  addNewStudent(student: Student) {
    return this.http.post<Student>(this.apiUrl + 'api/student', student);
  }

  getStudentById(id: string) {
    return this.http.get<Student[]>(this.apiUrl + 'api/student/' + id);
  }

  updateStudent(id: string, student: Student) {
    return this.http.put<Student[]>(this.apiUrl + 'api/student/' + id, student);
  }

  deleteStudent(id: string) {
    return this.http.delete<Student[]>(this.apiUrl + 'api/student/' + id);
  }

  deleteAllStudents() {
    return this.http.delete(this.apiUrl + 'api/student/');
  }
}
