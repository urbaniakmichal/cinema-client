import { Component, OnDestroy, OnInit } from "@angular/core";
import { MoviesRepertoireDaysPayload } from "../data-structures/payloads/movies/repertorie/MoviesRepertoireDaysPayload";
import {
  MoviesRepertoireHoursPayload
} from "../data-structures/payloads/movies/repertorie/MoviesRepertoireHoursPayload";
import { MoviesRepertoirePayload } from "../data-structures/payloads/movies/repertorie/MoviesRepertoirePayload";
import { RepertoireService } from "../movies/repertoire/repertoire.service";
import { SelectSeatService } from "../ticket/select-seat/select-seat.service";
import { SelectTicketService } from "../ticket/select-ticket/select-ticket.service";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TicketsTypePayload } from "../data-structures/payloads/tickets/TicketsTypePayload";
import { Router, RouterModule } from "@angular/router";
import { UserLoginPayloadResponse } from "../data-structures/payloads/user/UserLoginPayloadResponse";
import { HttpClient, HttpParams } from "@angular/common/http";
import { SubmitOrderPayload } from "../data-structures/payloads/order/SubmitOrderPayload";
import { OrderIdResponsePayload } from "../data-structures/payloads/order/OrderIdResponsePayload";
import { environment } from "../../environments/environment";
import { ToastService } from "../features/toast.service";
import { AuthService } from "../config/auth/auth.service";
import { map, Subject, takeUntil } from "rxjs";
import { faker } from "@faker-js/faker";
import { ThirdPartPaymentService } from "../config/mocks/third-part/third-part-payment/third-part-payment.service";
import { PromoCodePayloadRes } from "../data-structures/payloads/code/PromoCodePayloadRes";
import { TableModule } from "primeng/table";

@Component({
  selector: "app-order",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TableModule
  ],
  templateUrl: "./order.component.html",
  styleUrl: "./order.component.scss"
})
export class OrderComponent implements OnInit, OnDestroy {

  // ToDo add service and move some logic from component

  private unsubscribe$: Subject<void> = new Subject<void>();

  selectedMovie: MoviesRepertoirePayload | null = null;
  selectedHour: MoviesRepertoireHoursPayload | null = null;
  selectedDay: MoviesRepertoireDaysPayload | null = null;
  userLoginPayload!: UserLoginPayloadResponse;
  selectedSeats: { rowNumber: number, seatNumber: number }[] = [];
  selectedTickets: { ticket: TicketsTypePayload, amount: number }[] = [];
  ticketAmount!: number;
  totalTicketsPrice!: number;

  promoCodePayloadRes!: PromoCodePayloadRes;
  promoCodeAsParam: string = "";

  submitOrderPayload!: SubmitOrderPayload;
  orderIdResponsePayload!: OrderIdResponsePayload;

  constructor(
    private http: HttpClient,
    private router: Router,
    private repertoireService: RepertoireService,
    private selectSeatService: SelectSeatService,
    private selectTicketService: SelectTicketService,
    private authService: AuthService,
    private toastService: ToastService,
    private thirdPartPaymentService: ThirdPartPaymentService
  ) {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.selectedMovie = this.repertoireService.selectedMovie;
    this.selectedHour = this.repertoireService.selectedHour;
    this.selectedDay = this.repertoireService.selectedDay;
    this.selectedSeats = this.selectSeatService.selectedSeats;
    this.selectedTickets = this.selectTicketService.selectedTickets;
    this.ticketAmount = this.selectTicketService.getSelectedTicketsAmount();
    this.totalTicketsPrice = this.calculateTotalTicketsPrice();
    this.userLoginPayload = this.authService.userLoginPayload;

    console.log("OrderingTicketComponent selectedMovie: ", this.selectedMovie?.title);
    console.log("OrderingTicketComponent selectedHour: ", this.selectedHour?.hour);
    console.log("OrderingTicketComponent selectedDay: ", this.selectedDay);
    console.log("OrderingTicketComponent selectedSeats: ", this.selectedSeats);
    console.log("OrderingTicketComponent selectedTicketsAmount: ", this.selectedTickets);
    console.log("OrderingTicketComponent ticketAmount: ", this.ticketAmount);
    console.log("OrderingTicketComponent totalTicketsPrice: ", this.totalTicketsPrice);
    console.log("OrderingTicketComponent loginService: ", this.userLoginPayload);
  }


  protected calculateTotalTicketsPrice(): number {
    let priceSum = 0;
    for (const selectedTicket of this.selectedTickets) {
      const price = parseFloat(selectedTicket.ticket.price);
      const amount = selectedTicket.amount;
      priceSum += price * amount;
    }

    return priceSum;
  }

  protected submitOrder(): void {
    this.createOrderPayload();
    console.log(this.submitOrderPayload);

    this.http
      .post<OrderIdResponsePayload>(`${environment.apiLocalhostUrl}/order/submit`, this.submitOrderPayload)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: responseData => this.orderIdResponsePayload = responseData,
        error: error => this.toastService.toastError(error),
        complete: () => {
          this.navigateToThirdPartPayment();
          console.log(this.orderIdResponsePayload);
        }
      });
  }

  protected submitPromoCode(): void {
    console.log("promo code value " + this.promoCodeAsParam);

    let params = new HttpParams();
    params = params.append("value", this.promoCodeAsParam);

    this.http
      .get<PromoCodePayloadRes>(`${environment.apiLocalhostUrl}/code/promo`, { params: params })
      .pipe(
        takeUntil(this.unsubscribe$),
        map(responseData => {
          console.log(responseData);
          this.promoCodePayloadRes = responseData;

          if (this.promoCodePayloadRes.isActive) {
            this.calculatePrice();
            this.toastService.toastSuccess("Added promo code");
          } else {
            this.toastService.toastFail("Invalid promo code");
          }

          return responseData;
        })
      )
      .subscribe({
        error: error => {
          this.toastService.toastError("Invalid promo code");
        }
      });
  }

  protected navigateToSelectSeat(): void {
    this.router
      .navigate(["/select-seat"])
      .then(nav => this.toastService.toastInfo("Redirect"),
        error => this.toastService.toastError(error)
      );
  }

  protected isPromoCodeAdded(): boolean {
    return this.promoCodeAsParam.trim() !== "";
  }


  private createOrderPayload(): void {
    this.submitOrderPayload = {
      orderId: faker.string.uuid(),
      userId: this.userLoginPayload.id,
      selectedMovieId: this.selectedMovie?.id ?? "",
      selectedMovieHourId: this.selectedHour?.id ?? "",
      selectedDayId: this.selectedDay?.id ?? "",
      selectedSeats: this.selectedSeats,
      selectedTickets: this.selectedTickets,
      ticketAmount: this.ticketAmount,
      totalTicketsPrice: this.totalTicketsPrice
    };
  }

  private navigateToThirdPartPayment(): void {
    this.thirdPartPaymentService.openDialog();
  }

  private calculatePrice(): void {
    console.log("Price before use promo code: " + this.totalTicketsPrice);
    this.totalTicketsPrice -= this.totalTicketsPrice * (this.promoCodePayloadRes.value / 100);
    console.log("Price after use promo code: " + this.totalTicketsPrice);
  }
}
