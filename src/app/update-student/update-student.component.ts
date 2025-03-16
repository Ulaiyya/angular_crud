import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {
  student: FormGroup;
  rollNo: number | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.student = this.fb.group({
      rollNo: [{ value: '', disabled: true }, Validators.required],
      name: ['', Validators.required],
      percentage: ['', Validators.required],
      branch: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.rollNo = +params['id'];
      if (this.rollNo) {
        this.loadStudentData(this.rollNo);
      }
    });
  }

  loadStudentData(rollNo: number): void {
    const url = `http://localhost:8080/student/${rollNo}`;
    this.http.get(url).subscribe((student: any) => {
      this.student.patchValue(student);
    }, (error) => {
      console.error('Error loading student data', error);
    });
  }

  handleSubmit(): void {
    if (this.student.valid && this.rollNo) {
      const url = `http://localhost:8080/student/update/${this.rollNo}`;
      this.http.put(url, this.student.value).subscribe(() => {
        console.log('Student updated successfully');
        this.router.navigate(['/show-student']);
      }, (error) => {
        console.error('Error updating student', error);
      });
    }
  }
}
