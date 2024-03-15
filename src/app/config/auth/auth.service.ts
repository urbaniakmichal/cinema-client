import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { UserLoginPayloadResponse } from "../../data-structures/payloads/user/UserLoginPayloadResponse";
import { UserLogoutPayloadResponse } from "../../data-structures/payloads/user/UserLogoutPayloadResponse";
import { ToastService } from "../../features/toast.service";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  userLoginPayload!: UserLoginPayloadResponse;

  private userLogoutPayloadResponse!: UserLogoutPayloadResponse;
  private jwtTokenKey = "jwtToken";

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService,
    private cookieService: CookieService
  ) {
  }


  login(loginForm: FormGroup): void {
    this.http
      .post<UserLoginPayloadResponse>(`${environment.apiLocalhostUrl}/user/login`, loginForm.value)
      .subscribe({
        next: responseData => {
          this.cookieService.set(this.jwtTokenKey, responseData.jwtToken);
          this.userLoginPayload = responseData;
          this.router
            .navigate(["/repertoire"])
            .then(
              () => this.toastService.toastInfo("Redirect"),
              error => this.toastService.toastError(error)
            );
        },
        error: error => this.toastService.toastError(error),
        complete: (): void => {
          this.toastService.toastSuccess("Login success!");
          console.log(this.userLoginPayload);
        }
      });
  }

  logout(): void {
    this.cookieService.delete(this.jwtTokenKey);

    this.http
      .post<UserLogoutPayloadResponse>(`${environment.apiLocalhostUrl}/user/logout`, {})
      .subscribe({
        next: responseData => {
          this.userLogoutPayloadResponse = responseData;
          this.router
            .navigate(["/repertoire"])
            .then(
              () => console.log("Logout user: " + this.userLogoutPayloadResponse),
              error => this.toastService.toastError(error)
            );
        },
        error: error => this.toastService.toastError(error),
        complete: (): void => {
          this.toastService.toastSuccess(this.userLogoutPayloadResponse.message);
        }
      });
  }

  register(registerForm: FormGroup): void {
    this.http
      .post<UserLoginPayloadResponse>(`${environment.apiLocalhostUrl}/user/register`, registerForm.value)
      .subscribe({
        next: responseData => {
          console.log(responseData);
          this.router
            .navigate(["/login"])
            .then(nav => this.toastService.toastInfo("Redirect"),
              error => this.toastService.toastError(error)
            );
        },
        error: error => this.toastService.toastError(error),
        complete: (): void => {
          this.toastService.toastSuccess("Register success!");
        }
      });
  }

  restore(restoreForm: FormGroup): void {
    this.http
      .post<UserLoginPayloadResponse>(`${environment.apiLocalhostUrl}/user/restore`, restoreForm.value)
      .subscribe({
        next: responseData => console.log(responseData),
        error: error => this.toastService.toastError(error),
        complete: () => console.log(restoreForm.value)
      });
  }

  isLoggedIn(): boolean {
    return !!this.cookieService.get(this.jwtTokenKey);
  }
}
