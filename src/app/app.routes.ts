import { Routes } from "@angular/router";
import { LoginComponent } from "./user/login/login.component";
import { RegisterComponent } from "./user/register/register.component";
import { RepertoireComponent } from "./movies/repertoire/repertoire.component";
import { MovieDetailsComponent } from "./movies/movie-details/movie-details.component";
import { SelectSeatComponent } from "./ticket/select-seat/select-seat.component";
import { SelectTicketComponent } from "./ticket/select-ticket/select-ticket.component";
import { RestorePasswordComponent } from "./user/restore-password/restore-password.component";
import { OrderComponent } from "./order/order.component";
import { AuthGuard } from "./config/auth/auth.guard";
import { ThirdPartPaymentComponent } from "./config/mocks/third-part/third-part-payment/third-part-payment.component";
import { PaymentSummaryComponent } from "./payment-summary/payment-summary/payment-summary.component";
import { AccountComponent } from "./user/account/account.component";
import { ProfileComponent } from "./user/account/profile/profile.component";
import { TicketsComponent } from "./user/account/tickets/tickets.component";

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
    path: "account",
    component: AccountComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
      { path: "tickets", component: TicketsComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'profile', pathMatch: 'full' }
    ]
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
    component: ThirdPartPaymentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "payment-summary",
    component: PaymentSummaryComponent,
    canActivate: [AuthGuard]
  }
];
