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
import { AuthGuard } from "./config/auth/auth.guard";

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
    component: SelectSeatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "buy-ticket",
    component: SelectTicketComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "select-ticket",
    component: SelectTicketComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "order",
    component: OrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "payment",
    component: PaymentComponent,
    canActivate: [AuthGuard]
  }

];
