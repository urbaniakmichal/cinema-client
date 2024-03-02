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
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TicketsTypePayload } from "../data-structures/payloads/tickets/TicketsTypePayload";
import { Router, RouterModule } from "@angular/router";
import { LoginService } from "../user/login/login.service";
import { UserLoginPayload } from "../data-structures/payloads/user/UserLoginPayload";
import { HttpClient } from "@angular/common/http";
import { SubmitOrderPayload } from "../data-structures/payloads/order/SubmitOrderPayload";
import { OrderIdResponsePayload } from "../data-structures/payloads/order/OrderIdResponsePayload";
import { RootMoviesRepertoirePayload } from "../data-structures/payloads/movies/repertorie/RootMoviesRepertoirePayload";
import { environment } from "../../environments/environment";

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
  userLoginPayload!: UserLoginPayload;
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
    private loginService: LoginService
  ) {

  }


  ngOnInit(): void {
    this.selectedMovie = this.repertoireService.getSelectedMovie();
    this.selectedHour = this.repertoireService.getSelectedHour();
    this.selectedDay = this.repertoireService.getSelectedDay();
    this.selectedSeats = this.selectSeatService.getSelectedSeats();
    this.selectedTickets = this.selectTicketService.getSelectedTickets();
    this.ticketAmount = this.selectTicketService.getSelectedTicketstAmount();
    this.totalTicketsPrice = this.calculateTotalTicetsPrice();
    this.userLoginPayload = this.loginService.getLoggedUser();

    console.log("OrderingTicketComponent selectedMovie: ", this.selectedMovie?.title);
    console.log("OrderingTicketComponent selectedHour: ", this.selectedHour?.hour);
    console.log("OrderingTicketComponent selectedDay: ", this.selectedDay);
    console.log("OrderingTicketComponent selectedSeats: ", this.selectedSeats);
    console.log("OrderingTicketComponent selectedTicketsAmount: ", this.selectedTickets);
    console.log("OrderingTicketComponent ticketAmount: ", this.ticketAmount);
    console.log("OrderingTicketComponent totalTicketsPrice: ", this.totalTicketsPrice);
    console.log("OrderingTicketComponent loginService: ", this.userLoginPayload);
  }


  calculateTotalTicetsPrice(): number {
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
        error: err => console.error("Observable emitted an error: " + err),
        complete: () => console.error(this.orderIdResponsePayload)
      });
  }

  navigateToSelectSeat(): void {
    this.router.navigate(["/select-seat"]);
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
