import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private httpClient: HttpClient) {}
    

    registerForm = new FormGroup({
        name: new FormControl(''),
        surname: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
        legalAge: new FormControl(true)
    });


    submitRegister() {
        this.httpClient
        .post('http://localhost:9091/api/v1/user/register', this.registerForm.value)
        .subscribe(response => {
            console.log(response);
        });   
    }

}
