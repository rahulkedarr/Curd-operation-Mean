import { Component } from '@angular/core';
import Student from '../model/student.model';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  noData = false;
  searchTerm: string = '';
  constructor(private studentService: StudentService) {}
  ngOnInit() {
    this.studentService.getAllStudents().subscribe((res) => {
      this.students = res;
      this.filteredStudents = res;
    });
  }

  deleteStudent(id: string) {
    const ok = confirm('are you sure want to delete data');
    if (ok) {
      this.studentService.deleteStudent(id).subscribe((res) => {
        alert('student data deleted');
        this.filteredStudents = this.filteredStudents.filter(
          (student) => student._id !== id
        );
      });
    }
  }

  deleteAllStudents() {
    const ok = confirm('are you sure want to delete data');
    if (ok) {
      this.studentService.deleteAllStudents().subscribe((res) => {
        alert('student data deleted');
        this.filteredStudents = [];
        this.noData = true;
      });
    }
  }

  onSearch() {
    if (this.searchTerm.trim() === '') {
      this.filteredStudents = this.students;
      this.noData = false;
      return;
    }

    this.studentService.searchStudents(this.searchTerm).subscribe((res) => {
      this.filteredStudents = res;
      this.noData = this.filteredStudents.length === 0;
    });
  }
}
