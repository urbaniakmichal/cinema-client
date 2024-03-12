import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { RepertoireMoviesComponent } from "./repertoire-movies/repertoire-movies.component";
import { RepertoireDaysComponent } from "./repertoire-days/repertoire-days.component";
import { RepertoireService } from "./repertoire.service";

@Component({
  selector: "app-repertoire",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RepertoireDaysComponent,
    RepertoireMoviesComponent
  ],
  templateUrl: "./repertoire.component.html"
})
export class RepertoireComponent {

  selectedDayIndex: number | null = null;

  constructor(
    protected repertoireService: RepertoireService
  ) {
  }


  protected onIndexOfDaySelected(index: number): void {
    this.selectedDayIndex = index;
  }
}
