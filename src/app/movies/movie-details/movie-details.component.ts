import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesRepertoirePayload } from '../../data-structures/payloads/movies/repertorie/MoviesRepertoirePayload';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-movie-details',
    standalone: true,
    imports: [],
    templateUrl: './movie-details.component.html',
    styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {

    movieUrl = "http://localhost:9092/api/v1/details/movie/12345"; // dodac movieId do urla
    moviesRepertoirePayload!: MoviesRepertoirePayload;
    movieId: string | undefined;


    constructor(private route: ActivatedRoute, private http: HttpClient, private sanitizer: DomSanitizer, private router: Router) {}
  

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
        this.movieId = params.get('id') || '';
    });

    this.http.get<MoviesRepertoirePayload>(this.movieUrl).subscribe( // dodac movieId do urla
        (data: MoviesRepertoirePayload) => {
            this.moviesRepertoirePayload = data;
        });
    }
  

    getYoutubeUrl(): SafeResourceUrl {
        if (this.moviesRepertoirePayload && this.moviesRepertoirePayload.trailerUrl) {
            return this.sanitizer.bypassSecurityTrustResourceUrl(this.moviesRepertoirePayload.trailerUrl);
        }

        return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/eMrph8__EFc");
    }

    navigateToTicket() {
        this.router.navigate(['/select-ticket']);
    }

}
