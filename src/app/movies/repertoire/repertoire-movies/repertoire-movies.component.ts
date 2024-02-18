import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MoviesRepertoirePayload } from '../../../data-structures/MoviesRepertoirePayloadInterface';

@Component({
  selector: 'app-repertoire-movies',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './repertoire-movies.component.html',
  styleUrl: './repertoire-movies.component.css'
})
export class RepertoireMoviesComponent implements OnInit {

    @Input() moviesRepertoirePayload!: MoviesRepertoirePayload[];
    @Input() selectedIndex: number | null = null;

    constructor() { }

    ngOnInit(): void {
        if (this.selectedIndex === null) {
            this.selectedIndex = 0;
        }
      }


}
