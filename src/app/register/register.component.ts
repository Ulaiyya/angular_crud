import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private http: HttpClient) {}

  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''), 
    password: new FormControl('') 
  });

  onSubmit() {
    const url = 'http://localhost:8080/users/register';

    this.http.post(url, this.registerForm.value).subscribe(
      (response) => {
        console.log('Registration successful:', response);
      },
      (error) => {
        console.error('Registration failed:', error);
      }
    );
  }
}

