import { Component } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { LoginComponent } from "./user/login/login.component";
import { HttpClientModule } from "@angular/common/http";
import { HeaderComponent } from "./header/header.component";
import { CommonModule } from "@angular/common";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { RepertoireComponent } from "./movies/repertoire/repertoire.component";
import { FooterComponent } from "./footer/footer.component";
import { AnnouncementsComponent } from "./movies/announcements/announcements.component";
import { MovieDetailsComponent } from "./movies/movie-details/movie-details.component";
import { SelectSeatComponent } from "./ticket/select-seat/select-seat.component";
import { SelectTicketComponent } from "./ticket/select-ticket/select-ticket.component";
import { OrderComponent } from "./order/order.component";
import { ToastModule } from "primeng/toast";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";

@Component({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    DropdownModule,
    FormsModule,
    LoginComponent,
    HeaderComponent,
    RouterOutlet,
    RepertoireComponent,
    FooterComponent,
    AnnouncementsComponent,
    MovieDetailsComponent,
    SelectSeatComponent,
    SelectTicketComponent,
    OrderComponent,
    ButtonModule,
    DialogModule,
    ToastModule
  ],
  selector: "app-root",
  standalone: true,
  styleUrl: "./app.component.css",
  templateUrl: "./app.component.html"
})
export class AppComponent {

}
