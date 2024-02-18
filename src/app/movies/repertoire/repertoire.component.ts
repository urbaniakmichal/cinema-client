import { Component, OnInit } from '@angular/core';
import { MoviesRepertoirePayload } from '../../data-structures/MoviesRepertoirePayloadInterface';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RepertoireMenuComponent } from './repertoire-menu/repertoire-menu.component';
import { RepertoireMoviesComponent } from './repertoire-movies/repertoire-movies.component';

@Component({
  selector: 'app-repertoire',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RepertoireMenuComponent,
    RepertoireMoviesComponent
  ],
  templateUrl: './repertoire.component.html',
  styleUrl: './repertoire.component.css'
})
export class RepertoireComponent implements OnInit {

    moviesRepertoireUrl = "http://localhost:9091/api/v1/repertoire/movies";
    moviesRepertoirePayload!: MoviesRepertoirePayload[];
  
    selectedButtonIndex: number | null = null;

  
    constructor(private http: HttpClient) {}
  
    ngOnInit(): void {
          this.http.get<MoviesRepertoirePayload[]>(this.moviesRepertoireUrl).subscribe(
              (data: MoviesRepertoirePayload[]) => {                
                  this.moviesRepertoirePayload = data;
                  console.log(this.moviesRepertoirePayload);
              }
          );
    }


    handleButtonClick(index: number) {
        this.selectedButtonIndex = index;
    }
}
