import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class ValidatorService {

  constructor() {
  }

  emailValidator(control: AbstractControl): ValidationErrors | null {
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valid = emailRegex.test(control.value);
    return valid ? null : { invalidEmail: true };
  }

  whiteSpaceValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value && control.value.trim().length === 0) {
      return { notOnlyWhitespace: true };
    }
    return null;
  }
}
