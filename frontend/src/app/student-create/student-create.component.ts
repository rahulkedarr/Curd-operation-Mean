import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../service/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss']
})
export class StudentCreateComponent {
  dataForm: FormGroup;

  constructor( private router: Router, private formBuilder: FormBuilder, private studentService: StudentService) {
    this.dataForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

createStudent() {
  if (this.dataForm.invalid) return;

  this.studentService.addNewStudent(this.dataForm.value).subscribe({
    next: () => {
      alert('Student created successfully');
      this.dataForm.reset();
      this.router.navigate(['/students']);
    },
    error: (err) => console.error('Error creating student', err)
  });
}
}
  
// createStudent() {
//   if (this.dataForm.valid) {
//     this.studentService.addNewStudent(this.dataForm.value).subscribe(
//       res => {
//         alert('Student created successfully');
//         this.dataForm.reset();
//         this.router.navigate(['/students']);
//       },
//       error => {
//         console.error('Error creating student', error);
//       }
//     );
//   }
// }



