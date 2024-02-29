import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

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

  constructor(private httpClient: HttpClient) {
  }


  restoreForm = new FormGroup({
    email: new FormControl("")
  });


  submitRestore() {
    this.httpClient
      .post("http://localhost:9092/api/v1/user/restore", this.restoreForm.value)
      .subscribe(response => {
        console.log(response);
      });
  }


}
