import { Component } from "@angular/core";
import { StatusModalComponent } from "../angular/material/status-modal/status-modal.component";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-payment",
  standalone: true,
  imports: [],
  templateUrl: "./payment.component.html",
  styleUrl: "./payment.component.scss"
})
export class PaymentComponent {

  constructor(public dialog: MatDialog) {
  }

  openModal(isSuccess: boolean): void {
    const dialogRef = this.dialog.open(StatusModalComponent, {
      width: "250px",
      data: { isSuccess: isSuccess }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
}
