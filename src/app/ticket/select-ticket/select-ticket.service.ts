import { Injectable } from '@angular/core';
import { TicketsTypePayload } from '../../data-structures/payloads/tickets/TicketsTypePayload';

@Injectable({
  providedIn: 'root'
})
export class SelectTicketService {

  selectedTickets: { ticket: TicketsTypePayload, amount: number }[] = [];

  constructor() { }

  setSelectedTicketsAmount(ticketsAmount: string, ticket: TicketsTypePayload) { 
    const amount = parseInt(ticketsAmount, 10);     
    this.selectedTickets.push({ ticket, amount });
    console.log(this.selectedTickets)
    console.log("size: " + this.selectedTickets.length)
}

  getSelectedTickets() {
    return this.selectedTickets;
  }

  getSelectedTicketstAmount(): number {
    let totalAmount: number = 0;
    for (let item of this.selectedTickets) {
      totalAmount += item.amount;
    }
    console.log("getTicketsAmount() " + totalAmount);
    return totalAmount;
  }
}
