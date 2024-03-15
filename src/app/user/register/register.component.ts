import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ToastService } from "../../features/toast.service";
import { ValidatorService } from "../../features/validator.service";
import { AuthService } from "../../config/auth/auth.service";

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
  protected passwordHidden: boolean = true;

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private validatorService: ValidatorService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ["", [Validators.required, this.validatorService.whiteSpaceValidator]],
      surname: ["", [Validators.required, this.validatorService.whiteSpaceValidator]],
      email: ["", [Validators.required, this.validatorService.emailValidator, this.validatorService.whiteSpaceValidator]],
      password: ["", [Validators.required, this.validatorService.whiteSpaceValidator]]
    });
  }


  protected isRegisterDataValid(): boolean {
    return this.registerForm.valid;
  }

  protected togglePasswordVisibility(): void {
    this.passwordHidden = !this.passwordHidden;
  }

  protected validateAndSubmit(): void {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      this.authService.register(this.registerForm);
    } else {
      this.toastService.toastError("Invalid data");
    }
  }
}
