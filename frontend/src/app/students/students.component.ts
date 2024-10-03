import { Component } from '@angular/core';
import Student from '../model/student.model';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
students:Student[]=[];
noData = false;
constructor(private studentService:StudentService){}
ngOnInit(){
  this.studentService.getAllStudents().subscribe(res=>{
    this.students = res;
  })
}
}
