import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-show-student',
  templateUrl: './show-student.component.html',
  styleUrl: './show-student.component.css'
})
export class ShowStudentComponent implements OnInit{

  constructor ( private httpclient : HttpClient ) {  }

  ngOnInit(): void {
      this.getAllStudentData();
  }

  students: any[] = [];

  getAllStudentData(){
    const url = "http://localhost:8080/students"

    this.httpclient.get(url).subscribe((response:any) => {
      console.log(response);
      this.students = response;
    }, (error) => {
      console.error("Error in Fetching Record", error);
    })};

    deleteStudent(studentId:any) {
      const url = `http://localhost:8080/student/delete/${studentId}`

      this.httpclient.delete(url).subscribe((response: any) => {
        console.log(response);
        this.getAllStudentData();
      }, (error) => {
        console.error("Error in Deleting Record", error);
      })

    }

}
