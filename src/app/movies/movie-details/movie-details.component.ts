import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MoviesRepertoirePayload } from "../../data-structures/payloads/movies/repertorie/MoviesRepertoirePayload";
import { HttpClient } from "@angular/common/http";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { environment } from "../../../environments/environment";
import { ToastService } from "../../features/toast.service";

@Component({
  selector: "app-movie-details",
  standalone: true,
  imports: [],
  templateUrl: "./movie-details.component.html",
  styleUrl: "./movie-details.component.scss"
})
export class MovieDetailsComponent implements OnInit {

  moviesRepertoirePayload!: MoviesRepertoirePayload;
  movieId: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private router: Router,
    private toastService: ToastService
  ) {
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.movieId = params.get("id") || "";
    });

    this.http
      .get<MoviesRepertoirePayload>(`${environment.apiLocalhostUrl}/details/movie/12345`) // dodac movieId do urla
      .subscribe({
        next: responseData => this.moviesRepertoirePayload = responseData,
        error: error => this.toastService.toastError(error),
        complete: () => console.log(this.moviesRepertoirePayload)
      });
  }

  getYoutubeUrl(): SafeResourceUrl {
    if (this.moviesRepertoirePayload && this.moviesRepertoirePayload.trailerUrl) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.moviesRepertoirePayload.trailerUrl);
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/eMrph8__EFc");
  }

  navigateToTicket(): void {
    this.router
      .navigate(["/select-ticket"])
      .then(nav => this.toastService.toastInfo("Redirect"),
        error => this.toastService.toastError(error)
      );
  }

}
