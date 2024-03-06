import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MovieAnnouncementsPayload } from "../../data-structures/payloads/movies/announcment/MovieAnnouncementsPayload";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { environment } from "../../../environments/environment";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { ToastService } from "../../features/toast.service";

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
export class AnnouncementsComponent implements OnInit {

  movieAnnouncementsPayload!: MovieAnnouncementsPayload[];

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService
  ) {
  }


  ngOnInit(): void {
    this.http
      .get<MovieAnnouncementsPayload[]>(`${environment.apiLocalhostUrl}/announcements/movies`)
      .subscribe({
        next: responseData => this.movieAnnouncementsPayload = responseData,
        error: error => this.toastService.toastError(error),
        complete: () => console.log(this.movieAnnouncementsPayload)
      });
  }

  navigateToMovieDetails(id: string): void {
    this.router
      .navigate(["/movie-details", id])
      .then(nav => this.toastService.toastEInfo("Redirect"),
        error => this.toastService.toastError(error)
      );
  }

}
