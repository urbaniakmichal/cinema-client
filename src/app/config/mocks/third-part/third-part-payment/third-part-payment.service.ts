import { Injectable } from "@angular/core";
import { ThirdPartPaymentComponent } from "./third-part-payment.component";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";

@Injectable({
  providedIn: "root"
})
export class ThirdPartPaymentService {

  private ref!: DynamicDialogRef;

  constructor(
    private dialogService: DialogService
  ) {
  }

  openDialog(): void { // ToDo move dialogService to separate component/service?
    this.ref = this.dialogService.open(ThirdPartPaymentComponent, {
      header: "Please choose payment type",
      width: "70%",
      closable: false
    });
  }

  closeDialog(): void {
    this.ref.close();
  }
}
