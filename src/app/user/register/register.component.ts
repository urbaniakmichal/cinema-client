import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router, RouterModule } from "@angular/router";
import { UserLoginPayloadResponse } from "../../data-structures/payloads/user/UserLoginPayloadResponse";
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

  protected registerForm: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      name: ["", Validators.required],
      surname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }


  validateAndSubmit(): void {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      this.http
        .post<UserLoginPayloadResponse>(`${environment.apiLocalhostUrl}/user/register`, this.registerForm.value)
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

}
