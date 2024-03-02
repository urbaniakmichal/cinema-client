import { Injectable } from "@angular/core";
import { UserLoginPayload } from "../../data-structures/payloads/user/UserLoginPayload";
import { HttpClient } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { MatDialog } from '@angular/material/dialog';
import { ResultModalComponent } from "../../angular/material/result-modal/result-modal.component";

@Injectable({
  providedIn: "root"
})
export class LoginService {

  userLoginPayload!: UserLoginPayload;

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog) {
  }

  submitLogin(loginForm: FormGroup) {
    this.http
      .post<UserLoginPayload>(`${environment.apiLocalhostUrl}/user/login`, loginForm.value)
      .subscribe({
        next: responseData => {
          this.userLoginPayload = responseData;
          this.openDialog("Success", "Login successful", true);
        },
        error: err => {
          console.error("Observable emitted an error: " + err);
          this.openDialog("Fail", "Login failed", false);
        },
        complete: () => this.router.navigate(["/repertoire"])
      });
  }

  getLoggedUser(): UserLoginPayload {
    return this.userLoginPayload;
  }

  private openDialog(title: string, message: string, isSuccess: boolean): void {
    const dialogRef = this.dialog.open(ResultModalComponent, {
      width: '250px',
      data: { title, message, isSuccess: isSuccess }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
