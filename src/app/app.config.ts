import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideAnimations } from "@angular/platform-browser/animations";
import { routes } from "./app.routes";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { JwtInterceptorService } from "./config/auth/jwt-interceptor.service";
import { DialogService } from "primeng/dynamicdialog";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    provideAnimationsAsync(),
    ToastModule,
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    DialogService
  ]
};
