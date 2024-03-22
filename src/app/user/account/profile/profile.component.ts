import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AuthService } from "../../../config/auth/auth.service";
import { ToastService } from "../../../features/toast.service";
import { ValidatorService } from "../../../features/validator.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  protected changePersonalDataForm: FormGroup;
  protected passwordHidden: boolean = true;


  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private validatorService: ValidatorService
  ) {
    this.changePersonalDataForm = this.formBuilder.group({
      name: [this.authService.userLoginPayload.name, [Validators.required, this.validatorService.whiteSpaceValidator]],
      surname: [this.authService.userLoginPayload.surname, [Validators.required, this.validatorService.whiteSpaceValidator]],
      email: [this.authService.userLoginPayload.email, [Validators.required, this.validatorService.emailValidator, this.validatorService.whiteSpaceValidator]],
      password: ["", [Validators.required, this.validatorService.whiteSpaceValidator]]
    });
  }


  protected isChangeDataValid(): boolean {
    return this.changePersonalDataForm.valid;
  }

  protected togglePasswordVisibility(): void {
    this.passwordHidden = !this.passwordHidden;
  }

  protected validateAndSubmit(): void {
    this.changePersonalDataForm.markAllAsTouched();

    if (this.changePersonalDataForm.valid) {
      this.authService.changePersonalData(this.changePersonalDataForm);
    } else {
      this.toastService.toastError("Change personal date failed");
    }
  }
}
