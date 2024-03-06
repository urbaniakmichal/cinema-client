import { Component } from "@angular/core";
import { StatusModalComponent } from "../angular/material/status-modal/status-modal.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-payment",
  standalone: true,
  imports: [],
  templateUrl: "./payment.component.html",
  styleUrl: "./payment.component.scss"
})
export class PaymentComponent {

  constructor(
    public dialog: MatDialog
  ) {
  }

  openModal(isSuccess: boolean): void {
    const dialogRef = this.dialog.open(StatusModalComponent, {
      width: "250px",
      data: { isSuccess: isSuccess }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result.data);
    });
  }
}
