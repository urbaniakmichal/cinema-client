import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    constructor(private httpClient: HttpClient) {}
    

    loginForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
    });


    submitLogin() {
        this.httpClient
        .post('http://localhost:9092/api/v1/user/login', this.loginForm.value)
        .subscribe(response => {
            console.log(response);
        });   
    }


}
