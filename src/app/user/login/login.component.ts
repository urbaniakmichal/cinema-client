import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { LoginService } from "./login.service";
import { MatDialogModule } from "@angular/material/dialog";
import { ToastModule } from "primeng/toast";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
    ToastModule
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss"
})
export class LoginComponent {

  constructor(private loginService: LoginService) {
  }


  loginForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  });

  submitLogin(): void {
    this.loginService.submitLogin(this.loginForm);
  }

}
