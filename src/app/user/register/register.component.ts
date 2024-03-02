import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { UserLoginPayload } from "../../data-structures/payloads/user/UserLoginPayload";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss"
})
export class RegisterComponent {

  constructor(private http: HttpClient) {
  }


  registerForm = new FormGroup({
    name: new FormControl(""),
    surname: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    legalAge: new FormControl(true)
  });


  submitRegister() {
    this.http
      .post<UserLoginPayload>(`${environment.apiLocalhostUrl}/user/register`, this.registerForm.value)
      .subscribe({
        next: responseData => console.log(responseData),
        error: err => console.error("Observable emitted an error: " + err),
        complete: () => console.log("Observable completed")
      });
  }

}
