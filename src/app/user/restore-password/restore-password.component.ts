import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { UserLoginPayloadResponse } from "../../data-structures/payloads/user/UserLoginPayloadResponse";
import { environment } from "../../../environments/environment";
import { ToastService } from "../../features/toast.service";

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

  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) {
  }


  restoreForm = new FormGroup({
    email: new FormControl("")
  });

  submitRestore(): void {
    this.http
      .post<UserLoginPayloadResponse>(`${environment.apiLocalhostUrl}/user/restore`, this.restoreForm.value)
      .subscribe({
        next: responseData => console.log(responseData),
        error: error => this.toastService.toastError(error),
        complete: () => console.log(this.restoreForm.value)
      });
  }


}
