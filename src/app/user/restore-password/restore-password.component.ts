import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { UserLoginPayloadResponse } from "../../data-structures/payloads/user/UserLoginPayloadResponse";
import { environment } from "../../../environments/environment";
import { ToastService } from "../../features/toast.service";
import { ValidatorService } from "../../features/validator.service";
import { AuthService } from "../../config/auth/auth.service";

@Component({
  selector: "app-restore-password",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: "./restore-password.component.html",
  styleUrl: "./restore-password.component.scss"
})
export class RestorePasswordComponent {

  protected restoreForm: FormGroup;

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private validatorService: ValidatorService
  ) {
    this.restoreForm = this.formBuilder.group({
      email: ["", [Validators.required, this.validatorService.emailValidator, this.validatorService.whiteSpaceValidator]]
    });
  }


  protected isRestoreDataValid(): boolean {
    return this.restoreForm.valid;
  }

  protected validateAndSubmit(): void {
    this.restoreForm.markAllAsTouched();

    if (this.restoreForm.valid) {
      this.authService.register(this.restoreForm);
    } else {
      this.toastService.toastError("Invalid data");
    }
  }
}
