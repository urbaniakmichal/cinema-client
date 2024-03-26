import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { ToastService } from "../../features/toast.service";
import { Paths } from "../Paths";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
  }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate([Paths.LOGIN])
        .then(
          () => this.toastService.toastInfo("Redirect to login page"),
          error => this.toastService.toastError(error));

      return false;
    }
  }
}
