import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router, RouterModule } from "@angular/router";
import { UserLoginPayload } from "../../data-structures/payloads/user/UserLoginPayload";
import { environment } from "../../../environments/environment";
import { ToastService } from "../../features/toast.service";

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

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService
  ) {
  }


  registerForm = new FormGroup({
    name: new FormControl(""),
    surname: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl("")
  });

  submitRegister(): void {
    this.http
      .post<UserLoginPayload>(`${environment.apiLocalhostUrl}/user/register`, this.registerForm.value)
      .subscribe({
        next: responseData => console.log(responseData),
        error: error => this.toastService.toastError(error),
        complete: (): void => {
          this.toastService.toastSuccess("Register success!");

          this.router
            .navigate(["/login"])
            .then(nav => this.toastService.toastInfo("Redirect"),
              error => this.toastService.toastError(error)
            );
        }
      });
  }

}
