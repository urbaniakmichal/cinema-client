import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: "root"
})
export class ToastService {

  constructor(
    private messageService: MessageService
  ) {
  }


  toastSuccess(detail: string): void {
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: detail,
      life: 5000
    });
  }

  toastFail(detail: string): void {
    this.messageService.add({
      severity: "fail",
      summary: "Fail",
      detail: detail,
      life: 5000
    });
  }

  toastError(detail: string): void {
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: detail,
      life: 5000
    });
  }

  toastEInfo(detail: string): void {
    this.messageService.add({
      severity: "info",
      summary: "Info",
      detail: detail,
      life: 5000
    });
  }
}
