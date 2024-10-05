import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../service/student.service';
import { Router, ActivatedRoute } from '@angular/router';
import Student from '../model/student.model';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss'],
})
export class StudentCreateComponent {
  dataForm: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder, private studentService: StudentService,private activatedRoute: ActivatedRoute
  ) {
    this.dataForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  editStudentId!: string;
  ngOnInit() {
    this.editStudentId = this.activatedRoute.snapshot.params['id'];
    console.log(this.editStudentId);
    if (this.editStudentId) {
      this.studentService
        .getStudentById(this.editStudentId)
        .subscribe((result) => {
          this.dataForm.patchValue(result);
          // console.log(result)
        });
    }
  }

  createStudent() {
    if (this.dataForm.invalid) {
      alert('Invalid Data');
      return;
    }
    const student: Student = this.dataForm.value;
    this.studentService.addNewStudent(student).subscribe((res) => {
      alert('Student created successfully');
      this.router.navigate(['/students']);
    });
  }

  updateStudent() {
    if (this.dataForm.invalid) {
      alert('Invalid Data');
      return;
    }
    const student: Student = this.dataForm.value;
    this.studentService
      .updateStudent(this.editStudentId, student)
      .subscribe((res) => {
        alert('Student updated successfully');
        this.router.navigate(['/students']);
      });
  }
}