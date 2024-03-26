import { HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MovieAnnouncementsPayload } from "../../data-structures/payloads/movies/announcment/MovieAnnouncementsPayload";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { environment } from "../../../environments/environment";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { ToastService } from "../../features/toast.service";
import { Subject, takeUntil } from "rxjs";
import { Paths } from "../../config/Paths";

@Component({
  selector: "app-announcements",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ToastModule
  ],
  templateUrl: "./announcements.component.html",
  styleUrl: "./announcements.component.scss",
  providers: [MessageService]
})
export class AnnouncementsComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  movieAnnouncementsPayload!: MovieAnnouncementsPayload[];

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService
  ) {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.http
      .get<MovieAnnouncementsPayload[]>(`${environment.apiLocalhostUrl}/announcements` + Paths.MOVIES)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: responseData => this.movieAnnouncementsPayload = responseData,
        error: error => this.toastService.toastError(error),
        complete: () => {
          // console.log(this.movieAnnouncementsPayload)
        }
      });
  }

  navigateToMovieDetails(id: string): void {
    this.router
      .navigate([Paths.MOVIE_DETAILS, id])
      .then(nav => this.toastService.toastInfo("Redirect"),
        error => this.toastService.toastError(error)
      );
  }

}
