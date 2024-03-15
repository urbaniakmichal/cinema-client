import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatDialogModule } from "@angular/material/dialog";
import { ToastModule } from "primeng/toast";
import { AuthService } from "../../config/auth/auth.service";
import { ToastService } from "../../features/toast.service";
import { ValidatorService } from "../../features/validator.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
    ToastModule
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss"
})
export class LoginComponent {

  protected loginForm: FormGroup;
  protected passwordHidden: boolean = true;

  constructor(
    private toastService: ToastService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private validatorService: ValidatorService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, this.validatorService.emailValidator, this.validatorService.whiteSpaceValidator]],
      password: ["", [Validators.required, this.validatorService.whiteSpaceValidator]]
    });
  }


  togglePasswordVisibility(): void {
    this.passwordHidden = !this.passwordHidden;
  }

  validateAndSubmit(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm);
    } else {
      this.toastService.toastError("Invalid data");
    }
  }

}
