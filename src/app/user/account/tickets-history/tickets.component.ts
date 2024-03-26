import { Component, OnDestroy, OnInit } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Subject, takeUntil } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "../../../config/auth/auth.service";
import { ToastService } from "../../../features/toast.service";
import { OrderHistoryRes } from "../../../data-structures/payloads/order/OrderHistoryRes";

import { Table, TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { InputTextModule } from "primeng/inputtext";
import { DatePipe } from "@angular/common";
import { Paths } from "../../../config/Paths";

@Component({
  selector: "app-tickets",
  standalone: true,
  imports: [
    TagModule,
    InputTextModule,
    TableModule,
    DatePipe
  ],
  templateUrl: "./tickets.component.html",
  styleUrl: "./tickets.component.scss"
})
export class TicketsComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  protected ordersHistoryResponse!: OrderHistoryRes[];

  ngOnInit(): void {
    this.ticketsHistory();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private authService: AuthService
  ) {
  }


  protected getPaymentResult(paymentStatus: string) {
    if (paymentStatus === "true") {
      return 'danger';
    } else {
      return 'success';
    }
  }


  private ticketsHistory(): void {
    let params = new HttpParams();
    params = params.append("userID", this.authService.userLoginPayload.id);
    console.log("Param: " + this.authService.userLoginPayload.id)

    this.http
      .get<OrderHistoryRes[]>(`${environment.apiLocalhostUrl}/order` + Paths.HISTORY, { params: params })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: responseData => this.ordersHistoryResponse = responseData,
        error: error => this.toastService.toastError(error),
        complete: () => {
          console.log(this.ordersHistoryResponse);
        }
      });
  }



}
