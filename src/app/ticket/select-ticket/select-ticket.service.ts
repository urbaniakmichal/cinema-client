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

    if(!this.isUpdateAmountOfPreviusSelectedTicket(ticket)) {        
      this.selectedTickets.push({ ticket, amount });
    } else {
      this.replaceExistingTicketWithNewAmount(ticket, amount);
    }
}

  getSelectedTickets() {
    return this.selectedTickets;
  }

  getSelectedTicketstAmount(): number {
    let totalAmount: number = 0;
    
    for (let item of this.selectedTickets) {
      totalAmount += item.amount;
    }
   
    return totalAmount;
  }

  
  private isUpdateAmountOfPreviusSelectedTicket(ticket: TicketsTypePayload): boolean {
    return this.selectedTickets.some(selectedTicket => selectedTicket.ticket.id === ticket.id);
  }

  private replaceExistingTicketWithNewAmount(ticket: TicketsTypePayload, amount: number): void {
    this.selectedTickets[this.findArrayIndex(ticket)] = { ticket, amount };
    
  }

  private findArrayIndex(ticket: TicketsTypePayload): number {
    return this.selectedTickets.findIndex(selectedTicket => selectedTicket.ticket.id === ticket.id)
  }
}
