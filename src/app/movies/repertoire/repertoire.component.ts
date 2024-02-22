import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RepertoireMenuComponent } from './repertoire-menu/repertoire-menu.component';
import { RepertoireMoviesComponent } from './repertoire-movies/repertoire-movies.component';
import { RootMoviesRepertoirePayload } from '../../data-structures/payloads/movies/repertorie/RootMoviesRepertoirePayload';

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

    moviesRepertoireUrl = "http://localhost:9092/api/v1/repertoire/movies";
    rootMoviesRepertoirePayload!: RootMoviesRepertoirePayload[];
  
    selectedButtonIndex: number | null = null;

  
    constructor(private http: HttpClient) {}
  
    ngOnInit(): void {
          this.http.get<RootMoviesRepertoirePayload[]>(this.moviesRepertoireUrl).subscribe(
              (data: RootMoviesRepertoirePayload[]) => {                
                  this.rootMoviesRepertoirePayload = data;
                  console.log(this.rootMoviesRepertoirePayload);
              }
          );
    }


    handleButtonClick(index: number) {
        this.selectedButtonIndex = index;
    }
}
