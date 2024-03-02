import { Injectable } from '@angular/core';
import { UserLoginPayload } from "../../data-structures/payloads/user/UserLoginPayload";
import { HttpClient } from "@angular/common/http";
import { FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userLoginPayload!: UserLoginPayload;

  constructor(private http: HttpClient) { }


  submitLogin(loginForm: FormGroup) {
    this.http
      .post<UserLoginPayload>("http://localhost:9092/api/v1/user/login", loginForm.value)
      .subscribe(data => {
        this.userLoginPayload = data;
        console.log(this.userLoginPayload);
      });
  }

  getLoggedUser() {
    return this.userLoginPayload;
  }
}
