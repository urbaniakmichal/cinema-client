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
        },
        error: error => this.toastService.toastError(error),
        complete: (): void => {
          this.toastService.toastSuccess("Login success!");
          console.log(this.userLoginPayload);

          this.router
            .navigate(["/repertoire"])
            .then(nav => this.toastService.toastInfo("Redirect"),
              error => this.toastService.toastError(error)
            );
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
        },
        error: error => this.toastService.toastError(error),
        complete: (): void => {
          this.toastService.toastSuccess(this.userLogoutPayloadResponse.message);

          this.router
            .navigate(["/repertoire"])
            .then(nav => this.toastService.toastInfo("Redirect"),
              error => this.toastService.toastError(error)
            );
        }
      });
  }

  isLoggedIn(): boolean {
    return !!this.cookieService.get(this.jwtTokenKey);
  }
}
