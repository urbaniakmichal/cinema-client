import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MovieAnnouncementsPayload } from '../../data-structures/payloads/movies/announcment/MovieAnnouncementsPayload';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-announcements',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule
    ],
    templateUrl: './announcements.component.html',
    styleUrl: './announcements.component.css'
})
export class AnnouncementsComponent implements OnInit {

    announcementsUrl = "http://localhost:9092/api/v1/announcements/movies";
    movieAnnouncementsPayload!: MovieAnnouncementsPayload[];


    constructor(private http: HttpClient, private router: Router) {}

  
  ngOnInit(): void {
    this.http.get<MovieAnnouncementsPayload[]>(this.announcementsUrl).subscribe(
      (data: MovieAnnouncementsPayload[]) => {
        this.movieAnnouncementsPayload = data;
      });
    }


    navigateToMovieDetails(id: string) {
      this.router.navigate(['/movie-details', id]);
  }

}
