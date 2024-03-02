import { Injectable } from "@angular/core";
import { UserLoginPayload } from "../../data-structures/payloads/user/UserLoginPayload";
import { HttpClient } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class LoginService {

  userLoginPayload!: UserLoginPayload;

  constructor(private http: HttpClient, private router: Router) {
  }

  submitLogin(loginForm: FormGroup) {
    this.http
      .post<UserLoginPayload>(`${environment.apiLocalhostUrl}/user/login`, loginForm.value)
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
