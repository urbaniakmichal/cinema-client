import { Injectable } from "@angular/core";
import { UserLoginPayload } from "../../data-structures/payloads/user/UserLoginPayload";
import { HttpClient } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class LoginService {

  userLoginPayload!: UserLoginPayload;

  constructor(private http: HttpClient, private router: Router) {
  }

  submitLogin(loginForm: FormGroup) {
    this.http
      .post<UserLoginPayload>("http://localhost:9092/api/v1/user/login", loginForm.value)
      .subscribe({
      next: responseData => this.userLoginPayload = responseData,
      error: err => console.error("Observable emitted an error: " + err),
      complete: () => this.router.navigate(['/repertoire'])
    });
  }

    getLoggedUser(): UserLoginPayload{
      return this.userLoginPayload;
    }

}
