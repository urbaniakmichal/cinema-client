import { Component, OnInit } from "@angular/core";
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
import { HttpClient } from "@angular/common/http";
import { SubmitOrderPayload } from "../data-structures/payloads/order/SubmitOrderPayload";
import { OrderIdResponsePayload } from "../data-structures/payloads/order/OrderIdResponsePayload";
import { environment } from "../../environments/environment";
import { ToastService } from "../features/toast.service";
import { AuthService } from "../config/auth/auth.service";

@Component({
  selector: "app-order",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: "./order.component.html",
  styleUrl: "./order.component.scss"
})
export class OrderComponent implements OnInit {

  selectedMovie: MoviesRepertoirePayload | null = null;
  selectedHour: MoviesRepertoireHoursPayload | null = null;
  selectedDay: MoviesRepertoireDaysPayload | null = null;
  userLoginPayload!: UserLoginPayloadResponse;
  selectedSeats: { rowNumber: number, seatNumber: number }[] = [];
  selectedTickets: { ticket: TicketsTypePayload, amount: number }[] = [];
  ticketAmount!: number;
  totalTicketsPrice!: number;

  submitOrderPayload!: SubmitOrderPayload;
  orderIdResponsePayload!: OrderIdResponsePayload;

  constructor(
    private http: HttpClient,
    private router: Router,
    private repertoireService: RepertoireService,
    private selectSeatService: SelectSeatService,
    private selectTicketService: SelectTicketService,
    private authService: AuthService,
    private toastService: ToastService
  ) {
  }


  ngOnInit(): void {
    this.selectedMovie = this.repertoireService.getSelectedMovie();
    this.selectedHour = this.repertoireService.getSelectedHour();
    this.selectedDay = this.repertoireService.getSelectedDay();
    this.selectedSeats = this.selectSeatService.getSelectedSeats();
    this.selectedTickets = this.selectTicketService.getSelectedTickets();
    this.ticketAmount = this.selectTicketService.getSelectedTicketsAmount();
    this.totalTicketsPrice = this.calculateTotalTicketsPrice();
    this.userLoginPayload = this.authService.getLoggedUser();

    console.log("OrderingTicketComponent selectedMovie: ", this.selectedMovie?.title);
    console.log("OrderingTicketComponent selectedHour: ", this.selectedHour?.hour);
    console.log("OrderingTicketComponent selectedDay: ", this.selectedDay);
    console.log("OrderingTicketComponent selectedSeats: ", this.selectedSeats);
    console.log("OrderingTicketComponent selectedTicketsAmount: ", this.selectedTickets);
    console.log("OrderingTicketComponent ticketAmount: ", this.ticketAmount);
    console.log("OrderingTicketComponent totalTicketsPrice: ", this.totalTicketsPrice);
    console.log("OrderingTicketComponent loginService: ", this.userLoginPayload);
  }

  calculateTotalTicketsPrice(): number {
    let priceSum = 0;
    for (const selectedTicket of this.selectedTickets) {
      const price = parseFloat(selectedTicket.ticket.price);
      const amount = selectedTicket.amount;
      priceSum += price * amount;
    }

    return priceSum;
  }

  navigateToThirdPartPayment(): void {
    window.location.href = "https://www.paymentwall.com/uploaded/files/PW20_methods.png";
    // this.router.navigate(['/payment']);
  }

  submitOrder(): void {
    this.createOrderPayload();
    console.log(this.submitOrderPayload);

    this.http
      .get<OrderIdResponsePayload>(`${environment.apiLocalhostUrl}/order/submit`)
      .subscribe({
        next: responseData => this.orderIdResponsePayload = responseData,
        error: error => this.toastService.toastError(error),
        complete: () => console.log(this.orderIdResponsePayload)
      });
  }

  navigateToSelectSeat(): void {
    this.router
      .navigate(["/select-seat"])
      .then(nav => this.toastService.toastInfo("Redirect"),
        error => this.toastService.toastError(error)
      );
  }

  private createOrderPayload(): void {
    this.submitOrderPayload = {
      orderId: "123456",
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
}
