import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import {
  ThirdPartPaymentTypesPayload
} from "../../../../data-structures/payloads/payments/ThirdPartPaymentTypesPayload";
import { ToastService } from "../../../../features/toast.service";
import { DialogService, DynamicDialogModule, DynamicDialogRef } from "primeng/dynamicdialog";
import { DialogRef } from "@angular/cdk/dialog";
import { ThirdPartPaymentService } from "./third-part-payment.service";

@Component({
  selector: "app-third-part-payment",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: "./third-part-payment.component.html",
  styleUrl: "./third-part-payment.component.scss"
})
export class ThirdPartPaymentComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  thirdPartPaymentTypesPayloads!: ThirdPartPaymentTypesPayload[];
  selectedPaymentType! : ThirdPartPaymentTypesPayload;

  selectedPaymentTypeIndex: number = -1;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService,
    private thirdPartPaymentService: ThirdPartPaymentService
  ) {
  }

  ngOnInit(): void {
    this.http
      .get<ThirdPartPaymentTypesPayload[]>(`${environment.apiLocalhostUrl}/third-part/payment/type`)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: responseData => this.thirdPartPaymentTypesPayloads = responseData,
        error: error => console.log(error),
        complete: () => {
          console.log(this.thirdPartPaymentTypesPayloads);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  protected paymentSuccessful(): void {
    console.log("Success:");
    console.log(this.selectedPaymentType);
    this.thirdPartPaymentService.closeDialog();
    this.navigateToPaymentSummary();
  }

  protected paymentFail(): void {
    console.log("Fail:");
    console.log(this.selectedPaymentType);
    this.thirdPartPaymentService.closeDialog();
    this.navigateToPaymentSummary();
  }

  protected selectPaymentType(index: number): void {
    if (this.isPaymentTypeSelected(index)) {
      this.removeNgClassFromElement();
    } else {
      this.selectedPaymentType = this.thirdPartPaymentTypesPayloads[index];
      this.selectedPaymentTypeIndex = index;
    }
  }

  protected isPaymentTypeSelected(paymentTypeIndex: number): boolean {
    return this.selectedPaymentTypeIndex === paymentTypeIndex;
  }

  private removeNgClassFromElement(): void {
    this.selectedPaymentTypeIndex = -1;
  }

  private navigateToPaymentSummary(): void {
    this.router
      .navigate(["/payment-summary"])
      .then(nav => this.toastService.toastInfo("Redirect"),
        error => this.toastService.toastError(error)
      );
  }

}
