import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MovieAnnouncementsPayload } from "../../data-structures/payloads/movies/announcment/MovieAnnouncementsPayload";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { UserLoginPayload } from "../../data-structures/payloads/user/UserLoginPayload";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-announcements",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: "./announcements.component.html",
  styleUrl: "./announcements.component.scss"
})
export class AnnouncementsComponent implements OnInit {

  movieAnnouncementsPayload!: MovieAnnouncementsPayload[];


  constructor(private http: HttpClient, private router: Router) {
  }


  ngOnInit(): void {
    this.http
      .get<MovieAnnouncementsPayload[]>(`${environment.apiLocalhostUrl}/announcements/movies`)
      .subscribe({
        next: responseData => this.movieAnnouncementsPayload = responseData,
        error: err => console.error("Observable emitted an error: " + err),
        complete: () => console.error("Observable completed")
      });
  }


  navigateToMovieDetails(id: string) {
    this.router.navigate(["/movie-details", id]);
  }

}
