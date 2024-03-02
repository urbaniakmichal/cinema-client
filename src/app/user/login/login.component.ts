import { Component } from "@angular/core";
import { FormGroup, FormControl, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { UserLoginPayload } from "../../data-structures/payloads/user/UserLoginPayload";
import { MovieAnnouncementsPayload } from "../../data-structures/payloads/movies/announcment/MovieAnnouncementsPayload";
import { LoginService } from "./login.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
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


  submitLogin() {
    this.loginService.submitLogin(this.loginForm);
  }


}
