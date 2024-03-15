import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { TicketsTypePayload } from "../../data-structures/payloads/tickets/TicketsTypePayload";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { SelectTicketService } from "./select-ticket.service";
import { environment } from "../../../environments/environment";
import { ToastService } from "../../features/toast.service";

@Component({
  selector: "app-select-ticket",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: "./select-ticket.component.html",
  styleUrl: "./select-ticket.component.scss"
})
export class SelectTicketComponent implements OnInit {

  ticketsTypePayload!: TicketsTypePayload[];

  constructor(
    private http: HttpClient,
    private router: Router,
    private selectTicketService: SelectTicketService,
    private toastService: ToastService
  ) {
  }


  ngOnInit(): void {
    this.http
      .get<TicketsTypePayload[]>(`${environment.apiLocalhostUrl}/tickets`)
      .subscribe({
        next: responseData => this.ticketsTypePayload = responseData,
        error: error => this.toastService.toastError(error),
        complete: () => this.clearSelectedTicketsArray()
      });
  }

  navigateToSelectSeat(): void {
    this.router
      .navigate(["/select-seat"])
      .then(
        () => this.toastService.toastInfo("Redirect"),
        error => this.toastService.toastError(error)
      );
  }

  protected onSelectTicketsAmount(event: any, ticket: TicketsTypePayload): void {
    this.selectTicketService.setSelectedTicketsAmount(event.target.value, ticket);
  }

  protected isAnyTicketSelected(): boolean {
    return this.selectTicketService.getSelectedTicketsAmount() > 0;
  }

  private clearSelectedTicketsArray(): void {
    this.selectTicketService.selectedTickets = [];
  }
}
