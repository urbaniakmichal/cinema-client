import { Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import {
  ThirdPartPaymentTypesPayload
} from "../../../../data-structures/payloads/payments/ThirdPartPaymentTypesPayload";

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
    private router: Router
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
    console.log("Success:", this.selectedPaymentType);
  }

  protected paymentFail(): void {
    console.log("Fail:", this.selectedPaymentType);
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
}
