import { Injectable, OnDestroy } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { UserLoginPayloadResponse } from "../../data-structures/payloads/user/UserLoginPayloadResponse";
import { UserLogoutPayloadResponse } from "../../data-structures/payloads/user/UserLogoutPayloadResponse";
import { ToastService } from "../../features/toast.service";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Subject, takeUntil } from "rxjs";
import { UserChangeDataPayloadRequest } from "../../data-structures/payloads/user/change/UserChangeDataPayloadRequest";
import {
  UserChangeDataPayloadResponse
} from "../../data-structures/payloads/user/change/UserChangeDataPayloadResponse";
import { Paths } from "../Paths";

@Injectable({
  providedIn: "root"
})
export class AuthService implements OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  userLoginPayload!: UserLoginPayloadResponse;

  private userLogoutPayloadResponse!: UserLogoutPayloadResponse;
  private jwtTokenKey: string = "jwtToken";

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService,
    private cookieService: CookieService
  ) {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  login(loginForm: FormGroup): void {
    this.http
      .post<UserLoginPayloadResponse>(`${environment.apiLocalhostUrl}/user` + Paths.LOGIN, loginForm.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: responseData => {
          this.cookieService.set(this.jwtTokenKey, responseData.jwtToken);
          this.userLoginPayload = responseData;
          this.router
            .navigate([Paths.REPERTOIRE])
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
      .post<UserLogoutPayloadResponse>(`${environment.apiLocalhostUrl}/user` + Paths.LOGOUT, {})
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: responseData => {
          this.userLogoutPayloadResponse = responseData;
          this.router
            .navigate([Paths.REPERTOIRE])
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
    this.http // ToDo pozmieniacn w psotach getach na response zamiast na request i dostosowac co chce ottrzymywac
      .post<UserLoginPayloadResponse>(`${environment.apiLocalhostUrl}/user` + Paths.REGISTER, registerForm.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: responseData => {
          console.log(responseData);
          this.router
            .navigate([Paths.LOGOUT])
            .then(
              () => this.toastService.toastInfo("Redirect"),
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
      .post<UserLoginPayloadResponse>(`${environment.apiLocalhostUrl}/user` + Paths.RESTORE, restoreForm.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: responseData => console.log(responseData),
        error: error => this.toastService.toastError(error),
        complete: () => console.log(restoreForm.value)
      });
  }

  changePersonalData(changePersonalDataForm: FormGroup): void {
    this.http
      .post<UserChangeDataPayloadResponse>(`${environment.apiLocalhostUrl}/user` + Paths.CHANGE_DATA, this.createUserChangeDataPayloadRequest(changePersonalDataForm))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: responseData => console.log(responseData), // ToDo pomyslec co dodac tutaj i do podobnych miejsc
        error: error => this.toastService.toastError(error), // ToDo pomyslec co dodac tutaj i do podobnych miejsc
        complete: () => this.toastService.toastSuccess("You changed you personal data") // ToDo pomyslec co dodac tutaj i do podobnych miejsc
      });
  }

  isLoggedIn(): boolean {
    return !!this.cookieService.get(this.jwtTokenKey);
  }


  private createUserChangeDataPayloadRequest(formGroup: FormGroup): UserChangeDataPayloadRequest {
    return {
      id: this.userLoginPayload.id,
      name: formGroup.get("name")?.value,
      surname: formGroup.get("surname")?.value,
      email: formGroup.get("email")?.value,
      password: formGroup.get("password")?.value
    };
  }
}
