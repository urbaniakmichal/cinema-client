import { Routes } from "@angular/router";
import { LoginComponent } from "./user/login/login.component";
import { RegisterComponent } from "./user/register/register.component";
import { RepertoireComponent } from "./movies/repertoire/repertoire.component";
import { MovieDetailsComponent } from "./movies/movie-details/movie-details.component";
import { SelectSeatComponent } from "./ticket/select-seat/select-seat.component";
import { SelectTicketComponent } from "./ticket/select-ticket/select-ticket.component";
import { RestorePasswordComponent } from "./user/restore-password/restore-password.component";
import { OrderComponent } from "./order/order.component";
import { PaymentComponent } from "./payment/payment.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "repertoire",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "restore",
    component: RestorePasswordComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "repertoire",
    component: RepertoireComponent
  },
  {
    path: "movie-details/:id",
    component: MovieDetailsComponent
  },
  {
    path: "select-seat",
    component: SelectSeatComponent
  },
  {
    path: "buy-ticket",
    component: SelectTicketComponent
  },
  {
    path: "select-ticket",
    component: SelectTicketComponent
  },
  {
    path: "order",
    component: OrderComponent
  },
  {
    path: "payment",
    component: PaymentComponent
  }

];
