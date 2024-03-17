import { HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuditoriumPayload } from "../../data-structures/payloads/auditorium/AuditoriumPayload";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { SelectSeatService } from "./select-seat.service";
import { SelectTicketService } from "../select-ticket/select-ticket.service";
import { environment } from "../../../environments/environment";
import { ToastService } from "../../features/toast.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-select-seat",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: "./select-seat.component.html",
  styleUrl: "./select-seat.component.scss"
})
export class SelectSeatComponent implements OnInit, OnDestroy {

  // ToDo dodac mozliwosc odkliknięcia wybranego miejsca

  private unsubscribe$: Subject<void> = new Subject<void>();

  auditoriumPayload!: AuditoriumPayload;

  createRowsArray: number[] = [];
  createSeatsArray: number[] = [];

  selectedSeats: { rowNumber: number, seatNumber: number }[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private selectTicketService: SelectTicketService,
    private selectSeatService: SelectSeatService,
    private toastService: ToastService
  ) {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.http
      .get<AuditoriumPayload>(`${environment.apiLocalhostUrl}/auditorium`)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: responseData => this.auditoriumPayload = responseData,
        error: error => this.toastService.toastError(error),
        complete: () => this.createSeats(this.auditoriumPayload)
      });
  }

  createSeats(auditoriumPayload: AuditoriumPayload): void {
    for (let i = 0; i < auditoriumPayload.rows; i++) {
      this.createRowsArray.push(i);
    }

    for (let j = 0; j < auditoriumPayload.seats; j++) {
      this.createSeatsArray.push(j);
    }
  }

  selectSeat(rowIndex: number, seatIndex: number): void {
    const seatNumber = this.selectSeatService.calculateSeatNumber(rowIndex, this.auditoriumPayload, seatIndex);

    if (this.isSeatSelected(rowIndex, seatIndex)) {
      this.selectSeatService.removeSelectedSeat(rowIndex, seatIndex);
    } else {
      if (this.selectedSeats.length < this.selectTicketService.getSelectedTicketsAmount()) {
        this.selectedSeats.push({ rowNumber: rowIndex, seatNumber: seatNumber });
        this.selectSeatService.setSelectedSeats(rowIndex, seatNumber);
      }
    }
  }

  isSeatSelected(rowIndex: number, seatIndex: number): boolean {
    const seatNumber = this.selectSeatService.calculateSeatNumber(rowIndex, this.auditoriumPayload, seatIndex);
    return this.selectedSeats.some(seat => seat.rowNumber === rowIndex && seat.seatNumber === seatNumber);
  }

  navigateToSelectTicket(): void {
    this.router
      .navigate(["/buy-ticket"])
      .then(nav => this.toastService.toastInfo("Redirect"),
        error => this.toastService.toastError(error)
      );
  }

  navigateToOrderDetails(): void {
    this.router
      .navigate(["/order"])
      .then(nav => this.toastService.toastInfo("Redirect"),
        error => this.toastService.toastError(error)
      );
  }

}
