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

deleteStudent(id:string){
  const ok= confirm("are you sure want to delete data");
  if(ok){
    this.studentService.deleteStudent(id).subscribe((res)=>{
      alert("student data deleted")
      this.students= this.students.filter(res=>res._id!=id)
    })
  }
}

deleteAllStudents(){
  const ok= confirm("are you sure want to delete data");
  if(ok){
    this.studentService.deleteAllStudents().subscribe((res)=>{
      alert("student data deleted")
      this.students = []; 
      this.noData = true; 
    })
  }
}
}
