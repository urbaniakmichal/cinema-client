import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ToastService } from "../../features/toast.service";
import { Paths } from "../../config/Paths";

@Component({
  selector: "app-payment-summary",
  standalone: true,
  imports: [],
  templateUrl: "./payment-summary.component.html",
  styleUrl: "./payment-summary.component.scss"
})
export class PaymentSummaryComponent {

  constructor(
    private router: Router,
    private toastService: ToastService
  ) {
  }


  navigateToMainPage() {
    this.router
      .navigate([Paths.REPERTOIRE])
      .then(nav => this.toastService.toastInfo("Redirect"),
        error => this.toastService.toastError(error)
      );
  }

}
