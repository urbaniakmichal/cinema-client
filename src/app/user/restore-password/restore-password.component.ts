import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { UserLoginPayload } from "../../data-structures/payloads/user/UserLoginPayload";
import { environment } from "../../../environments/environment";

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

  constructor(private http: HttpClient) {
  }


  restoreForm = new FormGroup({
    email: new FormControl("")
  });


  submitRestore() {
    this.http
      .post<UserLoginPayload>(`${environment.apiLocalhostUrl}/user/restore`, this.restoreForm.value)
      .subscribe({
        next: responseData => console.log(responseData),
        error: err => console.error("Observable emitted an error: " + err),
        complete: () => console.log("Observable completed")
      });
  }


}
