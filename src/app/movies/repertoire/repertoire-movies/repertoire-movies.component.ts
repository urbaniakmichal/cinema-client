import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MovieDetailsComponent } from '../../movie-details/movie-details.component';
import { RootMoviesRepertoirePayload } from '../../../data-structures/payloads/movies/repertorie/RootMoviesRepertoirePayload';

@Component({
    selector: 'app-repertoire-movies',
    standalone: true,
    templateUrl: './repertoire-movies.component.html',
    styleUrl: './repertoire-movies.component.css',
    imports: [
        CommonModule,
        RouterModule,
        MovieDetailsComponent
    ]
})
export class RepertoireMoviesComponent implements OnInit {

    @Input() rootMoviesRepertoirePayload!: RootMoviesRepertoirePayload[];
    @Input() selectedIndex: number | null = null;

    constructor(private router: Router) {}

    ngOnInit(): void {
        if (this.selectedIndex === null) {
            this.selectedIndex = 0;
        }
    }


    navigateToMovieDetails(id: string) {
        this.router.navigate(['/movie-details', id]);
    }

}
