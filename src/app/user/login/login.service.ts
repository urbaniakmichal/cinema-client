import { Injectable } from "@angular/core";
import { UserLoginPayload } from "../../data-structures/payloads/user/UserLoginPayload";
import { HttpClient } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { ToastService } from "../../features/toast.service";

@Injectable({
  providedIn: "root"
})
export class LoginService {

  userLoginPayload!: UserLoginPayload;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService
  ) {
  }


  submitLogin(loginForm: FormGroup): void {
    this.http
      .post<UserLoginPayload>(`${environment.apiLocalhostUrl}/user/login`, loginForm.value)
      .subscribe({
        next: responseData => this.userLoginPayload = responseData,
        error: error => this.toastService.toastError(error),
        complete: (): void => {
          this.toastService.toastSuccess("Login success!");
          console.log(this.userLoginPayload);

          this.router
            .navigate(["/repertoire"])
            .then(nav => this.toastService.toastEInfo("Redirect"),
              error => this.toastService.toastError(error)
            );
        }
      });
  }

  getLoggedUser(): UserLoginPayload {
    return this.userLoginPayload;
  }

}
