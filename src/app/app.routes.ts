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
import { TicketsComponent } from "./user/account/tickets-history/tickets.component";
import { Paths } from "./config/Paths";

export const routes: Routes = [
  {
    path: "",
    redirectTo: Paths.REPERTOIRE,
    pathMatch: "full"
  },
  {
    path: Paths.LOGIN,
    component: LoginComponent
  },
  {
    path: Paths.ACCOUNT,
    component: AccountComponent,
    canActivate: [AuthGuard],
    children: [
      { path: Paths.PROFILE, component: ProfileComponent, canActivate: [AuthGuard] },
      { path: Paths.TICKETS, component: TicketsComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: Paths.PROFILE, pathMatch: 'full' }
    ]
  },
  {
    path: Paths.RESTORE,
    component: RestorePasswordComponent
  },
  {
    path: Paths.REGISTER,
    component: RegisterComponent
  },
  {
    path: Paths.REPERTOIRE,
    component: RepertoireComponent
  },
  {
    path: Paths.MOVIE_DETAILS_ID,
    component: MovieDetailsComponent
  },
  {
    path: Paths.SELECT_SEAT,
    component: SelectSeatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: Paths.BUY_TICKET,
    component: SelectTicketComponent,
    canActivate: [AuthGuard]
  },
  {
    path: Paths.SELECT_TICKET,
    component: SelectTicketComponent,
    canActivate: [AuthGuard]
  },
  {
    path: Paths.ORDER,
    component: OrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: Paths.PAYMENT,
    component: ThirdPartPaymentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: Paths.PAYMENT_SUMMARY,
    component: PaymentSummaryComponent,
    canActivate: [AuthGuard]
  }
];
